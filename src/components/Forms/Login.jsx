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
                    <input name={"email"} label={"email"} type={"email"} {...register("email",{required: true})} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-black" id="email" placeholder="m@example.com" autoComplete="on"/>
                </div>
                <div className="grid gap-2 relative">
                        <label className="text-sm font-medium leading-none">Password</label>
                        <input name={"password"} label={"password"} type={showPassword ? "text" : "password"} {...register("password",{required: true})} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-black" id="password" placeholder="Enter your password"/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm underline underline-offset-2 absolute right-1 top-7">{showPassword ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye p-1 hover:bg-[#80808067] rounded-md"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle className="fill-green-500 stroke-white" cx="12" cy="12" r="3"/></svg> : 
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide hover:bg-[#80808067] rounded-md p-1 lucide-eye`}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg> 
                    }</button>
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