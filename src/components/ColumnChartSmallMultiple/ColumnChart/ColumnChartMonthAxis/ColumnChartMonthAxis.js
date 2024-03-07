import React from 'react';

function ColumnChartMonthAxis({
  xScale,
  innerWidth,
  innerHeight,
  margin,
  monate,
  svgFontSize,
}) {
  return (
    <g
      transform={`translate(${margin.left}, ${
        innerHeight + margin.top
      })`}
    >
      <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={'black'} />
      {monate.map((d, i) => {
        return (
          <text
            key={d}
            x={xScale(d) + xScale.bandwidth() / 2}
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={`${svgFontSize.text}rem`}
            role="presentation"
            aria-hidden="true"
          >
            {d[0]}
          </text>
        );
      })}
    </g>
  );
}

export default ColumnChartMonthAxis;
