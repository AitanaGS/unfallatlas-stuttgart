import { AnimationContext } from '@/context/AnimationContext';

import React, { useContext } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { arc } from 'd3-shape';

function DonutChartArc({ arcDatum, radius, fillColor, strokeColor }) {
  const arcPathGenerator = arc();

  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    to: {
      pos: [arcDatum.startAngle, arcDatum.endAngle],
    },
    config: springConfig,
    immediate: reduceMotion,
  });

  return (
    <animated.path
      d={spring.pos.to((start, end) => {
        return arcPathGenerator({
          innerRadius: radius / 2,
          outerRadius: radius,
          startAngle: start,
          endAngle: end,
        });
      })}
      fill={fillColor}
      stroke={strokeColor}
    />
  );
}

export default DonutChartArc;
