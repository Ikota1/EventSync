import UserProfileForm from "../UserProfileForm/UserProfileForm";
import { useState } from "react";
import PropTypes from 'prop-types';

const UserEditProfileButton = ({ formData }) => {
  const [showUpdateFrom, setShowUpdateForm] = useState(false);
  const handleShowForm = () => {
    setShowUpdateForm(!showUpdateFrom);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <div className="font-poppins">
      <button className="text-white py-2 px-4 uppercase rounded bg-thirdly hover:bg-thirdlyHover shadow hover:shadow-lg font-medium"
        onClick={handleShowForm}>Edit Profile</button>
      {showUpdateFrom && (
        <div className="overlay">
          <UserProfileForm formData={formData} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

UserEditProfileButton.propTypes = {
  formData: PropTypes.object.isRequired,
};


export default UserEditProfileButton;
