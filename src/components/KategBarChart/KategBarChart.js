'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand } from 'd3-scale';
import KategBarKatAxis from './KategBarKatAxis';
import ChartContainer from '../ChartContainer';
import { useSpring, useSprings, animated } from '@react-spring/web';
import KategBarChartBar from './KategBarChartBar';

function KategBarChart({ variableCount, visDataTotal }) {
  const kategorienSorted = [
    'Unfall mit Schwerverletzten/Getöteten',
    'Unfall mit Leichtverletzten',
  ];
  // const [visData, setVisData] = useState(data);

  // useEffect(() => {
  //   visibleData === [] ? setVisData(data) : setVisData(visibleData);
  // }, [visibleData, data]);

  // const ref = React.useRef();

  // React.useEffect(() => {
  //   const svgElement = select(ref.current);
  //   svgElement
  //     .append('circle')
  //     .attr('cx', 150)
  //     .attr('cy', 70)
  //     .attr('r', 50);
  // }, []);

  // return <svg ref={ref}><Bar /></svg>;

  // console.log('bar chart visibledata', visibleData);
  // console.log('bar chart visdata', visData);

  // const [kategCount, setKategCount] = useState(new Map());

  // useEffect(() => {
  //   console.log('here einzeln', visibleData[0].kateg);
  //   console.log('here alle', visibleData);
  //   const newKategCount = rollup(
  //     visibleData,
  //     (v) => v.length,
  //     (d) => d.kateg
  //     // (d) => d.options.data.kateg
  //   );

  //   setKategCount(newKategCount);
  // }, [visibleData]);

  const width = 300;

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

  // console.log(
  //   'Leicht',
  //   yScale('Unfall mit Leichtverletzten'),
  //   'schwerverletzt/getötet',
  //   yScale('Unfall mit Schwerverletzten/Getöteten')
  // );

  // console.log('xscale', xScale(10));

  // console.log(
  //   'width',
  //   width,
  //   'margin left',
  //   margin.left,
  //   'margin right',
  //   margin.right,
  //   'innerwidt',
  //   innerWidth
  // );

  // console.log(
  //   'calc', variableCount.get('Unfall mit Leichtverletzten'),  { visDataTotal },
  //   (variableCount.get('Unfall mit Leichtverletzten') /
  //     { visDataTotal }) *
  //     100
  // );

  // const springs = useSprings(
  //   kategorienSorted.length,
  //   kategorienSorted.map((k, index) => ({
  //     rectY: yScale(k),
  //     rectWidth: xScale(variableCount.get(k)),
  //     textX: xScale(variableCount.get(k)) + 10,
  //     textY: yScale(k) + yScale.bandwidth() / 2,
  //     config: {
  //       mass: 1,
  //       tension: 120,
  //       friction: 20,
  //     },
  //     // onResume: (props) => {
  //     //   setFinalValues((prev) => [...prev, props.value]);
  //     // },
  //   }))
  // );

  // TODO: check rendering (useState is called to often vs. useEffect)
  // TODO: scale totalaccidents oder totalvisdata
  // TODO: scale etc. useMemo, or...
  // TODO: check useRef

  return (
    <ChartContainer width={width} height={height}>
      <KategBarKatAxis
        yScale={yScale}
        innerHeight={innerHeight}
        margin={margin}
        kat={kategorienSorted}
      />
      <g
        ref={barChartRef}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        {/* {springs.map((spring, i) => (
          <g key={kategorienSorted[i]}>
            <animated.rect
              x={xScale(0)}
              y={spring.rectY}
              width={spring.rectWidth}
              height={yScale.bandwidth()}
              fill="#69b3a2"
            />
            <animated.text
              x={spring.textX}
              y={spring.textY}
              style={{ fontSize: '0.8rem' }}
            >
              {variableCount.get(kategorienSorted[i])}
            </animated.text>
          </g>
        ))} */}
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
        {/* {children} */}
        {/* <BarXAxis variableArray={kategorien} /> */}
        {kategorien.map((d, i) => (
          <KategBarChartBar
            key={d}
            xScale={xScale}
            yScale={yScale}
            variableCount={variableCount}
            visDataTotal={visDataTotal}
            kat={d}
          />
          // <g key={d}>
          //   <rect
          //     x={xScale(0)}
          //     y={yScale(d)}
          //     width={xScale(variableCount.get(d))}
          //     height={yScale.bandwidth()}
          //     fill="#69b3a2"
          //   />
          //   <text
          //     x={xScale(variableCount.get(d)) + 10}
          //     y={yScale(d) + yScale.bandwidth() / 2}
          //     style={{ fontSize: '0.8rem' }}
          //   >
          //     {variableCount.get(d)}
          //     {/* {`${Math.round(
          //       (variableCount.get(d) / visDataTotal) * 100
          //     )} %`} */}
          //   </text>
          // </g>
        ))}
      </g>
      {/* <BarXAxis variableArray={kategorien} /> */}
      {/* <Bar /> */}
    </ChartContainer>
  );
}

export default KategBarChart;
