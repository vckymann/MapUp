import Login from "../../components/Forms/Login"
import SignUp from "../../components/Forms/SignUp"
import useAppSelectors from "../../store/selectors";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux";
import { clearNewUser } from "../../store/slices/authSlice";


function Auth() {
  
  const { isNewUser } = useAppSelectors();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formType, setFormType] = useState("login")

  const clearNewUserMessage = useCallback(() => {
    if(isNewUser) {
        const timer = setTimeout(() => {
            dispatch(clearNewUser());
        }, 3000)
      return () => clearTimeout(timer);
    }
  },[dispatch,isNewUser]);

    useEffect(() => {
      clearNewUserMessage();
    },[clearNewUserMessage]);


  return (
    <>
    {isNewUser && 
    <div className="absolute top-0 w-full bg-green-500 text-center text-xl py-2">Your account has been created successfully please log in</div>
    }
    
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <button className="bg-[#4743439d] mb-4 px-4 py-2 rounded-md" onClick={() => navigate("/")}>Back</button>
        {formType === "login" ? <Login /> : <SignUp />}        
      <button className="bg-[#4743439d] mt-4 px-4 py-2 rounded-md" onClick={() => setFormType(formType === "login" ? "signup" : "login")}>{formType === "login" ? "Sign Up" : "Login"}</button>
    </div>
    </>
  )
}

export default Auth


