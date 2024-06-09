import { useDispatch } from "react-redux";
import databaseService from "../../supabase/services/database";
import { resetTrip } from "../../store/slices/trackSlice";
import { useState } from "react";
import useAppselectors from "../../store/selectors";

function useSavebtn () {

    const { currentTrip, loggedInUserId } = useAppselectors();

    const dispatch = useDispatch();

    const [error, setError] = useState(null);

    const handleSaveClick = async () => {
        const saveDataError = await databaseService.storeTrip(currentTrip,loggedInUserId);
            if(saveDataError) {
                setError(saveDataError);
            } else {
                dispatch(resetTrip())
                alert("Trip saved successfully");
            }
    }

    return {
        handleSaveClick,
        error
    }
}

export default useSavebtn;