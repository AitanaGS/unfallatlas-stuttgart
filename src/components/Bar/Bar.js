import React from 'react';

function Bar({ x, y, width, height }) {
  // return <circle cx={cx} cy={cy} r={r} />;
  return (
    <rect x={x} y={y} width={width} height={height} fill="#69b3a2" />
  );
}

export default Bar;
