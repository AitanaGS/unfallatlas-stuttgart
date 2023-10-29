import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function TreeMapRect({ d, colorScale }) {
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
    x: d.x0,
    y: d.y0,
    y2: d.y0 + 15,
    width: d.x1 - d.x0,
    height: d.y1 - d.y0,
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
    },
  });

  return (
    <g>
      <animated.rect
        x={spring.x}
        y={spring.y}
        width={spring.width}
        height={spring.height}
        fill={colorScale(d.data.name)}
        // fill={colorScale(d.value)}
      />
      <animated.text
        x={spring.x}
        y={spring.y}
        textAnchor="start"
        dominantBaseline="hanging"
      >
        {d.value > 0 ? d.data.name : ''}
      </animated.text>
      <animated.text
        x={spring.x}
        y={spring.y2}
        textAnchor="start"
        dominantBaseline="hanging"
      >
        {d.value > 0 ? d.value : ''}
      </animated.text>
    </g>
  );
}

export default TreeMapRect;