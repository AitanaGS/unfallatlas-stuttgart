import ChartContainer from '../ChartContainer';
import WeekHourAxisX from './WeekHourAxisX';
import WeekHourAxisY from './WeekHourAxisY';
import WeekHourRect from './WeekHourRect';
import useFixedRolledUpMapTwoVariables from '@/hooks/useFixedRolledUpMapTwoVariables';

import React, { useMemo } from 'react';
import { scaleBand, scaleSequential, scaleLinear } from 'd3-scale';
import { interpolateYlOrBr } from 'd3-scale-chromatic';
import { max } from 'd3-array';

const weekSorted = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
];

const hourSorted = ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr'];

function WeekHourHeatmap({
  visData,
  chartWidth,
  svgFontSize,
  chartWidthDomain,
}) {
  const width = chartWidth;
  const height = 300;

  const marginLeftScale = scaleLinear()
    .domain(chartWidthDomain)
    .range([75, 100])
    .clamp(true);

  const margin = useMemo(() => {
    return {
      top: 45,
      right: 5,
      bottom: 5,
      left: marginLeftScale(chartWidth),
    };
  }, [chartWidth, marginLeftScale]);

  const innerWidth = width - margin.right - margin.left;

  const innerHeight = height - margin.top - margin.bottom;

  const hourLabel = useMemo(() => {
    const label =
      chartWidth > 400
        ? ['0-6 Uhr', '6-12 Uhr', '12-18 Uhr', '18-0 Uhr']
        : chartWidth > 300
        ? ['0-6 Uhr', '6-12', '12-18', '18-0']
        : ['0-6', '6-12', '12-18', '18-0'];
    return label;
  }, [chartWidth]);

  const hourScale = useMemo(() => {
    return scaleBand()
      .domain(hourSorted)
      .range([0, innerWidth])
      .padding(0.05)
      .paddingOuter(0.1);
  }, [innerWidth]);

  const weekScale = useMemo(() => {
    return scaleBand()
      .domain(weekSorted)
      .range([0, innerHeight])
      .padding(0.1)
      .paddingOuter(0.1);
  }, [innerHeight]);

  const weekHourCount = useFixedRolledUpMapTwoVariables({
    data: visData,
    variableOne: 'wochentag',
    variableTwo: 'zeit',
    kategorienOne: weekSorted,
    kategorienTwo: hourSorted,
  });

  const counts = useMemo(() => {
    const countsArray = Array.from(
      weekHourCount.values(),
      (innerMap) => Array.from(innerMap.values())
    ).flat();

    return countsArray;
  }, [weekHourCount]);

  const extentCounts = useMemo(() => {
    return [0, max(counts)];
  }, [counts]);

  const colorScale = useMemo(() => {
    return scaleSequential(interpolateYlOrBr).domain(
      extentCounts[1] === 0 ? [0, 1] : extentCounts
    );
  }, [extentCounts]);

  return (
    <ChartContainer
      width={width}
      height={height}
      descId={'weekHourHeatmapDesc'}
    >
      <desc id="weekHourHeatmapDesc">
        Farbige Wärmetabelle zur Anzahl der Unfälle nach Wochentag und
        Uhrzeit.
        {weekSorted.map((day) => {
          return hourSorted.map((hour) => {
            return `${day}, ${hour}: ${weekHourCount
              .get(day)
              .get(hour)}, `;
          });
        })}
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
        Wochentag und Uhrzeit
      </text>
      <WeekHourAxisX
        xScale={hourScale}
        margin={margin}
        kat={hourSorted}
        katLabel={hourLabel}
        svgFontSize={svgFontSize}
      />
      <WeekHourAxisY
        yScale={weekScale}
        margin={margin}
        kat={weekSorted}
        svgFontSize={svgFontSize}
      />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {weekSorted.map((day, i) => {
          return hourSorted.map((hour, i) => {
            return (
              <WeekHourRect
                key={`${day}${hour}`}
                hour={hour}
                week={day}
                hourScale={hourScale}
                weekScale={weekScale}
                colorScale={colorScale}
                count={weekHourCount.get(day).get(hour)}
                extentCounts={extentCounts}
                svgFontSize={svgFontSize}
              />
            );
          });
        })}
      </g>
    </ChartContainer>
  );
}

export default React.memo(WeekHourHeatmap);
