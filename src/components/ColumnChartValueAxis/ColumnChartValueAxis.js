'use client';
import React, { useMemo } from 'react';

function ColumnChartValueAxis({
  yScale,
  margin,
  innerHeight,
  maxMonthData,
}) {
  const ticks = useMemo(() => {
    return yScale.ticks(maxMonthData > 5 ? 4 : 2).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
      {ticks.map(({ value, yOffset }, i) => {
        return (
          <text
            key={value}
            x={-5} // Adjust the horizontal position to move text to the left of the axis
            y={yOffset}
            textAnchor="end" // Align text to the end of the axis
            dominantBaseline="middle"
            style={{ fontSize: '0.6rem' }}
          >
            {value < 1 && value > 0 ? null : value}
          </text>
        );
      })}
      {/* {ticks.map(({ value, yOffset }, i) => {
        return i % 2 === 0 ? (
          <text
            key={value}
            x={-5} // Adjust the horizontal position to move text to the left of the axis
            y={yOffset}
            textAnchor="end" // Align text to the end of the axis
            dominantBaseline="middle"
            style={{ fontSize: '0.6rem' }}
          >
            {value}
          </text>
        ) : undefined;
      })} */}
    </g>
    // <g
    //   transform={`translate(${margin.left}, ${
    //     innerHeight + margin.top
    //   })`}
    // >
    //   <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
    //   {/* {timeDataDates.map((d) => console.log(d))} */}
    //   {ticks.map(({ value, yOffset }) => {
    //     // const dateObject = parseDate(d);
    //     return (
    //       // return (

    //       <text
    //         key={value}
    //         x={0} // yScale(d) + yScale.bandwidth() / 2
    //         y={yOffset}
    //         textAnchor="middle"
    //         dominantBaseline="middle"
    //         style={{ fontSize: '0.6rem' }}
    //       >
    //         {value}
    //         {/* {/* {i % 6 == 0 ? (
    //           <tspan x={xScale(d)} y={10}>{`${formatMonthName(
    //             d
    //           )}`}</tspan>
    //         ) : undefined} */}
    //         {/* {i % 2 == 0 ? <tspan>{d.monat}</tspan> : undefined} */}
    //       </text>
    //       // ) : undefined}
    //     ); // );
    //     // undefined;
    //   })}
    // </g>
  );
}

export default ColumnChartValueAxis;
