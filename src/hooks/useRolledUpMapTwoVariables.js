import React, { useMemo, useState, useEffect } from 'react';
import { rollup, extent, max, min } from 'd3-array';

function useRolledUpMapTwoVariables(data, variableOne, variableTwo) {
  const rolledUpMapTwoVariables = useMemo(() => {
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

  return rolledUpMapTwoVariables;
}

// function useRolledUpMapTwoVariables(data, variableOne, variableTwo) {
//   const rolledUpMapTwoVariables = rollup(
//     data,
//     (v) => v.length || 0,
//     (d) => d[variableOne], // Group by year
//     (d) => d[variableTwo] // Group by month name
//     // (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
//     // d.properties ? d.properties.kateg : d.options.data.kateg
//     // (d) => d.options.data.kateg
//     // (d) => d.properties.kateg
//     // (d) => (d.options ? d.options.data.kateg : d.kateg)
//   );

//   return rolledUpMapTwoVariables;
// }

export default useRolledUpMapTwoVariables;
