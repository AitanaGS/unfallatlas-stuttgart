'use client';
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet-quadtree';
import QuadtreeLayer from '../QuadtreeLayer';
// console.log(process.env.browser);

// let RL = false;
// let MapContainer = false;
// let TileLayer = false;
// let Marker = false;
// let Popup = false;
// if (process.env.BROWSER) {
//   RL = require('react-leaflet');
//   MapContainer = RL.MapContainer;
//   TileLayer = RL.TileLayer;
//   Marker = RL.Marker;
//   Popup = RL.Popup;
// }

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  // iconUrl: require('./placeholder.png'),
  // iconUrl: './placeholder.png',
  iconSize: [38, 38], // size of the icon
});

function Map({ data, setVisData }) {
  function onClick(e, d) {
    console.log(d);
  }
  console.log('render map');

  return (
    <div>
      {/* {process.env.BROWSER && ( */}
      <MapContainer center={[48.7758, 9.1829]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
          // preferCanvas={true}
        />
        {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        maxZoom={20}
      /> */}
        <QuadtreeLayer data={data} setVisData={setVisData} />
        {/* <QuadtreeProvider data={data} /> */}
        <MarkerClusterGroup chunkedLoading>
          {data.map((d) => (
            <Marker
              position={[+d.lat, +d.lon]}
              icon={customIcon}
              key={d.dataid}
              eventHandlers={{
                click: (e) => onClick(e, d),
              }}
            >
              <Popup>{d.address}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      {/* )} */}
    </div>
  );
}

export default Map;
