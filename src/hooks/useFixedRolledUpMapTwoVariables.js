import React, { useMemo, useState, useEffect } from 'react';
import { rollup, extent, max, min } from 'd3-array';
// import useRolledUpMapTwoVariables from './useRolledUpMapTwoVariables';

// const weekHourCount = useMemo(() => {
//     const resultMap = new Map();

//     weekSorted.forEach((day) => {
//       resultMap.set(day, new Map());

//       hourSorted.forEach((hour) => {
//         resultMap.get(day).set(hour, 0);
//       });
//     });

//     const rolledUpMap = rollup(
//       visData,
//       (v) => v.length || 0, // Count instances
//       (d) => d.wochentag, // Group by year
//       (d) => d.zeit // Group by month name
//     );

//     rolledUpMap.forEach((dayMap, day) => {
//       dayMap.forEach((count, time) => {
//         resultMap.get(day).set(time, count);
//       });
//     });

//     return resultMap;
//   }, [visData]);

function useFixedRolledUpMapTwoVariables(
  data,
  variableOne,
  variableTwo,
  kategorienOne,
  kategorienTwo
) {
  // const rolledUpMap = useRolledUpMapTwoVariables(
  //   data,
  //   variableOne,
  //   variableTwo
  // );

  const rolledUpMap = useMemo(() => {
    return rollup(
      data,
      (v) => v.length || 0,
      (d) => d[variableOne], // Group by year
      (d) => d[variableTwo] // Group by month name
      // (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
      // d.properties ? d.properties.kateg : d.options.data.kateg
      // (d) => d.options.data.kateg
      // (d) => d.properties.kateg
      // (d) => (d.options ? d.options.data.kateg : d.kateg)
    );
  }, [data, variableOne, variableTwo]);

  const fixedRolledUpMapTwoVariables = useMemo(() => {
    const resultMap = new Map();

    kategorienOne.forEach((katOne) => {
      resultMap.set(katOne, new Map());

      kategorienTwo.forEach((katTwo) => {
        resultMap.get(katOne).set(katTwo, 0);
      });
    });

    // const rolledUpMap = rollup(
    //   data,
    //   (v) => v.length || 0, // Count instances
    //   (d) => d[variableOne], // Group by year
    //   (d) => d[variableTwo] // Group by month name
    // );

    //   rolledUpMap.forEach((dayMap, day) => {
    //     dayMap.forEach((count, time) => {
    //       resultMap.get(day).set(time, count);
    //     });
    //   });

    rolledUpMap.forEach((firstMap, first) => {
      firstMap.forEach((count, second) => {
        resultMap.get(first).set(second, count);
      });
    });

    return resultMap;
  }, [rolledUpMap, kategorienOne, kategorienTwo]);

  //   const resultMap = new Map();

  //   kategorienSortedOne.forEach((katOne) => {
  //     resultMap.set(katOne, new Map());

  //     kategorienSortedTwo.forEach((katTwo) => {
  //       resultMap.get(katOne).set(katTwo, 0);
  //     });
  //   });

  //   // const rolledUpMap = rollup(
  //   //   data,
  //   //   (v) => v.length || 0, // Count instances
  //   //   (d) => d[variableOne], // Group by year
  //   //   (d) => d[variableTwo] // Group by month name
  //   // );

  //   //   rolledUpMap.forEach((dayMap, day) => {
  //   //     dayMap.forEach((count, time) => {
  //   //       resultMap.get(day).set(time, count);
  //   //     });
  //   //   });

  //   rolledUpMap.forEach((firstMap, first) => {
  //     firstMap.forEach((count, second) => {
  //       resultMap.get(first).set(second, count);
  //     });
  //   });

  //   return resultMap;

  return fixedRolledUpMapTwoVariables;
}

export default useFixedRolledUpMapTwoVariables;
