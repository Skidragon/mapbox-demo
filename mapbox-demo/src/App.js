import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import * as earthquake from './data/earthquakes.json';
import { PrimitiveDot } from 'styled-icons/octicons/PrimitiveDot';
import styled from 'styled-components';
import './App.css';

export default function App() {
  const RedDot = styled(PrimitiveDot)`
    height: 20px;
    width: 20px;
    color: red;
  `;

  const [viewport, setViewport] = useState({
    width: '1000px',
    height: '95vh',
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8
  });

  const [selectedQuake, setSelectedQuake] = useState(null);

  return (
    <div className="map">
      <h3>Demo App for 4/23/2019 </h3>
      <p />
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/brilles/cjut8h6nagdt61fo283ra2oof"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {earthquake.features.map(quake => (
          <Marker
            key={quake.id}
            latitude={quake.geometry.coordinates[1]}
            longitude={quake.geometry.coordinates[0]}
          >
            <button
              onClick={() => {
                setSelectedQuake(quake);
              }}
            >
              <RedDot />
            </button>
          </Marker>
        ))}

        {selectedQuake ? (
          <Popup
            latitude={selectedQuake.geometry.coordinates[1]}
            longitude={selectedQuake.geometry.coordinates[0]}
            onClose={() => {
              setSelectedQuake(null);
            }}
          >
            <h4>Place: {selectedQuake.properties.place}</h4>
            <p>Magnitude: {selectedQuake.properties.mag}</p>
            <p>Time: {}</p>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
