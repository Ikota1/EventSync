import { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import UserEditProfileButton from "../UserEditProfileButton/UserEditProfileButton";
import { getInitials } from "../../constants/helpersFns/getInitials";

export const UserProfile = () => {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-16 font-poppins">
      <div className="p-8 dark:bg-gray-800 shadow mt-24 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0 ">
            <div>
              {userData && userData.friends ? (
                <p className="font-bold font-poppins text-gray-700 text-xl dark:text-white">{Object.keys(userData.friends).length}</p>
              ) : (
                <p className="font-bold font-poppins text-gray-700 text-xl dark:text-white">0</p>
              )}
              <p className="text-gray-400 font-poppins dark:text-white">Friends</p>
            </div>
            <div>
              <p className="font-bold font-poppins text-gray-700 text-xl dark:text-white">
                {userData.eventStatistics.eventsCreated}
              </p>
              <p className="text-gray-400 font-poppins dark:text-white">Events created</p>
            </div>
          </div>
          <div className="relative">
            <div className={`w-48 h-48 bg-indigo-100 mx-auto rounded-full border-2 ring-offset-2 ring-4 ${userData && userData.doNotDisturb === false ? "ring-green-500" : "ring-red-500"} ring-green-500 shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500`}>
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

          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-end">
            <UserEditProfileButton formData={userData} />
          </div>
        </div>

        <div className="font-normal font-poppins mt-20 text-center border-b  border-purple-500 pb-12">
          <h1 className="text-4xl font-medium dark:text-white">
            {userData.firstName} {userData.lastName}<span className="font-light dark:text-white">, {userData.country}</span>
          </h1>
          <p className="font-light text-gray-600 mt-3 dark:text-white">
            {`${userData.address || ""}`}
          </p>
          <p className="font-light text-gray-600 mt-3 dark:text-white">
            {`${userData.email}`}
          </p>
          <p className="font-light dark:text-white mt-3">{`#${userData.userName}`}</p>
        </div>
        <div className="font-normal font-poppins mt-12 flex flex-col justify-center text-justify pb-12">
          <h3 className="text-center underline dark: text-purple-500 pb-2">About</h3>
          {userData && userData.about ? (
            <p className="text-gray-600 text-center font-light lg:px-16 dark:text-white">
              {userData.about}
            </p>
          ) : (
            <p className="text-gray-600 text-center font-light lg:px-16 dark:text-white">
              Edit your profile and tell us more about yourself!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
