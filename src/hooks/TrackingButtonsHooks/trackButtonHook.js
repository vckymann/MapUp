import calculateDistance from "../UtilsHooks/totalDistancecalc";
import useAppselectors from "../../store/selectors";
import { useDispatch} from "react-redux";
import { startTracking, updateCoordinates, stopTracking } from "../../store/slices/trackSlice";
import { useMap } from 'react-leaflet';
import { updateMapCenter } from "../../store/slices/mapSlice";
import { useNavigate } from "react-router-dom";
function useTrackButton () {
    
    const { tracking,saveBtn, status, movementCoordinates } = useAppselectors();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const endTime = new Date().toLocaleTimeString();
    
    function getCurrentDate() {
        const currentDate = new Date();
        return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    }
    
    function onLocationFound(e) {

        const { lat, lng } = e.latlng;

        dispatch(updateCoordinates({ lat, lng }));
        dispatch(updateMapCenter({lat,lng}));        
    }

    function onLocationError() {
        alert("Error while retrieving Location. Please enable location services and try again.");
    }
    
    const map = useMap();
    
    const handleTrackButtonClick = async () => {
        if (tracking) {

            const { lat:firstLat, lng:firstLng } = movementCoordinates[0];
            const { lat:lastLat, lng:lastLng } = movementCoordinates[movementCoordinates.length - 1]

            const tripDistance = calculateDistance(firstLat,firstLng,lastLat,lastLng);
            const distanceTravelled = (tripDistance).toFixed(2);

            dispatch(stopTracking({endTime, distanceTravelled}));

            map.stopLocate(); 

        } else if (status === true) {

            dispatch(startTracking({
                date:getCurrentDate(),
                startTime: new Date().toLocaleTimeString()
            }))

            map.locate({
                watch: true,
                setView: true,
                enableHighAccuracy: true,
            }).on('locationfound', onLocationFound);

            map.on('locationerror', onLocationError);

        } else {
            navigate("/auth");
        }
    }


    return {
        handleTrackButtonClick,
        tracking,
        saveBtn
    }

}

export default useTrackButton;