import { splitStringOnSlash } from '@/utils/strings';

import React, { useMemo } from 'react';

function KategBarKatAxis({
  yScale,
  innerHeight,
  margin,
  kat,
  svgFontSize,
  chartWidth,
  smallMobileBreakpoint,
}) {
  const katArray = useMemo(() => {
    const katCleaned = kat.map((k) => k.replace('Unfall mit ', ''));
    const katResponsive =
      chartWidth <= smallMobileBreakpoint
        ? katCleaned.map((k) => splitStringOnSlash(k))
        : katCleaned.map((k) => [k]);
    return katResponsive;
  }, [kat, chartWidth, smallMobileBreakpoint]);

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <text
        y={-1}
        x={-5}
        textAnchor="end"
        dominantBaseline="baseline"
        fontSize={`${svgFontSize.text}rem`}
        role="presentation"
        aria-hidden="true"
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
          role="presentation"
          aria-hidden="true"
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
              >
                {label}
              </tspan>
            );
          })}
        </text>
      ))}
    </g>
  );
}

export default KategBarKatAxis;
