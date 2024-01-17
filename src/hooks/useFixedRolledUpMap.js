import React, { useMemo, useState, useEffect } from 'react';
import { rollup, extent, max, min } from 'd3-array';
import useRolledUpMap from './useRolledUpMap';

function useFixedRolledUpMap(data, variable, kategorienSorted) {
  const rolledUpMap = useRolledUpMap(data, variable);

  const fixedRolledUpMap = useMemo(() => {
    const resultMap = new Map();

    kategorienSorted.forEach((kat) => {
      resultMap.set(kat, 0);
    });

    // const rolledUpMap = rollup(
    //   data,
    //   (v) => v.length || 0,
    //   (d) => d[variable]
    //   // (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
    //   // d.properties ? d.properties.kateg : d.options.data.kateg
    //   // (d) => d.options.data.kateg
    //   // (d) => d.properties.kateg
    //   // (d) => (d.options ? d.options.data.kateg : d.kateg)
    // );

    rolledUpMap.forEach((count, kat) => {
      resultMap.set(kat, count);
    });

    return resultMap;
  }, [kategorienSorted, rolledUpMap]);

  return fixedRolledUpMap;
}

export default useFixedRolledUpMap;
