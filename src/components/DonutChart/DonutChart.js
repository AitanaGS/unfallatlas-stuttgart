import ChartContainer from '../ChartContainer';
import DonutChartArc from './DonutChartArc';
import DonutChartArcLabel from './DonutChartArcLabel';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';
import { COLORS } from '@/utils/constants';

import React, { useMemo } from 'react';
import { pie } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';

function DonutChart({
  chartWidth,
  data,
  variable,
  kategorien,
  title,
  svgFontSize,
  descId,
  description,
}) {
  const donutChartMobileBreakpoint = 500;

  const width = chartWidth;

  const height = 250;

  const margin = useMemo(() => {
    return {
      top: 90,
      right: 50,
      bottom: 5,
      left: 50,
    };
  }, []);

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = height - margin.top - margin.bottom;

  const variableCount = useFixedRolledUpMap({
    data,
    variable,
    kategorien,
  });

  const radius = Math.min(innerWidth, innerHeight) / 2.5;

  const colorScale = useMemo(() => {
    return scaleOrdinal()
      .domain(kategorien)
      .range([COLORS.yellowOrange.medium, COLORS.yellowOrange.light]);
  }, [kategorien]);

  const countArray = useMemo(() => {
    return [...kategorien].reverse().map((kat) => {
      return {
        key: kat,
        value: variableCount.get(kat),
      };
    });
  }, [variableCount, kategorien]);

  const arcData = useMemo(() => {
    const pieGenerator = pie()
      .value((d) => d.value)
      .sort(null);

    return pieGenerator(countArray);
  }, [countArray]);

  const leftLabelPosition = useMemo(() => {
    return {
      x:
        chartWidth > donutChartMobileBreakpoint
          ? innerWidth / 2 + margin.left - radius
          : innerWidth / 2 + margin.right - 10,
      y: 50,
      textAnchor: 'end',
    };
  }, [
    chartWidth,
    donutChartMobileBreakpoint,
    margin,
    radius,
    innerWidth,
  ]);

  const rightLabelPosition = useMemo(() => {
    return {
      x:
        chartWidth > donutChartMobileBreakpoint
          ? innerWidth / 2 + margin.left + radius
          : innerWidth / 2 + margin.right + 10,
      y: 50,
      textAnchor: 'start',
    };
  }, [
    chartWidth,
    donutChartMobileBreakpoint,
    margin,
    radius,
    innerWidth,
  ]);

  const labelPosition = [leftLabelPosition, rightLabelPosition];

  return (
    <ChartContainer width={width} height={height} descId={descId}>
      <desc id={descId}>
        {description}
        {kategorien.map(
          (kat, i) => `${kat} ${variableCount.get(kat)}, `
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
        {title}
      </text>
      {kategorien.map((kat, i) => (
        <DonutChartArcLabel
          key={kat}
          label={kat}
          count={variableCount.get(kat)}
          labelPosition={labelPosition[i]}
          svgFontSize={svgFontSize}
        />
      ))}
      <g
        transform={`translate(${margin.left + innerWidth / 2}, ${
          margin.top + innerHeight / 2
        })`}
      >
        {arcData.map((d, i) => (
          <DonutChartArc
            key={d.data.key}
            arcDatum={d}
            radius={radius}
            fillColor={colorScale(d.data.key)}
            strokeColor={COLORS.white}
          />
        ))}
      </g>
    </ChartContainer>
  );
}

export default DonutChart;
