import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin, getUserId } from "../../../store/slices/authSlice";
import authService from "../../../supabase/services/auth";
import databaseService  from "../../../supabase/services/database";

function useLogin() {
    
    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const clearError = useCallback(() => {
      setError("");  
    }, []);

    const logIn = useCallback(async(data) => {
        clearError();
        try {
            const session = await authService.login(data);
            if (session && session.user) {
                dispatch(userLogin(session));
                const userId = await databaseService.getUser(session.user.email);
                if (userId) {
                    dispatch(getUserId(userId));
                    navigate("/");
                }
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            console.log("Error in useLogin hook", error);
            setError("An error occurred, please try again later");
        }
    },[clearError, dispatch, navigate]);

    return {
        register,
        handleSubmit,
        logIn,
        error,
        showPassword,
        setShowPassword,
        clearError,
    };
}

export default useLogin;
