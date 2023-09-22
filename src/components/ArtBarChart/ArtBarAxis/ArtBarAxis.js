'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useSpring, useSprings, animated } from '@react-spring/web';

function ArtBarAxis({ yScale, innerHeight, margin, kat }) {
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);

  const springs = useSprings(
    kat.length,
    kat.map((k, index) => ({
      y: yScale(k) + yScale.bandwidth() / 2,
      kat: k,
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
  // console.log(kat, springs);

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
      {springs.map((spring, i) => (
        <animated.text
          key={spring.kat.id}
          x={-5}
          y={spring.y}
          textAnchor="end"
          dominantBaseline="middle"
          style={{ fontSize: '0.8rem' }}
        >
          <animated.tspan>{kat[i]}</animated.tspan>
        </animated.text>
      ))}
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

export default ArtBarAxis;
