import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext";
import {
    uploadProfilePhoto,
    updateUserProfile,
} from "../../services/user.services";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const UserProfileForm = ({ onClose, formData }) => {
    const { userData } = useContext(AuthContext);

    const [userProfileData, setUserProfileData] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [avatarName, setAvatarName] = useState("");
    const [userAbout, setUserAbout] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [addressLocation, setAddressLocation] = useState("")

    var phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const userSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(1, 'Too Short!')
            .max(30, 'Too Long!')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
        lastName: Yup.string()
            .min(1, 'Too Short!')
            .max(30, 'Too Long!')
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
        phone: Yup.string()
            .matches(phoneRegEx, 'Phone number is not valid')
            .min(10, "Phone number is too short!")
            .max(10, "Phone number is too long!"),
        email: Yup.string()
            .email('Must be a valid email!')
            .max(25)
            .required('Email is required!')
            .matches(/^(?!.*@[^,]*,)/),
    });

    const formOptions = { resolver: yupResolver(userSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { isValid, errors } = formState;

    useEffect(() => {
        setUserProfileData(userData);
        setUserAbout(userData.about || "");
        setIsActive(userData.isActive )
        setAddressLocation(userData.address || "")
    }, [userData]);

    console.log(userProfileData);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleAvatarChange = (e) => {
        const newAvatar = e.target.files[0];
        setAvatar(newAvatar);
        setAvatarName(newAvatar.name || "default-name");
        console.log(e.target.files)
    };

    const handleInputChange = (field, value) => {
        setUserProfileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleIsActive = () => {
        setIsActive(!isActive)
    }

    const onSubmit = async () => {

        let updatedProfile = { ...userProfileData, about: userAbout, isActive, address: addressLocation };

        if (avatar) {
            const photoURL = await uploadProfilePhoto(userData.username, avatar);
            updatedProfile.photo = photoURL;
        }

        await updateUserProfile(userData.uid, updatedProfile);
        setIsActive(true)

        onClose();

    };

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
    };

    return (
        <section>
            <div className="overlay w-full bg-primary bg-opacity-70 h-screen flex justify-center items-center fixed left-0 top-0 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="grid justify-items-center">
                            {userProfileData && userProfileData.photo ? (
                                <img
                                    className="w-20 h-20 p-1 rounded-full justify-item-center ring-2 ring-gray-300 dark:ring-gray-500"
                                    src={userProfileData.photo}
                                    alt="Bordered avatar"
                                ></img>
                            ) : (
                                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                    <span className="font-normal font-poppins text-3xl text-white dark:text-slate-500">
                                        {getInitials(userProfileData.firstName, userProfileData.lastName)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    type="text"
                                    {...register("firstName")}
                                    value={userProfileData.firstName || ''}
                                    onChange={(e) => { handleInputChange("firstName", e.target.value) }}
                               
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <div className="invalid-feedback">{errors.firstName?.message}</div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    onChange={(e) => { handleInputChange("lastName", e.target.value) }}
                                    value={userProfileData.lastName || ''}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                               <div className="invalid-feedback">{errors.lastName?.message}</div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    {...register("email")}
                                    onChange={(e) => { handleInputChange("email", e.target.value) }}
                                    value={userProfileData.email || ''}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                               <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    {...register("phone")}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    value={userProfileData.phone || ''}
                                    placeholder={`${userProfileData?.phone}`}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                <div className="invalid-feedback">{errors.phone?.message}</div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={addressLocation || ""}
                                    onChange={(e) => setAddressLocation( e.target.value)}
                                    placeholder={`Street №, City`}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                <div className="invalid-feedback">{errors.addressLocation?.message}</div>
                            </div>
                            <div>
                                <textarea
                                    placeholder="Description"
                                    value={userAbout || ""}
                                    onChange={(e) => setUserAbout(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required/>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={!isActive}
                                    onChange={handleIsActive} />
                                <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 ${isActive ? 'peer-checked:bg-red-600' : 'dark:bg-gray-700'} ${isActive ? 'peer-focus:ring-red-300' : 'dark:peer-focus:ring-red-800'} dark:border-gray-600 dark:peer-focus:ring-red-800 dark:peer-checked:after:translate-x-full dark:peer-checked:bg-red-800 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:border-white`}></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Incognito</span>
                            </label>
                            <div>
                            <button type="submit"  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileForm;
