'use client';
import React from 'react';

function ColumnChartMonthAxis({
  xScale,
  innerWidth,
  margin,
  monate,
  innerHeight,
  svgFontSize,
}) {
  return (
    <g
      transform={`translate(${margin.left}, ${
        innerHeight + margin.top
      })`}
    >
      <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={'black'} />
      {/* {timeDataDates.map((d) => console.log(d))} */}
      {monate.map((d, i) => {
        // const dateObject = parseDate(d);
        return (
          // return (

          <text
            key={d}
            x={xScale(d) + xScale.bandwidth() / 2} // yScale(d) + yScale.bandwidth() / 2
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            // style={{ fontSize: '0.8rem' }}
            fontSize={`${svgFontSize.text}rem`}
          >
            {d[0]}
            {/* {/* {i % 6 == 0 ? (
              <tspan x={xScale(d)} y={10}>{`${formatMonthName(
                d
              )}`}</tspan>
            ) : undefined} */}
            {/* {i % 2 == 0 ? <tspan>{d.monat}</tspan> : undefined} */}
          </text>
          // ) : undefined}
        ); // );
        // undefined;
      })}
    </g>
  );
}

export default ColumnChartMonthAxis;
