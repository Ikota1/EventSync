import SignUpPartTwo from "./SignUpPartTwo";
import SignUpPartOne from "./SignUpPartOne";
import { useState } from "react";
import { registerUser } from "../../../services/auth.service";
import { createUserHandle } from "../../../services/user.services";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    password: ''
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

  const stageTwoFormData = async (email, password) => {
    setFormData((prev) => ({
      ...prev,
      email: email,
      password: password,
    }))
    try {
      const userSetup = await registerUser(email, password)
      await createUserHandle(userSetup.user.uid, email, formData.firstName, formData.lastName, formData.country)
      navigate('/application/dashboard');
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  const handleBackBtnClick = () => {
    setStage(0)
  }

  return (
    <div>
      {stage === 0 && <SignUpPartOne stageOneFormData={stageOneFormData} />}
      {stage === 1 && <SignUpPartTwo stageTwoFormData={stageTwoFormData} handleBackBtnClick={handleBackBtnClick} />}
    </div>

  )
}

export default SignUp;

// handleContinueBtnClick={handleContinueBtnClick}