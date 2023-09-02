import { useEffect, useState, createContext, useCallback } from "react";
import { auth, app,  db } from "../firebase/firebase-config";
import { getUserData } from "../services/user.services";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from 'dayjs';
import { getDatabase, ref, onValue } from 'firebase/database';

const database = getDatabase(app);

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
    if(user?.uid){
      // Reference to the user object in the Realtime Database
      // Replace 'user_id_here' with the actual path
      const userRef = ref(database, `users/${user?.uid}`); 

    // Subscribe to changes in the user object
    const onDataChange = (snapshot) => {
      if (snapshot.exists()) {
          setAuthState((previousValue)=>{
                    // User data exists, update the user state with the data
              return {
                ...previousValue,
                userData:snapshot.val()
              }
          })
      } else {
        // User data doesn't exist, handle this case if needed
        alert(`User data doesn't exist`)
        console.log(`User data doesn't exist`)
      }
    };
    // Set up the listener using onValue
    onValue(userRef, onDataChange);
    // Clean up the listener when the component unmounts
    return () => {
      // Unsubscribe from the listener
      onValue(userRef, onDataChange);
    };
    }
  }, [user?.uid]);

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
