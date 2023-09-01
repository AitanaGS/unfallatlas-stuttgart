'use client';
import React from 'react';
import {
  timeFormat,
  timeFormatLocale,
  timeParse,
} from 'd3-time-format';

const germanLocale = {
  dateTime: '%A, der %e. %B %Y, %X',
  date: '%d.%m.%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ],
  shortDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  months: [
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
  ],
  shortMonths: [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ],
};

function LineChartTimeAxis({
  xScale,
  innerWidth,
  margin,
  timeDataDates,
  innerHeight,
}) {
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);
  // console.log('time ticks', xScale.ticks(14));

  console.log('check jan 2021', timeDataDates);

  const formatMonthName = timeFormatLocale(germanLocale).format('%b');
  const formatYear = timeFormat('%Y');

  const parseDate = timeParse('%Y-%m-%d'); // Format used for parsing
  return (
    <g
      transform={`translate(${margin.left}, ${
        innerHeight + margin.top
      })`}
    >
      <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={'black'} />
      {/* {timeDataDates.map((d) => console.log(d))} */}
      {timeDataDates.map((d, i) => {
        // const dateObject = parseDate(d);
        return (
          // return (
          <text
            key={d}
            x={xScale(d)} // yScale(d) + yScale.bandwidth() / 2
            y={10}
            textAnchor="start"
            dominantBaseline="middle"
            style={{ fontSize: '0.8rem' }}
          >
            {i % 6 == 0 ? (
              <tspan x={xScale(d)} y={10}>{`${formatMonthName(
                d
              )}`}</tspan>
            ) : undefined}
            {i % 12 == 0 ? (
              <tspan x={xScale(d)} y={25}>{`${formatYear(d)}`}</tspan>
            ) : undefined}
          </text>
        ); // );
        // undefined;
      })}
    </g>
  );
}

export default LineChartTimeAxis;
