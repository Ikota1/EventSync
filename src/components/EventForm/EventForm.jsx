import { useContext, useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DOMPurify from 'dompurify';

const EventForm = ({ onEventCreated, onClose }) => {
  const { userData } = useContext(AuthContext)
  const [defaultPhotoURL, setDefaultPhotoURL] = useState('');

  const schema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required!')
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    category: Yup.string()
      .required('Category is mandatory.').oneOf(eventCategories.map(cat => cat.name), 'Please, select a category.'),
    description: Yup.string()
      .required('Description is required!')
      .min(30, 'Too Short!')
      .max(500, 'Too Long!'),
    location: Yup.string()
      .required('Location is required!')
      .min(3, 'Too Short!')
      .max(40, 'Too Long!'),
    start_date: Yup.date()
      .required("Start time cannot be empty!"),
    end_date: Yup.date()
      .required("End time is required!"),
    // file: Yup.mixed().required('You need to provide a file!').test('fileSize', 'Only documents up to 2MB are permitted.', (value) => {
    //   console.log(value)
    //   return value && value[0]?.size <= 2000000
    // }),
  });

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { isValid, errors } = formState;

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
    category: '',
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

  const sanitizeHTML = (html) => {
    const sanitizedHTML = DOMPurify.sanitize(html);
    return sanitizedHTML;
  };


  const handleFormSubmit = async (e) => {
    let tempIdentifier = '';

    const sanitizedDescription = sanitizeHTML(e.description);


    const newFormData = {
      ...eventData,
      title: e.title,
      description: sanitizedDescription,
      location: e.location,
      startDateTime: e.start_date,
      endDateTime: e.end_date,
      category: e.category
    };

    console.log(e);

    if (eventData.photo) {
      tempIdentifier = await uploadEventPhotoTemporary(eventData.photo);
    }

    const currentDateTime = dayjs();
    const startDateTime = dayjs(newFormData.startDateTime);
    const endDateTime = dayjs(newFormData.endDateTime);

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
      newFormData.title,
      userData.uid,
      startDateTime.format('YYYY-MM-DD'),
      startDateTime.format('HH:mm'),
      endDateTime.format('YYYY-MM-DD'),
      endDateTime.format('HH:mm'),
      newFormData.description,
      newFormData.location,
      photoToUse,
      eventData.isPublic,
      eventData.isOnline,
      eventData.reoccurrence,
      newFormData.category
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
      category: '',
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
      <div onClick={handleOverlayClick} className="overlay w-full bg-primary font-poppins text-white bg-opacity-70 h-screen flex justify-center items-center fixed left-0 top-0 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="overlay w-full bg-primary font-poppins text-white bg-opacity-70 h-screen flex justify-center items-center fixed left-0 top-0 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-[600px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-[600px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-2 md:space-y-1">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> Create an Event </h1>
              <form className="space-y-4 md:space-y-2" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(handleFormSubmit)()
              }}>
                <div className='gap-2'>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                    {...register('title')} />
                  <div className="invalid-feedback text-red-700 text-sm">{errors.title?.message}</div>
                </div>
                <div className='flex'>
                  <div>
                    <label htmlFor="onlineOrLive" className='pr-2'>Online Event</label>
                    <CustomToggleCheckBox
                      id="onlineEventCheckbox"
                      type="checkbox"
                      label=''
                      checked={eventData.isOnline || false}
                      onChange={(e) => setEventData({ ...eventData, isOnline: e.target.checked })} />
                  </div>
                  <div className='flex justify-between pb-3'>
                    <div>
                      <label htmlFor="publicOrPrivate" className='pr-2'>Public Event</label>
                      <CustomToggleCheckBox
                        id="publicEventCheckbox"
                        type="checkbox"
                        label=''
                        checked={eventData.isPublic || false}
                        onChange={(e) => setEventData({ ...eventData, isPublic: e.target.checked })} />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select
                    name="category"
                    id="category"
                    // value={eventData.category || ""}
                    // onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                    {...register('category')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                    <option value="">Select a category</option>
                    {eventCategories.map((category) => (
                      <option key={category.id} value={category.name} >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback text-red-700 text-sm">{errors.category?.message}</div>
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
                <Controller name='description' control={control} render={({
                  field: { onChange, value },
                }) => (
                  <>
                    <ReactQuill
                      className='bg-gray-50 border dark:text-white border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      theme='snow'
                      value={value}
                      modules={modules}
                      placeholder='Description'
                      onChange={onChange} />
                    <div className="invalid-feedback text-red-700 text-sm">{errors.description?.message}</div>
                  </>
                )} />
                <input
                  type="text"
                  id='location'
                  name='location'
                  placeholder="Location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('location')}
                />
                <div className="invalid-feedback text-red-700 text-sm">{errors.location?.message}</div>
                <div className='flex justify-between pb-4'>
                  <div className='flex flex-col'>
                    <p className='pb-2'>Start Date:</p>
                    <input
                      type="datetime-local"
                      name='start_date'
                      className='w-full rounded-lg bg-transparent bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      {...register('start_date')} />
                    <div className="invalid-feedback text-red-700 text-sm">{errors.start_date?.message}</div>
                  </div>
                  <div className='flex flex-col'>
                    <p className='pb-2'>End Date:</p>
                    <input
                      type="datetime-local"
                      name='end_date'
                      className='w-full rounded-lg bg-transparent bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-1'
                      {...register('end_date')} />
                    <div className="invalid-feedback text-red-700 text-sm">{errors.end_date?.message}</div>
                  </div>
                </div>
                <label htmlFor="">
                  <p className='pb-2'>Event photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEventData({ ...eventData, photo: e.target.files[0] })}
                    className="bg-gray-50 border border-gray-300 mb-4 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                      }}
                      className="w-1/2 full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Close
                    </button>
                    <button type="submit" className="w-1/2 full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Create
                    </button>
                  </div>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

EventForm.propTypes = {
  onEventCreated: PropTypes.func,
  onClose: PropTypes.func,
};

export default EventForm;

