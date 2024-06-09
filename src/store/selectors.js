import { useSelector } from "react-redux";

function useAppselectors() {

const status = useSelector((state) => state.auth.status);
const isNewUser = useSelector((state) => state.auth.isNewUser);
const loggedInUserId = useSelector((state) => state.auth.loggedInUserId);

const isSearching = useSelector((state) => state.map.isSearching);
const isRouting = useSelector((state) => state.map.isRouting);
const mapCenter = useSelector((state) => state.map.center);
const destinationCoordinates = useSelector((state) => state.map.destinationCoordinates);
const mapZoomLevel = useSelector((state) => state.map.mapZoomLevel);

const currentTrip = useSelector((state) => state.track.currentTrip);
const tracking = useSelector((state) => state.track.tracking);
const saveBtn = useSelector((state) => state.track.saveBtn);
const error = useSelector((state) => state.track.error);
const movementCoordinates = useSelector((state) => state.track.currentTrip.coordinates);

return {
    status,
    isNewUser,
    loggedInUserId,
    isSearching,
    isRouting,
    mapCenter,
    destinationCoordinates,
    mapZoomLevel,
    currentTrip,
    tracking,
    saveBtn,
    error,
    movementCoordinates
}

}

export default useAppselectors


