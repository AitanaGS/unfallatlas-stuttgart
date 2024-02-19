'use client';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { min, max, least, greatest, extent, rollup } from 'd3-array';
import { stratify, treemap, hierarchy } from 'd3-hierarchy';
import { select, selectAll } from 'd3-selection';
import {
  scaleSequential,
  scaleBand,
  scaleOrdinal,
  scaleLinear,
} from 'd3-scale';
import { interpolateOranges, schemeDark2 } from 'd3-scale-chromatic';
import ChartContainer from '../ChartContainer';
import TreeMapRect from './TreeMapRect';
import { COLORS } from '../../utils/constants';
// import useRolledUpMap from '@/hooks/useRolledUpMap';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';
// import { SVGFontSizeContext } from '@/contextProvider/SVGFontSizeContextProvider';
import styled from 'styled-components';
import Note from '../Note';

function TreeMap({
  chartWidth,
  visDataTotal,
  visData,
  // smallMobileBreakpoint,
  svgFontSize,
  chartWidthDomain,
  // fontSizeScale,
  // svgFontSize,
  vizWrapperGap,
  scrollbarWidth,
}) {
  const width = chartWidth; //|| 300; // 250
  const height = 255;
  // const margin = {
  //   top: 25, // 20
  //   right: chartWidth > smallMobileBreakpoint ? 40 : 20, //40
  //   bottom: 10,
  //   left: 10,
  // };

  const marginRightScale = scaleLinear()
    // .domain([0.75, 1]) //based on FontSize in rem
    .domain(chartWidthDomain) // based on chartWidth
    .range([20, 40])
    .clamp(true);

  const margin = useMemo(() => {
    return {
      top: 25, // 20
      right: marginRightScale(chartWidth), //40
      bottom: 10,
      left: 0, // 10
    };
  }, [marginRightScale, chartWidth]);

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  // const [textFontSize, titleFontSize] = React.useContext(
  //   SVGFontSizeContext
  // );

  // console.log(textFontSize, titleFontSize);

  // const svgRef = useRef(null);

  // const treemapLayout = treemap()
  //   .size([innerWidth, innerHeight])
  //   .padding(1);

  // const root = treemapLayout(
  //   hierarchy({ children: treeData }).sum((d) => d.value)
  // );

  // const fussCount = useMemo(() => {
  //   return rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => d.istfussb
  //     // (d) => (d.options ? d.options.data.istfussb : d.istfussb)
  //   );
  // }, [visData]);

  // const radCount = useMemo(() => {
  //   return rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => d.istradb
  //     // (d) => (d.options ? d.options.data.istradb : d.istradb)
  //   );
  // }, [visData]);

  // const pkwCount = useMemo(() => {
  //   return rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => d.istpkwb
  //     // (d) => (d.options ? d.options.data.istpkwb : d.istpkwb)
  //   );
  // }, [visData]);

  // const kradCount = useMemo(() => {
  //   return rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => d.istkradb
  //     // (d) => (d.options ? d.options.data.istkradb : d.istkradb)
  //   );
  // }, [visData]);

  // const sonstCount = useMemo(() => {
  //   return rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => d.istsonst2b
  //     // (d) => (d.options ? d.options.data.istsonst2b : d.istsonst2b)
  //   );
  // }, [visData]);

  // const fussCount = useRolledUpMap(visData, 'istfussb');

  // const radCount = useRolledUpMap(visData, 'istradb');

  // const pkwCount = useRolledUpMap(visData, 'istpkwb');

  // const kradCount = useRolledUpMap(visData, 'istkradb');

  // const sonstCount = useRolledUpMap(visData, 'istsonst2b');

  const fussCount = useFixedRolledUpMap(visData, 'istfussb', [
    true,
    false,
  ]);

  const radCount = useFixedRolledUpMap(visData, 'istradb', [
    true,
    false,
  ]);

  const pkwCount = useFixedRolledUpMap(visData, 'istpkwb', [
    true,
    false,
  ]);

  const kradCount = useFixedRolledUpMap(visData, 'istkradb', [
    true,
    false,
  ]);

  const sonstCount = useFixedRolledUpMap(visData, 'istsonst2b', [
    true,
    false,
  ]);

  const numberData = useMemo(() => {
    return new Map([
      ['Fußgänger', fussCount.get(true)],
      ['Rad', radCount.get(true)],
      ['Kraftrad', kradCount.get(true)],
      ['PKW', pkwCount.get(true)],
      ['Sonstige', sonstCount.get(true)],
      // ['Fußgänger', fussCount.get(true) || 0],
      // ['Rad', radCount.get(true) || 0],
      // ['Kraftrad', kradCount.get(true) || 0],
      // ['PKW', pkwCount.get(true) || 0],
      // ['Sonstige', sonstCount.get(true) || 0],
    ]);
  }, [fussCount, radCount, kradCount, pkwCount, sonstCount]);

  const treeData = useMemo(() => {
    return Array.from(numberData, ([name, value]) => ({
      name,
      value,
    }));
  }, [numberData]);

  const root = useMemo(() => {
    const treemapLayout = treemap()
      .size([innerWidth, innerHeight])
      .padding(0.1);
    // .padding(1);

    return treemapLayout(
      hierarchy({ children: treeData }).sum((d) => d.value)
    );
  }, [treeData, innerWidth, innerHeight]);

  const namesArray = treeData.map((item) => item.name);

  // const colorArray = [
  //   COLORS.categorical.blue,
  //   COLORS.categorical.green,
  //   COLORS.categorical.pink,
  //   COLORS.categorical.yellow,
  //   COLORS.categorical.gray,
  // ];

  // https://jfly.uni-koeln.de/color/

  // const colorScale = scaleBand(schemeDark2).domain(namesArray);
  // const colorScale = scaleOrdinal()
  //   .domain(namesArray)
  //   .range(schemeDark2);
  // const colorScale = scaleOrdinal()
  //   .domain(namesArray)
  //   .range(colorArray);

  const colorScale = useMemo(() => {
    const colorArray = [
      COLORS.categorical2.yellow,
      COLORS.categorical2.green,
      COLORS.categorical2.purple,
      COLORS.categorical2.orangeDark,
      COLORS.categorical2.blueLight,
    ];
    return scaleOrdinal().domain(namesArray).range(colorArray);
  }, [namesArray]);

  // console.log('root leaves', root.leaves());

  // console.log('names array', namesArray);

  // TODO: add info text about sonstige

  // console.log('render');

  // console.log('svgfontsize', svgFontSize);
  // console.log('chartwidth', chartWidth);

  return (
    <>
      <ChartContainer width={width} height={height}>
        <text
          x={margin.left}
          y={4}
          textAnchor="auto"
          dominantBaseline="hanging"
          className="svg-title"
          fontSize={`${svgFontSize.title}rem`}
        >
          Beteiligte Verkehrsteilnehmer
        </text>
        {visDataTotal < 1 && (
          <text
            x={margin.left}
            y={50}
            textAnchor="auto"
            dominantBaseline="hanging"
            fontSize={`${svgFontSize.text}rem`}
            // className="svg-title"
          >
            keine Unfälle / keine Informationen verfügbar
          </text>
        )}
        <g transform={`translate(${margin.left},${margin.top})`}>
          {root.leaves().map((d) => (
            <TreeMapRect
              key={d.data.name}
              d={d}
              colorScale={colorScale}
              svgFontSize={svgFontSize}
              // svgFontSize={svgFontSize}
            />
            // <g key={d.data.name}>
            //   <rect
            //     x={d.x0}
            //     y={d.y0}
            //     width={d.x1 - d.x0}
            //     height={d.y1 - d.y0}
            //     fill={colorScale(d.data.name)}
            //     // fill={colorScale(d.value)}
            //   />
            //   <text
            //     x={d.x0}
            //     y={d.y0}
            //     textAnchor="start"
            //     dominantBaseline="hanging"
            //   >
            //     {d.value > 0 ? d.data.name : ''}
            //   </text>
            //   <text
            //     x={d.x0}
            //     y={d.y0 + 15}
            //     textAnchor="start"
            //     dominantBaseline="hanging"
            //   >
            //     {d.value > 0 ? d.value : ''}
            //   </text>
            // </g>
          ))}
        </g>
        {/* <text
          x={margin.left}
          y={innerHeight + margin.top + margin.bottom}
        >
          An einem Unfall können ein oder mehrere Verkehrsmittel /
          Personen beteiligt sein.
        </text> */}
      </ChartContainer>
      <Note
        svgFontSize={svgFontSize}
        margin={`${-(margin.bottom + vizWrapperGap + 5)}px 0 0 ${
          margin.left + scrollbarWidth
        }px`}
        // margin={`${-(margin.bottom + vizWrapperGap + 5)}px 0 0 ${
        //   margin.left
        // }px`}
        // vizWrapperGap={vizWrapperGap}
        // margin={margin}
      >
        <p>
          An einem Unfall können ein oder mehrere Verkehrsmittel /
          Personen beteiligt sein.{' '}
        </p>
        <p>
          Sonstige: zum Beispiel Bus, Straßenbahn oder
          Güterkraftfahrzeug.
        </p>
      </Note>
      {/* <NoteWrapper
        svgFontSize={svgFontSize}
        vizWrapperGap={vizWrapperGap}
        margin={margin}
      >
        <p>
          An einem Unfall können ein oder mehrere Verkehrsmittel /
          Personen beteiligt sein.{' '}
        </p>
        <p>
          Sonstige: zum Beispiel Bus, Straßenbahn oder
          Güterkraftfahrzeug.
        </p>
      </NoteWrapper> */}
    </>
  );
}

// const NoteWrapper = styled.div`
//   /* margin-top: -60px; */
//   margin-top: ${({ margin, vizWrapperGap }) =>
//     `${-(margin.bottom + vizWrapperGap + 5)}px`};
//   margin-left: ${({ margin }) => `${margin.left}px`};
//   font-size: ${({ svgFontSize }) => `${svgFontSize.text}rem`};
//   font-family: var(--font-noto-sans);
//   color: rgba(59, 59, 59, 1);
// `;

export default React.memo(TreeMap);
