import React from 'react';

function WeekHourAxisX({
  xScale,
  margin,
  kat,
  katLabel,
  svgFontSize,
}) {
  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {kat.map((d, i) => (
        <text
          key={d}
          x={xScale(d) + xScale.bandwidth() / 2}
          y={-5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={`${svgFontSize.text}rem`}
          role="presentation"
          aria-hidden="true"
        >
          <tspan>{katLabel[i]}</tspan>
        </text>
      ))}
    </g>
  );
}

export default WeekHourAxisX;
