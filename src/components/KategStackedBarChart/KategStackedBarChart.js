'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand } from 'd3-scale';
// import KategBarKatAxis from './KategBarKatAxis';
import ChartContainer from '../ChartContainer';
import { useSpring, useSprings, animated } from '@react-spring/web';
import KategStackedBarChartBar from './KategStackedBarChartBar';
import styled from 'styled-components';

function KategBarChart({
  variableCount,
  visDataTotal,
  dashboardWidth,
}) {
  const kategorienSorted = [
    'Unfall mit Schwerverletzten/Getöteten',
    'Unfall mit Leichtverletzten',
  ];

  const width = dashboardWidth > 400 ? dashboardWidth : 300;

  const height = 200;

  const margin = {
    top: 20,
    right: 50,
    bottom: 20,
    left: 190,
  };

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = height - margin.top - margin.bottom;

  const kategorien = [...variableCount.keys()];

  const maxKateg =
    variableCount.get('Unfall mit Leichtverletzten') >=
    variableCount.get('Unfall mit Schwerverletzten/Getöteten')
      ? 'Unfall mit Leichtverletzten'
      : 'Unfall mit Schwerverletzten/Getöteten';

  const maxValue = variableCount.get(maxKateg);

  console.log('maxkateg, maxvalue', maxKateg, maxValue);
  // const maxValue = max(entries(variableCount), (d) => d.value);
  // const maxKateg = entries(variableCount).find(
  //   (d) => d.value === maxEntry
  // ).key;

  // console.log('maxketg', maxKateg)
  // const maxKateg = 'test';
  // const maxEntry = max(variableCount, (d) => d);
  // const maxKey = variableCount
  //   .keys()
  //   .find((key) => variableCount.get(key) === maxEntry);

  // console.log('test', maxEntry, maxKey);

  // console.log('bar kategcount', variableCount);
  // console.log('keys', kategorien); // [...kategCount.keys()]
  // console.log(variableCount.get(kategorien[0]));

  const barChartRef = useRef();
  useEffect(() => {
    const barChart = select(barChartRef.current);
  }, [variableCount]);

  const xScale = scaleLinear()
    .domain([0, visDataTotal]) // dataTotal
    .range([0, innerWidth])
    .nice();

  // const kategorienSorted = [
  //   'Unfall mit Getöteten',
  //   'Unfall mit Schwerverletzten',
  //   'Unfall mit Leichtverletzten',
  // ];

  const yScale = scaleBand()
    .domain(kategorienSorted) // kategorienSorted
    .range([innerHeight, 0])
    .padding(0.2);

  // TODO: check rendering (useState is called to often vs. useEffect)
  // TODO: scale totalaccidents oder totalvisdata
  // TODO: scale etc. useMemo, or...
  // TODO: check useRef

  return (
    <ChartContainer width={width} height={height}>
      {/* <KategBarKatAxis
        yScale={yScale}
        innerHeight={innerHeight}
        margin={margin}
        kat={kategorienSorted}
      /> */}
      <g
        ref={barChartRef}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <KategStackedBarChartBar
          xScale={xScale}
          maxKateg={maxKateg}
          variableCount={variableCount}
          visDataTotal={visDataTotal}
          kategorienSorted={kategorienSorted}
        />

        {/* {kategorien.map((d, i) => (
          <KategBarChartBar
            key={d}
            xScale={xScale}
            yScale={yScale}
            variableCount={variableCount}
            visDataTotal={visDataTotal}
            kat={d}
          />

        ))} */}
      </g>
      {/* <BarXAxis variableArray={kategorien} /> */}
      {/* <Bar /> */}
    </ChartContainer>
  );
}

export default KategBarChart;

// const ChartWrapper = styled.div`
//   flex: 1;
//   /* display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   width: 100%;
//   height: 100%;
//   max-width: 1000px; // 500px
//   margin: 0 auto;
//   position: relative; */
// `;
