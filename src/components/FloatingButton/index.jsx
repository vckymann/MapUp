import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export function FloatingButton({onClick,className,children,color}) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>      
      <Fab className={className} onClick={onClick} color={color} aria-label="add">
        {children}
      </Fab>
    </Box>
  );
}

FloatingButton.propTypes = {
  onClick : PropTypes.func,
  className : PropTypes.string,
  children : PropTypes.node,
  color : PropTypes.string
}