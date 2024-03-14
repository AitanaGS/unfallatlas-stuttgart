import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import styled from 'styled-components';

function LeafletMap({
  data,
  setTotalMapData,
  filterData,
  allFilter,
  filter,
  filterKategData,
  allKategFilter,
  kategFilter,
  chartWidth,
}) {
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState([48.7758, 9.1829]);
  const [mapDescription, setMapDescription] = useState(
    `Karte zentriert bei Breitengrad ${center[0].toFixed(
      4
    )} und Längengrad ${center[1].toFixed(4)} mit Zoomstufe ${zoom}.`
  );

  const mapRef = useRef(null);

  const calculateTotalVisibleData = useMemo(() => {
    return (map, data) => {
      const bounds = map.getBounds();

      if (!bounds) return [];

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

  const yellowIcon = useMemo(() => {
    return new L.Icon({
      iconUrl: '/leaflet-icons/alert-triangle-orange-light.svg',
    });
  }, []);

  const orangeIcon = useMemo(() => {
    return new L.Icon({
      iconUrl: '/leaflet-icons/alert-triangle-orange-dark.svg',
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      preferCanvas: true,
    }).setView(center, zoom);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        useCache: true,
      }
    ).addTo(map);

    const markerClusterGroup = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      removeOutsideVisibleBounds: true,
      chunkedLoading: true,
    });

    var points = [];

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

    currentData.forEach((d) => {
      points.push([d.lat, d.lon]);

      const marker = L.marker([d.lat, d.lon], {
        alt: d.address2,
        icon:
          d.kateg2 === 'Unfall mit Leichtverletzten'
            ? yellowIcon
            : orangeIcon,
      });

      marker.options.data = d;

      markerClusterGroup.addLayer(marker);

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
      marker.on('click', () => {
        L.popup()
          .setLatLng(marker.getLatLng())
          .setContent(popupContent)
          .openOn(map);
      });
    });

    map.addLayer(markerClusterGroup);

    let isZoomEnd = false;

    const onMoveEnd = (event) => {
      if (!map || !markerClusterGroup) return;

      if (!isZoomEnd) {
        setTotalMapData(calculateTotalVisibleData(map, data));

        const newCenter = [
          event.target.getCenter().lat,
          event.target.getCenter().lng,
        ];

        const newZoom = event.target.getZoom();

        setCenter(newCenter);
        setZoom(newZoom);
        setMapDescription(
          `Karte zentriert bei Breitengrad ${newCenter[0].toFixed(
            4
          )} und Längengrad ${newCenter[1].toFixed(
            4
          )} mit Zoomstufe ${newZoom}.`
        );
      }
    };

    const debouncedOnMoveEnd = L.Util.throttle(onMoveEnd, 500);

    const onZoomEnd = (event) => {
      if (!map || !markerClusterGroup) return;

      isZoomEnd = true;

      setTotalMapData(calculateTotalVisibleData(map, data));

      const newCenter = [
        event.target.getCenter().lat,
        event.target.getCenter().lng,
      ];

      const newZoom = event.target.getZoom();

      setCenter(newCenter);
      setZoom(newZoom);

      setMapDescription(
        `Karte zentriert bei Breitengrad ${newCenter[0].toFixed(
          4
        )} und Längengrad ${newCenter[1].toFixed(
          4
        )} mit Zoomstufe ${newZoom}.`
      );
    };

    const debouncedOnZoomEnd = L.Util.throttle(onZoomEnd, 500);

    map.on('zoomend', debouncedOnZoomEnd);
    map.on('moveend', debouncedOnMoveEnd);

    return () => {
      map.off('moveend', debouncedOnMoveEnd);
      map.off('zoomend', debouncedOnZoomEnd);
      map.remove();
    };
  }, [
    data,
    center,
    zoom,
    allFilter,
    filter,
    filterData,
    setTotalMapData,
    calculateTotalVisibleData,
    filterKategData,
    allKategFilter,
    kategFilter,
    yellowIcon,
    orangeIcon,
  ]);

  return (
    chartWidth && (
      <>
        <MapWrapper chartWidth={chartWidth}>
          <LeafletWrapper
            id="map"
            ref={mapRef}
            aria-roledescription="Interaktive Karte"
            aria-label={mapDescription}
          ></LeafletWrapper>
        </MapWrapper>
      </>
    )
  );
}

const MapWrapper = styled.div`
  position: relative;
  width: ${(props) => props.chartWidth}px;
  margin-top: 10px;
`;

const LeafletWrapper = styled.div`
  border: 5px solid rgba(104, 104, 104, 1);
  border-radius: 10px;
  height: 35vh;
  width: 100%;
  position: relative;
`;

export default React.memo(LeafletMap);
