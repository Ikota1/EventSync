import { useEffect, useState } from 'react'
import { getPublicEvents } from '../../../services/events.service'
import { get, ref } from 'firebase/database';
import { db } from '../../../firebase/firebase-config';
import { useParams } from 'react-router-dom';
import TicketPurchaseBtn from '../../../components/TicketPurchaseBtn/TicketPurchaseBtn';
import Lottie from 'lottie-react';
import instIcon from '../../../assets/animation_lm9cz07c.json'
import linkedinIcon from '../../../assets/animation_lm9d7gvz.json'
import clockIcon from '../../../assets/animation_lm9dbhqr.json'
import EventLocation from '../../../components/EventMap/EventLocation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUserByHandle } from '../../../services/user.services';

const EventsDetails = () => {
  const params = useParams()
  const [eventsDetailed, setEventsDetailed] = useState([])
  const [loading, setLoading] = useState(true)
  const [userEventOwner, setUserEventOwner] = useState([])

  const fetchEventData = async () => {
    setLoading(true);
    try {
      const eventId = ref(db, `events/${params.id}`)
      const snapshot = await get(eventId)
      const user = await getUserByHandle(snapshot.val().eventOwner)

      if (snapshot.exists()) {
        const data = snapshot.val();
        const userData = user.val();
        console.log(data)
        setEventsDetailed(data);
        setUserEventOwner(userData)
      } else {
        console.log('Thread not found.');
      }
      setLoading(false)
    } catch (error) {
      console.error('Unable to fetch public events', error);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEventData();
  }, [])

  return (
    <div className='text-white'>
      <div className='w-[60%] flex justify-between flex-col items-center mx-auto'>
        <div className='flex justify-between w-[100%]'>
          <span>{eventsDetailed?.isPublic ? 'Public' : 'Is Not Public'}</span>
          <div className='flex gap-4'>
            <button>Back</button>
            <button>I am Going</button>
          </div>
        </div>
        <div className='flex justify-between w-[100%] my-5'>
          <div className='flex flex-col w-[50%] gap-5'>
            <h1 className='text-3xl'>{eventsDetailed?.title || ''}</h1>
            <p>{eventsDetailed?.location || ''}</p>

            <span className='flex items-center gap-2'><Lottie className='w-[30px] bg-white rounded-full' animationData={clockIcon} /> {eventsDetailed?.startDate || ''} To {eventsDetailed?.startDate || ''}</span>
            <span className='flex items-center gap-2'><Lottie className='w-[30px] bg-white rounded-full' animationData={clockIcon} /> {eventsDetailed?.endDate || ''} To {eventsDetailed?.endDate || ''}</span>
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
            <img src={eventsDetailed?.photo || ''} alt="" />
          </div>
        </div>
        <div className='w-full'>
          {!loading ? <EventLocation userLocation={eventsDetailed?.location || ''} /> : null}
        </div>
      </div>

    </div>
  )
}


export default EventsDetails;

{/* <h1 className='text-gradient uppercase text-4xl font-medium'>{eventsDetailed.title}</h1>
      <span className='flex items-center gap-2'><Lottie className='w-[30px] bg-white rounded-full' animationData={clockIcon} /> {eventsDetailed.startDate} To {eventsDetailed.startDate}</span>
      <TicketPurchaseBtn />
      <div className='flex flex-row gap-4'>
        <div className='col-span-1'>
          <img src={eventsDetailed.photo} alt="photo" className='w-[700px] h-[300px] rounded' />
        </div>
        <div className='col-span-2'>
          {!loading ? <EventLocation userLocation={eventsDetailed.location} /> : null}
        </div>
      </div>

      <div className='flex flex-col gap-4 items-start'>
        <div>
          <ReactQuill
            readOnly
            value={eventsDetailed.description}
            theme="snow"
            modules={{ toolbar: false }} />
        </div>
        <hr className='w-[500px] opacity-20' />
        <div className='flex justify-between w-[500px] items-center'>
          <div className='flex'>
            <Lottie className='w-[50px] cursor-pointer' animationData={instIcon} />
            <Lottie className='w-[35px] cursor-pointer' animationData={linkedinIcon} />
          </div>
        </div>
      </div> */}