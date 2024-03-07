import { AnimationContext } from '@/context/AnimationContext';
import { COLORS } from '@/utils/constants';

import React, { useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';

function ColumnChartLine({
  yScale,
  innerWidth,
  innerHeight,
  meanMonthData,
}) {
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

  return (
    meanMonthData && (
      <animated.line
        x1={0}
        y1={spring.y1}
        x2={innerWidth}
        y2={spring.y2}
        stroke={COLORS.gray.dark}
        strokeWidth="2"
      />
    )
  );
}

export default ColumnChartLine;
