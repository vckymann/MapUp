import useSignUp from "../../hooks/PageHooks/Auth/signupHook";
import { useState } from "react";

function SignUpUser () {

    const {signUp, error, handleSubmit, register} = useSignUp();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={handleSubmit(signUp)} className="rounded-lg border bg-black shadow-sm p-4 px-12">
            <div className="flex flex-col p-6 space-y-1">
                <h3 className="text-white font-semibold tracking-tight text-2xl">Create an account</h3>
                </div>
            <div className="p-6 px-0 pt-0 grid gap-4">
                <div className="grid gap-2">
                    <label className="text-sm text-white font-medium leading-none" htmlFor="name">Name</label>
                        <input name={"name"} placeholder={"Enter your Name"} label={"Name"} type={"text"} {...register("name",{required: true})} className="flex h-10 w-full rounded-md border-2 bg-black px-3 py-2 text-sm text-white" id="name" />
                    <label className="text-white text-sm font-medium leading-none" htmlFor="email">Email</label>
                        <input name={"email"} label={"Email"} type={"email"} {...register("email",{required: true})} className=" flex h-10 w-full rounded-md border-2 bg-black px-3 py-2 text-sm text-white" id="email" placeholder="m@example.com"/>
                </div>
                <div className="grid gap-2 relative">
                    <label className="text-sm text-white font-medium leading-none" htmlFor="password">Password</label>
                        <input name={"password"} label={"Password"} type={showPassword ? "text" : "password"} {...register("password",{required: true})} className="flex h-10 w-full rounded-md border-2 bg-black px-3 py-2 text-sm text-white" id="password" placeholder="Enter your password"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm underline underline-offset-2 absolute right-1 top-7">{showPassword ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye p-1 hover:bg-[#80808067] rounded-md"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle className="fill-green-500 stroke-white" cx="12" cy="12" r="3"/></svg> : 
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide hover:bg-[#80808067] rounded-md p-1 lucide-eye`}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg> 
                    }</button>
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-6 p-6 pt-0">
                <button type={"submit"} className="inline-flex bg-green-400 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full text-black">Sign Up</button>
            {error !== "" && <p className="text-red-500 text-center">{error}</p>}            
            </div>
        </form>
    )

}

export default SignUpUser