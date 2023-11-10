'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useSpring, useSprings, animated } from '@react-spring/web';

function LichtLollipopChartYAxis({ yScale, innerHeight, margin }) {
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);

  // const ticks = useMemo(() => {
  //   return yScale.ticks(maxMonthData > 5 ? 4 : 2).map((value) => ({
  //     value,
  //     yOffset: yScale(value),
  //   }));
  // }, [yScale]);

  const ticks = useMemo(() => {
    return yScale.ticks(5).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  const springs = useSprings(
    ticks.length,
    ticks.map(({ value, yOffset }, index) => ({
      y: yOffset,
      value: value,
      config: {
        mass: 1,
        tension: 120,
        friction: 20,
      },
      // onResume: (props) => {
      //   setFinalValues((prev) => [...prev, props.value]);
      // },
    }))
  );

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
      {springs.map((props, i) => {
        return (
          <animated.text
            key={ticks[i].value} // props.value.id
            x={-5} // Adjust the horizontal position to move text to the left of the axis
            y={props.y}
            textAnchor="end" // Align text to the end of the axis
            dominantBaseline="middle"
            style={{ fontSize: '0.6rem' }}
          >
            {/* {ticks[i].value < 1 && ticks[i].value > 0
              ? null
              : ticks[i].value} */}
            {ticks[i].value}
            {/* {props.value < 1 && props.value > 0 ? null : props.value} */}
            {/* {finalValues.includes(props.value)
              ? props.value < 1 && props.value > 0
                ? null
                : props.value
              : null} */}
          </animated.text>
        );
      })}
      {/* {kat.map((d) => (
        <text
          key={d}
          x={-5}
          y={yScale(d) + yScale.bandwidth() / 2}
          textAnchor="end"
          dominantBaseline="middle"
          style={{ fontSize: '0.8rem' }}
        >
          <tspan>{d}</tspan>
        </text>
      ))} */}
    </g>
  );
}

export default LichtLollipopChartYAxis;
