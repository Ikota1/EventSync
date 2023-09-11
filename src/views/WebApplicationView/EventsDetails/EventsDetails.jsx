import { get, ref } from 'firebase/database';
import { auth, db } from '../../../firebase/firebase-config';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserByHandle } from '../../../services/user.services';
import { addUserToEvent, removeUserFromEvent } from '../../../services/events.service'
import { getInitials } from '../../../constants/helpersFns/getInitials';
import Lottie from 'lottie-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import clockIcon from '../../../assets/animation_lm9dbhqr.json';
import EventLocation from '../../../components/EventMap/EventLocation';
import EventInvite from '../../../components/EventInvite/EventInvite';

const EventsDetails = () => {
  const params = useParams()
  const [user] = useAuthState(auth);
  const [eventsDetailed, setEventsDetailed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEventOwner, setUserEventOwner] = useState(null);
  const [attendance, setAttendance] = useState(false)
  const [attendingUsers, setAttendingUsers] = useState([])
  const { userData } = useContext(AuthContext)
  const navigate = useNavigate();

  const fetchEventData = async () => {
    setLoading(true);
    try {
      const eventId = ref(db, `events/${params.id}`)
      const snapshot = await get(eventId);
      const user = await getUserByHandle(snapshot.val().eventOwner);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const userData = user.val();

        setEventsDetailed(data);
        setUserEventOwner(userData);
      } else {
        console.log('Event not found.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Unable to fetch event data', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEventData();

  }, []);

  useEffect(() => {

    if (user.uid && eventsDetailed && eventsDetailed.participants.includes(user.uid)) {
      setAttendance(true);
    } else {
      setAttendance(false);
    }
    const fetchAttendingUsers = async () => {
      try {
        const users = await Promise.all(eventsDetailed.participants.map(async (participantUid) => {
          const user = await getUserByHandle(participantUid);
          return user.val();
        })
        );
        setAttendingUsers(users);
      } catch (error) {
        console.error('Error fetching attending users', error);
      }
    };

    if (eventsDetailed) {
      fetchAttendingUsers();
    }
  }, [user, eventsDetailed]);

  const handleAttendBtnClick = async () => {
    try {
      await addUserToEvent(user.uid, params.id);
      setAttendance(true);
      setAttendingUsers((prevAttendingUsers) => [...prevAttendingUsers, userData]);

    } catch (error) {
      console.error('Error while adding user to event', error);
    }
  }

  const handleUnAttendBtnClick = async () => {
    try {
      await removeUserFromEvent(user.uid, params.id);
      setAttendance(false);
      setAttendingUsers((prevAttendingUsers) => prevAttendingUsers.filter((u) => u.uid !== userData.uid));

    } catch (error) {
      console.error('Error while removing user from event', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-white'>
      {attendance && <EventInvite />}
      <div className='w-[60%] flex justify-between flex-col items-center mx-auto'>
        {eventsDetailed && (
          <>
            <div className='flex justify-between w-[100%]'>
              <span>{eventsDetailed.isPublic ? 'Public' : 'Is Not Public'}</span>
              <div className='flex gap-4'>
                <button onClick={() => navigate('../../application/events')} className="bg-blue-500 text-white px-2 py-1 rounded">Back</button>
                <button onClick={attendance ? handleUnAttendBtnClick : handleAttendBtnClick} className={`bg-${attendance ? 'red' : 'blue'}-500 text-white px-2 py-1 rounded`}>
                  {attendance ? "I'm Staying Home" : "I'm Going"}
                </button>
              </div>
            </div>
            <div className='flex justify-between w-[100%] my-5'>
              <div className='flex flex-col w-[50%] gap-5'>
                <h1 className='text-3xl'>{eventsDetailed.title || ''}</h1>
                <p>{eventsDetailed.location || ''}</p>
                <span className='flex items-center gap-2'><Lottie className='w-[30px] bg-white rounded-full' animationData={clockIcon} /> {eventsDetailed.startDate || ''} To {eventsDetailed.startDate || ''}</span>
                <span className='flex items-center gap-2'><Lottie className='w-[30px] bg-white rounded-full' animationData={clockIcon} /> {eventsDetailed.endDate || ''} To {eventsDetailed.endDate || ''}</span>
                <span>Organized by: {userEventOwner?.userName || ''}</span>
                <span className='w-full'>
                  <ReactQuill
                    className='text-md'
                    readOnly
                    value={eventsDetailed?.description || ''}
                    theme="snow"
                    modules={{ toolbar: false }} />
                </span>
              </div>
              <div className='w-[50%]'>
                <img src={eventsDetailed.photo || ''} alt="" />
              </div>
            </div>
            <div className='w-full'>
              <EventLocation userLocation={eventsDetailed.location || ''} />
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4 gap-3">
              <div className="bg-gray-800 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold leading-none text-white">Event Participants</h3>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    {attendingUsers.map((user) => (
                      <li key={user?.uid} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {user && user?.photo ? (
                              <img className="h-8 w-8 rounded-full" src={user?.photo} alt="Avatar" />
                            ) : (
                              <span className="h-8 w-8 rounded-full flex items-center justify-center bg-indigo-100">
                                {getInitials(user?.firstName, user?.lastName)}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {user?.userName}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EventsDetails;
