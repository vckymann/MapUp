import useSavebtn from "../../hooks/TrackingButtonsHooks/saveButtonHook"
import useTrackButton from "../../hooks/TrackingButtonsHooks/trackButtonHook"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import CancelButtonIconOutlined from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import useAppselectors from "../../store/selectors";
import useCancelButton from "../../hooks/TrackingButtonsHooks/cancelButtonHook";
import { useMediaQuery } from '@mui/material';

function TrackingButtons() {
    
  const { isSearching } = useAppselectors()

  const { tracking, handleTrackButtonClick, saveBtn } = useTrackButton()
  const { handleSaveClick, error } = useSavebtn()
  const { handleCancelButtonClick } = useCancelButton()

  const isMobile = useMediaQuery('(max-width: 1027px)');

  return (  
    <>
    {!isSearching && !isMobile &&
      <Box sx={{ '& > :not(style)': { m: 1, color: "white"}}}>
      <Fab disabled={saveBtn} className="absolute top-[3rem] left-20" sx={{bgcolor:"#3498DB", ":hover": { bgcolor: "rgba(52, 152, 219, 0.8)",  }}} onClick={handleTrackButtonClick} variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        {tracking ? "Stop Tracking" : "Start Tracking"}
      </Fab>

    {saveBtn && !error ?
      <div className="leaflet-top leaflet-right top-12">
        <Fab className="right-2" onClick={handleSaveClick} variant="extended">
          <SaveOutlinedIcon sx={{ mr: 1, color: "#3498DB", }} />
          Save
        </Fab>
        <Fab className="" onClick={handleCancelButtonClick} variant="extended">
          <CancelButtonIconOutlined sx={{ mr: 1, color: "Red" }} />
          Cancel
        </Fab>
      </div>
         : 
      <p>{error}</p>}
      </Box>}
    </>  
  )
}

export default TrackingButtons
