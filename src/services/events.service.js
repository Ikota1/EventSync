import { db, storage } from '../firebase/firebase-config'
import { get, set, ref, update, push } from 'firebase/database';
import { uploadBytesResumable, getDownloadURL, ref as sRef } from 'firebase/storage'
import dayjs from 'dayjs';



const currentDateTime = dayjs();
const currentDateTimeString = currentDateTime.format('YYYY-MM-DD HH:mm:ss');

export const getEventByHandle = (uid) => {

    return get(ref(db, `events/${uid}`));
    };

    export const createEventHandle = async (title, eventOwner, startDate, startHour, endDate, endHour, description, location, photo, isPublic, occurrence) => {
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
          occurrence: occurrence
        };
    
        await set(newEventRef, eventData);
    
        // Update user's events and statistics
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
        // return getEventById(newEventKey); need to create the getEventById func so this returns the newly created event object
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


    export const uploadEventPhoto = async (eventId, photoFile) => {
      try {
        const storageRef = sRef(storage, `/events/${eventId}/photo`);
        const uploadTask = uploadBytesResumable(storageRef, photoFile);
          
        await uploadTask;
    
        const photoURL = await getDownloadURL(storageRef);
    
        return photoURL; 
      } catch (error) {
        console.error('Error uploading event photo:', error);
        throw error;
      }
    };
    
    


       
 


