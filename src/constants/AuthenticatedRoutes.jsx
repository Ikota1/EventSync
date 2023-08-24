import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase-config";

export const AuthenticatedRoute = ({ element }) => {
  const [user] = useAuthState(auth);
  return user ? element : <Navigate to="/login" />;
};