'use client';
import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
  memo,
} from 'react';
import L, { Icon, divIcon } from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../leaflet-heat/leaflet-heat';
import styled from 'styled-components';
import Note from '../Note';
// import 'leaflet-spin';
// import 'leaflet-loading';
// import 'leaflet-loading/src/Control.Loading.css';
// import { Spinner } from 'spin.js';
// import { MapPin } from 'react-feather';

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
  chartWidth,
  filterKategData,
  allKategFilter,
  kategFilter,
  svgFontSize,
  layout,
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
  }, []); // useMemo

  const yellowIcon = useMemo((d) => {
    return new L.Icon({
      // iconUrl: require('/leaflet-icons/marker-icon-2x.png'),
      // iconUrl: '/leaflet-icons/marker-icon-2x.png',
      // iconSize: [25, 28], // [38, 38] [38, 45]
      iconUrl: '/leaflet-icons/alert-triangle-orange-light.svg',
    });
  }, []);

  const orangeIcon = useMemo((d) => {
    return new L.Icon({
      // iconUrl: require('/leaflet-icons/marker-icon-2x.png'),
      // iconUrl: '/leaflet-icons/marker-icon-2x.png',
      // iconSize: [25, 28], // [38, 38] [38, 45]
      iconUrl: '/leaflet-icons/alert-triangle-orange-dark.svg',
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

    // var loadingControl = L.Control.loading({
    //   spinjs: true,
    // });
    // map.addControl(loadingControl);

    // map.spin(true);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        useCache: true,
        // maxZoom: 18,
      }
    ).addTo(map);

    // L.Control.loading().addTo(map);

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
      spiderfyOnMaxZoom: true,
      // removeOutsideVisibleBounds: true,
      chunkedLoading: true, // Enable chunked loading
      // disableClusteringAtZoom: 17, // 17 Disable clustering at higher zoom levels
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
        // icon: customIcon, // Set the custom icon for each marker
        icon:
          d.kateg2 === 'Unfall mit Leichtverletzten'
            ? yellowIcon
            : orangeIcon,
      });
      marker.options.data = d;
      markerClusterGroup.addLayer(marker);
      // markerIdToMarker[d.dataid] = marker; // check if necessary (see above)

      const popupContent = `
      <div>
        <strong>Unfallbeteilgung:</strong> 
          ${d.istfussb ? 'Fußgänger' : ''}
          ${d.istradb ? 'Rad' : ''}
          ${d.istkradb ? 'Kraftrad' : ''}
          ${d.istpkwb ? 'PKW' : ''}
          ${d.istsonst2b ? 'Sonstige' : ''}
          <br/>
        <strong>Schwergrad:</strong> ${d.kateg2}<br/>
        <strong>Lichtverhältnisse:</strong> ${d.licht2}<br/>
        <strong>Straßenzustand:</strong> ${d.strzust2}<br/>
        <strong>Art:</strong> ${d.art}
    `;
      // <br/>
      // //   <strong>${d.monatn}${' '}${d.jahr}</strong> <br/>
      // //  <strong>${d.wochentag}${', '}${d.zeit}</strong>
      // </div>

      // Add click event to show popup with address
      marker.on('click', () => {
        L.popup()
          .setLatLng(marker.getLatLng())
          .setContent(popupContent) // d.address
          .openOn(map);
      }); // click
    });
    // {
    //   autoPan: true, // Enable auto-panning to center-align the popup
    //   autoPanPadding: [50, 50], // Adjust the auto-pan padding as needed
    // }

    if (selectHeatmap) {
      var heat = L.heatLayer(points, {
        maxZoom: zoom, // 15 // 10
      }).addTo(map);
    }

    map.addLayer(markerClusterGroup);

    // L.control.spinner().addTo(map);

    // here, for zoom below 11 - dont remove
    // setVisData(calculateVisibleData(map, markerClusterGroup));

    let isZoomEnd = false;

    // map.spin(true);

    const onMoveEnd = (event) => {
      // map.spin(true);
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
        // const calculatedData = calculateTotalVisibleData(map, data);
        // map.spin(true);
        setTotalMapData(calculateTotalVisibleData(map, data)); // funktioniert
        // setTotalMapData(calculatedData);
        // setVisData(calculatedData);
        setZoom(event.target.getZoom());
        setCenter([
          event.target.getCenter().lat,
          event.target.getCenter().lng,
        ]);
        // map.spin(false);
        // map.spin(true);
      }
    };

    const debouncedOnMoveEnd = L.Util.throttle(onMoveEnd, 500); // 500

    const onZoomEnd = (event) => {
      // isZoomEnd = true;
      // console.log('zoom');
      // console.log('zoom', event.target.getZoom());
      // console.log('center', event.target.getCenter());

      // map.spin(true);

      if (!map || !markerClusterGroup) return; // Check if the map object is valid

      // const bounds = map.getBounds();
      // if (!bounds) return;

      isZoomEnd = true; // here
      // console.log('zoom event', event, map, markerClusterGroup);
      // console.log('zoom');
      // map.spin(true);
      setZoom(event.target.getZoom());
      setCenter([
        event.target.getCenter().lat,
        event.target.getCenter().lng,
      ]);

      // setMapData(calculateVisibleData(map, markerClusterGroup)); //here
      // const calculatedData = calculateTotalVisibleData(map, data);
      setTotalMapData(calculateTotalVisibleData(map, data)); // funktiioniert
      // setTotalMapData(calculatedData);
      // setVisData(calculatedData);
      // setCurrentData(calculateVisibleData(map, markerClusterGroup));
      // map.spin(false);
      // map.spin(true);
    };
    const debouncedOnZoomEnd = L.Util.throttle(onZoomEnd, 500); // 500

    // const stopSpinnerOnLoad = () => {
    //   map.spin(false);
    // };

    map.on('zoomend', debouncedOnZoomEnd); // debouncedOnZoomEnd
    map.on('moveend', debouncedOnMoveEnd); // debouncedOnMoveEnd

    // map.on('tilesloaded', () => {
    //   // Stop the spinner when the tiles are loaded
    //   map.spin(false);
    // });

    // const onMoveStart = () => {
    //   map.spin(true);
    // };
    // map.on('movestart', onMoveStart);

    // const onZoomStart = () => {
    //   map.spin(true);
    // };
    // map.on('zoomstart', onZoomStart);
    // map.on('load', stopSpinnerOnLoad);

    // map.spin(false);

    // map.on('zoomend', ({ target }) => {
    //   setZoom(target.getZoom());
    // });

    // map.spin(false);

    // map.spin(false);

    return () => {
      map.off('moveend', debouncedOnMoveEnd);
      map.off('zoomend', debouncedOnZoomEnd);
      // map.off('zoomstart', onZoomStart);
      // map.off('movestart', onMoveStart);
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
    // customIcon,
    filteringMode,
    setTotalMapData,
    calculateTotalVisibleData,
    chartWidth,
    filterKategData,
    allKategFilter,
    kategFilter,
    yellowIcon,
    orangeIcon,
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
  // TODO: additional content for popup?
  // TODO: remove heatmap
  // TODO: check which data/setData is used and remove the rest
  // <br/>
  // <strong>${d.monatn}${' '}${d.jahr}</strong> <br/>
  // <strong>${d.wochentag}${', '}${d.zeit}</strong>

  // console.log('render');
  return (
    chartWidth && (
      <>
        {/* <Note svgFontSize={svgFontSize} margin={`10px 0 5px 0`}>
          <p>
            Bitte beachte, dass die Verkehrsdichte auf den Straßen
            variiert und somit auch die Wahrscheinlichkeit für Unfälle
            unterschiedlich ist. Daher sollten Straßen oder Abschnitte
            nicht direkt miteinander verglichen werden.
          </p>
        </Note> */}
        <MapWrapper
          chartWidth={chartWidth}
          // loadingControl={true}
          // id="map"
          // className="leaflet-map"
          // ref={mapRef}
        >
          <LeafletWrapper
            id="map"
            // className="leaflet-map"
            ref={mapRef}
            // loadingControl={true}
            // style={{
            //   // border: '5px solid rgba(97, 90, 74, 1)',
            //   border: '5px solid rgba(104, 104, 104, 1)',
            //   borderRadius: '10px',
            //   height: '35vh',
            //   width: '100%',
            //   position: 'relative',
            // }}
          ></LeafletWrapper>
        </MapWrapper>
        {/* <Note svgFontSize={svgFontSize} margin={`5px 0 5px 0`}>
          <p>
            Zoom in einen Abschnitt, um ihn genauer zu betrachten. Für
            mehr Informationen zu einzelen Unfällen, klick auf die
            Kreise und Warnschilder.
          </p>
        </Note> */}
      </>
    )
  );
}

const MapWrapper = styled.div`
  /* height: 300px; // 400px */
  /* height: 10%; // 400px */
  /* height: 50vh; */
  /* width: 400px; */
  position: relative;
  width: ${(props) => props.chartWidth}px; // 400px
  margin-top: 25px;
  /* margin-top: 5px; */
  /* margin-bottom: 100px; */
`;

const LeafletWrapper = styled.div`
  /* position: relative;
  width: ${(props) => props.chartWidth}px; // 400px
  margin-top: 25px; */
  border: 5px solid rgba(104, 104, 104, 1);
  border-radius: 10px;
  height: 35vh;
  width: 100%;
  position: relative;
`;

export default React.memo(LeafletMap);

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
