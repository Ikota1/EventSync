import { useEffect, useState } from 'react';
import { getEventByHandle, updateEventData, uploadEventPhoto } from '../../services/events.service'
import CustomToggleCheckBox from '../CustomToggleCheckBox/CustomToggleCheckBox';
import dayjs from 'dayjs';
import toast from 'react-hot-toast'
import eventCategories from '../../constants/categories';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

export const EventEditForm = ({ eventId, onClose }) => {

    const [eventData, setEventData] = useState({})
    const [uploadPhoto, setUploadPhoto] = useState('')

    const schema = Yup.object().shape({
        title: Yup.string()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .min(3, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
        category: Yup.string()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .oneOf(eventCategories.map(cat => cat.name), 'Please, select a category.'),
        description: Yup.string()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .min(3, 'Too Short!')
            .max(150, 'Too Long!'),
        location: Yup.string()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .min(3, 'Too Short!')
            .max(40, 'Too Long!'),
    });

    const formOptions = { resolver: yupResolver(schema) };
    const { register, handleSubmit, formState, control } = useForm(formOptions);
    const { errors } = formState;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await (getEventByHandle(eventId))
                if (snapshot.exists()) {
                    const curEvent = snapshot.val()
                    setEventData(curEvent)
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [])

    const handleInputChange = (field, value) => {
        setEventData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleUploadPhoto = (e) => {
        const photo = e.target.files[0];
        setUploadPhoto(photo);
    };
    console.log(uploadPhoto)

    const handleFormSubmit = async () => {

        const newFormData = {
            ...eventData,
        };

        if (uploadPhoto) {
            const photoURL = await uploadEventPhoto(eventData.id, uploadPhoto);
            newFormData.photo = photoURL;
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

        await updateEventData(eventData.id, newFormData)

        toast.success('Event created successfully!')

        onClose();
    };

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
            <div className="overlay w-full bg-primary bg-opacity-70 h-screen flex justify-center items-center fixed left-0 top-0 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-[600px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-[600px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-2 md:space-y-1">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update Event Information
                        </h1>
                        <form className="space-y-4 md:space-y-2" onSubmit={(e) => {
                              handleSubmit(handleFormSubmit)(e)
                        }}>
                            <div className='gap-2'>
                                <input
                                    type="text"
                                    name="title"
                                    {...register('title')}
                                    placeholder={eventData.title || ""}
                                    value={eventData.title || ""}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                                />
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
                                        onChange={(e) => handleInputChange("isOnline", e.target.checked)}
                                    />
                                </div>
                                <div className='flex justify-between pb-3'>
                                    <div>
                                        <label htmlFor="publicOrPrivate" className='pr-2'>Public Event</label>
                                        <CustomToggleCheckBox
                                            id="publicEventCheckbox"
                                            type="checkbox"
                                            label=''
                                            checked={eventData.isPublic || false}
                                            onChange={(e) => handleInputChange("isPublic", e.target.checked)} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    {...register('category')}
                                    value={eventData.category || ""}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
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
                                        onChange={(quillValue) => {
                                            onChange(quillValue); // Update the value in React Hook Form
                                            handleInputChange('description', quillValue); // Call your custom function
                                        }}
                                        />
                                     <div className="invalid-feedback text-red-700 text-sm">{errors.description?.message}</div> 
                                </>
                            )} />
                            <input
                                type="text"
                                id='location'
                                name='location'
                                placeholder={eventData.location}
                                value={eventData.location || ''}
                                onChange={(e) => handleInputChange("location", e.target.value)}
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
                                        onChange={(e) => handleInputChange("startDate", e.target.value)}                                     
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='pb-2'>End Date:</p>
                                    <input
                                        type="datetime-local"
                                        name='end_date'
                                        className='w-full rounded-lg bg-transparent bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-1'
                                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                                    />
                                </div>
                            </div>
                            <label htmlFor="">
                                <p className='pb-2'>Event photo</p>
                                <input
                                    type="file"
                                    name='file'
                                    accept="image/*"
                                    onChange={handleUploadPhoto}
                                    className="bg-gray-50 border border-gray-300 mb-4 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                //   {...register('file')} 
                                />
                                {/* <div className="invalid-feedback text-red-700 text-sm"> {errors.file?.message}</div> */}
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onClose()
                                        }}
                                        className="w-1/2 full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Close
                                    </button>
                                    <button type="submit" className="w-1/2 full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Update
                                    </button>
                                </div>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    );
}

EventEditForm.propTypes = {
    eventId: PropTypes.string,
    onClose: PropTypes.func,
};

export default EventEditForm