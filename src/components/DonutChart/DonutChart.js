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
import { numberWithSeparator } from '@/utils/calc';
import { COLORS } from '@/utils/constants';
// import useRolledUpMap from '@/hooks/useRolledUpMap';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';
import DonutChartArc from './DonutChartArc';
import DonutChartArcLabel from './DonutChartArcLabel';

function DonutChart({
  chartWidth,
  data,
  variable,
  kategorien,
  title,
  // splitString,
  // responsiveThreshold,
  svgFontSize,
  chartWidthDomain,
  mobileBreakpoint,
}) {
  const responsiveThreshold = 500; // 400

  // const width = scaleLinear()
  //   .domain(chartWidthDomain)
  //   .range([300, chartWidth])
  //   .clamp(true);

  const width = chartWidth > responsiveThreshold ? chartWidth : 300;

  // const width = chartWidth;
  // const height = 300;

  // const height = chartWidth > responsiveThreshold ? 250 : 350;
  const height = chartWidth > responsiveThreshold ? 250 : 300;

  const margin = {
    top: chartWidth > responsiveThreshold ? 60 : 80, //100
    right: 50,
    bottom: 10,
    left: 50,
  };

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = height - margin.top - margin.bottom;

  const variableCount = useFixedRolledUpMap(
    data,
    variable,
    kategorien
  );

  // console.log(variableCount);

  // console.log(variableCount);

  const radius = Math.min(innerWidth, innerHeight) / 3; // 2.5

  const colorScale = useMemo(() => {
    return (
      scaleOrdinal()
        .domain(kategorien)
        // .range([COLORS.orange.medium, COLORS.orange.dark]);
        // .range([
        //   COLORS.categorical.orangeLight,
        //   COLORS.categorical.orangeDark,
        // ]);
        // .range([COLORS.orange, COLORS.yellow.medium]);
        // .range([
        //   COLORS.yellowOrange.light,
        //   COLORS.yellowOrange.medium,
        // ])
        .range([
          COLORS.yellowOrange.medium,
          COLORS.yellowOrange.light,
        ])
    );
  }, [kategorien]);

  const countArray = useMemo(() => {
    return [...kategorien].reverse().map((kat) => {
      return {
        key: kat,
        value: variableCount.get(kat),
      };
    });

    // [
    //   {
    //     key: 'Tageslicht',
    //     value: variableCount.get('Tageslicht'), //  || 0
    //   },
    //   {
    //     key: 'Dämmerung/Dunkelheit',
    //     value: variableCount.get('Dämmerung/Dunkelheit'), //  || 0
    //   },
    // ];
  }, [variableCount, kategorien]);

  const arcData = useMemo(() => {
    const pieGenerator = pie()
      .value((d) => d.value)
      .sort(null);

    return pieGenerator(countArray);
  }, [countArray]); // arcGenerator

  // const labelPosition = {
  //   leftX:
  //     chartWidth > responsiveThreshold
  //       ? innerWidth / 2 - radius * 2 + margin.left
  //       : innerWidth / 2 + margin.right - 20, // 10
  //   leftY: chartWidth > responsiveThreshold ? 60 : 60,
  //   leftTextAnchor: 'end',
  //   rightX:
  //     chartWidth > responsiveThreshold
  //       ? innerWidth / 2 + radius * 2 + margin.left
  //       : innerWidth / 2 + margin.right + 20, // -10
  //   rightY: chartWidth > responsiveThreshold ? 60 : 60,
  //   rightTextAnchor: 'start',
  // };

  // console.log(kategorien, countArray, arcData);
  // console.log(kategorien[0], colorScale(kategorien[0]));
  // console.log(kategorien[1], colorScale(kategorien[1]));

  const leftLabelPosition = {
    x:
      chartWidth > responsiveThreshold
        ? innerWidth / 2 - radius * 2 + margin.left
        : innerWidth / 2 + margin.right - 20, // 10
    y: chartWidth > responsiveThreshold ? 60 : 60,
    textAnchor: 'end',
  };

  const rightLabelPosition = {
    x:
      chartWidth > responsiveThreshold
        ? innerWidth / 2 + radius * 2 + margin.left
        : innerWidth / 2 + margin.right + 20, // -10
    y: chartWidth > responsiveThreshold ? 60 : 60,
    textAnchor: 'start',
  };

  const labelPosition = [leftLabelPosition, rightLabelPosition];

  // const leftLabelXPosition =
  // chartWidth > responsiveThreshold
  //   ? innerWidth / 2 - radius * 2 + margin.left
  //   : innerWidth / 2 + margin.right - 20; // 10

  // const leftLabelYPosition =
  //   chartWidth > responsiveThreshold ? 60 : 60; // 80

  // const leftLabelTextAnchor = chartWidth > 400 ? 'end' : 'start';
  // const leftLabelTextAnchor = 'end';

  // const rightLabelXPosition =
  //   chartWidth > responsiveThreshold
  //     ? innerWidth / 2 + radius * 2 + margin.left
  //     : innerWidth / 2 + margin.right + 20; // -10

  // const rightLabelYPosition =
  //   chartWidth > responsiveThreshold ? 60 : 60; // 80

  // // const rightLabelTextAnchor = chartWidth > 400 ? 'start' : 'end';
  // const rightLabelTextAnchor = 'start';

  return (
    <ChartContainer width={width} height={height}>
      <text
        x={10}
        y={4}
        textAnchor="auto"
        dominantBaseline="hanging"
        className="svg-title"
        fontSize={`${svgFontSize.title}rem`}
      >
        {title}
      </text>
      {kategorien.map((kat, i) => (
        <DonutChartArcLabel
          key={kat}
          label={kat}
          count={variableCount.get(kat)}
          labelPosition={labelPosition[i]}
          svgFontSize={svgFontSize}
          // splitString={splitString}
        />
      ))}
      {/* <text
        // x={20}
        y={labelPosition.leftY}
        textAnchor={labelPosition.leftTextAnchor}
        dominantBaseline="middle"
        // style={{ fontSize: '0.8rem' }}
      >
        <tspan x={labelPosition.leftX} dy="0">
          Dämmerung/
        </tspan>
        <tspan x={labelPosition.leftX} dy="1.4em">
          Dunkelheit
        </tspan>
        <tspan x={labelPosition.leftX} dy="1.4em">
          {variableCount.get('Dämmerung/Dunkelheit')
            ? numberWithSeparator(
                variableCount.get('Dämmerung/Dunkelheit')
              )
            : 0}
        </tspan>
      </text> */}
      {/* <text
        // x={20}
        y={labelPosition.rightY}
        textAnchor={labelPosition.rightTextAnchor}
        dominantBaseline="middle"
        // style={{ fontSize: '0.8rem' }}
      >
        <tspan x={labelPosition.rightX} dy="0">
          Tageslicht
        </tspan>
        <tspan x={labelPosition.rightX} dy="1.4em">
          {variableCount.get('Tageslicht')
            ? numberWithSeparator(variableCount.get('Tageslicht'))
            : 0}
        </tspan>
      </text> */}
      {/* )} */}
      <g
        // ref={barChartRef}
        transform={`translate(${margin.left + innerWidth / 2}, ${
          margin.top + innerHeight / 2
        })`}
      >
        {arcData.map((d, i) => (
          // <LichtDonutChartArc
          //   key={d.data.key}
          //   radius={radius}
          //   arcDatum={d}
          //   color={colorScale(d.data.key)} //colors[i]
          // />
          <DonutChartArc
            key={d.data.key}
            radius={radius}
            arcDatum={d}
            fillColor={colorScale(d.data.key)} //colors[i]
            strokeColor={COLORS.white}
          />
        ))}
      </g>
    </ChartContainer>
  );
}

export default DonutChart;
