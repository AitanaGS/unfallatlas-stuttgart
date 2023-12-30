'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand } from 'd3-scale';
import ChartContainer from '../ChartContainer';
import AnimatedChartContainer from '../ChartContainer';
import ArtBarAxis from './ArtBarAxis';
import { useSpring, useSprings, animated } from '@react-spring/web';
import ArtBarChartBar from './ArtBarChartBar';
import ArtBarChartLabelledBar from './ArtBarChartLabelledBar';

const sortArrayByReferenceArray = (referenceArray) => {
  return (a, b) => {
    const indexA = referenceArray.indexOf(a);
    const indexB = referenceArray.indexOf(b);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    if (indexA === -1) {
      return -1;
    }

    return 1;
  };
};

function ArtBarChart({
  variableCount,
  visDataTotal,
  dashboardWidth,
}) {
  // const kategorien = [
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

  // console.log('artbar dashboardwidth', dashboardWidth);

  // const kategorienSorted = useMemo(() => {
  //   return Array.from(variableCount.keys()).filter((key) => {
  //     const count = variableCount.get(key);
  //     const percentage = Math.round((count / visDataTotal) * 100);
  //     return percentage > 0; // Adjust the filtering criteria as needed
  //   });
  // }, [variableCount, visDataTotal]);

  // const kategorienSorted = Array.from(variableCount.keys()).filter(
  //   (key) => {
  //     const count = variableCount.get(key);
  //     const percentage = Math.round((count / visDataTotal) * 100);
  //     return percentage > 0; // Adjust the filtering criteria as needed
  //   }
  // );

  // const variableCountArray = Array.from(variableCount.keys());

  // const sortKategorien = sortArrayByReferenceArray(
  //   variableCountArray
  // );

  // const kategorienSorted = kategorien.sort(sortKategorien);

  const kategorienSorted = useMemo(() => {
    const kategorien = [
      'Zusammenstoß mit anfahrendem / anhaltendem / ruhendem Fahrzeug',
      'Zusammenstoß mit vorausfahrendem / wartendem Fahrzeug',
      'Zusammenstoß mit seitlich in gleicher Richtung fahrendem Fahrzeug',
      'Zusammenstoß mit entgegenkommendem Fahrzeug',
      'Zusammenstoß mit einbiegendem / kreuzendem Fahrzeug',
      'Zusammenstoß zwischen Fahrzeug und Fußgänger',
      'Aufprall auf Fahrbahnhindernis',
      'Abkommen von Fahrbahn nach rechts',
      'Abkommen von Fahrbahn nach links',
      'Unfall anderer Art',
    ];

    const variableCountArray = Array.from(variableCount.keys());

    const sortKategorien = sortArrayByReferenceArray(
      variableCountArray
    );

    return kategorien.sort(sortKategorien);
  }, [variableCount]);

  // console.log(variableCount, kategorienSorted);

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

  // const height =
  // visDataTotal > 0 ? kategorienSorted.length * 65 : 200; // 65
  // const height =
  //   visDataTotal <= 0
  //     ? 200
  //     : kategorienSorted.length > 5
  //     ? kategorienSorted.length * 65
  //     : kategorienSorted.length <= 5 && kategorienSorted.length >= 3
  //     ? kategorienSorted.length * 80
  //     : kategorienSorted.length * 100;

  // const height = kategorienSorted.length * 60; // 65

  const height = 620; // 65

  // kategorienSorted.length * 70 : 200; // 65

  const spring = useSpring({
    height: kategorienSorted.length * 60 + 100,
    // visDataTotal > 0 ? kategorienSorted.length * 60 : 200
    // x: xScale(0),
    // y: yScale(kat),
    // width: xScale(variableCount.get(kat)),
    // // height: yScale.bandwidth(),
    // height: yScaleBandwidth,
    // textNumberX: xScale(variableCount.get(kat)) - 2, // xScale(variableCount.get(kat)) + 3
    // textNumberY: yScale(kat) + yScaleBandwidth / 2, // yScale(kat) + yScaleBandwidth / 2,
    // textLabelX: xScale(0),
    // // textLabelY: yScale(kat) - 8,
    // textLabelY: yScale(kat) - 20,
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
    },
  });

  // const height = 480;
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

  // const margin = {
  //   top: 20,
  //   right: dashboardWidth > 400 ? 5 : 2, // 5
  //   bottom: 5,
  //   left: dashboardWidth > 400 ? 275 : 250, // 275 // 450 // 500 // 160
  // };

  const marginLabelled = {
    top: 40, // 20
    right: 10, // 5
    bottom: 0,
    left: 10, // 20 // 275 // 450 // 500 // 160
  };

  // const innerWidth = width - margin.left - margin.right;

  const innerWidthLabelled =
    width - marginLabelled.left - marginLabelled.right;

  // console.log('innerwidht labelled', innerWidthLabelled);

  const innerHeight =
    height - marginLabelled.top - marginLabelled.bottom;

  // const kategorien = [...variableCount.keys()];

  // console.log('bar kategcount', variableCount);
  // console.log('keys', kategorien); // [...kategCount.keys()]
  // console.log(variableCount.get(kategorien[0]));

  const barChartRef = useRef();
  useEffect(() => {
    const barChart = select(barChartRef.current);
  }, [variableCount]);

  // const xScale = scaleLinear()
  //   .domain([0, visDataTotal]) // dataTotal
  //   .range([0, innerWidth])
  //   .nice();

  const maxKat = kategorienSorted[kategorienSorted.length - 1] || '';

  const maxKatCount = variableCount.get(maxKat) || 0;

  // console.log('maxkat', maxKat, 'maxkatcount', maxKatCount);

  // console.log('maxkat', maxKat, maxKatCount);

  // console.log(
  //   'variableCount kategoriensprted',
  //   variableCount,
  //   kategorienSorted
  // );
  const xScaleLabelled = scaleLinear()
    .domain([0, maxKatCount > 0 ? maxKatCount : 1]) // visDataTotal dataTotal
    .range([0, innerWidthLabelled]) // innerWidthLabelled
    .nice();

  const yScaleBandwidth = 20; // 40

  // const yScale = scaleBand()
  //   .domain(kategorienSorted) // kategorienSorted
  //   .range([innerHeight, 0])
  //   .padding(0.2);

  const yScaleLabelled = scaleBand()
    .domain(kategorienSorted) // kategorienSorted
    .range([innerHeight, 0])
    .paddingInner(0.3) // 2.5 0.8
    .paddingOuter(0.3);

  // console.log('xscallelabelled', xScaleLabelled(3600));

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
      <text
        x={10}
        y={4}
        textAnchor="auto"
        dominantBaseline="hanging"
        className="svg-title"
      >
        Art des Unfalls
      </text>
      {/* {visDataTotal < 1 && (
        <text
          x={10}
          y={50}
          textAnchor="auto"
          dominantBaseline="hanging"
          // className="svg-title"
        >
          keine Unfälle / keine Informationen verfügbar
        </text>
      )} */}
      <g
        ref={barChartRef}
        transform={`translate(${marginLabelled.left}, ${marginLabelled.top})`}
      >
        {kategorienSorted.map(
          (d, i) => {
            // <ArtBarChartBar
            //   key={d}
            //   xScale={xScale}
            //   yScale={yScale}
            //   variableCount={variableCount}
            //   visDataTotal={visDataTotal}
            //   kat={d}
            //   yScaleBandwidth={yScaleBandwidth}
            // />
            // console.log(d, i);
            return (
              <ArtBarChartLabelledBar
                key={d}
                xScale={xScaleLabelled}
                yScale={yScaleLabelled}
                variableCount={variableCount}
                visDataTotal={visDataTotal}
                kat={d}
                yScaleBandwidth={yScaleBandwidth}
              />
            );
          }
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
        )}
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
