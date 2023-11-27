import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function LichtLollipopChartLine({
  xScale,
  yScale,
  variableCount,
  visDataTotal,
  maxValue,
  kat,
  innerHeight,
}) {
  // const spring = useSpring({
  //   // rectX: xScale(0),
  //   rectY: yScale(kat),
  //   rectWidth: xScale(variableCount.get(kat)),
  //   // rectHeight: yScale.bandwidth(),
  //   textX: xScale(variableCount.get(kat)) + 10,
  //   textY: yScale(kat) + yScale.bandwidth() / 2,
  //   config: {
  //     mass: 1,
  //     tension: 120,
  //     friction: 20,
  //   },
  // });

  // const spring = useSpring({
  //   // rectX: xScale(0),
  //   rectX: xScale(kat),
  //   rectHeight: yScale(variableCount.get(kat)),
  //   // rectHeight: yScale.bandwidth(),
  //   textY: yScale(variableCount.get(kat)) - 10,
  //   textX: xScale(kat) + xScale.bandwidth() / 2,
  //   config: {
  //     mass: 1,
  //     tension: 120,
  //     friction: 20,
  //   },
  // });

  const rectWidth = 8;
  const radius = 8;

  const spring = useSpring({
    from: {
      // y: 0,
      // y: yScale(monthData.get(d) || 0),
      y: innerHeight, // innerHeight
      textY: innerHeight, // innerHeight
      height: 0,
    },
    to: {
      y: yScale(variableCount.get(kat) || 0),
      textY: yScale(variableCount.get(kat) || 0) + radius / 2,
      height: innerHeight - yScale(variableCount.get(kat) || 0),
      // height: Math.max(
      //   innerHeight - yScale(monthData.get(monat) || 0),
      //   0
      // ),
      // y: Math.min(yScale(monthData.get(monat) || 0), innerHeight),
      // height: Math.max(
      //   innerHeight - yScale(monthData.get(monat) || 0),
      //   0
      // ),
    },
    // config: {
    //   friction: 10,
    // },
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
    },
  });

  // const spring = useSpring({
  //   from: {
  //     // y: 0,
  //     // y: yScale(monthData.get(d) || 0),
  //     y: innerHeight, // innerHeight
  //     height: 0,
  //   },
  //   to: {
  //     y: yScale(monthData.get(monat) || 0),
  //     height: innerHeight - yScale(monthData.get(monat) || 0),
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

  // TODO: abstract bar chart

  // console.log(
  //   'lollipop variablecount, kat',
  //   variableCount,
  //   kat,
  //   yScale(variableCount.get(kat))
  // );

  return (
    variableCount.get(kat) > 0 && (
      <g>
        <animated.rect
          // x={spring.rectX}
          // y={yScale(innerHeight)}
          // height={spring.rectHeight}
          // width={xScale.bandwidth()}
          // fill="#69b3a2"
          x={xScale(kat) + xScale.bandwidth() / 2}
          y={spring.y}
          height={spring.height}
          // width={xScale.bandwidth()}
          width={rectWidth}
          fill="#69b3a2"
        />
        <animated.circle
          // x={spring.rectX}
          // y={yScale(innerHeight)}
          // height={spring.rectHeight}
          // width={xScale.bandwidth()}
          // fill="#69b3a2"
          cx={xScale(kat) + xScale.bandwidth() / 2 + rectWidth / 2}
          cy={spring.y}
          r={radius}
          // width={xScale.bandwidth()}
          // width="8"
          fill="#69b3a2"
        />
        <animated.text
          // x={xScale(kat) + xScale.bandwidth() / 2 + rectWidth / 2}
          x={xScale(kat) + xScale.bandwidth() / 2 + rectWidth + 10}
          y={spring.textY}
          style={{ fontSize: '0.8rem' }}
          textAnchor="start"
        >
          {variableCount.get(kat)}
        </animated.text>
      </g>
    )
  );
}

export default LichtLollipopChartLine;
