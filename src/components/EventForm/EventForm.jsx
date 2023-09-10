import React, { useContext, useEffect, useRef, useState } from 'react';
import { createEventHandle, updatePhotoProperty, uploadEventPhotoTemporary } from '../../services/events.service'
import { AuthContext } from '../../context/UserContext'
import CustomToggleCheckBox from '../CustomToggleCheckBox/CustomToggleCheckBox';
import { currentTimeToLocalString } from '../../constants/helpersFns/helpers';
import { getDefaultImgURL } from '../../services/events.service';
import dayjs from 'dayjs';
import toast from 'react-hot-toast'
import { eventReoccurrence } from '../../constants/helpersFns/events.enum';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import eventCategories from '../../constants/categories';

const EventForm = ({ onEventCreated, onClose }) => {
  const { userData } = useContext(AuthContext)
  const [defaultPhotoURL, setDefaultPhotoURL] = useState('');
  const [value, setValue] = useState('');

  const [eventData, setEventData] = useState({
    title: '',
    startDateTime: currentTimeToLocalString(),
    endDateTime: '',
    description: '',
    location: '',
    photo: '',
    isPublic: false,
    isOnline: false,
    reoccurrence: {
      repeat: 'none',
      endOfSeries: '',
    },
    category:'',
  });

  useEffect(() => {
    const fetchDefaultImgURL = async () => {
      try {
        const defaultImgUrl = await getDefaultImgURL();
        setDefaultPhotoURL(defaultImgUrl);
      } catch (error) {
        console.error(error)
      }
    }
    fetchDefaultImgURL();
  }, [])


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let tempIdentifier = '';

    if (eventData.photo) {
      tempIdentifier = await uploadEventPhotoTemporary(eventData.photo);
    }

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

    const photoToUse = eventData.photo || defaultPhotoURL;

    const eventId = await createEventHandle(
      eventData.title,
      userData.uid,
      startDateTime.format('YYYY-MM-DD'),
      startDateTime.format('HH:mm'),
      endDateTime.format('YYYY-MM-DD'),
      endDateTime.format('HH:mm'),
      eventData.description,
      eventData.location,
      photoToUse,
      eventData.isPublic,
      eventData.isOnline,
      eventData.reoccurrence,
      eventData.category
    );

    if (tempIdentifier !== '' && eventId) {
      await updatePhotoProperty(tempIdentifier, eventId, eventData.photo);
    }

    toast.success('Event created successfully!')

    setEventData({
      title: '',
      startDate: '',
      startHour: '',
      endDate: '',
      endHour: '',
      description: '',
      location: '',
      photo: '',
      isPublic: false,
      isOnline: false,
      reoccurrence: {
        repeat: 'none',
        endOfSeries: '',
      },
      category:'',
    });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      onClose();
    }
  }

  const handleIntervalChange = (e) => {
    setEventData({
      ...eventData,
      reoccurrence: {
        ...eventData.reoccurrence,
        endOfSeries: e.target.value,
      }
    })
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
    ],
  };

  return (
    <section>
      <div onClick={handleOverlayClick} className="overlay w-full bg-primary text-white bg-opacity-70 h-screen flex justify-center items-center fixed left-0 top-0 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-[600px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-[600px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> Create an Event </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
              <div className='flex gap-2'>
                <input
                  type="text"
                  placeholder="Title"
                  value={eventData.title || ''}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required />
                <div>
                  <label htmlFor="onlineOrLive">Online Event</label>
                  <CustomToggleCheckBox
                    id="onlineEventCheckbox"
                    type="checkbox"
                    checked={eventData.isOnline || false}
                    onChange={(e) => setEventData({ ...eventData, isOnline: e.target.checked })} />
                </div>
              </div>
              <div className='flex justify-between pb-3'>
                <div>
                  <label htmlFor="publicOrPrivate" className='pr-2 pt-2'>Public Event</label>
                  <CustomToggleCheckBox
                    id="publicEventCheckbox"
                    type="checkbox"
                    checked={eventData.isPublic || false}
                    onChange={(e) => setEventData({ ...eventData, isPublic: e.target.checked })} />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select
                  name="category"
                  id="category"
                  value={eventData.category || ""} // Add this line to bind the selected value
                  onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  <option value=""></option>
                  {eventCategories.map((category) => (
                    <option key={category.id} value={category.name} >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <label>
                <h4 className='pb-2'>Repeat:</h4>
                <select
                  value={eventData.reoccurrence.repeat}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-3 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      reoccurrence: {
                        ...eventData.reoccurrence,
                        repeat: e.target.value,
                      },
                    })}>
                  {Object.values(eventReoccurrence).map((reoc) => (
                    <option key={reoc}>{reoc}</option>
                  ))}
                </select>
              </label>
              {eventData.reoccurrence.repeat !== 'none' && (
                <label>
                  <p className='pb-2'>How many times should the event repeat?</p>
                  <input
                    type="datetime-local"
                    value={eventData.reoccurrence.endOfSeries || ''}
                    onChange={handleIntervalChange}
                    className='w-full rounded-lg bg-transparent bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required />
                </label>
              )}
              <ReactQuill
                className='bg-gray-50 border dark:text-white border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                theme='snow'
                value={eventData.description || ''}
                modules={modules}
                placeholder='Description'
                onChange={(e) => setEventData({ ...eventData, description: e })} />
              <input
                type="text"
                id='location'
                placeholder="Location"
                value={eventData.location || ''}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required />
              <div className='flex justify-between pb-4'>
                <div className='flex flex-col'>
                  <p className='pb-2'>Start Date:</p>
                  <input
                    type="datetime-local"
                    value={eventData.startDateTime || ''}
                    onChange={(e) => setEventData({ ...eventData, startDateTime: e.target.value })}
                    className='w-full rounded-lg bg-transparent bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required />
                </div>
                <div className='flex flex-col'>
                  <p className='pb-2'>End Date:</p>
                  <input
                    type="datetime-local"
                    value={eventData.endDateTime || ''}
                    onChange={(e) => setEventData({ ...eventData, endDateTime: e.target.value })}
                    className='w-full rounded-lg bg-transparent bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-1'
                    required />
                </div>
              </div>
              <label htmlFor="">
                <p className='pb-2'>Event photo</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEventData({ ...eventData, photo: e.target.files[0] })}
                  className="bg-gray-50 border border-gray-300 mb-4 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button type="submit" className="block mx-auto w-50 text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </section >
  );
};

export default EventForm;

