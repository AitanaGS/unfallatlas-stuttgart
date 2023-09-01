'use client';
import React, { useMemo } from 'react';
import { scaleBand, scaleSequential } from 'd3-scale';
import {
  interpolateOranges,
  interpolateReds,
} from 'd3-scale-chromatic';
import { min, max, least, greatest, extent } from 'd3-array';
// import WeekHourAxisX from '../WeekHourAxisX';
// import WeekHourAxisY from '../WeekHourAxisY';
import ChartContainer from '../ChartContainer';
import MonthYearAxisX from '../MonthYearAxisX';
import MonthYearAxisY from '../MonthYearAxisY';

function MonthYearHeatmap({ visData }) {
  const width = 360;
  const height = 300;

  const margin = {
    top: 40,
    right: 5,
    bottom: 5,
    left: 100,
  };

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

  // const hourSorted = ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr'];

  const monthSorted = [
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

  // const uniqueTimes = [
  //   ...new Set(
  //     visData.map((d) => (d.options ? d.options.data.zeit : d.zeit))
  //   ),
  // ];

  const yearSorted = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  const monthYearCount = useMemo(() => {
    // const uniqueWeekdays = [
    //   ...new Set(
    //     visData.map((d) =>
    //       d.options ? d.options.data.wochentag : d.wochentag
    //     )
    //   ),
    // ];

    // const monthSorted = [
    //   'Januar',
    //   'Februar',
    //   'März',
    //   'April',
    //   'Mai',
    //   'Juni',
    //   'Juli',
    //   'August',
    //   'September',
    //   'Oktober',
    //   'November',
    //   'Dezember',
    // ];

    // // const uniqueTimes = [
    // //   ...new Set(
    // //     visData.map((d) => (d.options ? d.options.data.zeit : d.zeit))
    // //   ),
    // // ];

    // const yearSorted = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

    const nestedObj = monthSorted.reduce((acc, month) => {
      acc[month] = yearSorted.reduce((innerAcc, year) => {
        innerAcc[year] = 0; // Initialize with 0 cases
        return innerAcc;
      }, {});
      return acc;
    }, {});

    // Populate nestedObj with actual counts
    visData.forEach((d) => {
      const month = d.options ? d.options.data.monatn : d.monatn;
      const year = d.options ? d.options.data.jahr : d.jahr;
      nestedObj[month][year]++;
    });

    return nestedObj;
  }, [visData]);

  const yearScale = scaleBand()
    .domain(yearSorted)
    .range([0, innerWidth])
    .padding(0.05)
    .paddingOuter(0.1);

  const monthScale = scaleBand()
    .domain(monthSorted)
    .range([0, innerHeight])
    .padding(0.1)
    .paddingOuter(0.1);

  // const counts = Array.from(weekHourCount.values())
  //   .flatMap((innerMap) => Array.from(innerMap.values()))
  //   .flat();

  // const extentCounts = extent(counts);

  const counts = Object.values(monthYearCount)
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
  return (
    <ChartContainer width={width} height={height}>
      <MonthYearAxisX
        xScale={yearScale}
        innerWidth={innerWidth}
        margin={margin}
        kat={yearSorted}
      />
      <MonthYearAxisY
        yScale={monthScale}
        innerWidth={innerWidth}
        margin={margin}
        kat={monthSorted}
      />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {monthSorted.map((d, i) => {
          return yearSorted.map((e, i) => {
            return (
              <g key={`${d}${e}`}>
                <rect
                  x={yearScale(e)}
                  y={monthScale(d)}
                  width={yearScale.bandwidth()}
                  height={monthScale.bandwidth()}
                  style={{
                    // stroke: 'blue',
                    // strokeWidth: '2px',
                    fill:
                      colorScale(monthYearCount[d]?.[e] || 0) ||
                      'white',
                    // fill:
                    //   colorScale(weekHourCount.get(d).get(e)) ||
                    //   'white',
                    // fill: 'transparent',
                  }}
                />
                {/* <text
                  x={hourScale(e)}
                  y={weekScale(d) + weekScale.bandwidth() / 2}
                  fill={
                    (weekHourCount[d]?.[e] || 0) > extentCounts[1] / 2
                      ? 'white'
                      : 'black'
                  }
                  // fill={
                  //   weekHourCount.get(d).get(e) > extentCounts[1] / 2
                  //     ? 'white'
                  //     : 'black'
                  // }
                >
                  {d}
                </text>
                <text
                  x={hourScale(e) + 5}
                  y={weekScale(d) + weekScale.bandwidth() / 2 + 10}
                  fill={
                    (weekHourCount[d]?.[e] || 0) > extentCounts[1] / 2
                      ? 'white'
                      : 'black'
                  }
                  // fill={
                  //   weekHourCount.get(d).get(e) > extentCounts[1] / 2
                  //     ? 'white'
                  //     : 'black'
                  // }
                >
                  {e}
                </text> */}
                <text
                  x={yearScale(e) + yearScale.bandwidth() / 2}
                  y={monthScale(d) + monthScale.bandwidth() / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={
                    (monthYearCount[d]?.[e] || 0) >
                    extentCounts[1] / 2
                      ? 'white'
                      : 'black'
                  }
                  // fill={
                  //   weekHourCount.get(d).get(e) > extentCounts[1] / 2
                  //     ? 'white'
                  //     : 'black'
                  // }
                >
                  {/* {weekHourCount.get(d).get(e) || 0} */}
                  {monthYearCount[d]?.[e] || 0}
                </text>
              </g>
            );
          });
        })}
      </g>
    </ChartContainer>
  );
}

export default MonthYearHeatmap;
