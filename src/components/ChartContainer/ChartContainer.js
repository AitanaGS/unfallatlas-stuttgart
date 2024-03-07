import React, { forwardRef } from 'react';

function ChartContainer({ width, height, descId, children }, ref) {
  return (
    <div ref={ref}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        role="figure"
        aria-labelledby={`${descId}`}
        tabIndex={0}
      >
        {children}
      </svg>
    </div>
  );
}

export default React.memo(forwardRef(ChartContainer));
