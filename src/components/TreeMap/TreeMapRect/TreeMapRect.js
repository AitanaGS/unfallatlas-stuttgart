import { AnimationContext } from '@/context/AnimationContext';
import { numberWithSeparator } from '@/utils/calc';

import React, { useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';

function TreeMapRect({ d, colorScale, svgFontSize }) {
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    x: d.x0,
    y: d.y0,
    y2: d.y0 + 16,
    width: d.x1 - d.x0,
    height: d.y1 - d.y0,
    config: springConfig,
    immediate: reduceMotion,
  });

  return (
    <g>
      <animated.rect
        x={spring.x}
        y={spring.y}
        width={spring.width}
        height={spring.height}
        fill={colorScale(d.data.name)}
      />
      <animated.text
        x={spring.x}
        y={spring.y}
        textAnchor="start"
        dominantBaseline="hanging"
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
      >
        {d.value > 0 ? d.data.name : ''}
      </animated.text>
      <animated.text
        x={spring.x}
        y={spring.y2}
        textAnchor="start"
        dominantBaseline="hanging"
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
      >
        {d.value > 0 ? numberWithSeparator(d.value) : ''}
      </animated.text>
    </g>
  );
}

export default TreeMapRect;
