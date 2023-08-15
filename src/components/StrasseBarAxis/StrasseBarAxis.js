'use client';
import React from 'react';

function StrasseBarAxis({ yScale, innerHeight, margin, kat }) {
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);
  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
      {kat.map((d) => (
        <text
          key={d}
          x={-5}
          y={yScale(d) + yScale.bandwidth() / 2}
          textAnchor="end"
          dominantBaseline="middle"
          style={{ fontSize: '0.8rem' }}
        >
          <tspan>{d}</tspan>
        </text>
      ))}
    </g>
  );
}

export default StrasseBarAxis;
