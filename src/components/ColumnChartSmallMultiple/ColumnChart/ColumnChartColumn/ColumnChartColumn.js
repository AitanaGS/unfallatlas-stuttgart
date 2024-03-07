import { AnimationContext } from '@/context/AnimationContext';
import { COLORS } from '@/utils/constants';

import React, { useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';

function ColumnChartColumn({
  monat,
  innerHeight,
  xScale,
  yScale,
  monthData,
}) {
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    from: {
      y: innerHeight,
      height: 0,
    },
    to: {
      y: yScale(monthData),
      height: innerHeight - yScale(monthData),
    },
    config: springConfig,
    immediate: reduceMotion,
  });

  return (
    <animated.rect
      x={xScale(monat)}
      width={xScale.bandwidth()}
      fill={COLORS.yellowOrange.medium}
      y={spring.y}
      height={
        reduceMotion ? innerHeight - yScale(monthData) : spring.height
      }
    />
  );
}

export default ColumnChartColumn;
