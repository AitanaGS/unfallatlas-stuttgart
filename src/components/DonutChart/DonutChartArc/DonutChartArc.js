'use client';
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useContext,
} from 'react';
import {
  useSprings,
  animated,
  useSpring,
  SpringValue,
} from '@react-spring/web';
import { pie, arc } from 'd3-shape';
// import { SpringConfigContext } from '@/contextProvider/SpringConfigContextProvider';
import { AnimationContext } from '@/context/AnimationContext';

function DonutChartArc({ arcDatum, radius, fillColor, strokeColor }) {
  const arcPathGenerator = arc();

  // const springConfig = React.useContext(SpringConfigContext);
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    to: {
      pos: [arcDatum.startAngle, arcDatum.endAngle],
    },
    // config: { mass: 1, tension: 120, friction: 20 },
    config: springConfig,
    immediate: reduceMotion,
  });

  return (
    <animated.path
      d={spring.pos.to((start, end) => {
        return arcPathGenerator({
          innerRadius: radius / 2, // 100 40
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
