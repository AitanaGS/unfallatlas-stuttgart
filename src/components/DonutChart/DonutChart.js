import ChartContainer from '../ChartContainer';
import DonutChartArc from './DonutChartArc';
import DonutChartArcLabel from './DonutChartArcLabel';
import useFixedRolledUpMap from '@/hooks/useFixedRolledUpMap';
import { COLORS } from '@/utils/constants';
import { splitStringOnSlash } from '@/utils/strings';

import React, { useMemo } from 'react';
import { max } from 'd3-array';
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

  // numberLabelShiftY (based on label length) is necessary
  // for calculating height, label position, etc.
  const labelInfo = useMemo(() => {
    const labelArrays = kategorien.map((kat) =>
      splitStringOnSlash(kat)
    );

    const numberLabelShiftY = max(labelArrays, (arr) => arr.length);

    return {
      labelArrays,
      numberLabelShiftY,
    };
  }, [kategorien]);

  const height = 230 + labelInfo.numberLabelShiftY * 10;

  const margin = useMemo(() => {
    return {
      top: 80 + labelInfo.numberLabelShiftY * 10,
      right: 50,
      bottom: 2,
      left: 50,
    };
  }, [labelInfo.numberLabelShiftY]);

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = height - margin.top - margin.bottom;

  const variableCount = useFixedRolledUpMap({
    data,
    variable,
    kategorien,
  });

  const radius =
    Math.min(innerWidth, innerHeight) / 2 -
    (margin.right - margin.left);

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
      y: 60 - labelInfo.numberLabelShiftY * 10,
      textAnchor: 'end',
    };
  }, [
    chartWidth,
    donutChartMobileBreakpoint,
    margin,
    radius,
    innerWidth,
    labelInfo.numberLabelShiftY,
  ]);

  const rightLabelPosition = useMemo(() => {
    return {
      x:
        chartWidth > donutChartMobileBreakpoint
          ? innerWidth / 2 + margin.left + radius
          : innerWidth / 2 + margin.right + 10,
      y: 60 - labelInfo.numberLabelShiftY * 10,
      textAnchor: 'start',
    };
  }, [
    chartWidth,
    donutChartMobileBreakpoint,
    margin,
    radius,
    innerWidth,
    labelInfo.numberLabelShiftY,
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
          labelArray={labelInfo.labelArrays[i]}
          numberLabelShiftY={labelInfo.numberLabelShiftY}
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
