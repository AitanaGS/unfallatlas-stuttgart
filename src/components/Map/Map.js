'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import L, { Icon, divIcon } from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../leaflet-heat/leaflet-heat';

function Map({ data, setVisData }) {
  // here
  const mapRef = useRef(null);

  // here
  const calculateVisibleData = (map, markerClusterGroup) => {
    const bounds = map.getBounds();
    const visibleMarkersData = [];

    markerClusterGroup.eachLayer((marker) => {
      const markerLatLng = marker.getLatLng();

      if (bounds.contains(markerLatLng)) {
        visibleMarkersData.push(marker.options.data);
      }
    });

    console.log('run', visibleMarkersData);

    return visibleMarkersData;
  };

  useEffect(() => {
    // here
    // const map = L.map('map', {
    //   preferCanvas: true, // Enable canvas rendering
    // }).setView([48.7758, 9.1829], 15);

    // here
    const map = L.map(mapRef.current, {
      preferCanvas: true, // Enable canvas rendering
    }).setView([48.7758, 9.1829], 11); //13

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
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html: '<b>' + cluster.getChildCount() + '</b>',
          className: 'cluster',
        });
      },
    });

    // Check if necessary: Create a mapping of marker ID to marker instance
    // const markerIdToMarker = {};

    var points = [];

    data.forEach((d) => {
      points.push([d.lat, d.lon]);
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

    var heat = L.heatLayer(points, {
      maxZoom: 15, // 10
    }).addTo(map);

    map.addLayer(markerClusterGroup);

    // here
    setVisData(calculateVisibleData(map, markerClusterGroup));

    const onMoveEnd = () => {
      // here
      // const bounds = map.getBounds();
      // const visibleMarkersData = [];

      // markerClusterGroup.eachLayer((marker) => {
      //   const markerLatLng = marker.getLatLng();

      //   // Check if the marker's LatLng is within the visible bounds
      //   if (bounds.contains(markerLatLng)) {
      //     visibleMarkersData.push(marker.options.data);
      //   }
      // });

      // console.log('Visible Markers Data:', visibleMarkersData);
      // setVisData(visibleMarkersData);

      // here
      setVisData(calculateVisibleData(map, markerClusterGroup));
    };

    const debouncedOnMoveEnd = L.Util.throttle(onMoveEnd, 500);
    map.on('moveend', debouncedOnMoveEnd);

    return () => {
      map.off('moveend', debouncedOnMoveEnd);
      map.remove();
    };
  }, [data, setVisData]);

  const customIcon = new L.Icon({
    // iconUrl: require('/leaflet-icons/marker-icon-2x.png'),
    iconUrl: '/leaflet-icons/marker-icon-2x.png',
    iconSize: [38, 45], // [38, 38]
  });

  // const customIcon = new L.Icon({
  //   iconUrl: '/leaflet-icons/marker-icon-2x.png',
  //   shadowUrl: '/leaflet-icons/marker-shadow.png',
  //   iconSize: [38, 95],
  //   iconAnchor: [22, 94],
  //   popupAnchor: [-3, -76],
  //   shadowSize: [68, 95],
  //   shadowAnchor: [22, 94],
  // });

  // TODO: check if markerIdToMarker is necessary
  // TODO: check if usememo for markers
  // TODO: check if const map = useMemo(createMap, [])

  return <div id="map" className="leaflet-map" ref={mapRef}></div>;
}

export default Map;
