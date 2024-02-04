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
// import LichtDonutChartArc from './LichtDonutChartArc';
// import LichtLollipopChartLine from './LichtLollipopChartLine';
// import LichtLollipopChartYAxis from './LichtLollipopChartYAxis';
import { numberWithSeparator } from '../../utils/calc';
import { COLORS } from '../../utils/constants';
// import useRolledUpMap from '@/hooks/useRolledUpMap';
// import DonutChartArc from '../DonutChartWrapper/DonutChart/DonutChartArc';
import DonutChart from '../DonutChart';

function LichtDonutChart({
  // variableCount,
  // visDataTotal,
  chartWidth,
  visData,
  svgFontSize,
  chartWidthDomain,
  mobileBreakpoint,
}) {
  const kategorien = ['Dämmerung/Dunkelheit', 'Tageslicht'];
  // const kategorien = ['Tageslicht', 'Dämmerung/Dunkelheit'];

  // TODO: check rendering (useState is called to often vs. useEffect)
  // TODO: scale totalaccidents oder totalvisdata
  // TODO: scale etc. useMemo, or...
  // TODO: Dunkelheit und dämmerung zusammenfassen
  // TODO: donutchart disappears sometimes (wenn etwas geänder wird im code, speziell radius), wenn aktualisiert erscheint es kurz und verschwindet
  // TODO: bei zoomen (bei 1 oder 0? aber nicht immer? oder bei gleicher anzahl, z.b. 1 1?) tauschen die farben

  return (
    <DonutChart
      chartWidth={chartWidth}
      data={visData}
      variable="licht2"
      kategorien={kategorien}
      title="Lichtverhältnisse"
      svgFontSize={svgFontSize}
      chartWidthDomain={chartWidthDomain}
      mobileBreakpoint={mobileBreakpoint}
      // splitString={TRUE}
    />
  );
}

export default React.memo(LichtDonutChart);

// const kategorienSorted = ['Tageslicht', 'Dämmerung/Dunkelheit'];

// function LichtDonutChart({
//   // variableCount,
//   // visDataTotal,
//   chartWidth,
//   visData,
// }) {
//   // const kategorienSorted = ['Dämmerung/Dunkelheit', 'Tageslicht'];
//   // const kategorienSorted = useMemo(() => {
//   //   return ['Tageslicht', 'Dämmerung/Dunkelheit'];
//   // }, []);

//   // const width = 300;

//   // const height = 200;

//   // const margin = {
//   //   top: 20,
//   //   right: 50,
//   //   bottom: 20,
//   //   left: 160,
//   // };

//   const responsiveThreshold = 500; // 400

//   const width = chartWidth > responsiveThreshold ? chartWidth : 300;

//   // const width = chartWidth;

//   const height = chartWidth > responsiveThreshold ? 250 : 350;

//   // const margin = {
//   //   top: 20,
//   //   right: 50,
//   //   bottom: 20,
//   //   left: 190,
//   // };

//   const margin = {
//     top: chartWidth > responsiveThreshold ? 60 : 80, //100
//     right: 50,
//     bottom: 10,
//     left: 50,
//   };

//   const innerWidth = width - margin.left - margin.right;

//   const innerHeight = height - margin.top - margin.bottom;

//   // const variableCount = useMemo(() => {
//   //   return rollup(
//   //     visData,
//   //     (v) => v.length,
//   //     (d) => (d.options ? d.options.data.licht2 : d.licht2)
//   //   );
//   // }, [visData]);

//   const variableCount = useRolledUpMap(visData, 'licht2');

//   // const kategorien = [...variableCount.keys()];

//   // console.log('bar kategcount', variableCount);
//   // console.log('keys', kategorien); // [...kategCount.keys()]
//   // console.log(variableCount.get(kategorien[0]));

//   // const barChartRef = useRef();
//   // useEffect(() => {
//   //   const barChart = select(barChartRef.current);
//   // }, [variableCount]);

//   // const maxKateg =
//   //   variableCount.get('Tageslicht') ||
//   //   0 >= variableCount.get('Dämmerung/Dunkelheit') ||
//   //   0
//   //     ? 'Tageslicht'
//   //     : 'Dämmerung/Dunkelheit';

//   // const maxValue = variableCount.get(maxKateg);

//   // var radius = Math.min(innerWidth, innerHeight) / 2;
//   const radius = Math.min(innerWidth, innerHeight) / 3; // 2.5

//   const colorScale = useMemo(() => {
//     return (
//       scaleOrdinal()
//         .domain(kategorienSorted)
//         // .range([COLORS.orange.medium, COLORS.orange.dark]);
//         // .range([
//         //   COLORS.categorical.orangeLight,
//         //   COLORS.categorical.orangeDark,
//         // ]);
//         // .range([COLORS.orange, COLORS.yellow.medium]);
//         .range([
//           COLORS.yellowOrange.light,
//           COLORS.yellowOrange.medium,
//         ])
//     );
//   }, []);
//   // .range([COLORS.gray.light, COLORS.gray.medium]);
//   // .range([COLORS.yellow.medium, COLORS.yellow.light]);

//   // const countArray = useMemo(() => {
//   //   return Array.from(variableCount.entries(), ([key, value]) => ({
//   //     key,
//   //     value,
//   //   }));
//   // }, [variableCount]);

//   const countArray = useMemo(() => {
//     return [
//       {
//         key: 'Tageslicht',
//         value: variableCount.get('Tageslicht'), //  || 0
//       },
//       {
//         key: 'Dämmerung/Dunkelheit',
//         value: variableCount.get('Dämmerung/Dunkelheit'), //  || 0
//       },
//     ];
//   }, [variableCount]);

//   // console.log('countarray', countArray, 'countarray2', countArray2);

//   // console.log(countArray);

//   // const arcGenerator = pie()
//   //   .value((d) => d.value)
//   //   .sort(null);

//   const arcData = useMemo(() => {
//     const pieGenerator = pie()
//       .value((d) => d.value)
//       .sort(null);

//     return pieGenerator(countArray);
//   }, [countArray]); // arcGenerator

//   // console.log('arcs', arcs);

//   // const leftLabelXPosition =
//   //   chartWidth > 450 ? innerWidth / 2 - radius : 10;

//   // const leftLabelXPosition =
//   //   chartWidth > 400
//   //     ? innerWidth / 2 - radius * 2 + margin.left
//   //     : margin.left; // 10

//   const leftLabelXPosition =
//     chartWidth > responsiveThreshold
//       ? innerWidth / 2 - radius * 2 + margin.left
//       : innerWidth / 2 + margin.right - 20; // 10

//   const leftLabelYPosition =
//     chartWidth > responsiveThreshold ? 60 : 60; // 80

//   // const leftLabelTextAnchor = chartWidth > 400 ? 'end' : 'start';
//   const leftLabelTextAnchor = 'end';

//   // const rightLabelXPosition =
//   //   chartWidth > 400
//   //     ? innerWidth / 2 + radius * 2 + margin.left
//   //     : width - margin.right; // -10

//   const rightLabelXPosition =
//     chartWidth > responsiveThreshold
//       ? innerWidth / 2 + radius * 2 + margin.left
//       : innerWidth / 2 + margin.right + 20; // -10

//   const rightLabelYPosition =
//     chartWidth > responsiveThreshold ? 60 : 60; // 80

//   // const rightLabelTextAnchor = chartWidth > 400 ? 'start' : 'end';
//   const rightLabelTextAnchor = 'start';

//   // TODO: check rendering (useState is called to often vs. useEffect)
//   // TODO: scale totalaccidents oder totalvisdata
//   // TODO: scale etc. useMemo, or...
//   // TODO: Dunkelheit und dämmerung zusammenfassen
//   // TODO: donutchart disappears sometimes (wenn etwas geänder wird im code, speziell radius), wenn aktualisiert erscheint es kurz und verschwindet
//   // TODO: bei zoomen (bei 1 oder 0? aber nicht immer? oder bei gleicher anzahl, z.b. 1 1?) tauschen die farben

//   return (
//     <ChartContainer width={width} height={height}>
//       {/* <LichtLollipopChartYAxis
//         yScale={yScale}
//         innerHeight={innerHeight}
//         margin={margin}
//         kat={kategorienSorted}
//       /> */}
//       {/* <LichtLollipopChartXAxis
//         xScale={xScale}
//         innerWidth={innerWidth}
//         innerHeight={innerHeight}
//         margin={margin}
//         kat={kategorienSorted}
//       /> */}
//       {/* {variableCount.get('Dämmerung/Dunkelheit') > 0 && ( */}
//       <text
//         x={10}
//         y={4}
//         textAnchor="auto"
//         dominantBaseline="hanging"
//         className="svg-title"
//       >
//         Lichtverhältnisse
//       </text>
//       <text
//         // x={20}
//         y={leftLabelYPosition}
//         textAnchor={leftLabelTextAnchor}
//         dominantBaseline="middle"
//         // style={{ fontSize: '0.8rem' }}
//       >
//         <tspan x={leftLabelXPosition} dy="0">
//           Dämmerung/
//         </tspan>
//         <tspan x={leftLabelXPosition} dy="1.4em">
//           Dunkelheit
//         </tspan>
//         <tspan x={leftLabelXPosition} dy="1.4em">
//           {variableCount.get('Dämmerung/Dunkelheit')
//             ? numberWithSeparator(
//                 variableCount.get('Dämmerung/Dunkelheit')
//               )
//             : 0}
//         </tspan>
//       </text>
//       {/* )} */}
//       {/* {variableCount.get('Tageslicht') > 0 && ( */}
//       {/*numberWithSeparator(
//             variableCount.get('Dämmerung/Dunkelheit')
//       ) || 0 */}
//       <text
//         // x={20}
//         y={rightLabelYPosition}
//         textAnchor={rightLabelTextAnchor}
//         dominantBaseline="middle"
//         // style={{ fontSize: '0.8rem' }}
//       >
//         <tspan x={rightLabelXPosition} dy="0">
//           Tageslicht
//         </tspan>
//         <tspan x={rightLabelXPosition} dy="1.4em">
//           {variableCount.get('Tageslicht')
//             ? numberWithSeparator(variableCount.get('Tageslicht'))
//             : 0}
//         </tspan>
//       </text>
//       {/* )} */}
//       <g
//         // ref={barChartRef}
//         transform={`translate(${margin.left + innerWidth / 2}, ${
//           margin.top + innerHeight / 2
//         })`}
//       >
//         {arcData.map((d, i) => (
//           // <LichtDonutChartArc
//           //   key={d.data.key}
//           //   radius={radius}
//           //   arcDatum={d}
//           //   color={colorScale(d.data.key)} //colors[i]
//           // />
//           <DonutChartArc
//             key={d.data.key}
//             radius={radius}
//             arcDatum={d}
//             fillColor={colorScale(d.data.key)} //colors[i]
//             strokeColor={COLORS.white}
//           />
//         ))}
//       </g>
//     </ChartContainer>
//   );
// }

// export default React.memo(LichtDonutChart);
