import React, { useMemo, useState, useEffect } from 'react';
import { scaleTime, scaleLinear, scaleBand } from 'd3-scale';
import ColumnChart from '../ColumnChart';
import styled from 'styled-components';
import { group, max } from 'd3-array';

function ColumnChartSmallMultiple({ visData }) {
  // const jahre = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  const [maxValueMap, setMaxValueMap] = useState(new Map());
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const newMaxValue = max(Array.from(maxValueMap.values()));
    setMaxValue(newMaxValue);
  }, [maxValueMap, visData]);

  // const dataByYear = group(visData, (d) => d.jahr);

  // here
  // const dataByYear = useMemo(() => {
  //   const dataMap = new Map();

  //   visData.forEach((d) => {
  //     const year = d.jahr;
  //     if (!dataMap.has(year)) {
  //       dataMap.set(year, []);
  //     }
  //     dataMap.get(year).push(d);
  //   });

  //   return dataMap;
  // }, [visData]);

  const dataByYear = useMemo(() => {
    const dataMap = new Map();

    for (let year = 2016; year <= 2022; year++) {
      dataMap.set(year, []);
    }

    visData.forEach((d) => {
      const year = d.jahr;
      if (!dataMap.has(year)) {
        dataMap.set(year, []);
      }
      dataMap.get(year).push(d);
    });

    return dataMap;
  }, [visData]);

  // const yScale = scaleLinear()
  //   .domain([0, maxValue]) // maxMonthData dataTotal
  //   .range([innerHeight, 0])
  //   .nice();

  // const yScale = useMemo(() => {
  //   return scaleLinear()
  //     .domain([0, maxValue]) // maxMonthData dataTotal
  //     .range([innerHeight, 0])
  //     .nice();
  // }, [maxValue]); // innerHeight

  // TODO: yScale construction here instead of ColumnChart (?)
  // TODO: chart srtuktur zeigen, wenn gar keine fälle

  return (
    <SmallMultipleWrapper>
      {Array.from(dataByYear, ([year, yearVisData]) => (
        <ColumnChart
          key={year}
          yearVisData={yearVisData}
          year={year}
          maxValue={maxValue}
          setMaxValueMap={setMaxValueMap}
          maxValueMap={maxValueMap}
        />
      ))}
      {/* {jahre.map((jahr, i) => (
        <ColumnChart
          key={jahr}
          yearVisData={visData.filter((d) => d.jahr === jahr)}
          year={jahr}
        />
      ))} */}
    </SmallMultipleWrapper>
  );
}

const SmallMultipleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
`;

export default ColumnChartSmallMultiple;
