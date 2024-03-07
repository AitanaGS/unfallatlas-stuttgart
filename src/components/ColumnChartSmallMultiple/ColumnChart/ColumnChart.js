import ChartContainer from '../../ChartContainer';
import ColumnChartMonthAxis from './ColumnChartMonthAxis';
import ColumnChartValueAxis from './ColumnChartValueAxis';
import ColumnChartColumn from './ColumnChartColumn';
import ColumnChartLine from './ColumnChartLine';

import React, { useMemo } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { mean } from 'd3-array';

function ColumnChart({
  yearVisData,
  jahr,
  maxValue,
  smallChartWidth,
  monate,
  svgFontSize,
}) {
  const width = smallChartWidth;
  const height = 150;
  const margin = {
    top: 25,
    right: 5,
    bottom: 15,
    left: 40,
  };

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  const meanMonthData = mean(Array.from(yearVisData.values()));

  const xScale = useMemo(() => {
    return scaleBand()
      .domain(monate)
      .range([0, innerWidth])
      .padding(0.1);
  }, [innerWidth, monate]);

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([0, maxValue > 0 ? maxValue : 1])
      .range([innerHeight, 0])
      .nice();
  }, [maxValue, innerHeight]);

  return (
    <ChartContainer
      width={width}
      height={height}
      descId="columnChartDesc"
    >
      <desc id="columnChartDesc">
        Balkendiagramm {jahr}. Durchschnittliche Anzahl von Unfällen
        pro Monat {meanMonthData.toFixed(1)}.
        {monate.map(
          (monat, i) => `${monat}: ${yearVisData.get(monat)}, `
        )}
      </desc>
      <text
        x="10"
        y="8"
        textAnchor="start"
        dominantBaseline={'middle'}
        className="svg-title"
        fontSize={`${svgFontSize.title - 0.1}rem`}
        role="presentation"
        aria-hidden="true"
      >
        {jahr}
      </text>
      <ColumnChartValueAxis
        yScale={yScale}
        margin={margin}
        innerHeight={innerHeight}
        maxValue={maxValue}
        svgFontSize={svgFontSize}
      />
      <ColumnChartMonthAxis
        xScale={xScale}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        margin={margin}
        monate={monate}
        svgFontSize={svgFontSize}
      />
      <g transform={`translate(${margin.left},${margin.top})`}>
        {monate.map((monat, i) => (
          <ColumnChartColumn
            key={monat}
            monat={monat}
            innerHeight={innerHeight}
            xScale={xScale}
            yScale={yScale}
            monthData={yearVisData.get(monat)}
          />
        ))}
        <ColumnChartLine
          yScale={yScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          meanMonthData={meanMonthData}
        />
      </g>
    </ChartContainer>
  );
}

export default React.memo(ColumnChart);
