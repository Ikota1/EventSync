export const USER_ROLES = { 
    
    RegularUser: 1,
    PremiumUser: 2,
    Blocked: 3,
    Admin: 4,
 }

  
  export const getUserRoleByCode = (code) => {
    const roleName = Object.keys(USER_ROLES).find((key) => USER_ROLES[key] === code);
    return roleName || 'Role Not Found';
  };
  
  export default getUserRoleByCode;
  