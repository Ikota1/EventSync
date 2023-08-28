import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext";
import {
    uploadProfilePhoto,
    updateUserProfile,
} from "../../services/user.services";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const UserProfileForm = ({ onClose }) => {
    const { userData } = useContext(AuthContext);

    const [userProfileData, setUserProfileData] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [avatarName, setAvatarName] = useState("");

    var phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const userSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        phone: Yup.string()
            .matches(phoneRegEx, 'Phone number is not valid')
            .min(10, "Phone number is too short!")
            .max(10, "Phone number is too long!"),
    });

    const formOptions = { resolver: yupResolver(userSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { isValid, errors } = formState;

    useEffect(() => {
        setUserProfileData(userData);
    }, [userData]);

    console.log(userProfileData);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
        setAvatarName(e.target.files[0].name || "default-name");
    };

    const handleInputChange = (field, value) => {
        setUserProfileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const onSubmit = async (e) => {

        let updatedProfile = { ...userProfileData };

        if (avatar) {
            const photoURL = await uploadProfilePhoto(userData.username, avatar);
            updatedProfile.photo = photoURL;
        }

        await updateUserProfile(userData.uid, updatedProfile);

    };

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""
            }`.toUpperCase();
    };

    return (
        <section>
            <div className="overlay w-full bg-primary bg-opacity-70 h-screen flex justify-center items-center fixed left-0 top-0 px-6 py-8 mx-auto md:h-screen lg:py-0">
                {/* Your logo and other header content */}
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <img
                            className="w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 justify-content-center dark:ring-gray-500"
                            src={userProfileData.photo || `${getInitials(userProfileData.firstName, userProfileData.lastName)}`}
                            alt="Bordered avatar"
                        ></img>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    type="text"
                                    {...register("firstName")}
                                    value={userProfileData.firstName || ""}
                                    onChange={(e) => { handleInputChange("firstName", e.target.value) }}
                                    placeholder="First name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                <div className="invalid-feedback">{errors.firstName?.message}</div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    value={userProfileData.lastName || ""}
                                    onChange={(e) => { handleInputChange("lastName", e.target.value) }}
                                    placeholder="Last name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                <div className="invalid-feedback">{errors.lastName?.message}</div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    {...register("phone")}
                                    value={userProfileData.phone || ""}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    placeholder="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                <div className="invalid-feedback">{errors.phone?.message}</div>                                
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"

                            >
                                Update
                            </button>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileForm;
