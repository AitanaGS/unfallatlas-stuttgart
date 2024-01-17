'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useSpring, useSprings, animated } from '@react-spring/web';

function ColumnChartValueAxis({
  yScale,
  margin,
  innerHeight,
  // maxMonthData,
  maxValue,
}) {
  const ticks = useMemo(() => {
    return yScale.ticks(maxValue > 5 ? 4 : 2).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale, maxValue]);

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
  //   },
  //   // config: {
  //   //   friction: 100,
  //   // },
  // });

  // const [finalValues, setFinalValues] = useState([]);

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

  // const axisSpring = useSpring({
  //   from: {
  //     y1: innerHeight,
  //   },
  //   to: {
  //     y1: 0,
  //   },
  //   config: {
  //     mass: 1,
  //     tension: 500, // Adjusted tension value
  //     friction: 20, // Adjusted friction value
  //   },
  // });

  // useEffect(() => {
  //   // Once all animations have completed, do something with finalValues
  //   if (finalValues.length === ticks.length) {
  //     console.log('Final Values:', finalValues);
  //   }
  // }, [finalValues, ticks.length]);

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
      {/* <animated.line
        x1={0}
        y1={axisSpring.y1}
        x2={0}
        y2={innerHeight}
        stroke={'black'}
      /> */}
      {springs.map((props, i) => {
        return (
          <animated.text
            key={ticks[i].value} // props.value.id
            x={-5} // Adjust the horizontal position to move text to the left of the axis
            y={props.y}
            textAnchor="end" // Align text to the end of the axis
            dominantBaseline="middle"
            style={{ fontSize: '0.8rem' }}
          >
            {ticks[i].value < 1 && ticks[i].value > 0
              ? null
              : ticks[i].value}
            {/* {props.value < 1 && props.value > 0 ? null : props.value} */}
            {/* {finalValues.includes(props.value)
              ? props.value < 1 && props.value > 0
                ? null
                : props.value
              : null} */}
          </animated.text>
        );
      })}
      {/* {ticks.map(({ value, yOffset }, i) => {
        return (
          <text
            key={value}
            x={-5} // Adjust the horizontal position to move text to the left of the axis
            y={yOffset}
            textAnchor="end" // Align text to the end of the axis
            dominantBaseline="middle"
            style={{ fontSize: '0.6rem' }}
          >
            {value < 1 && value > 0 ? null : value}
          </text>
        );
      })} */}
      {/* {ticks.map(({ value, yOffset }, i) => {
        return i % 2 === 0 ? (
          <text
            key={value}
            x={-5} // Adjust the horizontal position to move text to the left of the axis
            y={yOffset}
            textAnchor="end" // Align text to the end of the axis
            dominantBaseline="middle"
            style={{ fontSize: '0.6rem' }}
          >
            {value}
          </text>
        ) : undefined;
      })} */}
    </g>
    // <g
    //   transform={`translate(${margin.left}, ${
    //     innerHeight + margin.top
    //   })`}
    // >
    //   <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
    //   {/* {timeDataDates.map((d) => console.log(d))} */}
    //   {ticks.map(({ value, yOffset }) => {
    //     // const dateObject = parseDate(d);
    //     return (
    //       // return (

    //       <text
    //         key={value}
    //         x={0} // yScale(d) + yScale.bandwidth() / 2
    //         y={yOffset}
    //         textAnchor="middle"
    //         dominantBaseline="middle"
    //         style={{ fontSize: '0.6rem' }}
    //       >
    //         {value}
    //         {/* {/* {i % 6 == 0 ? (
    //           <tspan x={xScale(d)} y={10}>{`${formatMonthName(
    //             d
    //           )}`}</tspan>
    //         ) : undefined} */}
    //         {/* {i % 2 == 0 ? <tspan>{d.monat}</tspan> : undefined} */}
    //       </text>
    //       // ) : undefined}
    //     ); // );
    //     // undefined;
    //   })}
    // </g>
  );
}

export default ColumnChartValueAxis;
