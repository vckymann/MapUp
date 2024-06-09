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
                        <input name={"name"} placeholder={"Enter your Name"} label={"Name"} type={"text"} {...register("name",{required: true})} className="flex h-10 w-full rounded-md border-green-500 bg-background px-3 py-2 text-sm text-black" id="name" />
                    <label className="text-white text-sm font-medium leading-none" htmlFor="email">Email</label>
                        <input name={"email"} label={"Email"} type={"email"} {...register("email",{required: true})} className=" flex h-10 w-full rounded-md border-green-500 px-3 py-2 text-sm text-black" id="email" placeholder="m@example.com"/>
                </div>
                <div className="grid gap-2">
                    <label className="text-sm text-white font-medium leading-none" htmlFor="password">Password</label>
                        <input name={"password"} label={"Password"} type={showPassword ? "text" : "password"} {...register("password",{required: true})} className="flex h-10 w-full rounded-md border-green-500 px-3 py-2 text-sm text-black" id="password" placeholder="Enter your password"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm underline underline-offset-2">Show Password</button>
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