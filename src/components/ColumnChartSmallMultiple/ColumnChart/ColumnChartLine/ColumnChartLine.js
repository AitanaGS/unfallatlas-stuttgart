import React, { useEffect, useState, useContext } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { COLORS } from '../../../../utils/constants';
// import { SpringConfigContext } from '@/contextProvider/SpringConfigContextProvider';
import { AnimationContext } from '@/context/AnimationContext';

function ColumnChartLine({
  yScale,
  meanMonthData,
  innerWidth,
  innerHeight,
}) {
  // const springConfig = React.useContext(SpringConfigContext);
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    from: {},
    to: {
      y1: yScale(meanMonthData) || innerHeight,
      y2: yScale(meanMonthData) || innerHeight,
    },
    config: springConfig,
    immediate: reduceMotion,
  });

  // const spring = useSpring({
  //   from: {},
  //   to: async (next, cancel) => {
  //     const y1 = yScale(meanMonthData) || innerHeight;
  //     const y2 = yScale(meanMonthData) || innerHeight;

  //     await next({ y1, y2, config: springConfig }); // Smooth transition for non-reduced motion
  //     if (reduceMotion) {
  //       await next({ immediate: true }); // Apply properties immediately for reduced motion
  //     }
  //   },
  //   config: config.default, // Default config for smoother transition
  // });

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
        // y1={
        //   reduceMotion
        //     ? yScale(meanMonthData) || innerHeight
        //     : spring.y1
        // }
        y1={spring.y1}
        x2={innerWidth}
        // y2={
        //   reduceMotion
        //     ? yScale(meanMonthData) || innerHeight
        //     : spring.y2
        // }
        y2={spring.y2}
        stroke={COLORS.gray.dark}
        strokeWidth="2"
      />
    )
  );
}

export default ColumnChartLine;
