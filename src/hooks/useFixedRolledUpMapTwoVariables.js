import { useMemo } from 'react';
import { rollup } from 'd3-array';

function useFixedRolledUpMapTwoVariables({
  data,
  variableOne,
  variableTwo,
  kategorienOne,
  kategorienTwo,
}) {
  const rolledUpMap = useMemo(() => {
    return rollup(
      data,
      (v) => v.length || 0,
      (d) => d[variableOne],
      (d) => d[variableTwo]
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

    rolledUpMap.forEach((firstMap, first) => {
      firstMap.forEach((count, second) => {
        resultMap.get(first).set(second, count);
      });
    });

    return resultMap;
  }, [rolledUpMap, kategorienOne, kategorienTwo]);

  return fixedRolledUpMapTwoVariables;
}

export default useFixedRolledUpMapTwoVariables;
