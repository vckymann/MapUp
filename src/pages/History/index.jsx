import useHistoryPage from '../../hooks/PageHooks/History/index';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {AdapterDayjs }from '@mui/x-date-pickers/AdapterDayjs';
import { Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';

dayjs.locale('de');

const History = ({open, onClose}) => {

  const { handleDateChange, handleOk, shouldDisableDate, selectedDate,} = useHistoryPage();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="history-modal-title">
    <Box
     sx={{
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       width: 400,
       bgcolor: 'background.paper',
       border: '2px solid black',
       boxShadow: 24,
       p: 4,
     }}>
    <button className='text-2xl mb-6 font-semibold' onClick={() => onClose()}>X</button>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <StaticDatePicker
        label="Trip Calendar"
        className='border-2 border-black'
        value={selectedDate}
        onChange={handleDateChange}        
        onAccept={handleOk}
        shouldDisableDate={shouldDisableDate}

        slotProps={{actionBar: {
          actions: ['accept'],sx: {
            '& .MuiButtonBase-root': {
              '&:first-of-type': {
                backgroundColor: '#3498DB',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#2980B9',
                },
              },
            },        
          }
        }}}        
        disableHighlightToday                          
        />      
    </LocalizationProvider>
    </Box>
    </Modal>
  );
};

export default History;

history.PropTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}


