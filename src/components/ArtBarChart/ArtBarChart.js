'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand } from 'd3-scale';
import ChartContainer from '../ChartContainer';
import ArtBarAxis from './ArtBarAxis';
import { useSpring, useSprings, animated } from '@react-spring/web';
import ArtBarChartBar from './ArtBarChartBar';
import ArtBarChartLabelledBar from './ArtBarChartLabelledBar';

function ArtBarChart({
  variableCount,
  visDataTotal,
  dashboardWidth,
}) {
  // const kategorienSorted = [
  //   'Zusammenstoß mit anfahrendem / anhaltendem / ruhendem Fahrzeug',
  //   'Zusammenstoß mit vorausfahrendem / wartendem Fahrzeug',
  //   'Zusammenstoß mit seitlich in gleicher Richtung fahrendem Fahrzeug',
  //   'Zusammenstoß mit entgegenkommendem Fahrzeug',
  //   'Zusammenstoß mit einbiegendem / kreuzendem Fahrzeug',
  //   'Zusammenstoß zwischen Fahrzeug und Fußgänger',
  //   'Aufprall auf Fahrbahnhindernis',
  //   'Abkommen von Fahrbahn nach rechts',
  //   'Abkommen von Fahrbahn nach links',
  //   'Unfall anderer Art',
  // ];

  // const kategorienSorted = [
  //   'Unfall anderer Art',
  //   'Abkommen von Fahrbahn nach links',
  //   'Abkommen von Fahrbahn nach rechts',
  //   'Aufprall auf Fahrbahnhindernis',
  //   'Zusammenstoß zwischen Fahrzeug und Fußgänger',
  //   'Zusammenstoß mit einbiegendem / kreuzendem Fahrzeug',
  //   'Zusammenstoß mit entgegenkommendem Fahrzeug',
  //   'Zusammenstoß mit seitlich in gleicher Richtung fahrendem Fahrzeug',
  //   'Zusammenstoß mit vorausfahrendem / wartendem Fahrzeug',
  //   'Zusammenstoß mit anfahrendem / anhaltendem / ruhendem Fahrzeug',
  // ];

  // const kategorienSorted = variableCount.map((item) => item.key)

  // const kategorienSorted = Array.from(variableCount.keys());

  console.log('artbar dashboardwidth', dashboardWidth);

  const kategorienSorted = Array.from(variableCount.keys()).filter(
    (key) => {
      const count = variableCount.get(key);
      const percentage = Math.round((count / visDataTotal) * 100);
      return percentage > 0; // Adjust the filtering criteria as needed
    }
  );

  // const width = 600; // 600 // 300
  const width = dashboardWidth;

  // const height =
  //   kategorienSorted.length <= 2
  //     ? 150
  //     : kategorienSorted.length > 2 && kategorienSorted.length <= 5
  //     ? 300
  //     : 600;
  // const height =
  //   kategorienSorted.length <= 2
  //     ? 150
  //     : kategorienSorted.length > 2 && kategorienSorted.length <= 6
  //     ? 500
  //     : 800;
  const height = kategorienSorted.length * 75;
  // : kategorienSorted.length > 5 || kategorienSorted <= 7
  // ? 450
  // 600;

  // const height = useMemo(() => {
  //   return kategorienSorted.length <= 2
  //     ? 150
  //     : kategorienSorted.length > 2 || kategorienSorted.length <= 5
  //     ? 300
  //     : 600;
  // }, [kategorienSorted]);

  const margin = {
    top: 20,
    right: dashboardWidth > 400 ? 5 : 0, // 5
    bottom: 20,
    left: dashboardWidth > 400 ? 275 : 250, // 275 // 450 // 500 // 160
  };

  const marginLabelled = {
    top: 20,
    right: 10, // 5
    bottom: 20,
    left: 15, // 275 // 450 // 500 // 160
  };

  const innerWidth = width - margin.left - margin.right;

  const innerWidthLabelled =
    width - marginLabelled.left - marginLabelled.right;

  console.log('innerwidht labelled', innerWidthLabelled);

  const innerHeight = height - margin.top - margin.bottom;

  // const kategorien = [...variableCount.keys()];

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

  const maxKat = kategorienSorted.pop();

  const maxKatCount = variableCount.get(maxKat);

  console.log(
    'variableCount kategoriensprted',
    variableCount,
    kategorienSorted
  );
  const xScaleLabelled = scaleLinear()
    .domain([0, maxKatCount]) // visDataTotal dataTotal
    .range([0, innerWidthLabelled]) // innerWidthLabelled
    .nice();

  const yScaleBandwidth = 40;

  const yScale = scaleBand()
    .domain(kategorienSorted) // kategorienSorted
    .range([innerHeight, 0])
    .padding(0.2);

  const yScaleLabelled = scaleBand()
    .domain(kategorienSorted) // kategorienSorted
    .range([innerHeight, 0])
    .paddingInner(2.5) //0.8
    .paddingOuter(0.3);

  console.log('xscallelabelled', xScaleLabelled(3600));

  // console.log('bandwidth', yScale.bandwidth());

  // console.log(kategorienSorted);

  // TODO: check rendering (useState is called to often vs. useEffect)
  // TODO: scale totalaccidents oder totalvisdata
  // TODO: scale etc. useMemo, or...
  // TODO: Dunkelheit und dämmerung zusammenfassen
  // TODO: check if springs alle werte enthalten solllte (u.a. wegen responsiveness, etc.)
  // TODO: absolute oder relative zahlen

  return (
    <ChartContainer width={width} height={height}>
      {/* <ArtBarAxis
        yScale={yScale}
        innerHeight={innerHeight}
        margin={margin}
        kat={kategorienSorted}
        yScaleBandwidth={yScaleBandwidth}
      /> */}
      <g
        ref={barChartRef}
        transform={`translate(${marginLabelled.left}, ${marginLabelled.top})`}
      >
        {kategorienSorted.map((d, i) => (
          // <ArtBarChartBar
          //   key={d}
          //   xScale={xScale}
          //   yScale={yScale}
          //   variableCount={variableCount}
          //   visDataTotal={visDataTotal}
          //   kat={d}
          //   yScaleBandwidth={yScaleBandwidth}
          // />
          <ArtBarChartLabelledBar
            key={d}
            xScale={xScaleLabelled}
            yScale={yScaleLabelled}
            variableCount={variableCount}
            visDataTotal={visDataTotal}
            kat={d}
            yScaleBandwidth={yScaleBandwidth}
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
          //     {/* {variableCount.get(d)} */}
          //     {`${Math.round(
          //       (variableCount.get(d) / visDataTotal) * 100
          //     )} %`}
          //   </text>
          // </g>
        ))}
        {/* {kategorien.map((d, i) => {
          if (
            Math.round((variableCount.get(d) / visDataTotal) * 100) >
            0
          ) {
            return (
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
            );
          }
        })} */}
      </g>
    </ChartContainer>
  );
}

export default ArtBarChart;
