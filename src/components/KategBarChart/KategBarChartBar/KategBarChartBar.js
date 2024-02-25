import React, { useEffect, useState, useContext } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { numberWithSeparator } from '../../../utils/calc';
import { COLORS } from '../../../utils/constants';
// import { SpringConfigContext } from '@/contextProvider/SpringConfigContextProvider';
import { AnimationContext } from '@/context/AnimationContext';

function KategBarChartBar({
  xScale,
  yScale,
  kategCount,
  // variableCount,
  // visDataTotal,
  kat,
  svgFontSize,
  color,
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

  // console.log(
  //   'check variablecount',
  //   variableCount,
  //   variableCount.get(kat)
  // );

  // const springConfig = React.useContext(SpringConfigContext);
  const { reduceMotion, springConfig } = useContext(AnimationContext);

  const spring = useSpring({
    // rectX: xScale(0),
    rectY: yScale(kat),
    rectWidth: xScale(kategCount),
    // rectWidth: xScale(variableCount.get(kat) || 0),
    // rectHeight: yScale.bandwidth(),
    // textX:
    //   variableCount.get(kat) > 0
    //     ? xScale(variableCount.get(kat)) + 5 // -2
    //     : 20,
    textX:
      kategCount > 0
        ? xScale(kategCount) + 5 // -2
        : 20,
    textY: yScale(kat) + yScale.bandwidth() / 2,
    // config: {
    //   mass: 1,
    //   tension: 120,
    //   friction: 20,
    // },
    config: springConfig,
    immediate: reduceMotion,
  });

  // TODO: springs for all props (?)
  //   return variableCount.get(kat) > 0 ? (
  //     <g>
  //       <animated.rect
  //         x={xScale(0)}
  //         y={spring.rectY}
  //         width={spring.rectWidth}
  //         height={yScale.bandwidth()}
  //         fill={COLORS.yellowOrange.light}
  //       />
  //       <animated.text
  //         x={spring.textX}
  //         y={spring.textY}
  //         // style={{ fontSize: '0.8rem' }}
  //         textAnchor="start"
  //         dominantBaseline="middle"
  //       >
  //         {numberWithSeparator(variableCount.get(kat))}
  //         {/* {`${Math.round(
  //       (variableCount.get(d) / visDataTotal) * 100
  //     )} %`} */}
  //       </animated.text>
  //     </g>
  //   ) : (
  //     <g>
  //       <animated.text
  //         x={spring.textX}
  //         y={spring.textY}
  //         style={{ fontSize: '0.8rem' }}
  //         textAnchor="end"
  //         dominantBaseline="middle"
  //       >
  //         {0}
  //         {/* {`${Math.round(
  //   (variableCount.get(d) / visDataTotal) * 100
  // )} %`} */}
  //       </animated.text>
  //     </g>
  //   );
  return (
    <g>
      <animated.rect
        x={xScale(0)}
        y={spring.rectY}
        width={spring.rectWidth}
        height={yScale.bandwidth()}
        // fill={COLORS.yellowOrange.light}
        fill={color}
      />
      <animated.text
        x={spring.textX}
        y={spring.textY}
        // style={{ fontSize: '0.8rem' }}
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
      >
        {numberWithSeparator(kategCount)}
        {/* {`${Math.round(
    (variableCount.get(d) / visDataTotal) * 100
  )} %`} */}
      </animated.text>
    </g>
  );
}

export default KategBarChartBar;
