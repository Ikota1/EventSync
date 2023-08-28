import { get, set, ref, query, equalTo, update, remove, orderByChild } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/firebase-config';
import { USER_ROLES } from '../constants/userRoles';
import dayjs from 'dayjs';


const currentDateTime = dayjs();
const currentDateTimeString = currentDateTime.format('YYYY-MM-DD HH:mm:ss');

export const getUserByHandle = (uid) => {

return get(ref(db, `users/${uid}`));
};

export const createUserHandle = (uid, email, firstName, lastName, userName, country, phone) => {
  const userData = {
    uid,
    userName,
    email,
    firstName,
    lastName,
    country,
    phone,
    createdOn: currentDateTimeString,
    userRole: USER_ROLES.RegularUser,
    eventStatistics: {
      eventsCreated: 0,
      ticketsBought: 0,
      attendedEventsCount: 0, 
    },
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

export const updateUserProfile = (userId, profile) => {
  const userRef = ref(db, `users/${userId}`);
  return set(userRef, profile);
};

export const uploadProfilePhoto = async (userId, file) => {
  const storageRef = sRef(storage, `profilePhotos/${userId}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  try{
    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL
  } catch (e) {
    console.error(`Error while uploading: ${e}`)
  }
};

