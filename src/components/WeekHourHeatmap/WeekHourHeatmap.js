'use client';
import React from 'react';
import { scaleBand, scaleSequential } from 'd3-scale';
import {
  interpolateOranges,
  interpolateReds,
} from 'd3-scale-chromatic';
import { min, max, least, greatest, extent } from 'd3-array';
import WeekHourAxisX from './WeekHourAxisX';
import WeekHourAxisY from './WeekHourAxisY';
import ChartContainer from '../ChartContainer';
// import { useChartDimensions } from '../../hooks/useChartDimensions';
// import '../../hooks/useChartDimensions';
import useChartDimensions from '../../hooks/useChartDimensions';
import styled from 'styled-components';
import WeekHourRect from './WeekHourRect';

// const chartSettings = {
//   marginTop: 40,
//   marginRight: 5,
//   marginBottom: 5,
//   marginLeft: 100,
//   // width: 360, // 360
//   height: 300, // 300
// };

function WeekHourHeatmap({ visData, weekHourCount, dashboardWidth }) {
  // const [ref, dms] = useChartDimensions(chartSettings);

  // console.log('chartDimension', dms);
  // console.log('width', dms.width);
  // console.log('innerwidt', dms.innerWidth);

  const width = dashboardWidth; // 360
  const height = 300;

  const margin = {
    top: 40,
    right: 5,
    bottom: 5,
    left: 100,
  };

  const innerWidth = width - margin.right - margin.left;

  const innerHeight = height - margin.top - margin.bottom;

  const weekSorted = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag',
  ];

  const hourSorted =
    dashboardWidth > 400
      ? ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr']
      : ['0-6 Uhr', '6-12', '12-18', '18-0'];

  const hourScale = scaleBand()
    .domain(hourSorted)
    .range([0, innerWidth]) // dms.innerWidth
    .padding(0.05)
    .paddingOuter(0.1);

  const weekScale = scaleBand()
    .domain(weekSorted)
    .range([0, innerHeight]) // dms.innerHeight
    .padding(0.1)
    .paddingOuter(0.1);

  // const counts = Array.from(weekHourCount.values())
  //   .flatMap((innerMap) => Array.from(innerMap.values()))
  //   .flat();

  // const extentCounts = extent(counts);

  const counts = Object.values(weekHourCount)
    .map((innerObj) => Object.values(innerObj))
    .flat();

  const extentCounts = [0, max(counts)]; //extent(counts);
  const extentCountsZero = [0, 1];

  // console.log(extent(counts));

  const colorScale = scaleSequential(interpolateOranges).domain(
    extentCounts[1] === 0 ? extentCountsZero : extentCounts
  );

  // TODO: colorscale starting with 0 (not within count), zero instead of na (in R) (s.u.)
  // TODO: zero instead of na (in R)?
  // TODO: colorscale wenn alle 0 sollte weiss sein
  // TODO: colorscale von 0 bis max, statt extent (siehe number)
  // TODO: check if useChartDimensions necessary

  return (
    // <ChartWrapper ref={ref}>
    // <ChartContainer width={dms.width} height={dms.height} ref={ref}>
    <ChartContainer width={width} height={height}>
      <WeekHourAxisX
        xScale={hourScale}
        innerWidth={innerWidth}
        margin={margin}
        kat={hourSorted}
      />
      <WeekHourAxisY
        yScale={weekScale}
        innerWidth={innerWidth}
        margin={margin}
        kat={weekSorted}
      />
      {/* <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}> */}
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {weekSorted.map((d, i) => {
          return hourSorted.map((e, i) => {
            return (
              <WeekHourRect
                key={`${d}${e}`}
                hour={e}
                week={d}
                hourScale={hourScale}
                weekScale={weekScale}
                colorScale={colorScale}
                weekHourCount={weekHourCount}
                extentCounts={extentCounts}
              />
              // <g key={`${d}${e}`}>
              //   <rect
              //     x={hourScale(e)}
              //     y={weekScale(d)}
              //     width={hourScale.bandwidth()}
              //     height={weekScale.bandwidth()}
              //     style={{
              //       // stroke: 'blue',
              //       // strokeWidth: '2px',
              //       fill:
              //         colorScale(weekHourCount[d]?.[e] || 0) ||
              //         'white',
              //       // fill:
              //       //   colorScale(weekHourCount.get(d).get(e)) ||
              //       //   'white',
              //       // fill: 'transparent',
              //     }}
              //   />
              //   {/* <text
              //     x={hourScale(e)}
              //     y={weekScale(d) + weekScale.bandwidth() / 2}
              //     fill={
              //       (weekHourCount[d]?.[e] || 0) > extentCounts[1] / 2
              //         ? 'white'
              //         : 'black'
              //     }
              //     // fill={
              //     //   weekHourCount.get(d).get(e) > extentCounts[1] / 2
              //     //     ? 'white'
              //     //     : 'black'
              //     // }
              //   >
              //     {d}
              //   </text>
              //   <text
              //     x={hourScale(e) + 5}
              //     y={weekScale(d) + weekScale.bandwidth() / 2 + 10}
              //     fill={
              //       (weekHourCount[d]?.[e] || 0) > extentCounts[1] / 2
              //         ? 'white'
              //         : 'black'
              //     }
              //     // fill={
              //     //   weekHourCount.get(d).get(e) > extentCounts[1] / 2
              //     //     ? 'white'
              //     //     : 'black'
              //     // }
              //   >
              //     {e}
              //   </text> */}
              //   <text
              //     x={hourScale(e) + hourScale.bandwidth() / 2}
              //     y={weekScale(d) + weekScale.bandwidth() / 2}
              //     textAnchor="middle"
              //     dominantBaseline="middle"
              //     fill={
              //       (weekHourCount[d]?.[e] || 0) > extentCounts[1] / 2
              //         ? 'white'
              //         : 'black'
              //     }
              //     // fill={
              //     //   weekHourCount.get(d).get(e) > extentCounts[1] / 2
              //     //     ? 'white'
              //     //     : 'black'
              //     // }
              //   >
              //     {/* {weekHourCount.get(d).get(e) || 0} */}
              //     {weekHourCount[d]?.[e] || 0}
              //   </text>
              // </g>
            );
          });
        })}
      </g>
    </ChartContainer>
    // </ChartWrapper>
  );
}

// const ChartWrapper = styled.div`
//   background-color: blue;
// `;

export default WeekHourHeatmap;
// export default forwardRef(WeekHourHeatmap);

// // const LogoWrapper = styled.div`
// //   //background-color: blue;
// // `;
