import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function FlyAnimation({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) {
          map.flyTo(coords, map.getZoom());
        }
      }, [coords, map]);

    return null
}

export default FlyAnimation;

FlyAnimation.propTypes = {
  coords : PropTypes.array,
}
