import { useEffect, useState, createContext } from "react";
import { auth } from "../firebase/firebase-config";
import { getUserData } from "../services/user.services";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from 'dayjs';

// Define the initial GlobalContext structure
export const GlobalContext = createContext({
  monthIndex: 0,
  setMonthIndex: (index) => { },
  showEventModal: false,
  setShowEventModal: () => { },
});

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const [authState, setAuthState] = useState({
    user: null,
    userData: null,
  });

  useEffect(() => {
    if (user === null) {
      return;
    }
    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('Something went wrong!');
        }

        const userDataKey = Object.keys(snapshot.val())[0];

        setAuthState(() => ({
          user: user
            ? {
              email: user.email,
              uid: user.uid,
            }
            : null,
          userData: snapshot.val()[userDataKey],
        }));
      })
      .catch((e) => alert(e.message));

  }, [user]);

  if (loading) {
    // Render loading indicator or screen
    return <div>Loading...</div>;
  }

  return (
    <GlobalContext.Provider value={{
      monthIndex,
      setMonthIndex,
      showEventModal,
      setShowEventModal,
    }}>
      <AuthContext.Provider value={{
        user: authState.user,
        userData: authState.userData,
        setAuthState
      }}>
        {children}
      </AuthContext.Provider>
    </GlobalContext.Provider>
  );
};
