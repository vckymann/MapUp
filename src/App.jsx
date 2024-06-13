import { Outlet } from "react-router-dom";
import { inject } from "@vercel/analytics";
function App() {

  inject();

  return (
    <>   
    <Outlet />
    </>
  )
}

export default App