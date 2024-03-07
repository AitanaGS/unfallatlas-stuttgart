import ChartContainer from '../ChartContainer';
import Note from '../Note';
import KategBarKatAxis from './KategBarKatAxis';
import KategBarChartBar from './KategBarChartBar';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';
import { COLORS } from '@/utils/constants';

import React, { useMemo } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';

const kategorienSorted = [
  'Unfall mit Leichtverletzten',
  'Unfall mit Schwerverletzten/Getöteten',
];

function KategBarChart({
  chartWidth,
  visData,
  smallMobileBreakpoint,
  svgFontSize,
  chartWidthDomain,
  vizWrapperGap,
}) {
  const kategCountMap = useFixedRolledUpMap(
    visData,
    'kateg2',
    kategorienSorted
  );

  const width = chartWidth || 300;

  const height = 160;

  const marginLeftScale = scaleLinear()
    .domain(chartWidthDomain)
    .range([170, 220])
    .clamp(true);

  const marginRightScale = scaleLinear()
    .domain(chartWidthDomain)
    .range([50, 80])
    .clamp(true);

  const margin = useMemo(() => {
    return {
      top: 45,
      right: marginRightScale(chartWidth),
      bottom: 5,
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

  const leichtCount = kategCountMap.get(
    'Unfall mit Leichtverletzten'
  );

  const schwerCount = kategCountMap.get(
    'Unfall mit Schwerverletzten/Getöteten'
  );

  const maxKateg =
    leichtCount >= schwerCount
      ? 'Unfall mit Leichtverletzten'
      : 'Unfall mit Schwerverletzten/Getöteten';

  const maxValue = kategCountMap.get(maxKateg);

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain([0, maxValue > 0 ? maxValue : 1])
      .range([0, innerWidth])
      .nice();
  }, [innerWidth, maxValue]);

  const yScale = useMemo(() => {
    return scaleBand()
      .domain(kategorienSorted)
      .range([0, innerHeight])
      .padding(0.2);
  }, [innerHeight]);

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
            (kat) => `${kat} ${kategCountMap.get(kat)}, `
          )}
        </desc>
        <text
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
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {kategorienSorted.map((kat, i) => (
            <KategBarChartBar
              key={kat}
              xScale={xScale}
              yScale={yScale}
              kategCount={kategCountMap.get(kat)}
              kat={kat}
              svgFontSize={svgFontSize}
              color={
                kat === 'Unfall mit Leichtverletzten'
                  ? COLORS.orange.light
                  : COLORS.orange.dark
              }
            />
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
      </ChartContainer>
      <Note
        svgFontSize={svgFontSize}
        margin={`${-(margin.bottom + vizWrapperGap + 5)}px 0 0 10px`}
      >
        <p>
          Für die Zurodnung war die jeweils schwerste Unfallfolge
          entscheidend.
        </p>
      </Note>
    </>
  );
}

export default React.memo(KategBarChart);
