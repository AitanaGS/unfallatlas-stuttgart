import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function WeekHourRect({
  hour,
  week,
  hourScale,
  weekScale,
  colorScale,
  weekHourCount,
  extentCounts,
}) {
  // const spring = useSpring({
  //   // // rectX: xScale(0),
  //   // rectY: yScale(kat),
  //   // rectWidth: xScale(variableCount.get(kat)),
  //   // // rectHeight: yScale.bandwidth(),
  //   // textX: xScale(variableCount.get(kat)) + 10,
  //   // textY: yScale(kat) + yScale.bandwidth() / 2,
  //   rectFill: colorScale(weekHourCount[week]?.[hour] || 0) || 'white',
  //   textFill:
  //     (weekHourCount[week]?.[hour] || 0) > extentCounts[1] / 2
  //       ? 'white'
  //       : 'black',
  //   // text: weekHourCount[week]?.[hour] || 0,
  //   config: {
  //     mass: 1,
  //     tension: 120,
  //     friction: 20,
  //   },
  // });

  return (
    <g>
      <animated.rect
        x={hourScale(hour)}
        y={weekScale(week)}
        width={hourScale.bandwidth()}
        height={weekScale.bandwidth()}
        style={{
          // stroke: 'blue',
          // strokeWidth: '2px',
          // fill: spring.rectFill,
          fill:
            colorScale(weekHourCount[week]?.[hour] || 0) || 'white',
          // fill:
          //   colorScale(weekHourCount.get(d).get(e)) ||
          //   'white',
          // fill: 'transparent',
        }}
      />
      <animated.text
        x={hourScale(hour) + hourScale.bandwidth() / 2}
        y={weekScale(week) + weekScale.bandwidth() / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        // fill={spring.textFill}
        fill={
          (weekHourCount[d]?.[e] || 0) > extentCounts[1] / 2
            ? 'white'
            : 'black'
        }
      >
        {/* {weekHourCount.get(d).get(e) || 0} */}
        {/* {weekHourCount[d]?.[e] || 0} */}
        {weekHourCount[week]?.[hour] || 0}
      </animated.text>
    </g>
  );
}

export default WeekHourRect;
