'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand } from 'd3-scale';
import StrasseBarAxis from '../StrasseBarAxis';
import ChartContainer from '../ChartContainer';

function StrasseBarChart({ variableCount, visDataTotal }) {
  // const kategorienSorted = [
  //   'winterglatt',
  //   'nass/feucht/schlüpfrig',
  //   'trocken',
  // ];

  const kategorienSorted = ['nass/glatt', 'trocken'];

  const width = 300;

  const height = 200;

  const margin = {
    top: 20,
    right: 50,
    bottom: 20,
    left: 120,
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

  const xScale = scaleLinear()
    .domain([0, visDataTotal]) // dataTotal
    .range([0, innerWidth])
    .nice();

  const yScale = scaleBand()
    .domain(kategorienSorted) // kategorienSorted
    .range([innerHeight, 0])
    .padding(0.2);

  // TODO: check rendering (useState is called to often vs. useEffect)
  // TODO: scale totalaccidents oder totalvisdata
  // TODO: scale etc. useMemo, or...
  // TODO: Dunkelheit und dämmerung zusammenfassen

  return (
    <ChartContainer width={width} height={height}>
      <StrasseBarAxis
        yScale={yScale}
        innerHeight={innerHeight}
        margin={margin}
        kat={kategorienSorted}
      />
      <g
        ref={barChartRef}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        {kategorien.map((d, i) => (
          <g key={d}>
            <rect
              x={xScale(0)}
              y={yScale(d)}
              width={xScale(variableCount.get(d))}
              height={yScale.bandwidth()}
              fill="#69b3a2"
            />
            <text
              x={xScale(variableCount.get(d)) + 10}
              y={yScale(d) + yScale.bandwidth() / 2}
              style={{ fontSize: '0.8rem' }}
            >
              {`${Math.round(
                (variableCount.get(d) / visDataTotal) * 100
              )} %`}
            </text>
          </g>
        ))}
      </g>
    </ChartContainer>
  );
}

export default StrasseBarChart;
