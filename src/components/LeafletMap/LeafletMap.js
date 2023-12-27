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
import styled from 'styled-components';

// const calculateVisibleData = (map, markerClusterGroup) => {
//   const bounds = map.getBounds();

//   if (!bounds) return []; // new

//   const visibleMarkersData = [];

//   markerClusterGroup.eachLayer((marker) => {
//     const markerLatLng = marker.getLatLng();
//     // console.log('coord', markerLatLng);

//     if (bounds.contains(markerLatLng)) {
//       visibleMarkersData.push(marker.options.data);
//     }
//   });

//   // console.log('run', visibleMarkersData);

//   return visibleMarkersData;
// };

// use callback
// const calculateTotalVisibleData = (map, data) => {
//   const bounds = map.getBounds();

//   if (!bounds) return []; // new

//   const visibleData = [];

//   data.forEach((d) => {
//     const coord = {
//       lat: d.lat,
//       lng: d.lon,
//     };

//     if (bounds.contains(coord)) {
//       visibleData.push(d);
//     }
//   });

//   // console.log('run', visibleMarkersData);

//   return visibleData;
// };

function LeafletMap({
  data,
  setVisData,
  setMapData,
  // filteredData,
  filteringMode,
  filterData,
  allFilter,
  filter,
  selectHeatmap,
  setTotalMapData,
  dashboardWidth,
  filterKategData,
  allKategFilter,
  kategFilter,
}) {
  // here
  const mapRef = useRef(null);

  // console.log(data);

  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState([48.7758, 9.1829]);
  // const [currentData, setCurrentData] = useState(
  //   filterData(data, allFilter, filter)
  // );
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

  const calculateTotalVisibleData = useMemo(() => {
    return (map, data) => {
      const bounds = map.getBounds();

      if (!bounds) return []; // new

      const visibleData = [];

      data.forEach((d) => {
        const coord = {
          lat: d.lat,
          lng: d.lon,
        };

        if (bounds.contains(coord)) {
          visibleData.push(d);
        }
      });

      return visibleData;
    };
  }, []);

  const customIcon = useMemo(() => {
    return new L.Icon({
      // iconUrl: require('/leaflet-icons/marker-icon-2x.png'),
      iconUrl: '/leaflet-icons/marker-icon-2x.png',
      iconSize: [38, 45], // [38, 38]
    });
  }, []);

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

    if (!mapRef.current) return; // new

    // const currentData = filterData(data, allFilter, filter);
    // setCurrentData(filterData(data, allFilter, filter));

    // here
    const map = L.map(mapRef.current, {
      preferCanvas: true, // Enable canvas rendering,
    }).setView(center, zoom); // [48.7758, 9.1829] 11 // 13

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        useCache: true,
      }
    ).addTo(map);

    // L.tileLayer(
    //   'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    //   {
    //     attribution:
    //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //     subdomains: 'abcd',
    //     maxZoom: 20,
    //   }
    // ).addTo(map);

    // L.tileLayer(
    //   'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    //   {
    //     attribution:
    //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //     subdomains: 'abcd',
    //     maxZoom: 20,
    //   }
    // ).addTo(map);

    const markerClusterGroup = L.markerClusterGroup({
      chunkedLoading: true, // Enable chunked loading
      disableClusteringAtZoom: 17, // Disable clustering at higher zoom levels
      iconCreateFunction: selectHeatmap
        ? function (cluster) {
            return L.divIcon({
              html: '<b>' + cluster.getChildCount() + '</b>',
              className: 'cluster',
            });
          }
        : undefined,
    });

    // Check if necessary: Create a mapping of marker ID to marker instance
    // const markerIdToMarker = {};

    var points = [];

    // here: data
    // const currentData =
    //   filteringMode === 'none' ? data : filteredData;
    // here: data
    //filterData(data, allFilter, filter)

    const currentKategData = filterKategData(
      data,
      allKategFilter,
      kategFilter
    );
    const currentData = filterData(
      currentKategData,
      allFilter,
      filter
    );

    // const currentData = filterData(data, allFilter, filter);

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

    if (selectHeatmap) {
      var heat = L.heatLayer(points, {
        maxZoom: zoom, // 15 // 10
      }).addTo(map);
    }

    map.addLayer(markerClusterGroup);

    // here, for zoom below 11 - dont remove
    // setVisData(calculateVisibleData(map, markerClusterGroup));

    let isZoomEnd = false;

    const onMoveEnd = (event) => {
      if (!map || !markerClusterGroup) return; // Check if the map object is valid

      // const bounds = map.getBounds();
      // if (!bounds) return;

      // console.log('move event', event, map, markerClusterGroup);
      if (!isZoomEnd) {
        // console.log('move');
        // setCenter([
        //   event.target.getCenter().lat,
        //   event.target.getCenter().lng,
        // ]);
        // console.log('move');
        // setMapData(calculateVisibleData(map, markerClusterGroup)); //here
        setTotalMapData(calculateTotalVisibleData(map, data));
        setZoom(event.target.getZoom());
        setCenter([
          event.target.getCenter().lat,
          event.target.getCenter().lng,
        ]);
      }
    };

    const debouncedOnMoveEnd = L.Util.throttle(onMoveEnd, 500); // 500

    const onZoomEnd = (event) => {
      // isZoomEnd = true;
      // console.log('zoom');
      // console.log('zoom', event.target.getZoom());
      // console.log('center', event.target.getCenter());

      if (!map || !markerClusterGroup) return; // Check if the map object is valid

      // const bounds = map.getBounds();
      // if (!bounds) return;

      isZoomEnd = true; // here
      // console.log('zoom event', event, map, markerClusterGroup);
      // console.log('zoom');
      setZoom(event.target.getZoom());
      setCenter([
        event.target.getCenter().lat,
        event.target.getCenter().lng,
      ]);

      // setMapData(calculateVisibleData(map, markerClusterGroup)); //here
      setTotalMapData(calculateTotalVisibleData(map, data)); //here
      // setCurrentData(calculateVisibleData(map, markerClusterGroup));
    };
    const debouncedOnZoomEnd = L.Util.throttle(onZoomEnd, 500); // 500

    map.on('zoomend', debouncedOnZoomEnd); // debouncedOnZoomEnd
    map.on('moveend', debouncedOnMoveEnd); // debouncedOnMoveEnd

    // map.on('zoomend', ({ target }) => {
    //   setZoom(target.getZoom());
    // });

    return () => {
      map.off('moveend', debouncedOnMoveEnd);
      map.off('zoomend', debouncedOnZoomEnd);
      map.remove();
    };
  }, [
    data,
    setVisData,
    setMapData,
    center,
    zoom,
    allFilter,
    filter,
    filterData,
    selectHeatmap,
    customIcon,
    filteringMode,
    setTotalMapData,
    calculateTotalVisibleData,
    dashboardWidth,
    filterKategData,
    allKategFilter,
    kategFilter,
  ]);

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
  // TODO: check if setCurrentData
  // TODO: check error
  // TODO: check if error with/without "const bounds = map.getBounds(); if (!bounds) return;" in onzoomend and onmoveend

  return (
    dashboardWidth && (
      <MapWrapper
        dashboardWidth={dashboardWidth}
        // id="map"
        // className="leaflet-map"
        // ref={mapRef}
      >
        <div id="map" className="leaflet-map" ref={mapRef}></div>
      </MapWrapper>
    )
  );
}

export default LeafletMap;

const MapWrapper = styled.div`
  height: 300px; // 400px
  /* height: 50vh; */
  /* width: 400px; */
  position: relative;
  width: ${(props) => props.dashboardWidth}px; // 400px
  margin-top: 20px;
`;

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
