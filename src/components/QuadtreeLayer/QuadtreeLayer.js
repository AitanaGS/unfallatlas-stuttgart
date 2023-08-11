import React from 'react';
import { useMap } from 'react-leaflet/hooks';
import { rollup } from 'd3-array';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function QuadtreeLayer({ data, setVisData }) {
  const map = useMap();
  // const [visibleData, setVisibileData] = React.useState([]);

  // const quadtree = L.quadtree({ maxItems: 10, maxDepth: 12 });
  // data.forEach((d) => {
  //   const marker = L.marker([d.properties.lat, d.properties.lon], {
  //     data: d.properties,
  //   });
  //   quadtree.add(marker);
  // });

  // function getMarkers() {
  //   var bounds = map.getBounds();
  //   var colliders = quadtree.getColliders(bounds);
  //   console.log('colliders', colliders);
  // }
  // getMarkers();

  // map.on('moveend', getMarkers);

  // console.log('map center:', map.getCenter());

  React.useEffect(() => {
    const quadtree = L.quadtree({ maxItems: 10, maxDepth: 12 });

    data.forEach((d) => {
      const marker = L.marker([d.lat, d.lon], {
        data: d,
      });
      quadtree.add(marker);
    });

    // function getMarkers() {
    //   var bounds = map.getBounds();
    //   var colliders = quadtree.getColliders(bounds);
    //   console.log('colliders', colliders);
    // }

    const debouncedGetMarkers = debounce(() => {
      var bounds = map.getBounds();
      var colliders = quadtree.getColliders(bounds);
      // console.log('colliders', colliders);
      setVisData(colliders);
    }, 500);

    // getMarkers();

    map.on('moveend', debouncedGetMarkers);

    return () => {
      map.off('moveend', debouncedGetMarkers);
      // Clean up resources when the component unmounts
      // map.remove();
    };
  }, []); //[data, map, setVisibleData]

  // return <div></div>;

  // TODO: check setVisibleData in dependency array
  // TODO: check dependency array in quadtree/leaflet
  return null;
}

export default QuadtreeLayer;
