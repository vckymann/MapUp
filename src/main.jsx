import { createBrowserRouter , RouterProvider} from "react-router-dom"
import { Provider } from "react-redux";
import  { store,persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthLayout from "./components/AuthLayout.jsx";
import Home  from "./pages/Home/index.jsx";
import PastTrips from "./pages/PastTrips/index.jsx";
import Auth from "./pages/Auth/index.jsx";
import 'leaflet/dist/leaflet.css'
import './styles/index.css'
import 'leaflet-routing-machine'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [      
      {
        path: '/',
        element: (
          <AuthLayout authentication={false} >
            <Home />
          </AuthLayout>
        )
      },
      {
        path:'/auth',
        element: (
          <AuthLayout authentication={false} route="/auth">
            <Auth />
          </AuthLayout>
        )
      }
      ,
      {
        path: '/history/:date',
        element: (
          <AuthLayout authentication>
          <PastTrips />
          </AuthLayout>
        )        
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <RouterProvider router={router} />
  </PersistGate>
  </Provider>
)
