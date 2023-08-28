import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext";
import {
  uploadProfilePhoto,
  updateUserProfile,
} from "../../services/user.services";

const UserProfileForm = ({ onClose }) => {
  const { userData } = useContext(AuthContext);

  const [userProfileData, setUserProfileData] = useState({});
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarName, setAvatarName] = useState("");

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

  const handleSubmit = async () => {

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
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                value={userProfileData.firstName || ""}
                onChange={(e) => {handleInputChange("firstName", e.target.value)}}
                placeholder="First name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <input
                type="text"
                value={userProfileData.lastName || ""}
                onChange={(e) => {handleInputChange("lastName", e.target.value)}}
                placeholder="Last name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Country"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
              />
              <input
                type="text"
                value={userProfileData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <textarea
                type="text"
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Introduce yourself"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

              />
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
