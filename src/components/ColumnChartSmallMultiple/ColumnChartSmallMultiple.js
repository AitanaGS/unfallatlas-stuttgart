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
import useFixedRolledUpMapTwoVariables from '@/hooks/useFixedRolledUpMapTwoVariables';
import Note from '../Note';

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

function ColumnChartSmallMultiple({
  visData,
  chartWidth,
  svgFontSize,
  // chartWidthDomain,
  vizWrapperGap,
}) {
  // const jahre = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  // const [maxValueMap, setMaxValueMap] = useState(new Map());
  const [maxValue, setMaxValue] = useState(0);

  // const setMaxValueCallback = useCallback(() => {
  //   const newMaxValue = max(Array.from(maxValueMap.values()));
  //   setMaxValue(newMaxValue);
  // }, [maxValueMap]);

  // useEffect(() => {
  //   setMaxValueCallback();
  // }, [setMaxValueCallback, visData]);

  // useEffect(() => {
  //   const newMaxValue = max(Array.from(maxValueMap.values()));
  //   setMaxValue(newMaxValue);
  // }, [maxValueMap, visData]);

  const widthNudge = 10;

  // const smallChartWidth =
  //   chartWidth > 450
  //     ? (chartWidth - widthNudge) / 3
  //     : chartWidth > 300
  //     ? (chartWidth - widthNudge) / 2
  //     : chartWidth;

  const smallChartWidth =
    chartWidth > 500
      ? (chartWidth - widthNudge) / 3
      : chartWidth > 330
      ? (chartWidth - widthNudge) / 2
      : chartWidth;

  // console.log(chartWidth);

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

  // const dataByYear = useMemo(() => {
  //   const resultMap = new Map();
  //   jahre.forEach((jahr) => {
  //     resultMap.set(jahr, new Map());

  //     monate.forEach((monat) => {
  //       resultMap.get(jahr).set(monat, 0);
  //     });
  //   });

  //   const rolledUpMap = rollup(
  //     visData,
  //     (v) => v.length || 0, // Count instances
  //     (d) => d.jahr, // Group by year
  //     (d) => d.monatn // Group by month name
  //   );

  //   rolledUpMap.forEach((yearMap, year) => {
  //     yearMap.forEach((count, month) => {
  //       resultMap.get(year).set(month, count);
  //     });
  //   });

  //   // const dataMap = new Map();

  //   // for (let year = 2016; year <= 2022; year++) {
  //   //   dataMap.set(year, []);
  //   // }

  //   // visData.forEach((d) => {
  //   //   const year = d.jahr;
  //   //   if (!dataMap.has(year)) {
  //   //     dataMap.set(year, []);
  //   //   }
  //   //   dataMap.get(year).push(d);
  //   // });

  //   return resultMap;
  // }, [visData]);

  // const dataByYear = useMemo(() => {
  //   const resultMap = new Map();
  //   jahre.forEach((jahr) => {
  //     resultMap.set(jahr, new Map());

  //     monate.forEach((monat) => {
  //       resultMap.get(jahr).set(monat, 0);
  //     });
  //   });

  //   const rolledUpMap = rollup(
  //     visData,
  //     (v) => v.length || 0, // Count instances
  //     (d) => d.jahr, // Group by year
  //     (d) => d.monatn // Group by month name
  //   );

  //   rolledUpMap.forEach((yearMap, year) => {
  //     yearMap.forEach((count, month) => {
  //       resultMap.get(year).set(month, count);
  //     });
  //   });

  //   return resultMap;
  // }, [visData]);

  const dataByYear = useFixedRolledUpMapTwoVariables(
    visData,
    'jahr',
    'monatn',
    jahre,
    monate
  );

  useEffect(() => {
    const maxValueMap = new Map();

    jahre.forEach((jahr) => {
      const yearVisData = dataByYear.get(jahr);
      const maxMonthData = max(Array.from(yearVisData.values()));
      maxValueMap.set(jahr, maxMonthData);
    });

    const newMaxValue = max(Array.from(maxValueMap.values()));
    setMaxValue(newMaxValue);
  }, [dataByYear]);

  // const setMaxValueCallback = useCallback(() => {
  //   const newMaxValue = max(Array.from(maxValueMap.values()));
  //   setMaxValue(newMaxValue);
  // }, [maxValueMap]);

  // useEffect(() => {
  //   setMaxValueCallback();
  // }, [setMaxValueCallback, visData]);

  // console.log('dataByYear', dataByYear);

  // console.log(
  //   'databyyear example',
  //   dataByYear.get(2016).get('Januar')
  // );

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

  // console.log('render');

  return (
    <SvgWrapper chartWidth={chartWidth}>
      <svg
        viewBox={`0 0 ${chartWidth} ${20}`}
        width={chartWidth}
        height={40}
      >
        <text
          x={10}
          y={8}
          textAnchor="auto"
          dominantBaseline="hanging"
          className="svg-title"
          fontSize={`${svgFontSize.title}rem`}
        >
          Monat und Jahr
        </text>
      </svg>
      <SmallMultipleWrapper chartWidth={chartWidth}>
        {/* {Array.from(dataByYear, ([year, yearVisData]) => (
          <ColumnChart
            key={year}
            yearVisData={yearVisData}
            year={year}
            maxValue={maxValue}
            setMaxValueMap={setMaxValueMap}
            maxValueMap={maxValueMap}
            smallChartWidth={smallChartWidth}
          />
        ))} */}
        {jahre.map((jahr) => (
          <ColumnChart
            key={jahr}
            yearVisData={dataByYear.get(jahr)}
            jahr={jahr}
            maxValue={maxValue}
            // setMaxValueMap={setMaxValueMap}
            // maxValueMap={maxValueMap}
            smallChartWidth={smallChartWidth}
            monate={monate}
            svgFontSize={svgFontSize}
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
      {/* <NoteWrapper
        svgFontSize={svgFontSize}
        vizWrapperGap={vizWrapperGap}
        // margin={margin}
      >
        <p>
          Die Linie gibt die durchschnittle Anzahl von Unfällen pro
          Monat im jeweiligen Jahr an.
        </p>
      </NoteWrapper> */}
      <Note
        svgFontSize={svgFontSize}
        // vizWrapperGap={vizWrapperGap}
        margin={`0 0 0 10px`}
        // margin={margin}
      >
        <p>
          Die Linie gibt die durchschnittle Anzahl von Unfällen pro
          Monat im jeweiligen Jahr an.
        </p>
      </Note>
    </SvgWrapper>
  );
}

const SmallMultipleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* max-width: 500px; */
  /* max-width: ${(props) => props.chartWidth}; */
  width: ${(props) => props.chartWidth}px;
`;

const SvgWrapper = styled.div`
  /* display: flex;
  flex-wrap: wrap; */
  /* max-width: 500px; */
  /* max-width: ${(props) => props.chartWidth}; */
  width: ${(props) => props.chartWidth}px;
`;

const NoteWrapper = styled.div`
  /* margin-top: -60px; */
  /* margin-top: ${({ vizWrapperGap }) =>
    `${-(vizWrapperGap + 5)}px`}; */
  margin-left: 10px;
  font-size: ${({ svgFontSize }) => `${svgFontSize.text}rem`};
  font-family: var(--font-noto-sans);
  color: rgba(59, 59, 59, 1);
`;

export default React.memo(ColumnChartSmallMultiple);
