import { useDispatch } from "react-redux";
import { resetTrip } from "../../store/slices/trackSlice";
function useCancelButton() {

    const dispatch = useDispatch();

    const handleCancelButtonClick = () => {
        dispatch(resetTrip());
    }

    return {
      handleCancelButtonClick
    }
}

export default useCancelButton
