'use client';
import React from 'react';
import { scaleBand, scaleSequential } from 'd3-scale';
import {
  interpolateOranges,
  interpolateReds,
} from 'd3-scale-chromatic';
import { min, max, least, greatest, extent } from 'd3-array';
import WeekHourAxisX from '../WeekHourAxisX';
import WeekHourAxisY from '../WeekHourAxisY';

function WeekHourHeatmap({ visData, weekHourCount }) {
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

  const weekSorted = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag',
  ];

  const hourSorted = ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr'];

  const hourScale = scaleBand()
    .domain(hourSorted)
    .range([0, innerWidth])
    .padding(0.05)
    .paddingOuter(0.1);

  const weekScale = scaleBand()
    .domain(weekSorted)
    .range([0, innerHeight])
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

  console.log(extent(counts));

  const colorScale = scaleSequential(interpolateOranges).domain(
    extentCounts[1] === 0 ? extentCountsZero : extentCounts
  );

  // TODO: colorscale starting with 0 (not within count), zero instead of na (in R) (s.u.)
  // TODO: zero instead of na (in R)?
  // TODO: colorscale wenn alle 0 sollte weiss sein
  // TODO: colorscale von 0 bis max, statt extent (siehe number)
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ border: '1px solid black' }}
    >
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
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {weekSorted.map((d, i) => {
          return hourSorted.map((e, i) => {
            return (
              <g key={`${d}${e}`}>
                <rect
                  x={hourScale(e)}
                  y={weekScale(d)}
                  width={hourScale.bandwidth()}
                  height={weekScale.bandwidth()}
                  style={{
                    // stroke: 'blue',
                    // strokeWidth: '2px',
                    fill:
                      colorScale(weekHourCount[d]?.[e] || 0) ||
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
                  x={hourScale(e) + hourScale.bandwidth() / 2}
                  y={weekScale(d) + weekScale.bandwidth() / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
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
                  {/* {weekHourCount.get(d).get(e) || 0} */}
                  {weekHourCount[d]?.[e] || 0}
                </text>
              </g>
            );
          });
        })}
      </g>
    </svg>
  );
}

export default WeekHourHeatmap;
