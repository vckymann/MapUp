import { MapContainer, Marker, Polyline, TileLayer, } from "react-leaflet"
import RoutingControl from "../../components/Routing"
import TrackingButtons from "../../components/TrackingButtons"
import CircleLocationMarker from "../../components/CircleMarker/index"
import FlyAnimation from "../../components/FlyAnimation"
import useAppselectors from "../../store/selectors"
import Navbar from "../../components/Navbar"
import NavigationUi from "../../components/NavigationUI"
import "leaflet/dist/leaflet.css"
import L from 'leaflet';

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.4/dist/images/';

function Home() {

    const { movementCoordinates, mapCenter, mapZoomLevel, isSearching, isRouting } = useAppselectors()

    return (
        <>
        <MapContainer id="map" className="w-full min-h-screen" center={[mapCenter.lat, mapCenter.lng]} zoom={mapZoomLevel} minZoom={4}>
            <TileLayer attribution='Google Maps' url='https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'/>
            { movementCoordinates?.length > 1 && (
                <Polyline weight={10} positions={movementCoordinates.map(coord => [coord.lat, coord.lng])} color="blue" />
            )}

            <FlyAnimation coords={[mapCenter.lat, mapCenter.lng]} />

            <NavigationUi />
            <TrackingButtons />
            <Navbar />
            
            {movementCoordinates.length >= 1 && 
                <CircleLocationMarker coordinates={movementCoordinates[movementCoordinates.length-1]} />
            }

            {isSearching &&            
                <Marker zoom={10} position={[mapCenter.lat, mapCenter.lng]} /> 
            }

            {isRouting &&  
                <RoutingControl /> 
            }

        </MapContainer>         
        </>
  )
}

export default Home
