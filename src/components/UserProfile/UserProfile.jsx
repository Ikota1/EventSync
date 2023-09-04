import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import UserEditProfileButton from "../UserEditProfileButton/UserEditProfileButton";
import { updateUserProfile } from "../../services/user.services";

export const UserProfile = () => {
  const { userData } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    setIsAvailable(userData?.isAvailable)
  }, [userData]);

  const handleDoNotDisturb = async () => {
    let updatedProfile = { ...userData, isAvailable: !isAvailable };

    await updateUserProfile(userData.uid, updatedProfile);
    setIsAvailable(!isAvailable)
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0) || ""}${lastName.charAt(0) || ""}`.toUpperCase();
  };
  console.log(userData)
  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold font-poppins text-gray-700 text-xl">TBU</p>
              <p className="text-gray-400 font-poppins">Friends</p>
            </div>
            <div>
              <p className="font-bold font-poppins text-gray-700 text-xl">
                {userData.eventStatistics.eventsCreated}
              </p>
              <p className="text-gray-400 font-poppins">Events created</p>
            </div>
            <div>
              <p className="font-bold font-poppins text-gray-700 text-xl">
                {userData.eventStatistics.ticketsBought}
              </p>
              <p className="text-gray-400 font-poppins">Tickets bought</p>
            </div>
          </div>
          <div className="relative">
            <div className={`w-48 h-48 bg-indigo-100 mx-auto rounded-full border-2 ring-offset-2 ring-4 ${userData && userData.isActive === true ? "ring-green-500" : "ring-red-500"} ring-green-500 shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500`}>
              {userData && userData?.photo ? (
                <div className="relative">
                  <img
                    className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl flex items-center justify-center text-indigo-500"
                    src={userData?.photo}
                    alt={getInitials(userData.firstName, userData.lastName)}
                  />
                </div>
              ) : (
                <span className="font-normal font-poppins text-3xl text-white dark:text-slate-500">
                  {getInitials(userData.firstName, userData.lastName)}
                </span>
              )}
            </div>
          </div>

          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            {/* premiumUser is to be a boolean */}
            {userData && userData?.premiumUser ? (
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Create Events
              </button>
            ) : (
              <Link>
                <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Upgrade to Premium
                </button>
              </Link>
            )}
            <UserEditProfileButton formData={userData} isModalOpen={setIsModalOpen} />
          </div>
        </div>

        <div className="font-normal font-poppins mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {userData.firstName} {userData.lastName} <span className="font-light text-gray-500">{userData.country}</span>
          </h1>
          <p className="font-light text-gray-600 mt-3">
            {`${userData.address || ""}`}
          </p>
          <p className="font-light text-gray-600 mt-3">
            {`${userData.email}`}
          </p>
          <p className="font-light text-gray-600 mt-3">{`#${userData.userName}`}</p>
        </div>
        <div className="font-normal font-poppins mt-12 flex flex-col justify-center border-b pb-12">
          <h3 className="text-center underline">About</h3>
          {userData && userData.about ? (
            <p className="text-gray-600 text-center font-light lg:px-16 text-left">
              {userData?.about}
            </p>
          ) : (
            <p className="text-gray-600 text-center font-light lg:px-16">
              Edit your profile and tell us more about yourself!
            </p>
          )}
        </div>
        {userData && isModalOpen === false ? (
          <label className="relative inline-flex items-center mr-5 cursor-pointer mt-6">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={isAvailable || ''}
              onChange={handleDoNotDisturb}
            />
            <div className={`w-11 h-6 bg-gray-200 rounded-full peer ${isAvailable ? 'peer-checked:bg-purple-500' : 'dark:bg-gray-300'} dark:border-gray-600 dark:peer-focus:bg-purple-500 dark:peer-checked:after:translate-x-full dark:peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:border-white`}></div>
            {}
            <span className={`${isAvailable === true ? `ml-3 text-sm font-normal font-poppins text-purple-500` : `ml-3 text-sm font-normal font-poppins text-gray-900 dark:text-gray-300`} `}>Available</span>
          </label>
        ) : (
          <div>{null}</div>

        )}
      </div>
    </div>
  );
};
