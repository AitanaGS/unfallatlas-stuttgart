import { AnimationContext } from '@/context/AnimationContext';

import React, { useMemo, useContext } from 'react';
import { useSprings, animated } from '@react-spring/web';

function ColumnChartValueAxis({
  yScale,
  margin,
  innerHeight,
  maxValue,
  svgFontSize,
}) {
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const ticks = useMemo(() => {
    return yScale.ticks(maxValue > 5 ? 4 : 2).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale, maxValue]);

  const springs = useSprings(
    ticks.length,
    ticks.map(({ value, yOffset }) => ({
      y: yOffset,
      value: value,
      config: springConfig,
      immediate: reduceMotion,
    }))
  );

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
      {springs.map((props, i) => {
        return (
          <animated.text
            key={ticks[i].value}
            x={-5}
            y={props.y}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={`${svgFontSize.text}rem`}
            role="presentation"
            aria-hidden="true"
          >
            {ticks[i].value < 1 && ticks[i].value > 0
              ? null
              : ticks[i].value}
          </animated.text>
        );
      })}
    </g>
  );
}

export default ColumnChartValueAxis;
