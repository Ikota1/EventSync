import { db, storage } from '../firebase/firebase-config'
import { get, set, ref, update, push, remove, orderByKey, equalTo, query } from 'firebase/database';
import { uploadBytesResumable, getDownloadURL, ref as sRef } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs';
import { differenceInMinutes } from "date-fns"
import { eventReoccurrence } from '../constants/UIconstants/count.days';

const currentDateTime = dayjs();
const currentDateTimeString = currentDateTime.format('YYYY-MM-DD HH:mm:ss');


export const getEventByHandle = (uid) => {

  return get(ref(db, `events/${uid}`));
};


export const getEventsByCurrentUser = (uid) => {
  return get(ref(db, `users/${uid}/events`))
}

export const createEventHandle = async (title, eventOwner, startDate, startHour, endDate, endHour, description, location, photo, isPublic, isOnline, reoccurrence, category) => {
  try {
    const eventRef = ref(db, 'events');
    const newEventRef = push(eventRef);
    const newEventKey = newEventRef.key;

    const eventData = {
      title: title,
      eventOwner: eventOwner,
      startDate: startDate,
      startHour: startHour,
      endDate: endDate,
      endHour: endHour,
      description: description,
      location: location,
      createdOn: currentDateTimeString,
      participants: [eventOwner],
      photo: photo,
      id: newEventKey,
      isPublic: isPublic,
      isOnline: isOnline,
      isExpired: false,
      reoccurrence: reoccurrence === eventReoccurrence.never ? null : reoccurrence,
      category: category
    };

    await set(newEventRef, eventData);

    const userRef = ref(db, `users/${eventOwner}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();

    if (userData) {
      const eventsArray = userData.events || [];
      eventsArray.push(newEventKey);

      const updatedUserData = { ...userData, events: eventsArray };
      await set(userRef, updatedUserData);

      const userStatistics = userData.eventStatistics;
      const updatedUserStatistics = {
        ...userStatistics,
        eventsCreated: (userStatistics.eventsCreated || 0) + 1,
      };
      const updateUserEvents = {
        [`/users/${eventOwner}/eventStatistics`]: updatedUserStatistics,
      };

      await update(ref(db), updateUserEvents);

      return newEventKey;
    } else {
      console.error('Invalid userSnapshot data structure');
      return null;
    }
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};



export const getAllEvents = async () => {
  try {
    const eventsRef = ref(db, 'events');
    const snapshot = await get(eventsRef);
    const events = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const eventData = childSnapshot.val();
        events.push(eventData);
      });
    }

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};



export const getAllArchivedEvents = async () => {
  try {
    const eventsRef = ref(db, 'archived-events');
    const snapshot = await get(eventsRef);
    const events = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const eventData = childSnapshot.val();
        events.push(eventData);
      });
    }

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getPublicEvents = async () => {
  try {
    const eventsRef = ref(db, 'events');
    const snapshot = await get(eventsRef);
    const publicEvents = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const eventData = childSnapshot.val();
        if (eventData.isPublic === true) {
          publicEvents.push(eventData);
        }
      });
    }

    return publicEvents;

  } catch (error) {
    console.error('Error fetching Public Events:', error);
    throw error;
  }
};


export const uploadEventPhotoTemporary = async (photoFile) => {
  try {
    const tempIdentifier = uuidv4(); // Generate a unique temporary identifier
    const storageRef = sRef(storage, `/tempEvents/${tempIdentifier}/photo`);
    const uploadTask = uploadBytesResumable(storageRef, photoFile);

    await uploadTask;

    return tempIdentifier;
  } catch (error) {
    console.error('Error uploading event photo to temporary storage:', error);
    throw error;
  }
};


export const getDefaultImgURL = async () => {
  try {
    const defaultStorageRef = sRef(storage, `/default/photo.jpg`);

    let tempPhotoURL = await getDownloadURL(defaultStorageRef)

    return tempPhotoURL

  } catch (error) {
    console.error('Could get default download URL', error)

  }
}



export const updatePhotoProperty = async (tempIdentifier, eventId, eventPhoto) => {
  try {
    const tempStorageRef = sRef(storage, `/tempEvents/${tempIdentifier}/photo`);

    const tempPhotoURL = await getDownloadURL(tempStorageRef);

    const eventRef = ref(db, `events/${eventId}`);

    if (eventPhoto !== tempPhotoURL) {

      await update(eventRef, { photo: tempPhotoURL });

      // can implement additional temporary deleting logic from storage
    }
  } catch (error) {
    console.error('Error updating event photo in database', error);
    throw error;
  }
};

const calculateEventTimeProps = (event) => {
  console.log(event)
  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)
  const duration = Math.ceil(differenceInMinutes(endDate, startDate) / 60)
  const startHour = startDate.getHours()
  const startAtHalf = startDate.getMinutes() === 30
  const endHour = endDate.getHours()

  return { duration, startHour, endHour, startAtHalf }
}

export const getSpecificEventPropsByID = async (id) => {
  const snapshot = await get(query(ref(db, "/events"), orderByKey(id), equalTo(id)))

  const value = snapshot.val()
  return snapshot.val()
    ? {
      ...Object.values(value)[0],
      id: Object.keys(value)[0],
      participants: Object.keys(Object.values(value)[0].participants),
      startDate: new Date(Object.values(value)[0].startDate),
      endDate: new Date(Object.values(value)[0].endDate),
      endOfSeries: Object.values(value)[0].endOfSeries !== undefined && new Date(Object.values(value)[0].endOfSeries),
      ...calculateEventTimeProps(Object.values(value)[0]),
    }
    : {}
}

export const deleteEvent = async (eventId, userId) => {

  // const userRefEvents = await get(ref(db, `users/${userId}/events`))
  // const snapshot = userRefEvents.val().find(el => el === eventId)
  // const deleteUserEventId = snapshot.indexOf(snapshot)

  // const userRef = ref(db, `users/${userId}`);
  // const userSnapshot = await get(userRef);
  // const userData = userSnapshot.val();

  try {
    await remove(ref(db, `events/${eventId}`));
    // await remove(ref(db, `users/${userId}/events/${deleteUserEventId}`));

  } catch (error) {
    console.error('Error deleting thread:', error);
    throw error;
  }

  // const userStatistics = userData.eventStatistics;
  // const updatedUserStatistics = {
  //   ...userStatistics,
  //   eventsCreated: (userStatistics.eventsCreated || 0) - 1,
  // };
  // const updateUserEvents = {
  //   [`/users/${userId}/eventStatistics`]: updatedUserStatistics,
  // };

  // await update(ref(db), updateUserEvents);
};



export const archiveExpiredEvents = async (eventID, title, eventOwner, endDate, location, description, participants, photo) => {

  try {
    const archivedEventRef = ref(db, 'archived-events');
    const newArchivedEventRef = push(archivedEventRef);
    const archivedEventKey = newArchivedEventRef.key

    const archivedEventData = {
      title: title,
      eventOwner: eventOwner,
      endDate: endDate,
      location: location,
      description: description,
      participants: participants,
      photo: photo,
      id: archivedEventKey,
      archivedOn: currentDateTimeString,
    };

    await set(newArchivedEventRef, archivedEventData);

    const eventRef = ref(db, `events/${eventID}`);
    await remove(eventRef);

  } catch (error) {
    console.error(error)
  }

};


export const addUserToEvent = async (userID, eventID) => {
  try {
    const userRef = ref(db, `users/${userID}`);
    const eventRef = ref(db, `events/${eventID}`);

    const userSnapshot = await get(userRef);
    const eventSnapshot = await get(eventRef);

    const userData = userSnapshot.val();
    const eventData = eventSnapshot.val();

    if (userData && eventData) {

      const updatedUserEvents = userData.events || [];
      updatedUserEvents.push(eventID);

      const updatedEventParticipants = eventData.participants || [];
      updatedEventParticipants.push(userID);

      const updateObj = {
        //when click going this line makes so it adds and event as if the participant has created it
        // [`users/${userID}/events`]: updatedUserEvents,
        [`events/${eventID}/participants`]: updatedEventParticipants,
      };

      await update(ref(db), updateObj);

      //add update eventStatistics - ticketsBought
      const userStatistics = userData.eventStatistics;
      const updatedUserStatistics = {
        ...userStatistics,
        ticketsBought: (userStatistics.ticketsBought || 0) + 1,
      };
      const updateUserEvents = {
        [`/users/${userData.uid}/eventStatistics`]: updatedUserStatistics,
      };

      await update(ref(db), updateUserEvents);

    }
  } catch (error) {
    console.error('Error updating event attendance:', error);
  }
};


export const removeUserFromEvent = async (userID, eventID) => {
  try {
    const userRef = ref(db, `users/${userID}`);
    const eventRef = ref(db, `events/${eventID}`);

    const userSnapshot = await get(userRef);
    const eventSnapshot = await get(eventRef);

    const userData = userSnapshot.val();
    const eventData = eventSnapshot.val();

    if (userData && eventData) {

      const updatedUserEvents = userData.events || [];
      const eventIndex = updatedUserEvents.indexOf(eventID);
      if (eventIndex !== -1) {
        updatedUserEvents.splice(eventIndex, 1);
      }

      const updatedEventParticipants = eventData.participants || [];
      const userIndex = updatedEventParticipants.indexOf(userID);
      if (userIndex !== -1) {
        updatedEventParticipants.splice(userIndex, 1);
      }

      const updateObj = {
        [`users/${userID}/events`]: updatedUserEvents,
        [`events/${eventID}/participants`]: updatedEventParticipants,
      };

      await update(ref(db), updateObj);

      //remove update eventStatistics - ticketsBought
      const userStatistics = userData.eventStatistics;
      const updatedUserStatistics = {
        ...userStatistics,
        ticketsBought: (userStatistics.ticketsBought || 0) - 1,
      };
      const updateUserEvents = {
        [`/users/${userData.uid}/eventStatistics`]: updatedUserStatistics,
      };

      await update(ref(db), updateUserEvents);
    }
  } catch (error) {
    console.error('Error removing user from event:', error);
  }
};

export const updateEventData = async (eventId, incomingData ) => {
  const eventRef = ref(db, `events/${eventId}`)
  const result = await set(eventRef, incomingData)

  return result
}

export const uploadEventPhoto = async (eventId, file) => {
  const storageRef = sRef(storage, `events/${eventId}`);
  try{
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL
  } catch (e) {
    console.error(`Error while uploading: ${e}`)
  }
};
