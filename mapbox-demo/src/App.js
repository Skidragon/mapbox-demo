import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import * as earthquake from './data/earthquakes.json';
import { MapMarker } from 'styled-icons/fa-solid/MapMarker';
import { Moon } from 'styled-icons/boxicons-regular/Moon';
import { Moon as Moon2 } from 'styled-icons/boxicons-solid/Moon';
import styled from 'styled-components';
import * as moment from 'moment';
import './App.css';

export default function App() {
  const RedMarker = styled(MapMarker)`
    height: 20px;
    width: 20px;
    color: red;
  `;

  const LightMoon = styled(Moon)`
    height: 35px;
    width: 35px;
    color: black;
  `;

  const DarkMoon = styled(Moon2)`
    height: 35px;
    width: 35px;
    color: black;
  `;

  const [viewport, setViewport] = useState({
    width: '1000px',
    height: '95vh',
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8
  });

  const [selectedQuake, setSelectedQuake] = useState(null);
  const [darkmode, setDarkmode] = useState(null);

  const isDarkmode = () => {
    if (darkmode) {
      setDarkmode(null);
    } else {
      setDarkmode(true);
    }
  };

  return (
    <div className="map">
      <div className="nav">
        <h3>Demo App 4/23/2019 </h3>
        <button onClick={isDarkmode}>
          {darkmode ? <DarkMoon /> : <LightMoon />}
        </button>
      </div>

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={
          darkmode
            ? 'mapbox://styles/brilles/cjut88v0g5xkv1fnmiryudax7'
            : 'mapbox://styles/brilles/cjut8h6nagdt61fo283ra2oof'
        }
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
              className="marker"
              onClick={() => {
                setSelectedQuake(quake);
              }}
            >
              <RedMarker />
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
            <h4>{selectedQuake.properties.place}</h4>
            <p>Magnitude: {selectedQuake.properties.mag}</p>
            <p>Time: {moment(selectedQuake.properties.time).fromNow()}</p>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
