'use client';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useSpring, useSprings, animated } from '@react-spring/web';

function AnimatedChartContainer({ width, height, children }, ref) {
  const spring = useSpring({
    height: height,
    // visDataTotal > 0 ? kategorienSorted.length * 60 : 200
    // x: xScale(0),
    // y: yScale(kat),
    // width: xScale(variableCount.get(kat)),
    // // height: yScale.bandwidth(),
    // height: yScaleBandwidth,
    // textNumberX: xScale(variableCount.get(kat)) - 2, // xScale(variableCount.get(kat)) + 3
    // textNumberY: yScale(kat) + yScaleBandwidth / 2, // yScale(kat) + yScaleBandwidth / 2,
    // textLabelX: xScale(0),
    // // textLabelY: yScale(kat) - 8,
    // textLabelY: yScale(kat) - 20,
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
    },
  });
  return (
    <ChartWrapper ref={ref}>
      <animated.svg
        viewBox={`0 0 ${width} ${spring.height}`}
        width={width}
        height={spring.height}
        // style={{ border: '1px solid black' }}
      >
        {children}
      </animated.svg>
    </ChartWrapper>
  );
}

// export default ChartContainer;

const ChartWrapper = styled.div`
  /* background-color: blue; */
  max-width: 500px;
`;

export default forwardRef(AnimatedChartContainer);
