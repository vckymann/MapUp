import useLogin from "../../hooks/PageHooks/Auth/loginHook";
function Login ( ) {

    const {logIn, error, showPassword, setShowPassword, handleSubmit, register} = useLogin();
    
    return (
        <>     
        <form onSubmit={handleSubmit(logIn)} className="rounded-lg border bg-black shadow-sm p-4 px-12">
            <div className="flex flex-col p-6 space-y-1">
                <h3 className=" font-semibold tracking-tight text-2xl">Log in to your account</h3>
            </div>
            <div className="p-6 pt-0 grid gap-4">
                <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none">Email</label>
                    <input name={"email"} label={"email"} type={"email"} {...register("email",{required: true})} className="flex h-10 w-full rounded-md border-green-500 border-input px-3 py-2 text-sm text-black" id="email" placeholder="m@example.com" autoComplete="on"/>
                </div>
                <div className="grid gap-2">
                        <label className="text-sm font-medium leading-none">Password</label>
                        <input name={"password"} label={"password"} type={showPassword ? "text" : "password"} {...register("password",{required: true})} className="flex h-10 w-full rounded-md border-green-500 border-input px-3 py-2 text-sm text-black" id="password" placeholder="Enter your password"/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm underline underline-offset-2">Show Password</button>
                </div>
            </div>        
            <div className="flex flex-col items-center gap-y-6 p-6 pt-0">
                <button type={"submit"} className="inline-flex bg-green-400 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-black disa hover:bg-primary/90 h-10 px-4 py-2 w-full">Log in</button>
                {error && <p className="text-red-500 text-center">{error}</p>}            
            </div>
        </form>            
        </>
    )
}

export default Login;