import React, { useEffect, useRef, useMemo } from 'react';
import ChartContainer from '../ChartContainer';
import { scaleTime, scaleLinear, scaleBand } from 'd3-scale';
import { extent, rollup, max, mean, median } from 'd3-array';
import { line, curve, curveMonotoneX, curveBasis } from 'd3-shape';
import { select, selectAll } from 'd3-selection';
import LineChartTimeAxis from '../LineChartTimeAxis';
import ColumnChartMonthAxis from '../ColumnChartMonthAxis';
import ColumnChartValueAxis from '../ColumnChartValueAxis';

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

function ColumnChart({
  yearVisData,
  year,
  setMaxValueMap,
  maxValue,
  maxValueMap,
}) {
  const width = 150;
  const height = 100;
  const margin = {
    top: 20,
    right: 5,
    bottom: 15,
    left: 30,
  };

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  // var monthData = rollup(
  //   yearVisData,
  //   (v) => v.length, // Aggregation function: count the length of each group
  //   (d) => d.monatn // Grouping key: the "datum" property representing the month
  // );

  const monthData = useMemo(
    () =>
      rollup(
        yearVisData,
        (v) => v.length,
        (d) => d.monatn
      ),
    [yearVisData]
  );

  const maxMonthData = max(Array.from(monthData.values()));
  const meanMonthData = mean(Array.from(monthData.values()));
  // const medianMonthData = median(Array.from(monthData.values()));

  useEffect(() => {
    setMaxValueMap(maxValueMap.set(year, maxMonthData));
  }, [maxMonthData, setMaxValueMap, year, maxValueMap]); // , yearVisData

  const xScale = scaleBand()
    .domain(monate) // kategorienSorted
    .range([0, innerWidth])
    .padding(0.1);
  // .padding(0.4);

  const yScale = scaleLinear()
    .domain([0, maxValue]) // maxMonthData dataTotal
    .range([innerHeight, 0])
    .nice();

  // const kategorienSorted = [
  //   'Unfall mit Getöteten',
  //   'Unfall mit Schwerverletzten',
  //   'Unfall mit Leichtverletzten',
  // ];

  // const monthArray = useMemo(() => {
  //   const unsortedArray = timeDataDates.map((date) => ({
  //     datum: date,
  //     count: aggregatedData.get(date) || 0, // Use 0 if no count exists
  //   }));

  //   // Sort the array by the "datum" property
  //   return unsortedArray.sort((a, b) => a.datum - b.datum);
  // }, [timeDataDates, aggregatedData]); // Recalculate when timeDataDates or aggregatedTimeData changes

  // console.log('month data', monthData);
  // console.log(
  //   'innerheight',
  //   innerHeight,
  //   'yscale',
  //   yScale(innerHeight)
  // );
  return (
    <ChartContainer width={width} height={height}>
      <text
        x={5}
        y={8}
        style={{ fontSize: '0.6rem' }}
        textAnchor="start"
        dominantBaseline={'middle'}
      >
        {year}
      </text>
      <ColumnChartValueAxis
        yScale={yScale}
        margin={margin}
        innerHeight={innerHeight}
        maxMonthData={maxMonthData}
      />
      <ColumnChartMonthAxis
        xScale={xScale}
        innerWidth={innerWidth}
        margin={margin}
        monate={monate}
        innerHeight={innerHeight}
      />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <rect
          width={innerWidth}
          height={innerHeight}
          // border={'2px solid blue'}
          // fill={'none'}
          style={{
            stroke: 'blue',
            strokeWidth: '2px',
            fill: 'transparent',
            // border: '2px solid blue',
            // color: 'transparent',
            // fill: 'transparent',
          }}
        />
        {monate.map((d, i) => (
          <g key={d}>
            {/* console.log(monthData.get(d), yScale(monthData.get(d))) */}
            {/* <rect
              x={xScale(d)}
              y={innerHeight - yScale(monthData.get(d))}
              width={xScale.bandwidth()}
              height={yScale(monthData.get(d))}
              fill="#69b3a2"
            /> */}
            <rect
              x={xScale(d)}
              y={yScale(monthData.get(d) || 0)}
              width={xScale.bandwidth()}
              height={innerHeight - yScale(monthData.get(d) || 0)}
              fill="#69b3a2"
            />
            {/* <text
              x={xScale(d) + xScale.bandwidth() / 2}
              y={yScale(monthData.get(d)) - 10} // Adjust the y-position for the text
              style={{ fontSize: '0.6rem' }}
              textAnchor="middle"
              dominantBaseline={'middle'}
            >
              {monthData.get(d)}
            </text> */}
            {/* <text
              x={xScale(d) + xScale.bandwidth() / 2}
              y={innerHeight - yScale(monthData.get(d)) - 10}
              style={{ fontSize: '0.8rem' }}
              textAnchor="middle"
              dominantBaseline={'middle'}
            >
              {monthData.get(d)}
            </text> */}
          </g>
        ))}
        <line
          x1={0}
          y1={yScale(meanMonthData)}
          x2={innerWidth}
          y2={yScale(meanMonthData)}
          stroke="#69b3a2"
          stroke-width="2"
        />
      </g>
    </ChartContainer>
  );
}

export default ColumnChart;
