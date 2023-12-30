'use client';
import React from 'react';

function WeekHourAxisX({ xScale, innerWidth, margin, kat }) {
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);
  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {/* <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={'black'} /> */}
      {kat.map((d) => (
        <text
          key={d}
          // x={-5}
          // y={yScale(d) + yScale.bandwidth() / 2}
          x={xScale(d) + xScale.bandwidth() / 2}
          y={-5}
          textAnchor="middle"
          dominantBaseline="middle"
          // style={{ fontSize: '0.8rem' }}
        >
          <tspan>{d}</tspan>
        </text>
      ))}
    </g>
  );
}

export default WeekHourAxisX;
