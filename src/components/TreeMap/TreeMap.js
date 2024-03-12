import ChartContainer from '../ChartContainer';
import Note from '../Note';
import TreeMapRect from './TreeMapRect';
import { COLORS } from '@/utils/constants';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';

import React, { useMemo } from 'react';
import { treemap, hierarchy } from 'd3-hierarchy';
import { scaleOrdinal, scaleLinear } from 'd3-scale';

function TreeMap({
  chartWidth,
  visDataTotal,
  visData,
  svgFontSize,
  chartWidthDomain,
  vizWrapperGap,
}) {
  const width = chartWidth;
  const height = 260; // 255

  const marginRightScale = scaleLinear()
    .domain(chartWidthDomain)
    .range([20, 40])
    .clamp(true);

  const margin = useMemo(() => {
    return {
      top: 28,
      right: marginRightScale(chartWidth),
      bottom: 10,
      left: 0,
    };
  }, [marginRightScale, chartWidth]);

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const fussCount = useFixedRolledUpMap({
    data: visData,
    variable: 'istfussb',
    kategorien: [true, false],
  });

  const radCount = useFixedRolledUpMap({
    data: visData,
    variable: 'istradb',
    kategorien: [true, false],
  });

  const pkwCount = useFixedRolledUpMap({
    data: visData,
    variable: 'istpkwb',
    kategorien: [true, false],
  });

  const kradCount = useFixedRolledUpMap({
    data: visData,
    variable: 'istkradb',
    kategorien: [true, false],
  });

  const sonstCount = useFixedRolledUpMap({
    data: visData,
    variable: 'istsonst2b',
    kategorien: [true, false],
  });

  const numberData = useMemo(() => {
    return new Map([
      ['Fußgänger', fussCount.get(true)],
      ['Rad', radCount.get(true)],
      ['Kraftrad', kradCount.get(true)],
      ['PKW', pkwCount.get(true)],
      ['Sonstige', sonstCount.get(true)],
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

    return treemapLayout(
      hierarchy({ children: treeData }).sum((d) => d.value)
    );
  }, [treeData, innerWidth, innerHeight]);

  const namesArray = treeData.map((item) => item.name);

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

  return (
    <>
      <ChartContainer
        width={width}
        height={height}
        descId="treeMapDesc"
      >
        <desc id="treeMapDesc">
          Visualisierung der Anteile der beteiligten
          Verkehrsteilnehmer mithilfe von Rechtecken.
          {visDataTotal < 1
            ? 'keine Unfälle / keine Informationen verfügbar'
            : root
                .leaves()
                .map((d) =>
                  d.value > 0 ? `${d.data.name} ${d.value}, ` : ''
                )}
        </desc>
        <text
          x={margin.left}
          y={4}
          textAnchor="auto"
          dominantBaseline="hanging"
          className="svg-title"
          fontSize={`${svgFontSize.title}rem`}
          role="presentation"
          aria-hidden="true"
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
            role="presentation"
            aria-hidden="true"
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
            />
          ))}
        </g>
      </ChartContainer>
      <Note
        svgFontSize={svgFontSize}
        margin={`${-(margin.bottom + vizWrapperGap + 5)}px 0 0 10px`}
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
    </>
  );
}

export default React.memo(TreeMap);
