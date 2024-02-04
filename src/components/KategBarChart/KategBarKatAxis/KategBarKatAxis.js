'use client';
import React, { useMemo } from 'react';
import { splitStringOnSlash } from '@/utils/strings';

function KategBarKatAxis({
  yScale,
  innerHeight,
  margin,
  kat,
  svgFontSize,
  chartWidth,
  smallMobileBreakpoint,
}) {
  // console.log(
  //   kat,
  //   splitStringOnSlash(kat[0]),
  //   splitStringOnSlash(kat[1])
  // );

  // const katObject =
  //   chartWidth <= 300
  //     ? {
  //         original: kat,
  //         labelArray: kat.map((k) => splitStringOnSlash(k)),
  //       }
  //     : {
  //         original: kat,
  //         labelArray: kat.map((k) => k),
  //       };

  // console.log(chartWidth, smallMobileBreakpoint);

  const katArray = useMemo(() => {
    const katCleaned = kat.map((k) => k.replace('Unfall mit ', ''));
    const katResponsive =
      chartWidth <= smallMobileBreakpoint
        ? katCleaned.map((k) => splitStringOnSlash(k))
        : katCleaned.map((k) => [k]);
    return katResponsive;
  }, [kat, chartWidth, smallMobileBreakpoint]);
  // const katArray =
  //   chartWidth <= smallMobileBreakpoint
  //     ? kat.map((k) =>
  //         splitStringOnSlash(k.replace('Unfall mit ', ''))
  //       )
  //     : kat.map((k) => [k.replace('Unfall mit ', '')])

  // console.log(chartWidth, katArray);
  // function processStrings(stringsArray, chartWidth) {
  //   return stringsArray.map((str) => {
  //     if (chartWidth > 300) {
  //       // Split at whitespace and slice the last element
  //       return str.split(/\s+/).slice(-1);
  //     } else {
  //       // Split at whitespace or slash
  //       const parts = str.split(/\s+|\//);

  //       if (str.includes('/')) {
  //         // If it has a slash, slice out the last two parts
  //         return parts.slice(-2);
  //       } else {
  //         // If it has only whitespace, slice only the last part
  //         return [parts.slice(-1)[0]];
  //       }
  //     }
  //   });
  // }

  // const katLabel = processStrings(kat, chartWidth);

  // console.log(katLabel, chartWidth);

  // const katLabel = chartWidth <= 300 ? kat.split(/\s|\/+/).slice(-1) : kat.split(' ').slice(-1)
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);
  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <text
        y={-1}
        x={-5}
        textAnchor="end"
        // x={-margin.left + 10}
        // textAnchor="start"
        dominantBaseline="baseline"
        fontSize={`${svgFontSize.text}rem`}
      >
        Unfall mit
      </text>
      <line x1={0} y1={0} x2={0} y2={innerHeight} stroke={'black'} />
      {kat.map((kat, i) => (
        <text
          key={kat}
          x={-5}
          y={yScale(kat) + yScale.bandwidth() / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={`${svgFontSize.text}rem`}
          // style={{ fontSize: '0.8rem' }}
        >
          {katArray[i].map((label, j) => {
            return katArray[i].length === 1 ? (
              <tspan key={label} x={-5} dy={`${j === 0 ? 0 : 1.4}em`}>
                {label}
              </tspan>
            ) : (
              <tspan
                key={label}
                x={-5}
                dy={
                  j === 0
                    ? -yScale.bandwidth() / 6
                    : yScale.bandwidth() / 6 + 10
                }
                // dominantBaseline="hanging"
                // dy={`${j === 0 ? -0.7 : 1.4}em`}
              >
                {label}
              </tspan>
            );
          })}
        </text>
      ))}

      {/* {kat.map((d) => (
        <text
          key={d}
          x={-5}
          y={yScale(d) + yScale.bandwidth() / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={`${svgFontSize.text}rem`}
          // style={{ fontSize: '0.8rem' }}
        >
          <tspan dy="-0.6em">Unfall mit</tspan>
          <tspan x={-5} dy="1.2em">
            {d.split(' ').slice(-1)}
          </tspan>
        </text>
      ))} */}
    </g>
  );
}

export default KategBarKatAxis;
