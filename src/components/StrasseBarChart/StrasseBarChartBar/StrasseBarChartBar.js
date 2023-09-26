import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function StrasseBarChartBar({
  xScale,
  yScale,
  variableCount,
  visDataTotal,
  kat,
}) {
  const spring = useSpring({
    // rectX: xScale(0),
    rectY: yScale(kat),
    rectWidth: xScale(variableCount.get(kat)),
    // rectHeight: yScale.bandwidth(),
    textX: xScale(variableCount.get(kat)) + 10,
    textY: yScale(kat) + yScale.bandwidth() / 2,
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
    },
  });

  // TODO: check if instead of conditional rendering animated from 0

  return (
    variableCount.get(kat) > 0 && (
      <g>
        <animated.rect
          x={xScale(0)}
          y={spring.rectY}
          width={spring.rectWidth}
          height={yScale.bandwidth()}
          fill="#69b3a2"
        />
        <animated.text
          x={spring.textX}
          y={spring.textY}
          style={{ fontSize: '0.8rem' }}
        >
          {variableCount.get(kat)}
          {/* {`${Math.round(
    (variableCount.get(d) / visDataTotal) * 100
  )} %`} */}
        </animated.text>
      </g>
    )
  );
}

export default StrasseBarChartBar;
