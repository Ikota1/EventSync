import { AuthContext } from '../../../context/UserContext';
import { useContext, useEffect } from 'react';
import { USER_ROLES } from '../../../constants/userRoles';
import { useNavigate, Outlet } from 'react-router-dom';

function AdminRoute() {
    const { userData } = useContext(AuthContext)
    const navigate = useNavigate();
    const isAdmin = userData?.userRole === USER_ROLES.Admin;
   
    useEffect(() => {
      if (!userData || !isAdmin) {
        navigate("/");
      }
  
    }, [isAdmin, navigate, userData]);
  
    return <Outlet />;
  }
  
  export default AdminRoute;