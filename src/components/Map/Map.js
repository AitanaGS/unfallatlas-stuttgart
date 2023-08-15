'use client';
import React, { useEffect, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

function Map({ data, setVisData }) {
  useEffect(() => {
    const map = L.map('map', {
      preferCanvas: true, // Enable canvas rendering
    }).setView([48.7758, 9.1829], 13);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    const markerClusterGroup = L.markerClusterGroup({
      chunkedLoading: true, // Enable chunked loading
      disableClusteringAtZoom: 17, // Disable clustering at higher zoom levels
    });

    // Check if necessary: Create a mapping of marker ID to marker instance
    // const markerIdToMarker = {};

    data.forEach((d) => {
      // const marker = L.marker([d.lat, d.lon]);
      const marker = L.marker([d.lat, d.lon], {
        icon: customIcon, // Set the custom icon for each marker
      });
      marker.options.data = d;
      markerClusterGroup.addLayer(marker);
      // markerIdToMarker[d.dataid] = marker; // check if necessary (see above)

      // Add click event to show popup with address
      marker.on('click', () => {
        L.popup()
          .setLatLng(marker.getLatLng())
          .setContent(d.address)
          .openOn(map);
      });
    });

    map.addLayer(markerClusterGroup);

    const onMoveEnd = () => {
      const bounds = map.getBounds();
      const visibleMarkersData = [];

      markerClusterGroup.eachLayer((marker) => {
        const markerLatLng = marker.getLatLng();

        // Check if the marker's LatLng is within the visible bounds
        if (bounds.contains(markerLatLng)) {
          visibleMarkersData.push(marker.options.data);
        }
      });

      console.log('Visible Markers Data:', visibleMarkersData);
      setVisData(visibleMarkersData);
    };

    const debouncedOnMoveEnd = L.Util.throttle(onMoveEnd, 500);
    map.on('moveend', debouncedOnMoveEnd);

    return () => {
      map.off('moveend', debouncedOnMoveEnd);
      map.remove();
    };
  }, [data, setVisData]);

  const customIcon = new L.Icon({
    iconUrl: '/leaflet-icons/marker-icon-2x.png',
    shadowUrl: '/leaflet-icons/marker-shadow.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  // TODO: check if markerIdToMarker is necessary
  // TODO: check if usememo for markers
  // TODO: check if const map = useMemo(createMap, [])

  return <div id="map" className="leaflet-map"></div>;
}

export default Map;
