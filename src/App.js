import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import userLocationURL from './userLocation.svg';
import './App.css';

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82]
});

function App() {
  const [position, setPosition] = useState({
    lat: 45,
    lng: -112
  });
  const [zoom, setZoom] = useState(2);
  let [access, setAccess] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      setPosition({
        lat: latitude.toFixed(1),
        lng: longitude.toFixed(1)
      });
      setZoom(5);
      setAccess(true);
    });
  }, [position]);

  return (
    <Map className="map" center={position} zoom={zoom} >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        access ?
          <Marker position={position} icon={myIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> : ''
      }
    </Map>
  );
}

export default App;
