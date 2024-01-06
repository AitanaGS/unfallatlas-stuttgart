import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { scaleTime, scaleLinear, scaleBand } from 'd3-scale';
import ColumnChart from './ColumnChart';
import styled from 'styled-components';
// import { group, max } from 'd3-array';
import ChartContainer from '../ChartContainer';
import {
  extent,
  group,
  rollup,
  max,
  mean,
  median,
  cross,
} from 'd3-array';

const jahre = [2016, 2017, 2018, 2019, 2020, 2021, 2022];
const monate = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

// const allCombinations = cross(jahre, monate, (jahr, monat) => ({
//   jahr: jahr,
//   monatn: monat,
// }));

function ColumnChartSmallMultiple({ visData, dashboardWidth }) {
  // const jahre = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  const [maxValueMap, setMaxValueMap] = useState(new Map());
  const [maxValue, setMaxValue] = useState(0);

  const setMaxValueCallback = useCallback(() => {
    const newMaxValue = max(Array.from(maxValueMap.values()));
    setMaxValue(newMaxValue);
  }, [maxValueMap]);

  useEffect(() => {
    setMaxValueCallback();
  }, [setMaxValueCallback, visData]);

  // useEffect(() => {
  //   const newMaxValue = max(Array.from(maxValueMap.values()));
  //   setMaxValue(newMaxValue);
  // }, [maxValueMap, visData]);

  const widthNudge = 10;

  const chartWidth =
    dashboardWidth > 450
      ? (dashboardWidth - widthNudge) / 3
      : dashboardWidth > 300
      ? (dashboardWidth - widthNudge) / 2
      : dashboardWidth;

  // console.log(dashboardWidth);

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

  // const dataByYear = useMemo(() => {
  //   const dataMap = new Map();

  //   for (let year = 2016; year <= 2022; year++) {
  //     dataMap.set(year, []);
  //   }

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
    const resultMap = new Map();
    jahre.forEach((jahr) => {
      resultMap.set(jahr, new Map());

      monate.forEach((monat) => {
        resultMap.get(jahr).set(monat, 0);
      });
    });

    const rolledUpMap = rollup(
      visData,
      (v) => v.length || 0, // Count instances
      (d) => d.jahr, // Group by year
      (d) => d.monatn // Group by month name
    );

    rolledUpMap.forEach((yearMap, year) => {
      yearMap.forEach((count, month) => {
        resultMap.get(year).set(month, count);
      });
    });

    // const dataMap = new Map();

    // for (let year = 2016; year <= 2022; year++) {
    //   dataMap.set(year, []);
    // }

    // visData.forEach((d) => {
    //   const year = d.jahr;
    //   if (!dataMap.has(year)) {
    //     dataMap.set(year, []);
    //   }
    //   dataMap.get(year).push(d);
    // });

    return resultMap;
  }, [visData]);

  // console.log('databyyear', dataByYear);

  // console.log('visdata', visData);
  // console.log('array from databyyear', Array.from(dataByYear));
  // console.log('allcombinations', allCombinations);

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
  // TODO: numberwithseperator?

  return (
    <SvgWrapper dashboardWidth={dashboardWidth}>
      <svg
        viewBox={`0 0 ${dashboardWidth} ${20}`}
        width={dashboardWidth}
        height={40}
      >
        <text
          x={10}
          y={4}
          textAnchor="auto"
          dominantBaseline="hanging"
          className="svg-title"
        >
          Monat und Jahr
        </text>
      </svg>
      <SmallMultipleWrapper dashboardWidth={dashboardWidth}>
        {/* {Array.from(dataByYear, ([year, yearVisData]) => (
          <ColumnChart
            key={year}
            yearVisData={yearVisData}
            year={year}
            maxValue={maxValue}
            setMaxValueMap={setMaxValueMap}
            maxValueMap={maxValueMap}
            chartWidth={chartWidth}
          />
        ))} */}
        {jahre.map((jahr) => (
          <ColumnChart
            key={jahr}
            yearVisData={dataByYear.get(jahr)}
            jahr={jahr}
            maxValue={maxValue}
            setMaxValueMap={setMaxValueMap}
            maxValueMap={maxValueMap}
            chartWidth={chartWidth}
            monate={monate}
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
    </SvgWrapper>
  );
}

const SmallMultipleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* max-width: 500px; */
  /* max-width: ${(props) => props.dashboardWidth}; */
  width: ${(props) => props.dashboardWidth}px;
`;

const SvgWrapper = styled.div`
  /* display: flex;
  flex-wrap: wrap; */
  /* max-width: 500px; */
  /* max-width: ${(props) => props.dashboardWidth}; */
  width: ${(props) => props.dashboardWidth}px;
`;

export default ColumnChartSmallMultiple;
