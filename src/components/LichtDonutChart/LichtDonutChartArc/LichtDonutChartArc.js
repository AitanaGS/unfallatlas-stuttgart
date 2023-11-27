'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

function LichtDonutChartArc({ pathGenerator, fill, arc }) {
  // Extract the path data string from the D3 arc generator
  const pathData = pathGenerator(arc);

  // Use react-spring to animate the path data
  const spring = useSpring({
    // immediate: true,
    d: pathData,
    // config: {
    //   mass: 1, // Decrease mass for a lighter feel
    //   tension: 200, // Increase tension for a faster start
    //   friction: 10, // Decrease friction for a faster decay
    // },
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
      clamp: true,
    },
  });
  // const spring = useSpring({
  //   d: pathData, // Initial path data
  //   from: { d: 'M0,0' }, // Specify the initial state (starting path data)
  //   // config: {
  //   //   mass: 1,
  //   //   tension: 120,
  //   //   friction: 20,
  //   // },
  // });

  console.log('check spring', spring);

  console.log(
    'check lengths pathdata',
    pathData,
    'spring.d',
    spring.d
  );

  // const springDValue = spring.d[Symbol.for('Animated:node')]._string;

  if (!pathData) {
    return null; // or any fallback content
  }

  return (
    pathData &&
    arc.data.value > 0 && (
      <animated.path d={spring.d} fill={fill} stroke="white" />
      // <animated.path d={springDValue} fill={fill} stroke="white" />
    )
  );
}

// function LichtDonutChartArc({ path, fill, arc }) {
//   const spring = useSpring({
//     d: path,
//     // fill: fill,
//     // from: {
//     //   // y: 0,
//     //   // y: yScale(monthData.get(d) || 0),
//     //   // y: innerHeight, // innerHeigh
//     //   d: '',
//     // },
//     // to: {
//     //   d: path,
//     // },
//     config: {
//       mass: 1,
//       tension: 120,
//       friction: 20,
//     },
//   });

//   // const spring = useSpring({
//   //   from: { startAngle: 0, endAngle: 0 }, // Initial angles
//   //   to: { startAngle: path.startAngle, endAngle: path.endAngle }, // Final angles from the path
//   //   // config: { duration: 1000 }, // Animation duration
//   //       config: {
//   //     mass: 1,
//   //     tension: 120,
//   //     friction: 20,
//   //   },
//   // });
//   // console.log('path', path);

//   return (
//     path &&
//     arc.data.value > 0 && (
//       <animated.path
//         // key={arc.data.key}
//         d={spring.d}
//         fill={fill}
//         stroke="white"
//       />
//     )
//   );
// }

export default LichtDonutChartArc;
