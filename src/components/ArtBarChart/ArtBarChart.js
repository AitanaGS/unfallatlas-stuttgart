'use client';
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  memo,
} from 'react';
import { select } from 'd3-selection';
import { rollup, extent, max, min } from 'd3-array';
// import BarXAxis from '../BarXAxis/BarXAxis';
import { scaleLinear, scaleBand } from 'd3-scale';
import ChartContainer from '../ChartContainer';
import AnimatedChartContainer from '../ChartContainer';
// import ArtBarAxis from './ArtBarAxis';
import { useSpring, useSprings, animated } from '@react-spring/web';
// import ArtBarChartBar from './ArtBarChartBar';
import ArtBarChartLabelledBar from './ArtBarChartLabelledBar';
import { sortArrayByReferenceArray } from '@/utils/sort';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';

// const sortArrayByReferenceArray = (referenceArray) => {
//   return (a, b) => {
//     const indexA = referenceArray.indexOf(a);
//     const indexB = referenceArray.indexOf(b);

//     if (indexA !== -1 && indexB !== -1) {
//       return indexA - indexB;
//     }

//     if (indexA === -1) {
//       return -1;
//     }

//     return 1;
//   };
// };

// const sortArrayByReferenceArray = (referenceArray) => {
//   return (a, b) => {
//     const indexA = referenceArray.indexOf(a);
//     const indexB = referenceArray.indexOf(b);

//     if (indexA !== -1 && indexB !== -1) {
//       return indexA - indexB;
//     }

//     if (indexA === -1) {
//       return 1;
//     }

//     return -1;
//   };
// };

const arten = [
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

function ArtBarChart({
  // variableCount,
  // visDataTotal,
  chartWidth,
  visData,
  svgFontSize,
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

  // console.log('artbar chartWidth', chartWidth);

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

  // const variableCount = useMemo(() => {
  //   const sortedArtCount = new Map(
  //     Array.from(
  //       rollup(
  //         visData,
  //         (v) => v.length || 0,
  //         (d) => (d.options ? d.options.data.art : d.art)
  //       ),
  //       ([key, value]) => [key, value]
  //     ).sort((a, b) => a[1] - b[1]) // Sort the entries by count (length)
  //   );

  //   return sortedArtCount;
  // }, [visData]);

  // const variableCount = useMemo(() => {
  //   // console.log('check data', data); // d.kateg // d.properties.kateg
  //   // console.log('check visData', visData); //d.options.data.kateg
  //   // if (!visData) {
  //   //   return undefined;
  //   // }

  //   const resultMap = new Map();

  //   arten.forEach((art) => {
  //     resultMap.set(art, 0);
  //   });

  //   // console.log('res1', resultMap);

  //   // console.log('res 1', resultMap);

  //   // const rolledUpMap = rollup(
  //   //   visData,
  //   //   (v) => v.length || 0,
  //   //   (d) => (d.options ? d.options.data.kateg2 : d.kateg2)
  //   //   // d.properties ? d.properties.kateg : d.options.data.kateg
  //   //   // (d) => d.options.data.kateg
  //   //   // (d) => d.properties.kateg
  //   //   // (d) => (d.options ? d.options.data.kateg : d.kateg)
  //   // );

  //   // const sortedRolledUpMap = new Map(
  //   //   Array.from(
  //   //     rollup(
  //   //       visData,
  //   //       (v) => v.length || 0,
  //   //       (d) => (d.options ? d.options.data.art : d.art)
  //   //     ),
  //   //     ([key, value]) => [key, value]
  //   //   ).sort((a, b) => a[1] - b[1]) // Sort the entries by count (length)
  //   // );

  //   const rolledUpMap = rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => (d.options ? d.options.data.art : d.art)
  //   );

  //   rolledUpMap.forEach((count, art) => {
  //     resultMap.set(art, count);
  //   });

  //   // console.log('res2', resultMap);

  //   // const sortedResultMap = new Map(
  //   //   Array.from(resultMap, ([key, value]) => [key, value]).sort(
  //   //     (a, b) => a[1] - b[1]
  //   //   ) // Sort the entries by count (length)
  //   // );
  //   const sortedResultMap = new Map(
  //     Array.from(resultMap, ([key, value]) => [key, value]).sort(
  //       (a, b) => b[1] - a[1]
  //     ) // Sort the entries by count (length)
  //   );

  //   // console.log('sortedres', sortedResultMap);

  //   // console.log('rol1', rolledUpMap);

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

  //   return sortedResultMap;

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

  // const sortedVariableCount = useMemo(() => {
  //   const resultMap = new Map();

  //   arten.forEach((art) => {
  //     resultMap.set(art, 0);
  //   });

  //   const rolledUpMap = rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => (d.options ? d.options.data.art : d.art)
  //   );

  //   rolledUpMap.forEach((count, art) => {
  //     resultMap.set(art, count);
  //   });

  //   const sortedResultMap = new Map(
  //     Array.from(resultMap, ([key, value]) => [key, value]).sort(
  //       (a, b) => b[1] - a[1]
  //     ) // Sort the entries by count (length)
  //   );

  //   return sortedResultMap;
  // }, [visData]);

  const variableCount = useFixedRolledUpMap(visData, 'art', arten);

  const sortedVariableCount = useMemo(() => {
    const sortedResultMap = new Map(
      Array.from(variableCount, ([key, value]) => [key, value]).sort(
        (a, b) => b[1] - a[1]
      ) // Sort the entries by count (length)
    );

    return sortedResultMap;
  }, [variableCount]);

  // const sortedVariableCount = useMemo(() => {

  //   const resultMap = new Map();

  //   arten.forEach((art) => {
  //     resultMap.set(art, 0);
  //   });

  //   const rolledUpMap = rollup(
  //     visData,
  //     (v) => v.length || 0,
  //     (d) => (d.options ? d.options.data.art : d.art)
  //   );

  //   rolledUpMap.forEach((count, art) => {
  //     resultMap.set(art, count);
  //   });

  //   const sortedResultMap = new Map(
  //     Array.from(resultMap, ([key, value]) => [key, value]).sort(
  //       (a, b) => b[1] - a[1]
  //     ) // Sort the entries by count (length)
  //   );

  //   return sortedResultMap;
  // }, [visData]);

  const artenSorted = useMemo(() => {
    // const kategorien = [
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

    const sortedVariableCountArray = Array.from(
      sortedVariableCount.keys()
    );

    const sortArten = sortArrayByReferenceArray(
      sortedVariableCountArray
    );

    return [...arten].sort(sortArten);
  }, [sortedVariableCount]);

  // console.log(sortedVariableCount, kategorienSorted);

  // const width = 600; // 600 // 300
  const width = chartWidth;

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

  const height = 780; // 780

  // kategorienSorted.length * 70 : 200; // 65

  // const spring = useSpring({
  //   height: kategorienSorted.length * 60 + 100,
  //   // visDataTotal > 0 ? kategorienSorted.length * 60 : 200
  //   // x: xScale(0),
  //   // y: yScale(kat),
  //   // width: xScale(sortedVariableCount.get(kat)),
  //   // // height: yScale.bandwidth(),
  //   // height: yScaleBandwidth,
  //   // textNumberX: xScale(sortedVariableCount.get(kat)) - 2, // xScale(sortedVariableCount.get(kat)) + 3
  //   // textNumberY: yScale(kat) + yScaleBandwidth / 2, // yScale(kat) + yScaleBandwidth / 2,
  //   // textLabelX: xScale(0),
  //   // // textLabelY: yScale(kat) - 8,
  //   // textLabelY: yScale(kat) - 20,
  //   config: {
  //     mass: 1,
  //     tension: 120,
  //     friction: 20,
  //   },
  // });

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
  //   right: chartWidth > 400 ? 5 : 2, // 5
  //   bottom: 5,
  //   left: chartWidth > 400 ? 275 : 250, // 275 // 450 // 500 // 160
  // };

  const margin = {
    top: 55, // 20
    right: 50, // 5
    bottom: 0,
    left: 10, // 20 // 275 // 450 // 500 // 160
  };

  // const innerWidth = width - margin.left - margin.right;

  const innerWidth = width - margin.left - margin.right;

  // console.log('innerwidht labelled', innerWidthLabelled);

  const innerHeight = height - margin.top - margin.bottom;

  // const kategorien = [...sortedVariableCount.keys()];

  // console.log('bar kategcount', sortedVariableCount);
  // console.log('keys', kategorien); // [...kategCount.keys()]
  // console.log(sortedVariableCount.get(kategorien[0]));

  // const barChartRef = useRef();
  // useEffect(() => {
  //   const barChart = select(barChartRef.current);
  // }, [sortedVariableCount]);

  // const xScale = scaleLinear()
  //   .domain([0, visDataTotal]) // dataTotal
  //   .range([0, innerWidth])
  //   .nice();

  // const maxKat = kategorienSorted[kategorienSorted.length - 1] || '';

  // const maxKat = artenSorted[artenSorted.length - 1] || '';
  const maxKat = artenSorted[0] || '';

  const maxKatCount = sortedVariableCount.get(maxKat) || 0;

  // console.log('maxkat', maxKat, 'maxkatcount', maxKatCount);

  // console.log('maxkat', maxKat, maxKatCount);

  // console.log(
  //   'sortedVariableCount kategoriensprted',
  //   sortedVariableCount,
  //   kategorienSorted
  // );
  const xScale = useMemo(() => {
    return scaleLinear()
      .domain([0, maxKatCount > 0 ? maxKatCount : 1]) // visDataTotal dataTotal
      .range([0, innerWidth]) // innerWidthLabelled
      .nice();
  }, [innerWidth, maxKatCount]);

  const yScaleBandwidth = 20; // 40

  // const yScale = scaleBand()
  //   .domain(kategorienSorted) // kategorienSorted
  //   .range([innerHeight, 0])
  //   .padding(0.2);

  const yScale = useMemo(() => {
    return (
      scaleBand()
        .domain(artenSorted) // kategorienSorted
        .range([0, innerHeight])
        // .range([innerHeight, 0])
        // .padding(0.2)
        .paddingInner(0.1)
        .paddingOuter(0.2)
    );
  }, [artenSorted, innerHeight]);
  // .paddingInner(0.3) // 2.5 0.8
  // .paddingOuter(0.3);

  // console.log('xscallelabelled', xScaleLabelled(3600));

  // console.log('bandwidth', yScale.bandwidth());

  // console.log(kategorienSorted);

  // TODO: check rendering (useState is called to often vs. useEffect)
  // TODO: scale totalaccidents oder totalvisdata
  // TODO: scale etc. useMemo, or...
  // TODO: Dunkelheit und dämmerung zusammenfassen
  // TODO: check if springs alle werte enthalten solllte (u.a. wegen responsiveness, etc.)
  // TODO: absolute oder relative zahlen

  // console.log('render');

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
        y={2}
        textAnchor="auto"
        dominantBaseline="hanging"
        className="svg-title"
        fontSize={`${svgFontSize.title}rem`}
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
        // ref={barChartRef}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        {artenSorted.map(
          (art, i) => {
            // <ArtBarChartBar
            //   key={d}
            //   xScale={xScale}
            //   yScale={yScale}
            //   sortedVariableCount={sortedVariableCount}
            //   visDataTotal={visDataTotal}
            //   kat={d}
            //   yScaleBandwidth={yScaleBandwidth}
            // />
            // console.log(d, i);
            // console.log('within jsx art', art);
            return (
              <ArtBarChartLabelledBar
                key={art}
                xScale={xScale}
                yScale={yScale}
                sortedVariableCount={sortedVariableCount}
                // visDataTotal={visDataTotal}
                kat={art}
                yScaleBandwidth={yScaleBandwidth}
                svgFontSize={svgFontSize}
              />
            );
          }
          // <g key={d}>
          //   <rect
          //     x={xScale(0)}
          //     y={yScale(d)}
          //     width={xScale(sortedVariableCount.get(d))}
          //     height={yScale.bandwidth()}
          //     fill="#69b3a2"
          //   />
          //   <text
          //     x={xScale(sortedVariableCount.get(d)) + 10}
          //     y={yScale(d) + yScale.bandwidth() / 2}
          //     style={{ fontSize: '0.8rem' }}
          //   >
          //     {/* {sortedVariableCount.get(d)} */}
          //     {`${Math.round(
          //       (sortedVariableCount.get(d) / visDataTotal) * 100
          //     )} %`}
          //   </text>
          // </g>
        )}
        {/* {kategorien.map((d, i) => {
          if (
            Math.round((sortedVariableCount.get(d) / visDataTotal) * 100) >
            0
          ) {
            return (
              <g key={d}>
                <rect
                  x={xScale(0)}
                  y={yScale(d)}
                  width={xScale(sortedVariableCount.get(d))}
                  height={yScale.bandwidth()}
                  fill="#69b3a2"
                />
                <text
                  x={xScale(sortedVariableCount.get(d)) + 10}
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

export default React.memo(ArtBarChart);
