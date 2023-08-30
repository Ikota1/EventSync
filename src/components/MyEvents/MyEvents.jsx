import { useState, useEffect } from 'react';
import { getEventByHandle, getEventsByCurrentUser } from '../../services/events.service';
import { auth } from '../../firebase/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const MyEvents = () => {
  const [user] = useAuthState(auth);
  const [myEventsData, setMyEventsData] = useState([]);

  console.log(myEventsData)

  useEffect(() => {
    const getUserEvents = async () => {
      if (user) {
        const userEventsSnapshot = await getEventsByCurrentUser(user.uid);
        const userEventsArray = userEventsSnapshot.val();
  
        if (userEventsArray) {
          const eventDataPromises = userEventsArray.map(async (eventID) => {
            const eventSnapshot = await getEventByHandle(eventID);
            return eventSnapshot.exists() ? eventSnapshot.val() : null;
          });
          const eventDataArray = await Promise.all(eventDataPromises);
          setMyEventsData(eventDataArray.filter(eventData => eventData !== null));
        } else {
          setMyEventsData([]);
        }
      }
    };
  
    getUserEvents();
  }, []);
  

  
  return (
    <div>
      <h2>My Events</h2>
      <div className="grid grid-cols-3 gap-4">
        {myEventsData.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold">Event: {event.title}</h3>
            <p>Description: {event.description}</p>
            <p>Date: {event.startDate}  Time: {event.startHour}</p>
            <p>Location: {event.location}</p>
            <img src={event.photo} alt={event.title} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;


