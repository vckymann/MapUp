/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function AuthLayout({
    authentication = true,
    children,
    route
}) {

    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/auth")
        } else if(!authentication && authStatus !== authentication){
            navigate(route);
        }
        setLoader(false);
    }, [authStatus, authentication, navigate, route]);



  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default AuthLayout;
