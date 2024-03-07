import { AnimationContext } from '@/context/AnimationContext';
import { numberWithSeparator } from '@/utils/calc';

import React, { useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';

function WeekHourRect({
  hour,
  week,
  hourScale,
  weekScale,
  colorScale,
  count,
  extentCounts,
  svgFontSize,
}) {
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    rectWidth: hourScale.bandwidth(),
    config: springConfig,
    immediate: reduceMotion,
  });

  return (
    <g>
      <animated.rect
        x={hourScale(hour)}
        y={weekScale(week)}
        height={weekScale.bandwidth()}
        width={spring.rectWidth}
        style={{
          fill: colorScale(count) || 'white',
          transition: 'fill 200ms ease',
        }}
      />
      <animated.text
        x={hourScale(hour) + hourScale.bandwidth() / 2}
        y={weekScale(week) + weekScale.bandwidth() / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={
          count > extentCounts[1] / 2
            ? 'rgba(255, 238, 199, 1)'
            : 'rgba(53, 49, 40, 1)'
        }
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
      >
        {numberWithSeparator(count)}
      </animated.text>
    </g>
  );
}

export default WeekHourRect;
