import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { COLORS } from '../../../../utils/constants';

function ColumnChartLine({
  yScale,
  meanMonthData,
  innerWidth,
  innerHeight,
}) {
  const spring = useSpring({
    from: {
      // y: 0,
      // y: yScale(monthData.get(d) || 0),
      // y: innerHeight, // innerHeight
      // height: 0,
      // y1: yScale(meanMonthData || 0),
      // y2: yScale(meanMonthData || 0),
    },
    to: {
      // y: yScale(monthData.get(monat) || 0),
      // height: innerHeight - yScale(monthData.get(monat) || 0),
      y1: yScale(meanMonthData) || innerHeight, // yScale(meanMonthData || 0)
      y2: yScale(meanMonthData) || innerHeight, // yScale(meanMonthData || 0)
    },
    // config: {
    //   friction: 100,
    // },
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
    },
  });

  // if (
  //   !spring.y1 ||
  //   isNaN(spring.y1) ||
  //   !spring.y2 ||
  //   isNaN(spring.y2)
  // ) {
  //   return null; // Or return a placeholder element
  // }
  // console.log(meanMonthData);

  // console.log(meanMonthData);

  // TODO: warning "Got NaN while animating:"

  return (
    meanMonthData && (
      <animated.line
        x1={0}
        // y1={yScale(meanMonthData)}
        y1={spring.y1}
        x2={innerWidth}
        // y2={yScale(meanMonthData)}
        y2={spring.y2}
        stroke={COLORS.gray.dark}
        strokeWidth="2"
      />
    )
  );
}

export default ColumnChartLine;
