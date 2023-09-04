import { AuthContext } from '../../../context/UserContext';
import { useContext, useEffect } from 'react';
import { USER_ROLES } from '../../../constants/userRoles';
import { useNavigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const { userData, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAdmin = userData?.userRole === USER_ROLES.Admin;

  useEffect(() => {
 
      if (loading) {
        
          return;
      }

      if (!isAdmin) {
          navigate("/");
      }
  }, [isAdmin, navigate, userData, loading]);

  return <Outlet />;
}
  
  export default AdminRoute;