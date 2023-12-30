'use client';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

function ChartContainer({ width, height, children }, ref) {
  return (
    <ChartWrapper ref={ref}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        // style={{ border: '1px solid black' }}
      >
        {children}
      </svg>
    </ChartWrapper>
  );
}

// export default ChartContainer;

const ChartWrapper = styled.div`
  /* background-color: blue; */
  max-width: 500px;
  /* margin: 40px 0px 5px 0px; */
`;

export default forwardRef(ChartContainer);
