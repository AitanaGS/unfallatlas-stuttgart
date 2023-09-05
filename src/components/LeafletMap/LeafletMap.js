'use client';
import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from 'react';
import L, { Icon, divIcon } from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../leaflet-heat/leaflet-heat';

const calculateVisibleData = (map, markerClusterGroup) => {
  const bounds = map.getBounds();
  const visibleMarkersData = [];

  markerClusterGroup.eachLayer((marker) => {
    const markerLatLng = marker.getLatLng();

    if (bounds.contains(markerLatLng)) {
      visibleMarkersData.push(marker.options.data);
    }
  });

  // console.log('run', visibleMarkersData);

  return visibleMarkersData;
};

function LeafletMap({
  data,
  setVisData,
  setMapData,
  filteredData,
  filteringMode,
  filterData,
  allFilter,
  filter,
}) {
  // here
  const mapRef = useRef(null);

  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState([48.7758, 9.1829]);
  // const [currentData, setCurrentData] = useState(data);

  // useEffect(() => {
  //   if (filteringMode === 'none') {
  //     setCurrentData(data);
  //   } else {
  //     setCurrentData(filteredData);
  //   }
  // }, [filteringMode, filteredData, data]);

  // const currentData = filteringMode === 'none' ? data : filteredData;

  // // here
  // const calculateVisibleData = (map, markerClusterGroup) => {
  //   const bounds = map.getBounds();
  //   const visibleMarkersData = [];

  //   markerClusterGroup.eachLayer((marker) => {
  //     const markerLatLng = marker.getLatLng();

  //     if (bounds.contains(markerLatLng)) {
  //       visibleMarkersData.push(marker.options.data);
  //     }
  //   });

  //   // console.log('run', visibleMarkersData);

  //   return visibleMarkersData;
  // };

  useEffect(() => {
    // here
    // const map = L.map('map', {
    //   preferCanvas: true, // Enable canvas rendering
    // }).setView([48.7758, 9.1829], 15);

    // const currentData = data.filter((item) => {
    //   if (allFilter) {
    //     return true; // If allFilter is true, return all items
    //   }

    //   // Check each category filter and filter out items accordingly
    //   if (!filter.Fußgänger && item.istfussb) {
    //     return false; // Filter out items where Fußgänger filter is false and istfussb is true
    //   }
    //   if (!filter.Fahrrad && item.istradb) {
    //     return false; // Filter out items where Fahrrad filter is false and istradb is true
    //   }
    //   if (!filter.Kraftrad && item.istkradb) {
    //     return false; // Filter out items where Kraftrad filter is false and istkradb is true
    //   }
    //   if (!filter.PKW && item.istpkwb) {
    //     return false; // Filter out items where PKW filter is false and istpkwb is true
    //   }
    //   if (!filter.Sonstige && item.istsonst2b) {
    //     return false; // Filter out items where Sonstige filter is false and istsonst2b is true
    //   }

    //   // If none of the above conditions match, keep the item
    //   return true;
    // });

    const currentData = filterData(data, allFilter, filter);

    // here
    const map = L.map(mapRef.current, {
      preferCanvas: true, // Enable canvas rendering
    }).setView(center, zoom); // [48.7758, 9.1829] 11 // 13

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

    // here: data
    // const currentData =
    //   filteringMode === 'none' ? data : filteredData;
    // here: data
    //filterData(data, allFilter, filter)
    currentData.forEach((d) => {
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
      maxZoom: zoom, // 15 // 10
    }).addTo(map);

    map.addLayer(markerClusterGroup);

    // here, for zoom below 11 - dont remove
    // setVisData(calculateVisibleData(map, markerClusterGroup));

    const onMoveEnd = (event) => {
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
      // here: data
      // setVisData(calculateVisibleData(map, markerClusterGroup));
      // setMapData(calculateVisibleData(map, markerClusterGroup));
      setCenter([
        event.target.getCenter().lat,
        event.target.getCenter().lng,
      ]);
      setMapData(calculateVisibleData(map, markerClusterGroup));
      // setCurrentData(calculateVisibleData(map, markerClusterGroup));
      // if (filteringMode != 'none') setMapData()
      // filteringMode === 'none'
      //   ? setVisData(calculateVisibleData(map, markerClusterGroup))
      //   : setFilteredData(
      //       calculateVisibleData(map, markerClusterGroup)
      //     );

      // const newVisibleData = calculateVisibleData(
      //   map,
      //   markerClusterGroup
      // );
      // setVisData(newVisibleData); // Update visible data immediately
    };

    const debouncedOnMoveEnd = L.Util.throttle(onMoveEnd, 500);
    map.on('moveend', debouncedOnMoveEnd);

    const onZoomEnd = (event) => {
      console.log('zoom', event.target.getZoom());
      console.log('center', event.target.getCenter());
      setZoom(event.target.getZoom());
      setCenter([
        event.target.getCenter().lat,
        event.target.getCenter().lng,
      ]);

      setMapData(calculateVisibleData(map, markerClusterGroup));
      // setCurrentData(calculateVisibleData(map, markerClusterGroup));
    };
    const debouncedOnZoomEnd = L.Util.throttle(onZoomEnd, 500);
    map.on('zoomend', debouncedOnZoomEnd);

    // map.on('zoomend', ({ target }) => {
    //   setZoom(target.getZoom());
    // });

    return () => {
      map.off('moveend', debouncedOnMoveEnd);
      map.off('zoomend', debouncedOnZoomEnd);
      map.remove();
    };
  }, [data, setVisData, setMapData, center, zoom, allFilter, filter]);

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
  // TODO: calculateVisibleData in own file hook
  // TODO: setvisdata not only in mouse end, also in useeffect, if zoom below 11, check visdata length

  return <div id="map" className="leaflet-map" ref={mapRef}></div>;
}

export default LeafletMap;

// import React, { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet.markercluster';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import '../../leaflet-heat/leaflet-heat';

// function LeafletMap({ data, setVisData }) {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = L.map(mapRef.current, {
//       preferCanvas: true,
//     }).setView([48.7758, 9.1829], 13);

//     L.tileLayer(
//       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//       {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }
//     ).addTo(map);

//     const markerClusterGroup = L.markerClusterGroup({
//       chunkedLoading: true,
//       disableClusteringAtZoom: 17,
//       iconCreateFunction: function (cluster) {
//         return L.divIcon({
//           html: '<b>' + cluster.getChildCount() + '</b>',
//           className: 'cluster',
//         });
//       },
//     });

//     var points = [];

//     data.forEach((d) => {
//       points.push([d.lat, d.lon]);
//       const marker = L.marker([d.lat, d.lon]);
//       marker.options.data = d;
//       markerClusterGroup.addLayer(marker);

//       marker.on('click', () => {
//         L.popup()
//           .setLatLng(marker.getLatLng())
//           .setContent(d.address)
//           .openOn(map);
//       });
//     });

//     var heat = L.heatLayer(points, {
//       maxZoom: 15,
//     }).addTo(map);

//     map.addLayer(markerClusterGroup);

//     const onMoveEnd = () => {
//       const bounds = map.getBounds();
//       const visibleMarkersData = [];

//       markerClusterGroup.eachLayer((marker) => {
//         const markerLatLng = marker.getLatLng();

//         if (bounds.contains(markerLatLng)) {
//           visibleMarkersData.push(marker.options.data);
//         }
//       });

//       setVisData(visibleMarkersData);
//     };

//     const debouncedOnMoveEnd = L.Util.throttle(onMoveEnd, 500);
//     map.on('moveend', debouncedOnMoveEnd);

//     return () => {
//       map.off('moveend', debouncedOnMoveEnd);
//       map.remove();
//     };
//   }, [data, setVisData]);

//   return <div id="map" className="leaflet-map" ref={mapRef}></div>;
// }

// export default LeafletMap;
