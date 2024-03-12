import Note from '../Note';
import ColumnChart from './ColumnChart';
import useFixedRolledUpMapTwoVariables from '@/hooks/useFixedRolledUpMapTwoVariables';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { max } from 'd3-array';

const jahre = [2016, 2017, 2018, 2019, 2020, 2021, 2022];
const monate = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

function ColumnChartSmallMultiple({
  visData,
  chartWidth,
  svgFontSize,
}) {
  const [maxValue, setMaxValue] = useState(0);

  const widthNudge = 10;

  const smallChartWidth =
    chartWidth > 500
      ? (chartWidth - widthNudge) / 3
      : chartWidth > 330
      ? (chartWidth - widthNudge) / 2
      : chartWidth;

  const dataByYear = useFixedRolledUpMapTwoVariables({
    data: visData,
    variableOne: 'jahr',
    variableTwo: 'monatn',
    kategorienOne: jahre,
    kategorienTwo: monate,
  });

  // useFixedRolledUpMapTwoVariables(
  //   visData,
  //   'jahr',
  //   'monatn',
  //   jahre,
  //   monate
  // );

  useEffect(() => {
    const maxValueMap = new Map();

    jahre.forEach((jahr) => {
      const yearVisData = dataByYear.get(jahr);
      const maxMonthData = max(Array.from(yearVisData.values()));
      maxValueMap.set(jahr, maxMonthData);
    });

    const newMaxValue = max(Array.from(maxValueMap.values()));
    setMaxValue(newMaxValue);
  }, [dataByYear]);

  return (
    <SvgWrapper chartWidth={chartWidth}>
      <svg
        viewBox={`0 0 ${chartWidth} ${30}`}
        width={chartWidth}
        height={30}
        role="figure"
        aria-labelledby="columnChartSmallMultipleDesc"
        tabIndex={0}
      >
        <desc id="columnChartSmallMultipleDesc">
          Mehrere kleine Balkendiagramme zeigen die Anzahl der Unfälle
          pro Monat für jedes Jahr. Zusätzlich wird in jedem Diagramm
          die durchschnittliche Anzahl von Unfällen pro Monat für das
          entsprechende Jahr mit einer Linie dargestellt.
        </desc>
        <text
          x={10}
          y={8}
          textAnchor="auto"
          dominantBaseline="hanging"
          className="svg-title"
          fontSize={`${svgFontSize.title}rem`}
          role="presentation"
          aria-hidden="true"
        >
          Monat und Jahr
        </text>
      </svg>
      <SmallMultipleWrapper chartWidth={chartWidth}>
        {jahre.map((jahr) => (
          <ColumnChart
            key={jahr}
            yearVisData={dataByYear.get(jahr)}
            jahr={jahr}
            maxValue={maxValue}
            smallChartWidth={smallChartWidth}
            monate={monate}
            svgFontSize={svgFontSize}
          />
        ))}
      </SmallMultipleWrapper>
      <Note svgFontSize={svgFontSize} margin={`0 0 0 10px`}>
        <p role="presentation" aria-hidden="true">
          Die Linie gibt die durchschnittliche Anzahl von Unfällen pro
          Monat im jeweiligen Jahr an.
        </p>
      </Note>
    </SvgWrapper>
  );
}

const SmallMultipleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.chartWidth}px;
`;

const SvgWrapper = styled.div`
  width: ${(props) => props.chartWidth}px;
`;

export default React.memo(ColumnChartSmallMultiple);
