import React from 'react';

function ChartContainer({ width, height, children }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ border: '1px solid black' }}
    >
      {children}
    </svg>
  );
}

export default ChartContainer;
