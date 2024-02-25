import React, { useContext } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
// import { SpringConfigContext } from '@/contextProvider/SpringConfigContextProvider';
import { AnimationContext } from '@/context/AnimationContext';

function WeekHourRect({
  hour,
  week,
  hourScale,
  weekScale,
  colorScale,
  count,
  // weekHourCount,
  extentCounts,
  svgFontSize,
}) {
  // console.log(
  //   'hour',
  //   hour,
  //   'week',
  //   week,
  //   'weekHourCount',
  //   weekHourCount,
  //   'extentcounts',
  //   extentCounts,
  //   weekHourCount[week]?.[hour]
  // );
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

  // const springConfig = React.useContext(SpringConfigContext);
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    // // rectX: xScale(0),
    // rectY: yScale(kat),
    // rectWidth: xScale(variableCount.get(kat)),
    // // rectHeight: yScale.bandwidth(),
    // textX: xScale(variableCount.get(kat)) + 10,
    // textY: yScale(kat) + yScale.bandwidth() / 2,
    // rectFill: colorScale(weekHourCount[week]?.[hour] || 0) || 'white',
    // textFill:
    //   (weekHourCount[week]?.[hour] || 0) > extentCounts[1] / 2
    //     ? 'white'
    //     : 'black',
    // text: weekHourCount[week]?.[hour] || 0,
    // x: d.x0,
    // y: d.y0,
    // y2: d.y0 + 16,
    // width: d.x1 - d.x0,
    // height: d.y1 - d.y0,
    // rectX: hourScale(hour),
    // rectY: weekScale(week),
    rectWidth: hourScale.bandwidth(),
    // rectHeight: weekScale.bandwidth(),
    // textX: hourScale(hour) + hourScale.bandwidth() / 2,
    // textY: weekScale(week) + weekScale.bandwidth() / 2,
    // config: {
    //   mass: 1,
    //   tension: 120,
    //   friction: 20,
    // },
    config: springConfig,
    immediate: reduceMotion,
  });

  // TODO: numberwithseperator?

  return (
    <g>
      <animated.rect
        x={hourScale(hour)}
        y={weekScale(week)}
        // width={hourScale.bandwidth()}
        height={weekScale.bandwidth()}
        // x={spring.rectX}
        // y={spring.rectY}
        width={spring.rectWidth}
        // height={spring.rectHeight}
        style={{
          // stroke: 'blue',
          // strokeWidth: '2px',
          // fill: spring.rectFill,
          fill: colorScale(count) || 'white',
          transition: 'fill 200ms ease',
          // fill:
          // colorScale(weekHourCount[week]?.[hour] || 0) || 'white',
          // fill:
          //   colorScale(weekHourCount.get(d).get(e)) ||
          //   'white',
          // fill: 'transparent',
        }}
      />
      <animated.text
        x={hourScale(hour) + hourScale.bandwidth() / 2}
        y={weekScale(week) + weekScale.bandwidth() / 2}
        // x={spring.textX}
        // y={spring.textY}
        textAnchor="middle"
        dominantBaseline="middle"
        // fill={spring.textFill}
        fill={
          count > extentCounts[1] / 2
            ? 'rgba(255, 238, 199, 1)'
            : 'rgba(53, 49, 40, 1)'
        }
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
        // fill={
        //   (weekHourCount[week]?.[hour] || 0) > extentCounts[1] / 2
        //     ? 'rgba(255, 238, 199, 1)'
        //     : 'rgba(53, 49, 40, 1)'
        // }
      >
        {/* {weekHourCount.get(d).get(e) || 0} */}
        {/* {weekHourCount[d]?.[e] || 0} */}
        {/* {weekHourCount[week]?.[hour] || 0} */}
        {count}
      </animated.text>
    </g>
  );
}

export default WeekHourRect;
