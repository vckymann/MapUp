import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useAppselectors from '../../store/selectors';
import SearchIcon from '@mui/icons-material/Search';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import useTrackButton from '../../hooks/TrackingButtonsHooks/trackButtonHook';
import useSavebtn from '../../hooks/TrackingButtonsHooks/saveButtonHook';
import useCancelButton from '../../hooks/TrackingButtonsHooks/cancelButtonHook';
import useNavigationUi from '../../hooks/navigationUiHook';
import History from '../../pages/History';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/slices/authSlice';
import { Link } from 'react-router-dom';
import {Input, ListItem, SvgIcon, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  
  const {status,tracking,saveBtn} = useAppselectors();
  
  const { 
    isSearching,search,setSearch,handleSearch,
    toDirections,setToDirections,handleGetDirections,
    handleKeyPress1,handleKeyPress2
  }  = useNavigationUi()
  
  const { handleTrackButtonClick} = useTrackButton()
  const { handleSaveClick, error } = useSavebtn()
  const { handleCancelButtonClick } = useCancelButton()
  
  const isMobile = useMediaQuery('(max-width: 1027px)');
  
  const [open, setOpen] = useState(false);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {    
    dispatch(userLogout());
  }

  const DrawerList = (
    <Box className='' sx={{ width: 250 }} role="presentation">
        <ListItemButton onClick={() => setOpen(false)}>
            <ListItemText primary="X" />
        </ListItemButton>        
        <Divider />
    { isMobile &&
      <>
        { !isSearching && 
          <ListItemButton disabled={saveBtn} onClick={() => {
            handleTrackButtonClick()
          }}>
            <ListItemText primary={tracking ? "Stop Tracking" : "Start Tracking"} />
          </ListItemButton>
        }

        { saveBtn && !error ? (
            <>
            <ListItemButton onClick={() => {
              handleSaveClick()
              setOpen(false)
            }}>
              <ListItemText primary="Save" />
            </ListItemButton>

            <ListItemButton onClick={() => {
              handleCancelButtonClick()
                setOpen(false)
            }}>
              <ListItemText primary="Cancel" />
            </ListItemButton>
            </>
            ) : null            
          }

          { !tracking && !saveBtn &&
            <ListItem>
              <Input onKeyDown={(e) => {handleKeyPress1(e)}} placeholder={isSearching ? "from" : "Enter a place to search"} value={search} onChange={(e) => setSearch(e.target.value)} label="Search" type="text" />
                <div onClick={() => {
                handleSearch()
                setOpen(false)
              }}>
                <SvgIcon component={SearchIcon} />
              </div>  
            </ListItem>
            }

          { isSearching && 
            <ListItem>           
              <Input onKeyDown={(e) => {handleKeyPress2(e)}} placeholder={"To"} value={toDirections} onChange={(e) => setToDirections(e.target.value)} label="Search" type="text" />
               <div onClick={() => {
                  handleGetDirections()
                  setOpen(false)
                }}>
                  <SvgIcon component={AirlineStopsIcon} />
               </div>  
            </ListItem> 
          }
      </>
    }

        <History open={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

        <ListItemButton onClick={() => {
          status ? setIsHistoryOpen(true) : navigate("/auth")
        }}>
          <ListItemText primary="History" />
        </ListItemButton>
      
      { status ? (
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItemButton>
        ): (
        <Link to="/auth">
          <ListItemButton onClick={() => setOpen(false)}>
            <ListItemText primary="Login" />
          </ListItemButton>
        </Link>
        )}      
    </Box>
  );

  return (
    <div className='flex justify-between w-full leaflet-top nvbar bg-white h-10 border-b-[1px] border-gray-400'>
      <button className='p-1' onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 24 24" fill="none" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
      <p className='text-[#3498DB] text-2xl pr-3 pt-1'>MapUp</p>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
