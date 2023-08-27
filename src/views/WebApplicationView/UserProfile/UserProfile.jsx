import { useContext} from "react";
import { AuthContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";
import UserProfileDetails from "./UserProfileDetails";

export const UserProfile = () => {
  const { userData } = useContext(AuthContext);
  console.log(userData);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0) || ""}${
      lastName.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">TBU</p>
              <p className="text-gray-400">Friends</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {userData.eventStatistics.eventsCreated}
              </p>
              <p className="text-gray-400">Events created</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {userData.eventStatistics.ticketsBought}
              </p>
              <p className="text-gray-400">Tickets bought</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {userData && userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt={getInitials(userData.firstName, userData.lastName)}
                />
              ) : (
                <span className="font-normal font-poppins text-3xl text-white dark:text-slate-500">
                  {getInitials(userData.firstName, userData.lastName)}
                </span>
              )}
            </div>
          </div>

          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            {/* premiumUser is to be a boolean */}
            {userData && userData.premiumUser ? (
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
            <Link to="/edit=profile" element={<UserProfileDetails/>}>
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="font-light text-gray-600 mt-3">
            {`#${userData.userName}`}
          </p>
          <p className="font-light text-gray-600 mt-3">{`${userData.email}`}</p>
        </div>

        <div className="mt-12 flex flex-col justify-center">
          {userData && userData.about ? (
            <p className="text-gray-600 text-center font-light lg:px-16">
              {userData.about}
            </p>
          ) : (
            <p className="text-gray-600 text-center font-light lg:px-16">
              Edit your profile and tell us more about yourself!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
