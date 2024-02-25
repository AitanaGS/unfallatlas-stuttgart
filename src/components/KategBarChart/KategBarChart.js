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
import styled from 'styled-components';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';
import Note from '../Note';
import { COLORS } from '@/utils/constants';

// const kategorienSorted = [
//   'Unfall mit Schwerverletzten/Getöteten',
//   'Unfall mit Leichtverletzten',
// ];

const kategorienSorted = [
  'Unfall mit Leichtverletzten',
  'Unfall mit Schwerverletzten/Getöteten',
];

function KategBarChart({
  // variableCount,
  // visDataTotal,
  chartWidth,
  visData,
  smallMobileBreakpoint,
  svgFontSize,
  chartWidthDomain,
  vizWrapperGap,
  scrollbarWidth,
}) {
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

  // const kategCountMap = useMemo(() => {
  //   // console.log('check data', data); // d.kateg // d.properties.kateg
  //   // console.log('check visData', visData); //d.options.data.kateg
  //   // if (!visData) {
  //   //   return undefined;
  //   // }

  //   const resultMap = new Map();

  //   kategorienSorted.forEach((kat) => {
  //     resultMap.set(kat, 0);
  //   });

  //   // console.log('res 1', resultMap);

  //   const rolledUpMap = rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
  //     // d.properties ? d.properties.kateg : d.options.data.kateg
  //     // (d) => d.options.data.kateg
  //     // (d) => d.properties.kateg
  //     // (d) => (d.options ? d.options.data.kateg : d.kateg)
  //   );

  //   // console.log('rol1', rolledUpMap);

  //   rolledUpMap.forEach((count, kat) => {
  //     resultMap.set(kat, count);
  //   });

  //   // console.log('res2', resultMap);

  //   // const kategorienSorted = [
  //   //   'Unfall mit Schwerverletzten/Getöteten',
  //   //   'Unfall mit Leichtverletzten',
  //   // ];

  //   // const kategCounts = [
  //   //     {
  //   //       key: 'Unfall mit Leichtverletzten',
  //   //       value: variableCount.get('Unfall mit Leichtverletzten') || 0,
  //   //     },
  //   //     {
  //   //       key: 'Unfall mit Schwerverletzten/Getöteten',
  //   //       value: variableCount.get('Unfall mit Schwerverletzten/Getöteten') || 0,
  //   //     },
  //   //   ]

  //   return resultMap;

  //   // return rollup(
  //   //   visData,
  //   //   (v) => v.length,
  //   //   (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
  //   // d.properties ? d.properties.kateg : d.options.data.kateg
  //   // (d) => d.options.data.kateg
  //   // (d) => d.properties.kateg
  //   // (d) => (d.options ? d.options.data.kateg : d.kateg)
  //   // );
  // }, [visData]);

  // console.log('kategCount', kategCount);

  // const kategCountMap = useMemo(() => {

  //   const resultMap = new Map();

  //   kategorienSorted.forEach((kat) => {
  //     resultMap.set(kat, 0);
  //   });

  //   const rolledUpMap = rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
  //   );

  //   rolledUpMap.forEach((count, kat) => {
  //     resultMap.set(kat, count);
  //   });

  //   return resultMap;

  // }, [visData]);

  const kategCountMap = useFixedRolledUpMap(
    visData,
    'kateg2',
    kategorienSorted
  );

  // const width = chartWidth > 400 ? chartWidth : 300;
  const width = chartWidth || 300;

  const height = 160; // 120

  const marginLeftScale = scaleLinear()
    // .domain([0.75, 1]) //based on FontSize in rem
    .domain(chartWidthDomain) // based on chartWidth
    // .range([170, 220])
    .range([170, 220])
    // .range([100, 220])
    .clamp(true);

  const marginRightScale = scaleLinear()
    // .domain([0.75, 1]) //based on FontSize in rem
    .domain(chartWidthDomain) // based on chartWidth
    .range([50, 80])
    .clamp(true);

  // const margin = {
  //   top: 30, // 20
  //   right: chartWidth > smallMobileBreakpoint ? 80 : 30, // 80
  //   bottom: 5,
  //   left: chartWidth > smallMobileBreakpoint ? 220 : 190, // 220
  // };

  const margin = useMemo(() => {
    return {
      top: 45, // 30
      // right: marginRightScale(svgFontSize.text), // 80
      right: marginRightScale(chartWidth), // 80
      bottom: 5,
      // left: marginLeftScale(svgFontSize.text), // 220
      // left: marginLeftScale(chartWidth), // 220
      left:
        chartWidth <= smallMobileBreakpoint
          ? 125
          : marginLeftScale(chartWidth),
    };
  }, [
    marginLeftScale,
    marginRightScale,
    chartWidth,
    smallMobileBreakpoint,
  ]);

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = height - margin.top - margin.bottom;

  // console.log(chartWidth);

  // const kategorien = [...variableCount.keys()];

  // const kategorien = [
  //   'Unfall mit Leichtverletzten',
  //   'Unfall mit Schwerverletzten/Getöteten',
  // ];

  // console.log('bar kategcount', variableCount);
  // console.log('keys', kategorien); // [...kategCount.keys()]
  // console.log(variableCount.get(kategorien[0]));

  // const maxKateg =
  //   variableCount.get('Unfall mit Leichtverletzten') >=
  //   variableCount.get('Unfall mit Schwerverletzten/Getöteten')
  //     ? 'Unfall mit Leichtverletzten'
  //     : 'Unfall mit Schwerverletzten/Getöteten';

  const leichtCount = kategCountMap.get(
    'Unfall mit Leichtverletzten'
  );
  const schwerCount = kategCountMap.get(
    'Unfall mit Schwerverletzten/Getöteten'
  );

  // const leichtCount =
  //   kategCount.get('Unfall mit Leichtverletzten') || 0;
  // const schwerCount =
  //   kategCount.get('Unfall mit Schwerverletzten/Getöteten') || 0;

  const maxKateg =
    leichtCount >= schwerCount
      ? 'Unfall mit Leichtverletzten'
      : 'Unfall mit Schwerverletzten/Getöteten';

  const maxValue = kategCountMap.get(maxKateg);

  // const maxValue = kategCount.get(maxKateg) || 0;

  // console.log('maxkateg', maxKateg, 'maxvalue', maxValue);

  // console.log('maxkateg, maxvalue', maxKateg, maxValue);

  // const barChartRef = useRef();
  // useEffect(() => {
  //   const barChart = select(barChartRef.current);
  // }, [variableCount]);

  // const xScale = scaleLinear()
  //   .domain([0, maxValue > 0 ? maxValue : 1]) // visDataTotal
  //   .range([0, innerWidth])
  //   .nice();

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain([0, maxValue > 0 ? maxValue : 1]) // visDataTotal
      .range([0, innerWidth])
      .nice();
  }, [innerWidth, maxValue]);

  // const kategorienSorted = [
  //   'Unfall mit Getöteten',
  //   'Unfall mit Schwerverletzten',
  //   'Unfall mit Leichtverletzten',
  // ];

  // const yScale = scaleBand()
  //   .domain(kategorienSorted) // kategorienSorted
  //   .range([0, innerHeight])
  //   // .range([innerHeight, 0])
  //   .padding(0.2);

  const yScale = useMemo(() => {
    return scaleBand()
      .domain(kategorienSorted) // kategorienSorted
      .range([0, innerHeight])
      .padding(0.2);
  }, [innerHeight]);

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
    <>
      <ChartContainer
        width={width}
        height={height}
        descId="kategBarChartDesc"
      >
        <desc id="kategBarChartDesc">
          Horizontales Balkendiagramm zum Schweregrad des Unfalls.
          {kategorienSorted.map(
            (kat) => `${kat} ${kategCountMap.get(kat)}`
          )}
        </desc>
        <text
          // x={10}
          // y={4}
          x={0}
          y={4}
          textAnchor="auto"
          dominantBaseline="hanging"
          className="svg-title"
          fontSize={`${svgFontSize.title}rem`}
          role="presentation"
          aria-hidden="true"
        >
          Schweregrad des Unfalls
        </text>
        {/* <text
        x={10}
        y={25}
        textAnchor="auto"
        dominantBaseline="hanging"
        // className="svg-title"
        fontSize={`${svgFontSize.text}rem`}
      >
        Unfall mit
      </text> */}
        <g
          // ref={barChartRef}
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

          {kategorienSorted.map((kat, i) => (
            <KategBarChartBar
              key={kat}
              xScale={xScale}
              yScale={yScale}
              kategCount={kategCountMap.get(kat)}
              // kategCountNumber={kategCount.get(d)}
              // visDataTotal={visDataTotal}
              kat={kat}
              svgFontSize={svgFontSize}
              color={
                kat === 'Unfall mit Leichtverletzten'
                  ? COLORS.orange.light
                  : COLORS.orange.dark
              }
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
        <KategBarKatAxis
          yScale={yScale}
          innerHeight={innerHeight}
          margin={margin}
          kat={kategorienSorted}
          svgFontSize={svgFontSize}
          chartWidth={chartWidth}
          smallMobileBreakpoint={smallMobileBreakpoint}
        />
        {/* <BarXAxis variableArray={kategorien} /> */}
        {/* <Bar /> */}
      </ChartContainer>
      <Note
        svgFontSize={svgFontSize}
        // margin={`${-(margin.bottom + vizWrapperGap + 5)}px 0 0 10px`}
        margin={`${-(
          margin.bottom +
          vizWrapperGap +
          5
        )}px 0 0 ${scrollbarWidth}px`}
      >
        <p>
          Für die Zurodnung war die jeweils schwerste Unfallfolge
          entscheidend.
        </p>
      </Note>
      {/* <NoteWrapper
        svgFontSize={svgFontSize}
        vizWrapperGap={vizWrapperGap}
        margin={margin}
      >
        <p>
          Für die Zurodnung war die jeweils schwerste Unfallfolge
          entscheidend.
        </p>
      </NoteWrapper> */}
    </>
  );
}

const NoteWrapper = styled.div`
  /* margin-top: -60px; */
  margin-top: ${({ margin, vizWrapperGap }) =>
    `${-(margin.bottom + vizWrapperGap + 5)}px`};
  margin-left: 10px;
  font-size: ${({ svgFontSize }) => `${svgFontSize.text}rem`};
  font-family: var(--font-noto-sans);
  color: rgba(59, 59, 59, 1);
`;

export default React.memo(KategBarChart);

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
