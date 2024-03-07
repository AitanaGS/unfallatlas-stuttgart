import { AnimationContext } from '@/context/AnimationContext';
import { numberWithSeparator } from '@/utils/calc';

import React, { useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';

function KategBarChartBar({
  xScale,
  yScale,
  kategCount,
  kat,
  svgFontSize,
  color,
}) {
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    rectY: yScale(kat),
    rectWidth: xScale(kategCount),
    textX: kategCount > 0 ? xScale(kategCount) + 5 : 20,
    textY: yScale(kat) + yScale.bandwidth() / 2,
    config: springConfig,
    immediate: reduceMotion,
  });

  return (
    <g>
      <animated.rect
        x={xScale(0)}
        y={spring.rectY}
        width={spring.rectWidth}
        height={yScale.bandwidth()}
        fill={color}
      />
      <animated.text
        x={spring.textX}
        y={spring.textY}
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
      >
        {numberWithSeparator(kategCount)}
      </animated.text>
    </g>
  );
}

export default KategBarChartBar;
