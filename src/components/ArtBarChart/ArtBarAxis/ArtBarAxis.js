'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useSpring, useSprings, animated } from '@react-spring/web';

function splitStringByHalf(inputString) {
  // Split the input string into an array of words
  const words = inputString.split(' ');

  // Calculate the middle index
  const middleIndex = Math.ceil(words.length / 2);

  // Create two separate arrays
  const firstHalf = words.slice(0, middleIndex);
  const secondHalf = words.slice(middleIndex);

  return [firstHalf.join(' '), secondHalf.join(' ')];
}

function ArtBarAxis({
  yScale,
  innerHeight,
  margin,
  kat,
  yScaleBandwidth,
}) {
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);

  const katDivided = kat.map((k) => splitStringByHalf(k));

  // console.log('katdivided', katDivided);
  // console.log('katdivided', katDivided[0][0], katDivided[0][1]);

  const springs = useSprings(
    kat.length,
    kat.map((k, index) => ({
      // y: yScale(k) + yScale.bandwidth() / 2,
      // y: yScale(k) + yScaleBandwidth / 2,
      y: yScale(k) + yScaleBandwidth / 3,
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
          // x={-5}
          y={spring.y}
          // textAnchor="end"
          // dominantBaseline="middle"
          style={{ fontSize: '0.8rem' }}
        >
          {/* <animated.tspan>{kat[i]}</animated.tspan> */}
          <animated.tspan
            x={-5}
            dy="0em"
            textAnchor="end"
            // dominantBaseline="middle"
            // dominantBaseline="hanging"
            dominantBaseline="auto"
          >
            {katDivided[i][0] || ''}
          </animated.tspan>
          <animated.tspan
            x={-5}
            dy="1.5em"
            textAnchor="end"
            // dominantBaseline="middle"
            // dominantBaseline="hanging"
            dominantBaseline="auto"
          >
            {katDivided[i][1] || ''}
          </animated.tspan>
          {/* <animated.tspan>
            {splitStringByHalf(kat[i])[0]}
          </animated.tspan>
          <animated.tspan>
            {splitStringByHalf(kat[i])[1]}
          </animated.tspan> */}
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
