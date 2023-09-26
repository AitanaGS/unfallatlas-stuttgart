import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

function KategBarChartBar({
  xScale,
  yScale,
  variableCount,
  visDataTotal,
  kat,
}) {
  // const springs = useSprings(
  //   kategorienSorted.length,
  //   kategorienSorted.map((k, index) => ({
  //     rectY: yScale(k),
  //     rectWidth: xScale(variableCount.get(k)),
  //     textX: xScale(variableCount.get(k)) + 10,
  //     textY: yScale(k) + yScale.bandwidth() / 2,
  //     config: {
  //       mass: 1,
  //       tension: 120,
  //       friction: 20,
  //     },
  //     // onResume: (props) => {
  //     //   setFinalValues((prev) => [...prev, props.value]);
  //     // },
  //   }))
  // );

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

  // TODO: springs for all props (?)
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

export default KategBarChartBar;
