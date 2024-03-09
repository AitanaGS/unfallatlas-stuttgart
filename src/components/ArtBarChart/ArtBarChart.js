import ChartContainer from '../ChartContainer';
import ArtBarChartLabelledBar from './ArtBarChartLabelledBar';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';
import { sortArrayByReferenceArray } from '@/utils/sort';

import React, { useMemo } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';

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

function ArtBarChart({ chartWidth, visData, svgFontSize }) {
  const variableCount = useFixedRolledUpMap(visData, 'art', arten);

  const sortedVariableCount = useMemo(() => {
    const sortedResultMap = new Map(
      Array.from(variableCount, ([key, value]) => [key, value]).sort(
        (a, b) => b[1] - a[1]
      )
    );

    return sortedResultMap;
  }, [variableCount]);

  const artenSorted = useMemo(() => {
    const sortedVariableCountArray = Array.from(
      sortedVariableCount.keys()
    );

    const sortArten = sortArrayByReferenceArray(
      sortedVariableCountArray
    );

    return [...arten].sort(sortArten);
  }, [sortedVariableCount]);

  const width = chartWidth;

  const height = 780;

  const margin = {
    top: 55,
    right: 50,
    bottom: 0,
    left: 0,
  };

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = height - margin.top - margin.bottom;

  const maxKat = artenSorted[0] || '';

  const maxKatCount = sortedVariableCount.get(maxKat) || 0;

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain([0, maxKatCount > 0 ? maxKatCount : 1])
      .range([0, innerWidth])
      .nice();
  }, [innerWidth, maxKatCount]);

  const yScaleBandwidth = 20;

  const yScale = useMemo(() => {
    return scaleBand()
      .domain(artenSorted)
      .range([0, innerHeight])
      .paddingInner(0.1)
      .paddingOuter(0.2);
  }, [artenSorted, innerHeight]);

  return (
    <ChartContainer
      width={width}
      height={height}
      descId="artBarChartDesc"
    >
      <desc id="artBarChartDesc">
        Horizontales Balkendiagramm zur Art des Unfalls.
        {artenSorted.map(
          (art, i) => `${art} ${sortedVariableCount.get(art)}, `
        )}
      </desc>
      <text
        x={margin.left}
        y={2}
        textAnchor="auto"
        dominantBaseline="hanging"
        className="svg-title"
        fontSize={`${svgFontSize.title}rem`}
        role="presentation"
        aria-hidden="true"
      >
        Art des Unfalls
      </text>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {artenSorted.map((art) => {
          return (
            <ArtBarChartLabelledBar
              key={art}
              xScale={xScale}
              yScale={yScale}
              katCount={sortedVariableCount.get(art)}
              kat={art}
              yScaleBandwidth={yScaleBandwidth}
              svgFontSize={svgFontSize}
            />
          );
        })}
      </g>
    </ChartContainer>
  );
}

export default React.memo(ArtBarChart);
