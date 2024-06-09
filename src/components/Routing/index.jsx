import L from 'leaflet';
import FullScreenDialog from '../RouteData/index.jsx';
import useAppselectors from '../../store/selectors.js';
import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';

const RoutingControl = () => {

    const map = useMap();

    const { mapCenter,destinationCoordinates } = useAppselectors();
    
    const {lat, lng} = mapCenter;
    const {gLat, gLng} = destinationCoordinates;

    const [routeInfo, setrouteInfo] = useState(null);

  useEffect(() => {
    if (!map) return;


    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng( lat, lng), // Starting point
        L.latLng(gLat,gLng) // Ending point
      ],
      routeWhileDragging: true,
      show: false, // Hide the default routing controls
      createMarker: function () {
        return null; // Disable default markers
      }
    }).addTo(map);

    routingControl.on('routesfound', function (e) {
      setrouteInfo(e.routes[0].summary);
    })

    return () => {
      // Cleanup
      routingControl.remove();
    };
  }, [map, lat, lng, gLat, gLng]);

  return (
    <>
    <Marker position={[gLat, gLng]} />
    <Marker position={[lat, lng]} />
    <FullScreenDialog data={routeInfo}/>
    </>

  )
};

export default RoutingControl;
