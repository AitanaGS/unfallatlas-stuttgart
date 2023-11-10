'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand } from 'd3-scale';
import LichtLollipopChartXAxis from './LichtLollipopChartXAxis';
import ChartContainer from '../ChartContainer';
import LichtLollipopChartLine from './LichtLollipopChartLine';
import LichtLollipopChartYAxis from './LichtLollipopChartYAxis';

function LichtBarChart({
  variableCount,
  visDataTotal,
  dashboardWidth,
}) {
  const kategorienSorted = ['Dämmerung/Dunkelheit', 'Tageslicht'];

  // const width = 300;

  // const height = 200;

  // const margin = {
  //   top: 20,
  //   right: 50,
  //   bottom: 20,
  //   left: 160,
  // };

  const width = dashboardWidth > 400 ? dashboardWidth : 300;

  const height = 200;

  // const margin = {
  //   top: 20,
  //   right: 50,
  //   bottom: 20,
  //   left: 190,
  // };

  const margin = {
    top: 20,
    right: 10,
    bottom: 50,
    left: 100,
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

  const maxKateg =
    variableCount.get('Tageslicht') ||
    0 >= variableCount.get('Dämmerung/Dunkelheit') ||
    0
      ? 'Tageslicht'
      : 'Dämmerung/Dunkelheit';

  const maxValue = variableCount.get(maxKateg);

  // const xScale = scaleLinear()
  //   .domain([0, visDataTotal]) // dataTotal
  //   .range([0, innerWidth])
  //   .nice();

  // const yScale = scaleBand()
  //   .domain(kategorienSorted) // kategorienSorted
  //   .range([innerHeight, 0])
  //   .padding(0.2);

  const xScale = scaleBand()
    .domain(kategorienSorted) // kategorienSorted
    .range([0, innerWidth])
    .padding(0.2);

  const yScale = scaleLinear()
    .domain([0, maxValue]) // dataTotal
    .range([innerHeight, 0])
    .nice();

  console.log('lollipop', kategorien, maxValue);

  // TODO: check rendering (useState is called to often vs. useEffect)
  // TODO: scale totalaccidents oder totalvisdata
  // TODO: scale etc. useMemo, or...
  // TODO: Dunkelheit und dämmerung zusammenfassen

  return (
    <ChartContainer width={width} height={height}>
      {/* <LichtLollipopChartYAxis
        yScale={yScale}
        innerHeight={innerHeight}
        margin={margin}
        kat={kategorienSorted}
      /> */}
      <LichtLollipopChartXAxis
        xScale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        margin={margin}
        kat={kategorienSorted}
      />
      <g
        ref={barChartRef}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        {kategorien.map((d, i) => (
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
        ))}
      </g>
    </ChartContainer>
  );
}

export default LichtBarChart;
