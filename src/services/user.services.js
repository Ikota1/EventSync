import { get, set, ref, query, equalTo, update, remove, orderByChild } from 'firebase/database';
import { db } from '../firebase/firebase-config';
import { USER_ROLES } from '../constants/userRoles';

export const getUserByHandle = (username) => {

return get(ref(db, `users/${username}`));
};

export const createUserHandle = (uid, email, firstName, lastName, userName, country) => {
  const userData = {
    uid,
    userName,
    email,
    firstName,
    lastName,
    country,
    createdOn: Date.now(),
    userRole: USER_ROLES.RegularUser,
  };

  return set(ref(db, `users/${uid}`), userData);
};


export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};


export const getUserRole = async (uid) => {
  try {
  
    const snapshot = await getUserData(uid);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userRole = userData[uid].userRole; 
      return userRole;
    }
    return null; // User not found
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const getAllUsers = async () => {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    const users = [];

    if (snapshot.exists()) {

      snapshot.forEach((childSnapshot) => {
      
        const user = childSnapshot.val();
        users.push(user);
      });
      
    }

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


export const blockUser = async (uid) => {

  try {
    const updatedUserRole = {}
    updatedUserRole[`/users/${uid}/userRole`] = USER_ROLES.Blocked;
  
    await update(ref(db), updatedUserRole);
    
  } catch (error) {
    console.error('Error: could not block the user', error);
    throw error;
  }


}

export const promoteUserToPremium = async (uid) => {

  try {
    const updatedUserRole = {}
    updatedUserRole[`/users/${uid}/userRole`] = USER_ROLES.PremiumUser;
  
    await update(ref(db), updatedUserRole);
    
  } catch (error) {
    console.error('Error: could not upgrade to premium', error);ZZZ
    throw error;
  }


}

export const unblockUser = async (uid) => {

  try {
    const updatedUserRole = {}
    updatedUserRole[`/users/${uid}/userRole`] = USER_ROLES.RegularUser;
  
    await update(ref(db), updatedUserRole);
    
  } catch (error) {
    console.error('Error: could not unBlock the user', error);
    throw error;
  }


}

