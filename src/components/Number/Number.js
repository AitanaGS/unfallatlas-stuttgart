import React from 'react';

function Number({ width, height, number, label }) {
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
      <text
        x={0}
        y={0}
        textAnchor="start"
        dominantBaseline={'hanging'}
        style={{ fontSize: '0.8rem' }}
      >
        <tspan x={0} y={height / 4}>
          {label}
        </tspan>
        <tspan x={0} y={height / 4 + 15}>
          {number}
        </tspan>
      </text>
    </svg>
  );
}

export default Number;
