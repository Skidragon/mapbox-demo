import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import './App.css';

export default function App() {
  const [viewport, setViewport] = useState({
    width: '1000px',
    height: '95vh',
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8
  });

  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/brilles/cjut8h6nagdt61fo283ra2oof"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        DEMO MAP
      </ReactMapGL>
    </div>
  );
}
