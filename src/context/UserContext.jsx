import { useEffect, useState, createContext } from "react";
import { auth } from "../config/firebase-config";
import { getUserData } from "../services/users.service";
import { useAuthState } from "react-firebase-hooks/auth";


export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {

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
        console.log(userDataKey)
        const username = snapshot.val()[userDataKey].username;
        console.log(username)

        setAuthState(() => ({
          user: user
            ? {
              email: user.email,
              uid: user.uid,
            }
            : null,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        }));
      })
      .catch((e) => alert(e.message));

  }, [user])

  if (loading) {
    // Render loading indicator or screen
    return <div>Loading...</div>;
  }

  return (
    <>
      <AuthContext.Provider value={{ user: authState.user, userData: authState.userData, setAuthState }}>
        {children}
      </AuthContext.Provider>
    </>

  )
}

