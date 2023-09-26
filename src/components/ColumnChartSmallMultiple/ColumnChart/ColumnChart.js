import React, { useEffect, useRef, useMemo, useState } from 'react';
import ChartContainer from '../../ChartContainer';
import { scaleTime, scaleLinear, scaleBand } from 'd3-scale';
import { extent, rollup, max, mean, median } from 'd3-array';
import { line, curve, curveMonotoneX, curveBasis } from 'd3-shape';
import { select, selectAll } from 'd3-selection';
// import LineChartTimeAxis from '../LineChartTimeAxis';
import ColumnChartMonthAxis from './ColumnChartMonthAxis';
import ColumnChartValueAxis from './ColumnChartValueAxis';
import { useSpring, useSprings, animated } from '@react-spring/web';
import ColumnChartColumn from './ColumnChartColumn';
import ColumnChartLine from './ColumnChartLine';

const monate = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

function ColumnChart({
  yearVisData,
  year,
  setMaxValueMap,
  maxValue,
  maxValueMap,
}) {
  // const [isAnimating, setIsAnimating] = useState(false);

  const width = 150;
  const height = 100;
  const margin = {
    top: 20,
    right: 5,
    bottom: 15,
    left: 30,
  };

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  // var monthData = rollup(
  //   yearVisData,
  //   (v) => v.length, // Aggregation function: count the length of each group
  //   (d) => d.monatn // Grouping key: the "datum" property representing the month
  // );

  const monthData = useMemo(
    () =>
      rollup(
        yearVisData,
        (v) => v.length,
        (d) => d.monatn
      ),
    [yearVisData]
  );

  const maxMonthData = max(Array.from(monthData.values()));
  const meanMonthData = mean(Array.from(monthData.values()));
  // const medianMonthData = median(Array.from(monthData.values()));

  const xScale = scaleBand()
    .domain(monate) // kategorienSorted
    .range([0, innerWidth])
    .padding(0.1);
  // .padding(0.4);

  // const yScale = scaleLinear()
  //   .domain([0, maxValue]) // maxMonthData dataTotal
  //   .range([innerHeight, 0])
  //   .nice();

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([0, maxValue]) // maxMonthData dataTotal
      .range([innerHeight, 0])
      .nice();
  }, [maxValue, innerHeight]); // innerHeight

  // console.log(
  //   'maxcalue',
  //   maxValue,
  //   'maxmonth',
  //   maxMonthData,
  //   'yscale',
  //   yScale(maxMonthData)
  // );

  // console.log(maxValueMap, maxValue, yScale(maxValue), innerHeight);
  // console.log('innerheight', innerHeight);

  // const [springs, api] = useSpring(() => ({
  //   // from: { y: 0, height: 0 },
  //   onRest: () => setIsAnimating(false),
  // }));

  // const [animationProps, setAnimationProps] = useState([]);

  // monate.map((d, i) => {
  //   const [springProps, set] = useSpring(() => ({
  //     from: { y: 0, height: 0 },
  //     onRest: () => setIsAnimating(false),
  //   }));
  // });

  useEffect(() => {
    // console.log(monthData);
    setMaxValueMap(maxValueMap.set(year, maxMonthData));
    // setIsAnimating(true);
    // const animationPropsArray = monate.map((d) => {
    //   console.log(
    //     'd',
    //     d,
    //     'get(d)',
    //     monthData.get(d),
    //     'yscale',
    //     yScale(monthData.get(d) || 0)
    //   );
    //   return {
    //     from: { y: innerHeight, height: 0 },
    //     // from: { y: 0, height: 0 },
    //     to: {
    //       y: yScale(monthData.get(d) || 0),
    //       height: innerHeight - yScale(monthData.get(d) || 0),
    //     },
    //     onRest: () => setIsAnimating(false),
    //   };
    // });

    // console.log('animations', animationPropsArray);

    // setAnimationProps(animationPropsArray);
    // const animations = monate.map((d) => ({
    //   from: {
    //     // y: 0,
    //     // y: yScale(monthData.get(d) || 0),
    //     y: innerHeight,
    //     height: 0,
    //   },
    //   to: {
    //     y: yScale(monthData.get(d) || 0),
    //     height: innerHeight - yScale(monthData.get(d) || 0),
    //   },
    // }));
    // console.log('animations', animations);

    // // Start each animation
    // animations.forEach((animation) => {
    //   api.start(animation);
    // });
  }, [yearVisData]); // , yearVisData
  // [
  //   maxMonthData,
  //   setMaxValueMap,
  //   year,
  //   maxValueMap,
  //   api,
  //   monthData,
  //   innerHeight,
  //   yScale,
  // ]

  // const kategorienSorted = [
  //   'Unfall mit Getöteten',
  //   'Unfall mit Schwerverletzten',
  //   'Unfall mit Leichtverletzten',
  // ];

  // const monthArray = useMemo(() => {
  //   const unsortedArray = timeDataDates.map((date) => ({
  //     datum: date,
  //     count: aggregatedData.get(date) || 0, // Use 0 if no count exists
  //   }));

  //   // Sort the array by the "datum" property
  //   return unsortedArray.sort((a, b) => a.datum - b.datum);
  // }, [timeDataDates, aggregatedData]); // Recalculate when timeDataDates or aggregatedTimeData changes

  // console.log('month data', monthData);
  // console.log(
  //   'innerheight',
  //   innerHeight,
  //   'yscale',
  //   yScale(innerHeight)
  // );

  // const handleChange = (e, d) => {
  //   api.start({
  //     from: {
  //       y: 0,
  //       height: 0,
  //     },
  //     to: {
  //       y: yScale(monthData.get(d) || 0),
  //       height: innerHeight - yScale(monthData.get(d) || 0),
  //     },
  //   });
  // };

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

  // here with springs
  // const springs = useSprings(
  //   monate.length,
  //   monate.map((monat, index) => ({
  //     // y: yScale(monthData.get(monat) || 0),
  //     // height: innerHeight - yScale(monthData.get(monat) || 0),
  //     // onResume: (props) => {
  //     //   setFinalValues((prev) => [...prev, props.value]);
  //     // },
  //     from: {
  //       // y: 0,
  //       // y: yScale(monthData.get(d) || 0),
  //       y: innerHeight, // innerHeight
  //       height: 0,
  //     },
  //     to: {
  //       y: yScale(monthData.get(monat) || 0),
  //       height: innerHeight - yScale(monthData.get(monat) || 0),
  //     },
  //     // config: {
  //     //   friction: 100,
  //     // },
  //   }))
  // );

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

  // TODO: columnchartline as component necessary
  // TODO: check if yscale of each chart is the same, if not move it up to small multiple
  // TODO: usesprings instead of usespring see "here with springs"

  if (yearVisData.length === 0)
    return (
      <ChartContainer width={width} height={height}>
        <text
          x={5}
          y={8}
          style={{ fontSize: '0.6rem' }}
          textAnchor="start"
          dominantBaseline={'middle'}
        >
          {year}
        </text>
        <ColumnChartMonthAxis
          xScale={xScale}
          innerWidth={innerWidth}
          margin={margin}
          monate={monate}
          innerHeight={innerHeight}
        />
      </ChartContainer>
    );

  return (
    <ChartContainer width={width} height={height}>
      <text
        x={5}
        y={8}
        style={{ fontSize: '0.6rem' }}
        textAnchor="start"
        dominantBaseline={'middle'}
      >
        {year}
      </text>
      <ColumnChartValueAxis
        yScale={yScale}
        margin={margin}
        innerHeight={innerHeight}
        maxMonthData={maxMonthData}
      />
      <ColumnChartMonthAxis
        xScale={xScale}
        innerWidth={innerWidth}
        margin={margin}
        monate={monate}
        innerHeight={innerHeight}
      />
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* <rect
          width={innerWidth}
          height={innerHeight}
          // border={'2px solid blue'}
          // fill={'none'}
          style={{
            stroke: 'blue',
            strokeWidth: '2px',
            fill: 'transparent',
            // border: '2px solid blue',
            // color: 'transparent',
            // fill: 'transparent',
          }}
        /> */}
        {monate.map((monat, i) => (
          <ColumnChartColumn
            key={monat}
            monat={monat}
            innerHeight={innerHeight}
            xScale={xScale}
            yScale={yScale}
            monthData={monthData}
          />
        ))}
        {/* // here with springs
        {monate.map((monat, i) => (
          <g key={monat}>
            <animated.rect
              x={xScale(monat)}
              y={springs[i].y}
              width={xScale.bandwidth()}
              height={springs[i].height}
              fill="#69b3a2"
            />
          </g>
        ))} */}
        {/* {monate.map((d, i) => (
          <g key={d}>
          <rect
            x={xScale(d)}
            y={yScale(monthData.get(d) || 0)}
            width={xScale.bandwidth()}
            height={innerHeight - yScale(monthData.get(d) || 0)}
            fill="#69b3a2"
          />
          </g>
        ))} */}
        {/* <line
          x1={0}
          y1={yScale(meanMonthData)}
          x2={innerWidth}
          y2={yScale(meanMonthData)}
          stroke="#69b3a2"
          strokeWidth="2"
        /> */}
        {/* {meanMonthData && ( */}
        <ColumnChartLine
          yScale={yScale}
          innerWidth={innerWidth}
          meanMonthData={meanMonthData}
          innerHeight={innerHeight}
        />
        {/* )} */}
        {/* <ColumnChartLine
          yScale={yScale}
          innerWidth={innerWidth}
          meanMonthData={meanMonthData}
        /> */}
      </g>
    </ChartContainer>
  );
}

export default ColumnChart;

// <g key={d}>
{
  /* <rect
                x={xScale(d)}
                y={yScale(monthData.get(d) || 0)} //yScale(monthData.get(d) || 0)
                width={xScale.bandwidth()}
                height={innerHeight - yScale(monthData.get(d) || 0)} //innerHeight - yScale(monthData.get(d) || 0)
                fill="#69b3a2"
              /> */
}
{
  /* <animated.rect
                // onChange={(e, d) => handleChange(e, d)}
                // x={xScale(d)}
                // y={yScale(monthData.get(d) || 0)}
                // y={springs.y}
                {...springs}
                x={xScale(d)}
                width={xScale.bandwidth()}
                // y={yScale(monthData.get(d) || 0)}
                fill="#69b3a2"
                // y={yScale(monthData.get(d) || 0)}
                // height={springs.height}
                // style={{ ...springs }}
              /> */
}
{
  /* <animated.rect
                x={xScale(d)}
                y={animationProps[i]?.y || 0}
                height={animationProps[i]?.height || 0}
                width={xScale.bandwidth()}
                fill="#69b3a2"
              /> */
}
// </g>
