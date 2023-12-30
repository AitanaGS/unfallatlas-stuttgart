'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  useSprings,
  animated,
  useSpring,
  SpringValue,
} from '@react-spring/web';
import { pie, arc } from 'd3-shape';
import { COLORS } from '../../../utils/constants';

const LichtDonutChartArc = ({ arcDatum, radius, color }) => {
  const arcPathGenerator = arc();

  const spring = useSpring({
    to: {
      pos: [arcDatum.startAngle, arcDatum.endAngle],
    },
    config: { mass: 1, tension: 120, friction: 20 },
  });

  return (
    <animated.path
      d={spring.pos.to((start, end) => {
        return arcPathGenerator({
          innerRadius: 100, // 40
          outerRadius: radius,
          startAngle: start,
          endAngle: end,
        });
      })}
      fill={color}
      stroke={COLORS.white}
    />
  );
};

export default LichtDonutChartArc;
