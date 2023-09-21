import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

function ColumnChartLine({ yScale, meanMonthData, innerWidth }) {
  const spring = useSpring({
    from: {
      // y: 0,
      // y: yScale(monthData.get(d) || 0),
      // y: innerHeight, // innerHeight
      // height: 0,
    },
    to: {
      // y: yScale(monthData.get(monat) || 0),
      // height: innerHeight - yScale(monthData.get(monat) || 0),
      y1: yScale(meanMonthData || 0),
      y2: yScale(meanMonthData || 0),
    },
    // config: {
    //   friction: 100,
    // },
  });

  return (
    <animated.line
      x1={0}
      // y1={yScale(meanMonthData)}
      y1={spring.y1}
      x2={innerWidth}
      // y2={yScale(meanMonthData)}
      y2={spring.y2}
      stroke="#69b3a2"
      strokeWidth="2"
    />
  );
}

export default ColumnChartLine;
