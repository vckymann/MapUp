import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../../supabase/services/auth";
import databaseService from "../../../supabase/services/database";
import { accountCreated } from "../../../store/slices/authSlice";
function useSignUp () {

    const {register, handleSubmit, reset} = useForm();

    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const signUp = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if(userData !== "User already registered") {
                const userCreateError = await databaseService.createUser(data);
                if(!userCreateError) {
                    dispatch(accountCreated());
                    reset();
                } else {
                    setError(userCreateError);
                }
                } else {
                    setError(userData);
                }
        } catch (error) {
            setError(error.message);
        }
    }

    return {
        signUp,
        error,
        handleSubmit,
        register
    }

}

export default useSignUp;