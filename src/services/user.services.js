import { get, set, ref, query, equalTo, update, remove, orderByChild } from 'firebase/database';
import { db } from '../firebase/firebase-config';
import { USER_ROLES } from '../constants/userRoles';

export const getUserByHandle = (username) => {

  return get(ref(db, `users/${username}`));
};

export const createUserHandle = (uid, email, firstName, lastName, country) => {
  const userData = {
    uid,
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


// export const blockUser = async (userName) => {

//   try {
//     const updatedUserRole = {}
//     updatedUserRole[`/users/${userName}/userRole`] = USER_ROLES.Blocked;
  
//     await update(ref(db), updatedUserRole);
    
//   } catch (error) {
//     console.error('Error adding thread:', error);
//     throw error;
//   }


// }

// export const unblockUser = async (userName) => {

//   try {
//     const updatedUserRole = {}
//     updatedUserRole[`/users/${userName}/userRole`] = USER_ROLES.RegularUser;
  
//     await update(ref(db), updatedUserRole);
    
//   } catch (error) {
//     console.error('Error adding thread:', error);
//     throw error;
//   }


// }


export const deleteUser = async (userName, isEmail) => {
  try {
    const userRef = isEmail
      ? ref(db, `users`).orderByChild('email').equalTo(userName)
      : ref(db, `users/${userName}`);

    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      throw new Error('User not found');
    }

    await remove(userRef);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};