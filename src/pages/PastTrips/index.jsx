import usePastTripsPage from "../../hooks/PageHooks/PastTrips"
import { MapContainer, Marker, Polyline, Popup, TileLayer, } from "react-leaflet"
import { useNavigate } from "react-router-dom"
import "leaflet/dist/leaflet.css"

function PastTrips() {

    const { trips, generateColor } = usePastTripsPage();
    
    const totalDistance = trips.reduce((total, trip) => total + trip.distance_travelled, 0);

    const navigate = useNavigate();
    
    return (
    <>
    <MapContainer id="map" className="w-full h-screen" center={ {lat: 50.445210, lng:-104.618}} zoom={12} minZoom={4}>
        <TileLayer attribution='Google Maps' url='https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'/>
        {trips.map((trip, index) => (
            <div key={trip.id}>
            <Polyline weight={5} positions={trip.coordinates.map((coord) => [coord.lat, coord.lng])} color={generateColor(index)} />        
            <Marker position={trip.coordinates[0]}>
                <Popup>Distance Traveled: {trip.distance_travelled} Km <br />Started At {trip.start_time}</Popup>
            </Marker>
            <Marker position={trip.coordinates[trip.coordinates.length - 1]} >
                <Popup>Distance Traveled: {trip.distance_travelled} Km <br />Completed At {trip.end_time}</Popup>
            </Marker>
                </div>
        ))}
        <button onClick={() => {
            navigate("/")
        }} className="px-6 py-2 rounded-md text-[14px] bg-[#3498db] text-white absolute top-2 left-2 z-[999]">Back</button>
        <h3 className="absolute top-3 left-60 z-[999] text-xl font-bold text-nowrap">Total Distance <br /> Travelled: <span className="text-[#3498db]">{totalDistance}</span> Km</h3>
    </MapContainer>     
    </>
  )
}

export default PastTrips
