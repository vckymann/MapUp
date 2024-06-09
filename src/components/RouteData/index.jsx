import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState, forwardRef } from 'react';
import { FloatingButton } from '../FloatingButton';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({data}) {
    const [open, setOpen] = useState(false);
    if (!data) return null

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className='leaflet-top leaflet-right top-16'>
        <FloatingButton color={"primary"} onClick={handleClickOpen}> 
            <InfoOutlinedIcon />
        </FloatingButton>      
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Journey
            </Typography>            
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Total Distance" secondary={`${(data.totalDistance / 1000).toFixed(2)} km`} />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Approximate Time"
              secondary={`${Math.floor((data.totalTime)/3600)} hours and ${Math.floor((data.totalTime)% 3600 / 60)} minutes`}
            />
          </ListItemButton>
        </List>
      </Dialog>
    </>
  );
}

FullScreenDialog.propTypes = {
  data: PropTypes.object
};

