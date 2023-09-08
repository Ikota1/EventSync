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

const EventsDetails = () => {
  const params = useParams()
  const [eventsDetailed, setEventsDetailed] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEventData = async () => {
    setLoading(true);
    try {
      const eventId = ref(db, `events/${params.id}`)
      const snapshot = await get(eventId)

      if (snapshot.exists()) {
        const data = snapshot.val();
        setEventsDetailed(data);
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
    <div className='text-white flex justify-center flex-col gap-4 items-center'>
      <h1 className='text-gradient uppercase text-4xl font-medium'>{eventsDetailed.title}</h1>
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
        <p>{eventsDetailed.description}</p>
        <hr className='w-[500px] opacity-20' />
        <div className='flex justify-between w-[500px] items-center'>
          <button className="bg-blue-500 text-white px-2 py-1 rounded mb-4" >
            Add To Calendar
          </button>

          <div className='flex'>
            <Lottie className='w-[50px] cursor-pointer' animationData={instIcon} />
            <Lottie className='w-[35px] cursor-pointer' animationData={linkedinIcon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsDetails