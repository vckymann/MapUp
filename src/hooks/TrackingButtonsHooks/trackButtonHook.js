import calculateDistance from "../UtilsHooks/totalDistancecalc";
import useAppselectors from "../../store/selectors";
import { useDispatch} from "react-redux";
import { startTracking, updateCoordinates, stopTracking } from "../../store/slices/trackSlice";
import { useMap } from 'react-leaflet';
import { updateMapCenter } from "../../store/slices/mapSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function useTrackButton () {
    
    const { tracking,saveBtn, userId, status, movementCoordinates } = useAppselectors();    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const endtime = new Date().toLocaleTimeString();
    const [locationError, setLocationError] = useState(false);
    
    function getCurrentDate() {
        const currentDate = new Date();
        return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    }
    
    function onLocationFound(e) {

        if(locationError) return;

        const { lat, lng } = e.latlng;

        dispatch(updateCoordinates({ lat, lng }));
        dispatch(updateMapCenter({lat,lng}));        
    }

    function onLocationError() {
        alert("Error while retrieving Location. Please enable location services and try again.");

        setLocationError(true);
    }
    
    const map = useMap();
    
    const handleTrackButtonClick = async () => {
        if (tracking) {

            const { lat:firstLat, lng:firstLng } = movementCoordinates[0];
            const { lat:lastLat, lng:lastLng } = movementCoordinates[movementCoordinates.length - 1];

            const distancetravelled = calculateDistance(firstLat,firstLng,lastLat,lastLng);

            dispatch(stopTracking({endtime, distancetravelled}));

            map.stopLocate(); 

        } else if (status === true) {

            setLocationError(false);

            dispatch(startTracking({
                userId,
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