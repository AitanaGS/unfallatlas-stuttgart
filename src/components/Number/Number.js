import React from 'react';
import { numberWithSeparator } from '../../utils/calc';

function Number({ width, height, number, label, colorScale, max }) {
  // console.log(
  //   'number',
  //   number,
  //   colorScale ? colorScale(number) : undefined,
  //   colorScale ? colorScale(number || 0) : undefined
  // );
  // TODO: numberwithseparator performance
  // TODO: check number is undefined
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ border: '1px solid black' }}
    >
      {/* <text x={10} y={10}>
        {number}
      </text> */}
      <g>
        <rect
          width={width}
          height={height}
          style={{
            // stroke: 'blue',
            // strokeWidth: '2px',
            fill: colorScale
              ? colorScale(number || 0) || 'white'
              : 'white',
            // fill:
            //   colorScale(weekHourCount.get(d).get(e)) ||
            //   'white',
            // fill: 'transparent',
          }}
        />
        <text
          x={0}
          y={0}
          textAnchor="start"
          dominantBaseline={'hanging'}
          style={{
            fontSize: '0.8rem',
            fontWeight: !colorScale ? 'bold' : 'normal',
          }}
          fill={
            max ? (number > max / 2 ? 'white' : 'black') : 'black'
          }
        >
          <tspan x={0} y={height / 4}>
            {label}
          </tspan>
          <tspan x={0} y={height / 4 + 15}>
            {number !== undefined ? numberWithSeparator(number) : 0}
          </tspan>
        </text>
      </g>
    </svg>
  );
}

export default Number;
