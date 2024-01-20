import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { numberWithSeparator } from '../../../utils/calc';
import { COLORS } from '../../../utils/constants';
import { splitStringByHalf } from '@/utils/strings';
import { SpringConfigContext } from '@/contextProvider/SpringConfigContextProvider';

// function splitStringByHalf(inputString) {
//   // Split the input string into an array of words
//   const words = inputString.split(' ');

//   // Calculate the middle index
//   const middleIndex = Math.ceil(words.length / 2);

//   // Create two separate arrays
//   const firstHalf = words.slice(0, middleIndex);
//   const secondHalf = words.slice(middleIndex);

//   return [firstHalf.join(' '), secondHalf.join(' ')];
// }

function ArtBarChartLabelledBar({
  xScale,
  yScale,
  sortedVariableCount,
  // visDataTotal,
  kat,
  yScaleBandwidth,
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

  // const katDivided =
  //   kat === 'Unfall anderer Art'
  //     ? ['', 'Unfall anderer Art']
  //     : splitStringByHalf(kat);

  // const katDivided = splitStringByHalf(kat);

  const katDivided =
    kat === 'Unfall anderer Art'
      ? ['Unfall', 'anderer Art']
      : splitStringByHalf(kat);

  const springConfig = React.useContext(SpringConfigContext);

  const spring = useSpring({
    x: xScale(0),
    y: yScale(kat),
    width: xScale(sortedVariableCount.get(kat) || 0),
    // height: yScale.bandwidth(),
    height: yScaleBandwidth,
    textNumberX: xScale(sortedVariableCount.get(kat) || 0) + 5, // xScale(variableCount.get(kat) || 0) - 2
    textNumberY: yScale(kat) + yScaleBandwidth / 2, // yScale(kat) + yScaleBandwidth / 2,
    textLabelX: xScale(0),
    // textLabelY: yScale(kat) - 8,
    textLabelY: yScale(kat) - 25, // -20
    // config: {
    //   mass: 1,
    //   tension: 120,
    //   friction: 20,
    // },
    config: springConfig,
  });

  // console.log('render');

  return (
    // variableCount.get(kat) > 0 && (
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
        fill={COLORS.yellowOrange.medium}
      />
      <animated.text
        // x={xScale(variableCount.get(d)) + 10}
        // y={yScale(d) + yScale.bandwidth() / 2}
        // x={spring.textLabelX}
        y={spring.textLabelY}
        // style={{ fontSize: '0.8rem' }}
        // textAnchor="start"
        // dominantBaseline="middle"
      >
        {/* {kat} */}
        {/* {`${Math.round(
            (variableCount.get(kat) / visDataTotal) * 100
          )} %`} */}
        <animated.tspan
          // x={-5}
          dy="0em"
          x={spring.textLabelX}
          textAnchor="start"
          // dominantBaseline="middle"
          // dominantBaseline="hanging"
          dominantBaseline="auto"
        >
          {katDivided[0] || ''}
        </animated.tspan>
        <animated.tspan
          // x={-5}
          dy="1.2em"
          // dy={kat !== 'Unfall anderer Art' ? '1.2em' : '0'}
          x={spring.textLabelX}
          textAnchor="start"
          // dominantBaseline="middle"
          // dominantBaseline="hanging"
          dominantBaseline="auto"
        >
          {katDivided[1] || ''}
        </animated.tspan>
      </animated.text>
      <animated.text
        // x={xScale(variableCount.get(d)) + 10}
        // y={yScale(d) + yScale.bandwidth() / 2}
        x={spring.textNumberX}
        y={spring.textNumberY}
        // style={{ fontSize: '0.8rem' }}
        dominantBaseline="middle"
        textAnchor="start"
      >
        {numberWithSeparator(sortedVariableCount.get(kat) || 0)}
        {/* {`${Math.round(
            (variableCount.get(kat) / visDataTotal) * 100
          )} %`} */}
      </animated.text>
    </g>
  );
  // );
}

export default ArtBarChartLabelledBar;
