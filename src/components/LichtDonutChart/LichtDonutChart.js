'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
// import { useSpring, animated } from '@react-spring/web';
import { useSprings, animated } from '@react-spring/web';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
import { pie, arc } from 'd3-shape';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
// import LichtLollipopChartXAxis from './LichtLollipopChartXAxis';
import ChartContainer from '../ChartContainer';
import LichtDonutChartArc from './LichtDonutChartArc';
// import LichtLollipopChartLine from './LichtLollipopChartLine';
// import LichtLollipopChartYAxis from './LichtLollipopChartYAxis';

function LichtBarChart({
  variableCount,
  visDataTotal,
  dashboardWidth,
}) {
  // const kategorienSorted = ['Dämmerung/Dunkelheit', 'Tageslicht'];
  const kategorienSorted = ['Tageslicht', 'Dämmerung/Dunkelheit'];

  // const width = 300;

  // const height = 200;

  // const margin = {
  //   top: 20,
  //   right: 50,
  //   bottom: 20,
  //   left: 160,
  // };

  const width = dashboardWidth > 400 ? dashboardWidth : 300;

  const height = dashboardWidth > 400 ? 250 : 350;

  // const margin = {
  //   top: 20,
  //   right: 50,
  //   bottom: 20,
  //   left: 190,
  // };

  const margin = {
    top: dashboardWidth > 400 ? 60 : 100,
    right: 50,
    bottom: 10,
    left: 50,
  };

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = height - margin.top - margin.bottom;

  const kategorien = [...variableCount.keys()];

  // console.log('bar kategcount', variableCount);
  // console.log('keys', kategorien); // [...kategCount.keys()]
  // console.log(variableCount.get(kategorien[0]));

  const barChartRef = useRef();
  useEffect(() => {
    const barChart = select(barChartRef.current);
  }, [variableCount]);

  // const maxKateg =
  //   variableCount.get('Tageslicht') ||
  //   0 >= variableCount.get('Dämmerung/Dunkelheit') ||
  //   0
  //     ? 'Tageslicht'
  //     : 'Dämmerung/Dunkelheit';

  // const maxValue = variableCount.get(maxKateg);

  // var radius = Math.min(innerWidth, innerHeight) / 2;
  const radius = Math.min(innerWidth, innerHeight) / 3; // 2.5

  const colorScale = scaleOrdinal()
    .domain(kategorienSorted)
    .range(['#98abc5', '#a05d56']);

  // const countArray = useMemo(() => {
  //   return Array.from(variableCount.entries(), ([key, value]) => ({
  //     key,
  //     value,
  //   }));
  // }, [variableCount]);

  const countArray = useMemo(() => {
    return [
      {
        key: 'Tageslicht',
        value: variableCount.get('Tageslicht') || 0,
      },
      {
        key: 'Dämmerung/Dunkelheit',
        value: variableCount.get('Dämmerung/Dunkelheit') || 0,
      },
    ];
  }, [variableCount]);

  // console.log('countarray', countArray, 'countarray2', countArray2);

  // console.log(countArray);

  const arcGenerator = pie()
    .value((d) => d.value)
    .sort(null);

  const arcs = useMemo(() => {
    return arcGenerator(countArray);
  }, [countArray, arcGenerator]);

  // console.log('arcs', arcs);

  const arcPath = arc()
    .innerRadius(100) // This is the size of the donut hole
    .outerRadius(radius);

  // const arcData = arcGenerator(pieData);

  // console.log(arcData);

  // const xScale = scaleLinear()
  //   .domain([0, visDataTotal]) // dataTotal
  //   .range([0, innerWidth])
  //   .nice();

  // const yScale = scaleBand()
  //   .domain(kategorienSorted) // kategorienSorted
  //   .range([innerHeight, 0])
  //   .padding(0.2);

  // const xScale = scaleBand()
  //   .domain(kategorienSorted) // kategorienSorted
  //   .range([0, innerWidth])
  //   .padding(0.2);

  // const yScale = scaleLinear()
  //   .domain([0, maxValue]) // dataTotal
  //   .range([innerHeight, 0])
  //   .nice();

  // console.log('lollipop', kategorien, maxValue);

  // const leftLabelXPosition =
  //   dashboardWidth > 450 ? innerWidth / 2 - radius : 10;

  // const leftLabelXPosition =
  //   dashboardWidth > 400
  //     ? innerWidth / 2 - radius * 2 + margin.left
  //     : margin.left; // 10

  const leftLabelXPosition =
    dashboardWidth > 400
      ? innerWidth / 2 - radius * 2 + margin.left
      : innerWidth / 2 + margin.right - 20; // 10

  const leftLabelYPosition = dashboardWidth > 400 ? 60 : 60; // 80

  // const leftLabelTextAnchor = dashboardWidth > 400 ? 'end' : 'start';
  const leftLabelTextAnchor = 'end';

  // const rightLabelXPosition =
  //   dashboardWidth > 400
  //     ? innerWidth / 2 + radius * 2 + margin.left
  //     : width - margin.right; // -10

  const rightLabelXPosition =
    dashboardWidth > 400
      ? innerWidth / 2 + radius * 2 + margin.left
      : innerWidth / 2 + margin.right + 20; // -10

  const rightLabelYPosition = dashboardWidth > 400 ? 60 : 60; // 80

  // const rightLabelTextAnchor = dashboardWidth > 400 ? 'start' : 'end';
  const rightLabelTextAnchor = 'start';
  // console.log('arcs', arcs);

  // const [springs, api] = useSprings(
  //   2,
  //   () => ({
  //     // from: { opacity: 0 },
  //     // to: { opacity: 1 },
  //   }),
  //   []
  // )

  // const { ...springs } = useSprings(
  //   arcs.length,
  //   arcs.map((arc) => ({
  //     d: arcPath(arc),
  //     config: { mass: 1, tension: 120, friction: 20 },
  //   }))
  // );

  // console.log('springs', springs);

  // TODO: check rendering (useState is called to often vs. useEffect)
  // TODO: scale totalaccidents oder totalvisdata
  // TODO: scale etc. useMemo, or...
  // TODO: Dunkelheit und dämmerung zusammenfassen
  // TODO: donutchart disappears sometimes (wenn etwas geänder wird im code, speziell radius), wenn aktualisiert erscheint es kurz und verschwindet
  // TODO: bei zoomen (bei 1 oder 0? aber nicht immer? oder bei gleicher anzahl, z.b. 1 1?) tauschen die farben

  return (
    <ChartContainer width={width} height={height}>
      {/* <LichtLollipopChartYAxis
        yScale={yScale}
        innerHeight={innerHeight}
        margin={margin}
        kat={kategorienSorted}
      /> */}
      {/* <LichtLollipopChartXAxis
        xScale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        margin={margin}
        kat={kategorienSorted}
      /> */}
      {/* {variableCount.get('Dämmerung/Dunkelheit') > 0 && ( */}
      <text
        // x={20}
        y={leftLabelYPosition}
        textAnchor={leftLabelTextAnchor}
        dominantBaseline="middle"
        style={{ fontSize: '0.8rem' }}
      >
        <tspan x={leftLabelXPosition} dy="0">
          Dämmerung/
        </tspan>
        <tspan x={leftLabelXPosition} dy="1.4em">
          Dunkelheit
        </tspan>
        <tspan x={leftLabelXPosition} dy="1.4em">
          {variableCount.get('Dämmerung/Dunkelheit') || 0}
        </tspan>
      </text>
      {/* )} */}
      {/* {variableCount.get('Tageslicht') > 0 && ( */}
      <text
        // x={20}
        y={rightLabelYPosition}
        textAnchor={rightLabelTextAnchor}
        dominantBaseline="middle"
        style={{ fontSize: '0.8rem' }}
      >
        <tspan x={rightLabelXPosition} dy="0">
          Tageslicht
        </tspan>
        <tspan x={rightLabelXPosition} dy="1.4em">
          {variableCount.get('Tageslicht') || 0}
        </tspan>
      </text>
      {/* )} */}
      <g
        ref={barChartRef}
        transform={`translate(${margin.left + innerWidth / 2}, ${
          margin.top + innerHeight / 2
        })`}
      >
        {/* {arcs.map(
          (arc) =>
            arc && (
              <LichtDonutChartArc
                key={arc.data.key}
                arc={arc}
                pathGenerator={arcPath}
                fill={colorScale(arc.data.key) || '#fff'}
              />
            )
        )} */}
        {/* {Object.keys(springs).map((key) => (
          <animated.path
            key={key}
            d={springs[key].d}
            fill={colorScale(arcs[parseInt(key)].data.key) || '#fff'}
            stroke="white"
          />
        ))} */}
        {arcs.map(
          (arc) => (
            <path
              key={arc.data.key}
              d={arcPath(arc)}
              fill={colorScale(arc.data.key) || '#fff'}
              stroke="white"
            />
          )
          // (arc) =>
          //   arc && (
          //     <LichtDonutChartArc
          //       key={arc.data.key}
          //       arc={arc}
          //       path={arcPath(arc)}
          //       fill={colorScale(arc.data.key) || '#fff'}
          //     />
          //   )
        )}
        {/* {kategorien.map((d, i) => (
          <LichtLollipopChartLine
            key={d}
            xScale={xScale}
            yScale={yScale}
            variableCount={variableCount}
            visDataTotal={visDataTotal}
            maxValue={maxValue}
            innerHeight={innerHeight}
            kat={d}
          />
        ))} */}
        {/* <circle
          cx={innerWidth / 2}
          cy={innerHeight / 2}
          r={100}
          fill="white"
        /> */}
      </g>
    </ChartContainer>
  );
}

export default LichtBarChart;