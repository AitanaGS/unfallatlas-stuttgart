'use client';
import React, { useMemo, useEffect, useCallback } from 'react';
import { scaleBand, scaleSequential, scaleLinear } from 'd3-scale';
import {
  interpolateOranges,
  interpolateReds,
  interpolateYlOrBr,
} from 'd3-scale-chromatic';
import { min, max, least, greatest, extent, rollup } from 'd3-array';
import WeekHourAxisX from './WeekHourAxisX';
import WeekHourAxisY from './WeekHourAxisY';
import ChartContainer from '../ChartContainer';
// import { useChartDimensions } from '../../hooks/useChartDimensions';
// import '../../hooks/useChartDimensions';
import useChartDimensions from '../../hooks/useChartDimensions';
import styled from 'styled-components';
import WeekHourRect from './WeekHourRect';
// import useRolledUpMapTwoVariables from '@/hooks/useRolledUpMapTwoVariables';
import useFixedRolledUpMapTwoVariables from '@/hooks/useFixedRolledUpMapTwoVariables';

// const chartSettings = {
//   marginTop: 40,
//   marginRight: 5,
//   marginBottom: 5,
//   marginLeft: 100,
//   // width: 360, // 360
//   height: 300, // 300
// };

const weekSorted = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
];

// const hourSorted =
//   chartWidth > 400
//     ? ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr']
//     : ['0-6 Uhr', '6-12', '12-18', '18-0'];
const hourSorted = ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr'];

function WeekHourHeatmap({
  visData,
  chartWidth,
  // smallMobileBreakpoint,
  svgFontSize,
  chartWidthDomain,
}) {
  // const [ref, dms] = useChartDimensions(chartSettings);

  // console.log('chartDimension', dms);
  // console.log('width', dms.width);
  // console.log('innerwidt', dms.innerWidth);

  const width = chartWidth; // 360
  const height = 300;

  const marginLeftScale = scaleLinear()
    .domain(chartWidthDomain) // based on chartWidth
    //.domain([0.75, 1]) //based on FontSize in rem
    .range([75, 100])
    .clamp(true);

  const margin = useMemo(() => {
    return {
      top: 45, // 40
      right: 5,
      bottom: 5,
      left: marginLeftScale(chartWidth), // 100
    };
  }, [chartWidth, marginLeftScale]);

  // const margin = {
  //   top: 45, // 40
  //   right: 5,
  //   bottom: 5,
  //   left: 100, // 100
  // };

  const innerWidth = width - margin.right - margin.left;

  const innerHeight = height - margin.top - margin.bottom;

  // const weekSorted = [
  //   'Montag',
  //   'Dienstag',
  //   'Mittwoch',
  //   'Donnerstag',
  //   'Freitag',
  //   'Samstag',
  //   'Sonntag',
  // ];

  // // const hourSorted =
  // //   chartWidth > 400
  // //     ? ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr']
  // //     : ['0-6 Uhr', '6-12', '12-18', '18-0'];
  // const hourSorted = ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr'];

  // const hourLabel =
  //   chartWidth > 400
  //     ? ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr']
  //     : ['0-6 Uhr', '6-12', '12-18', '18-0'];
  const hourLabel = useMemo(() => {
    const label =
      chartWidth > 400
        ? ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr']
        : chartWidth > 300
        ? ['0-6 Uhr', '6-12', '12-18', '18-0']
        : ['0-6', '6-12', '12-18', '18-0'];
    return label;
  }, [chartWidth]);

  const hourScale = useMemo(() => {
    return scaleBand()
      .domain(hourSorted)
      .range([0, innerWidth]) // dms.innerWidth
      .padding(0.05)
      .paddingOuter(0.1);
  }, [innerWidth]);

  const weekScale = useMemo(() => {
    return scaleBand()
      .domain(weekSorted)
      .range([0, innerHeight]) // dms.innerHeight
      .padding(0.1)
      .paddingOuter(0.1);
  }, [innerHeight]);

  // const uniqueWeekdays = [
  //   'Montag',
  //   'Dienstag',
  //   'Mittwoch',
  //   'Donnerstag',
  //   'Freitag',
  //   'Samstag',
  //   'Sonntag',
  // ];

  // const uniqueTimes = [
  //   ...new Set(
  //     visData.map((d) => (d.options ? d.options.data.zeit : d.zeit))
  //   ),
  // ];

  // const uniqueTimes = [
  //   '0-6 Uhr',
  //   '6-12 Uhr',
  //   '12-18 Uhr',
  //   '18-0 Uhr',
  // ];

  // const counts = Array.from(weekHourCount.values())
  //   .flatMap((innerMap) => Array.from(innerMap.values()))
  //   .flat();

  // const extentCounts = extent(counts);

  // const weekHourCount = useMemo(() => {
  //   // const uniqueWeekdays = [
  //   //   ...new Set(
  //   //     visData.map((d) =>
  //   //       d.options ? d.options.data.wochentag : d.wochentag
  //   //     )
  //   //   ),
  //   // ];

  //   // const uniqueWeekdays = [
  //   //   'Montag',
  //   //   'Dienstag',
  //   //   'Mittwoch',
  //   //   'Donnerstag',
  //   //   'Freitag',
  //   //   'Samstag',
  //   //   'Sonntag',
  //   // ];

  //   // const uniqueTimes = [
  //   //   ...new Set(
  //   //     visData.map((d) => (d.options ? d.options.data.zeit : d.zeit))
  //   //   ),
  //   // ];

  //   // const uniqueTimes = [
  //   //   '0-6 Uhr',
  //   //   '6-12 Uhr',
  //   //   '12-18 Uhr',
  //   //   '18-0 Uhr',
  //   // ];

  //   const resultMap = new Map();

  //   weekSorted.forEach((day) => {
  //     resultMap.set(day, new Map());

  //     hourSorted.forEach((hour) => {
  //       resultMap.get(day).set(hour, 0);
  //     });
  //   });

  //   const rolledUpMap = rollup(
  //     visData,
  //     (v) => v.length || 0, // Count instances
  //     (d) => d.wochentag, // Group by year
  //     (d) => d.zeit // Group by month name
  //   );

  //   // const nestedObj = uniqueWeekdays.reduce((acc, weekday) => {
  //   //   acc[weekday] = uniqueTimes.reduce((innerAcc, time) => {
  //   //     innerAcc[time] = 0; // Initialize with 0 cases
  //   //     return innerAcc;
  //   //   }, {});
  //   //   return acc;
  //   // }, {});

  //   // // Populate nestedObj with actual counts
  //   // visData.forEach((d) => {
  //   //   const weekday = d.options
  //   //     ? d.options.data.wochentag
  //   //     : d.wochentag;
  //   //   const time = d.options ? d.options.data.zeit : d.zeit;
  //   //   nestedObj[weekday][time]++;
  //   // });

  //   rolledUpMap.forEach((dayMap, day) => {
  //     dayMap.forEach((count, time) => {
  //       resultMap.get(day).set(time, count);
  //     });
  //   });

  //   return resultMap;
  // }, [visData]);

  // const rolledUpMap = useRolledUpMapTwoVariables(
  //   visData,
  //   'wochentag',
  //   'zeit'
  // );

  // const weekHourCount = useMemo(() => {
  //   const resultMap = new Map();

  //   weekSorted.forEach((day) => {
  //     resultMap.set(day, new Map());

  //     hourSorted.forEach((hour) => {
  //       resultMap.get(day).set(hour, 0);
  //     });
  //   });

  //   // const rolledUpMap = rollup(
  //   //   visData,
  //   //   (v) => v.length || 0, // Count instances
  //   //   (d) => d.wochentag, // Group by year
  //   //   (d) => d.zeit // Group by month name
  //   // );

  //   rolledUpMap.forEach((dayMap, day) => {
  //     dayMap.forEach((count, time) => {
  //       resultMap.get(day).set(time, count);
  //     });
  //   });

  //   return resultMap;
  // }, [rolledUpMap]);

  // const counts = Object.values(weekHourCount)
  //   .map((innerObj) => Object.values(innerObj))
  //   .flat();

  const weekHourCount = useFixedRolledUpMapTwoVariables(
    visData,
    'wochentag',
    'zeit',
    weekSorted,
    hourSorted
    // (variableOne = 'wochentag'),
    // (variableTwo = 'zeit'),
    // (kategorienSortedOne = weekSorted),
    // (kategorienSortedTwo = hourSorted)
  );

  // console.log('weekHourCount', weekHourCount);
  // console.log(
  //   'weekhourcount example',
  //   weekHourCount.get('Freitag').get('0-6 Uhr')
  // );

  const counts = useMemo(() => {
    const countsArray = Array.from(
      weekHourCount.values(),
      (innerMap) => Array.from(innerMap.values())
    ).flat();

    return countsArray;
  }, [weekHourCount]);

  // console.log('weekhourcount', weekHourCount, 'counts', counts);

  const extentCounts = useMemo(() => {
    return [0, max(counts)];
  }, [counts]); //extent(counts);
  // const extentCountsZero = [0, 1];

  // console.log(extent(counts));

  // const colorScale = scaleSequential(interpolateYlOrBr).domain(
  //   extentCounts[1] === 0 ? [0, 1] : extentCounts
  // ); // interpolateYlOrBr // interpolateOranges

  const colorScale = useMemo(() => {
    // const extentCounts = [0, max(counts)];
    return scaleSequential(interpolateYlOrBr).domain(
      extentCounts[1] === 0 ? [0, 1] : extentCounts
    );
  }, [extentCounts]);

  // TODO: colorscale starting with 0 (not within count), zero instead of na (in R) (s.u.)
  // TODO: zero instead of na (in R)?
  // TODO: colorscale wenn alle 0 sollte weiss sein
  // TODO: colorscale von 0 bis max, statt extent (siehe number)
  // TODO: check if useChartDimensions necessary

  // console.log('weekhourcount', weekHourCount);

  return (
    // <ChartWrapper ref={ref}>
    // <ChartContainer width={dms.width} height={dms.height} ref={ref}>
    <ChartContainer
      width={width}
      height={height}
      descId={'weekHourHeatmapDesc'}
    >
      <desc id="weekHourHeatmapDesc">
        Farbige Wärmetabelle zur Anzahl der Unfälle nach Wochentag und
        Uhrzeit.
        {weekSorted.map((day, i) => {
          return hourSorted.map((hour, i) => {
            return `${day}, ${hour}: ${weekHourCount
              .get(day)
              .get(hour)}, `;
          });
        })}
      </desc>
      <text
        // x={10}
        x={0}
        y={4}
        textAnchor="auto"
        dominantBaseline="hanging"
        className="svg-title"
        fontSize={`${svgFontSize.title}rem`}
        role="presentation"
        aria-hidden="true"
      >
        Wochentag und Uhrzeit
      </text>
      <WeekHourAxisX
        xScale={hourScale}
        innerWidth={innerWidth}
        margin={margin}
        kat={hourSorted}
        katLabel={hourLabel}
        svgFontSize={svgFontSize}
      />
      <WeekHourAxisY
        yScale={weekScale}
        innerWidth={innerWidth}
        margin={margin}
        kat={weekSorted}
        svgFontSize={svgFontSize}
      />
      {/* <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}> */}
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {weekSorted.map((day, i) => {
          return hourSorted.map((hour, i) => {
            return (
              <WeekHourRect
                key={`${day}${hour}`}
                hour={hour}
                week={day}
                hourScale={hourScale}
                weekScale={weekScale}
                colorScale={colorScale}
                // weekHourCount={weekHourCount}
                count={weekHourCount.get(day).get(hour)}
                extentCounts={extentCounts}
                svgFontSize={svgFontSize}
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

export default React.memo(WeekHourHeatmap);
// export default forwardRef(WeekHourHeatmap);

// // const LogoWrapper = styled.div`
// //   //background-color: blue;
// // `;
