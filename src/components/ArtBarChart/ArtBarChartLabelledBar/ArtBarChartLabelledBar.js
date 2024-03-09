import { AnimationContext } from '@/context/AnimationContext';
import { numberWithSeparator } from '@/utils/calc';
import { COLORS } from '@/utils/constants';
import { splitStringByHalf } from '@/utils/strings';

import React, { useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';

function ArtBarChartLabelledBar({
  xScale,
  yScale,
  katCount,
  kat,
  yScaleBandwidth,
  svgFontSize,
}) {
  const katDivided =
    kat === 'Unfall anderer Art'
      ? ['Unfall', 'anderer Art']
      : splitStringByHalf(kat);

  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    x: xScale(0),
    y: yScale(kat),
    width: xScale(katCount || 0),
    height: yScaleBandwidth,
    textNumberX: xScale(katCount || 0) + 5,
    textNumberY: yScale(kat) + yScaleBandwidth / 2,
    textLabelX: xScale(0),
    textLabelY: yScale(kat) - 22,
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
        fill={COLORS.yellowOrange.medium}
      />
      <animated.text
        y={spring.textLabelY}
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
      >
        <animated.tspan
          dy="0em"
          x={spring.textLabelX}
          textAnchor="start"
          dominantBaseline="auto"
        >
          {katDivided[0] || ''}
        </animated.tspan>
        <animated.tspan
          dy="1.2em"
          x={spring.textLabelX}
          textAnchor="start"
          dominantBaseline="auto"
        >
          {katDivided[1] || ''}
        </animated.tspan>
      </animated.text>
      <animated.text
        x={spring.textNumberX}
        y={spring.textNumberY}
        dominantBaseline="middle"
        textAnchor="start"
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
      >
        {numberWithSeparator(katCount || 0)}
      </animated.text>
    </g>
  );
}

export default ArtBarChartLabelledBar;
