import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

function ArtBarChartBar({
  xScale,
  yScale,
  variableCount,
  visDataTotal,
  kat,
}) {
  // const spring = useSpring({
  //   from: {
  //     // x: xScale(0),
  //     // y: yScale(kat),
  //     // width: xScale(variableCount.get(kat)),
  //     // height: yScale.bandwidth(),
  //     // textX: xScale(variableCount.get(kat)) + 10,
  //     // textY: yScale(kat) + yScale.bandwidth() / 2,
  //   },
  //   to: {
  //     // y: yScale(monthData.get(monat) || 0),
  //     // height: innerHeight - yScale(monthData.get(monat) || 0),
  //     x: xScale(0),
  //     y: yScale(kat),
  //     width: xScale(variableCount.get(kat)),
  //     height: yScale.bandwidth(),
  //     textX: xScale(variableCount.get(kat)) + 10,
  //     textY: yScale(kat) + yScale.bandwidth() / 2,
  //     // height: Math.max(
  //     //   innerHeight - yScale(monthData.get(monat) || 0),
  //     //   0
  //     // ),
  //     // y: Math.min(yScale(monthData.get(monat) || 0), innerHeight),
  //     // height: Math.max(
  //     //   innerHeight - yScale(monthData.get(monat) || 0),
  //     //   0
  //     // ),
  //   },
  //   // config: {
  //   //   friction: 10,
  //   // },
  //   config: {
  //     mass: 1,
  //     tension: 120,
  //     friction: 20,
  //   },
  // });

  const spring = useSpring({
    x: xScale(0),
    y: yScale(kat),
    width: xScale(variableCount.get(kat)),
    height: yScale.bandwidth(),
    textX: xScale(variableCount.get(kat)) + 10,
    textY: yScale(kat) + yScale.bandwidth() / 2,
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
    },
  });

  return (
    variableCount.get(kat) > 0 && (
      <g>
        <animated.rect
          // x={xScale(0)}
          // y={yScale(d)}
          // width={xScale(variableCount.get(d))}
          // height={yScale.bandwidth()}
          x={spring.x}
          y={spring.y}
          width={spring.width}
          height={spring.height}
          fill="#69b3a2"
        />
        <animated.text
          // x={xScale(variableCount.get(d)) + 10}
          // y={yScale(d) + yScale.bandwidth() / 2}
          x={spring.textX}
          y={spring.textY}
          style={{ fontSize: '0.8rem' }}
        >
          {variableCount.get(kat)}
          {/* {`${Math.round(
            (variableCount.get(kat) / visDataTotal) * 100
          )} %`} */}
        </animated.text>
      </g>
    )
  );
}

export default ArtBarChartBar;
