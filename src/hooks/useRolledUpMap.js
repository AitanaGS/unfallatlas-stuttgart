import React, { useMemo, useState, useEffect } from 'react';
import { rollup, extent, max, min } from 'd3-array';

function useRolledUpMap(data, variable) {
  const rolledUpMap = useMemo(() => {
    return rollup(
      data,
      (v) => v.length || 0,
      (d) => d[variable]
      // (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
      // d.properties ? d.properties.kateg : d.options.data.kateg
      // (d) => d.options.data.kateg
      // (d) => d.properties.kateg
      // (d) => (d.options ? d.options.data.kateg : d.kateg)
    );
  }, [data, variable]);

  return rolledUpMap;
}

export default useRolledUpMap;