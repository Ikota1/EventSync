import SignUpPartTwo from "./SignUpPartTwo";
import SignUpPartOne from "./SignUpPartOne";
import { useState } from "react";
import { registerUser } from "../../../services/auth.service";
import { createUserHandle } from "../../../services/user.services";
import { useNavigate } from "react-router-dom";
import errorHandler from "../../../services/errors.service";
import toast from 'react-hot-toast'

const SignUp = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    password: '',
    phone: '',
  })

  const stageOneFormData = (firstName, lastName, country) => {
    setFormData((prev) => ({
      ...prev,
      firstName: firstName,
      lastName: lastName,
      country: country
    }))
    setStage(1)
  }

  const stageTwoFormData = async (email, username, password, phone) => {
    setFormData((prev) => ({
      ...prev,
      email: email,
      username: username,
      password: password,
      phone: phone,
    }))
    try {
      const userSetup = await registerUser(email, password);
      await createUserHandle(userSetup.user.uid, email, formData.firstName, formData.lastName, username, formData.country, phone);
      navigate('/application/dashboard');
    } catch (e) {
      const message = errorHandler(e);
      console.error(e)
      toast.error(message);
    }
  }

  const handleBackBtnClick = () => {
    setStage(0);
  }

  return (
    <div>
      {stage === 0 && <SignUpPartOne stageOneFormData={stageOneFormData} />}
      {stage === 1 && <SignUpPartTwo stageTwoFormData={stageTwoFormData} handleBackBtnClick={handleBackBtnClick} />}
    </div>
  );
}

export default SignUp;
