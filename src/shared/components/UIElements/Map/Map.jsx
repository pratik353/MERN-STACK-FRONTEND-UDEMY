import React, { useEffect, useRef } from 'react';
import './Map.css';

const Map = (props) => {
    const mapRef = useRef();
    const {center, zoom} = props;

    // USING GOOGLE MAP SDK
    useEffect(()=>{
        const map = new window.google.maps.Map(mapRef.current,{
            center: center,
            zoom: zoom,
        });
    
        // create marker center of the map
        new window.google.maps.Marker({position: center, map: map})
    },[center, zoom]);

  return (
    <div ref={mapRef} className={`map ${props.className}`}  style={props.style}>
        
    </div>
  )
}

export default Map