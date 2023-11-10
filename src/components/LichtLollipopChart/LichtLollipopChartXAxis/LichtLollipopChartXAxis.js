'use client';
import React from 'react';

function LichtLollipopChartXAxis({
  xScale,
  innerWidth,
  innerHeight,
  margin,
  kat,
}) {
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);
  return (
    <g
      transform={`translate(${margin.left}, ${
        margin.top + innerHeight
      })`}
    >
      <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={'black'} />
      {kat.map((d) => (
        <text
          key={d}
          x={xScale(d) + xScale.bandwidth() / 2}
          y={10}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: '0.8rem' }}
        >
          <tspan>{d}</tspan>
        </text>
      ))}
    </g>
  );
}

export default LichtLollipopChartXAxis;
