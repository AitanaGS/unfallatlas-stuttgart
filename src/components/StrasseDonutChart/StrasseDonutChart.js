'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
// import { useSpring, animated } from '@react-spring/web';
import {
  useSprings,
  animated,
  useSpring,
  SpringValue,
} from '@react-spring/web';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
import { pie, arc } from 'd3-shape';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
// import LichtLollipopChartXAxis from './LichtLollipopChartXAxis';
import ChartContainer from '../ChartContainer';
import StrasseDonutChartArc from './StrasseDonutChartArc';
// import LichtLollipopChartLine from './LichtLollipopChartLine';
// import LichtLollipopChartYAxis from './LichtLollipopChartYAxis';
import { numberWithSeparator } from '../../utils/calc';
import { COLORS } from '../../utils/constants';

function StrasseDonutChart({
  // variableCount,
  // visDataTotal,
  dashboardWidth,
  visData,
}) {
  // const kategorienSorted = ['Dämmerung/Dunkelheit', 'Tageslicht'];
  // const kategorienSorted = ['Tageslicht', 'Dämmerung/Dunkelheit'];
  // const kategorienSorted = ['nass/glatt', 'trocken'];
  const kategorienSorted = ['trocken', 'nass/glatt'];

  // const width = 300;

  // const height = 200;

  // const margin = {
  //   top: 20,
  //   right: 50,
  //   bottom: 20,
  //   left: 160,
  // };

  const responsiveThreshold = 500; // 400

  const width =
    dashboardWidth > responsiveThreshold ? dashboardWidth : 300;

  const height = dashboardWidth > responsiveThreshold ? 250 : 350;

  // const margin = {
  //   top: 20,
  //   right: 50,
  //   bottom: 20,
  //   left: 190,
  // };

  const margin = {
    top: dashboardWidth > responsiveThreshold ? 60 : 80, // 100
    right: 50,
    bottom: 10,
    left: 50,
  };

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = height - margin.top - margin.bottom;

  const variableCount = useMemo(() => {
    return rollup(
      visData,
      (v) => v.length,
      (d) => (d.options ? d.options.data.strzust2 : d.strzust2)
    );
  }, [visData]);

  // const kategorien = [...variableCount.keys()];

  // console.log('bar kategcount', variableCount);
  // console.log('keys', kategorien); // [...kategCount.keys()]
  // console.log(variableCount.get(kategorien[0]));

  // const barChartRef = useRef();
  // useEffect(() => {
  //   const barChart = select(barChartRef.current);
  // }, [variableCount]);

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
    // .range([COLORS.orange.medium, COLORS.orange.dark]);
    // .range([COLORS.gray.light, COLORS.gray.medium]);
    .range([COLORS.yellowOrange.light, COLORS.yellowOrange.medium]);
  // .range([
  //   COLORS.categorical.orangeLight,
  //   COLORS.categorical.orangeDark,
  // ]);

  // const countArray = useMemo(() => {
  //   return Array.from(variableCount.entries(), ([key, value]) => ({
  //     key,
  //     value,
  //   }));
  // }, [variableCount]);

  const countArray = useMemo(() => {
    return [
      {
        key: 'trocken',
        value: variableCount.get('trocken') || 0,
      },
      {
        key: 'nass/glatt',
        value: variableCount.get('nass/glatt') || 0,
      },
    ];
  }, [variableCount]);

  // console.log('countarray', countArray, 'countarray2', countArray2);

  // console.log(countArray);

  // const arcGenerator = pie()
  //   .value((d) => d.value)
  //   .sort(null);

  const arcData = useMemo(() => {
    const pieGenerator = pie()
      .value((d) => d.value)
      .sort(null);

    return pieGenerator(countArray);
  }, [countArray]); // arcGenerator

  // console.log('arcs', arcs);

  // const leftLabelXPosition =
  //   dashboardWidth > 450 ? innerWidth / 2 - radius : 10;

  // const leftLabelXPosition =
  //   dashboardWidth > 400
  //     ? innerWidth / 2 - radius * 2 + margin.left
  //     : margin.left; // 10

  const leftLabelXPosition =
    dashboardWidth > responsiveThreshold
      ? innerWidth / 2 - radius * 2 + margin.left
      : innerWidth / 2 + margin.right - 20; // 10

  const leftLabelYPosition =
    dashboardWidth > responsiveThreshold ? 60 : 60; // 80

  // const leftLabelTextAnchor = dashboardWidth > 400 ? 'end' : 'start';
  const leftLabelTextAnchor = 'end';

  // const rightLabelXPosition =
  //   dashboardWidth > 400
  //     ? innerWidth / 2 + radius * 2 + margin.left
  //     : width - margin.right; // -10

  const rightLabelXPosition =
    dashboardWidth > responsiveThreshold
      ? innerWidth / 2 + radius * 2 + margin.left
      : innerWidth / 2 + margin.right + 20; // -10

  const rightLabelYPosition = dashboardWidth > 400 ? 60 : 60; // 80

  // const rightLabelTextAnchor = dashboardWidth > 400 ? 'start' : 'end';
  const rightLabelTextAnchor = 'start';

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
        x={10}
        y={4}
        textAnchor="auto"
        dominantBaseline="hanging"
        className="svg-title"
      >
        Straßenzustand
      </text>
      <text
        // x={20}
        y={leftLabelYPosition}
        textAnchor={leftLabelTextAnchor}
        dominantBaseline="middle"
        // style={{ fontSize: '0.8rem' }}
      >
        <tspan x={leftLabelXPosition} dy="0">
          nass/glatt
        </tspan>
        {/* <tspan x={leftLabelXPosition} dy="1.4em">
          Dunkelheit
        </tspan> */}
        <tspan x={leftLabelXPosition} dy="1.4em">
          {variableCount.get('nass/glatt')
            ? numberWithSeparator(variableCount.get('nass/glatt'))
            : 0}
        </tspan>
      </text>
      {/* )} */}
      {/* {variableCount.get('Tageslicht') > 0 && ( */}
      <text
        // x={20}
        y={rightLabelYPosition}
        textAnchor={rightLabelTextAnchor}
        dominantBaseline="middle"
        // style={{ fontSize: '0.8rem' }}
      >
        <tspan x={rightLabelXPosition} dy="0">
          trocken
        </tspan>
        <tspan x={rightLabelXPosition} dy="1.4em">
          {variableCount.get('trocken')
            ? numberWithSeparator(variableCount.get('trocken'))
            : 0}
        </tspan>
        {
          //numberWithSeparator(variableCount.get('trocken')) || 0
        }
      </text>
      {/* )} */}
      <g
        // ref={barChartRef}
        transform={`translate(${margin.left + innerWidth / 2}, ${
          margin.top + innerHeight / 2
        })`}
      >
        {arcData.map((d, i) => (
          <StrasseDonutChartArc
            key={d.data.key}
            radius={radius}
            arcDatum={d}
            color={colorScale(d.data.key)} //colors[i]
          />
        ))}
      </g>
    </ChartContainer>
  );
}

export default StrasseDonutChart;
