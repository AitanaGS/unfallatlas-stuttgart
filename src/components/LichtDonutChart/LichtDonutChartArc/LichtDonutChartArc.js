'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  useSprings,
  animated,
  useSpring,
  SpringValue,
} from '@react-spring/web';
import { pie, arc } from 'd3-shape';

const LichtDonutChartArc = ({ arcDatum, radius, color }) => {
  const arcPathGenerator = arc();

  const spring = useSpring({
    to: {
      pos: [arcDatum.startAngle, arcDatum.endAngle],
    },
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
    />
  );
};

export default LichtDonutChartArc;
