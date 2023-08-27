import { useContext, useState } from 'react';
import { createEventHandle } from '../../services/events.service'
import { AuthContext } from '../../context/UserContext'
import dayjs from 'dayjs';


const EventForm = ({ onEventCreated }) => {
  const { userData } = useContext(AuthContext)

console.log(userData)
console.log(userData.uid)

  const [eventData, setEventData] = useState({
    title: '',
    startDateTime: '',
    endDateTime: '',
    description: '', 
    location: '',   
   
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    const currentDateTime = dayjs();
    const startDateTime = dayjs(eventData.startDateTime);
    const endDateTime = dayjs(eventData.endDateTime);


    if (startDateTime.isAfter(endDateTime)) {
     alert(`Start Date cannot be after endDate`)
      return;
    }

    if (endDateTime.isBefore(currentDateTime)) {
      alert(`End Date cannot be in the past`)
      return;
    }

    await createEventHandle(
      eventData.title,
      userData.uid,
      startDateTime.format('YYYY-MM-DD'), 
      startDateTime.format('HH:mm'),     
      endDateTime.format('YYYY-MM-DD'),  
      endDateTime.format('HH:mm'),        
      eventData.description,
      eventData.location,   
   
    );
    // Clear the form data and trigger the event created callback
    setEventData({
      title: '',
      startDate: '',
      startHour: '',
      endDate: '',
      endHour: '',
      description: '',
      location: '',

    });
    onEventCreated(); // Notify parent component that an event was created
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* Your logo and other header content */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an Event
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <textarea
                placeholder="Description"
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <input
                type="datetime-local"
                value={eventData.startDateTime}
                onChange={(e) => setEventData({ ...eventData, startDateTime: e.target.value })}
                required
              />
              <input
                type="datetime-local"
                value={eventData.endDateTime}
                onChange={(e) => setEventData({ ...eventData, endDateTime: e.target.value })}
                required
              />
              {/* TODO - must complete the photo upload functionality to firebase*/}
              {/* <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
       
              /> */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventForm;

