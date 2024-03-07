import React from 'react';

function WeekHourAxisY({ yScale, margin, kat, svgFontSize }) {
  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {kat.map((d) => (
        <text
          key={d}
          x={-5}
          y={yScale(d) + yScale.bandwidth() / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={`${svgFontSize.text}rem`}
          role="presentation"
          aria-hidden="true"
        >
          <tspan>{d}</tspan>
        </text>
      ))}
    </g>
  );
}

export default WeekHourAxisY;
