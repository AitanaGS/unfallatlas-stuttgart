import { useMemo } from 'react';
import { rollup } from 'd3-array';

function useFixedRolledUpMap({ data, variable, kategorien }) {
  const rolledUpMap = useMemo(() => {
    return rollup(
      data,
      (v) => v.length || 0,
      (d) => d[variable]
    );
  }, [data, variable]);

  const fixedRolledUpMap = useMemo(() => {
    const resultMap = new Map();

    kategorien.forEach((kat) => {
      resultMap.set(kat, 0);
    });

    rolledUpMap.forEach((count, kat) => {
      resultMap.set(kat, count);
    });

    return resultMap;
  }, [kategorien, rolledUpMap]);

  return fixedRolledUpMap;
}

export default useFixedRolledUpMap;
