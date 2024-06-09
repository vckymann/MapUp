import PropTypes from "prop-types"
import { CircleMarker, Popup } from "react-leaflet"

function CircleLocationMarker ({ coordinates }) {
    
    return  (
        <CircleMarker center={[coordinates.lat, coordinates.lng]} radius={8} color="blue" fillColor="red" fillOpacity={1}>
        <Popup>You are here</Popup>
        </CircleMarker >
    )
}

export default CircleLocationMarker

CircleLocationMarker.propTypes = {
    coordinates: PropTypes.object
}