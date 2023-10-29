'use client';
import React from 'react';
import {
  timeFormat,
  timeFormatLocale,
  timeParse,
} from 'd3-time-format';

// const germanLocale = {
//   dateTime: '%A, der %e. %B %Y, %X',
//   date: '%d.%m.%Y',
//   time: '%H:%M:%S',
//   periods: ['AM', 'PM'],
//   days: [
//     'Sonntag',
//     'Montag',
//     'Dienstag',
//     'Mittwoch',
//     'Donnerstag',
//     'Freitag',
//     'Samstag',
//   ],
//   shortDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
//   months: [
//     'Januar',
//     'Februar',
//     'März',
//     'April',
//     'Mai',
//     'Juni',
//     'Juli',
//     'August',
//     'September',
//     'Oktober',
//     'November',
//     'Dezember',
//   ],
//   shortMonths: [
//     'Jan',
//     'Feb',
//     'Mär',
//     'Apr',
//     'Mai',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Okt',
//     'Nov',
//     'Dez',
//   ],
// };

function LineChartMonthAxis({
  xScale,
  innerWidth,
  margin,
  monthCountArray,
  innerHeight,
}) {
  // console.log(yScale(innerHeight));
  // console.log('yscale', yScale, 'innerheight', innerHeight);
  // console.log('time ticks', xScale.ticks(14));

  // console.log('check jan 2021', timeDataDates);

  // const formatMonthName = timeFormatLocale(germanLocale).format('%b');
  // const formatYear = timeFormat('%Y');

  // const parseDate = timeParse('%Y-%m-%d'); // Format used for parsing
  const longToShortMonth = (longMonth) => {
    const monthMap = {
      Januar: 'Jan',
      Februar: 'Feb',
      März: 'Mär',
      April: 'Apr',
      Mai: 'Mai',
      Juni: 'Jun',
      Juli: 'Jul',
      August: 'Aug',
      September: 'Sep',
      Oktober: 'Okt',
      November: 'Nov',
      Dezember: 'Dez',
    };

    return monthMap[longMonth] || longMonth; // Return short month or original if not found
  };
  return (
    <g
      transform={`translate(${margin.left}, ${
        innerHeight + margin.top
      })`}
    >
      <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={'black'} />
      {/* {timeDataDates.map((d) => console.log(d))} */}
      {monthCountArray.map((d, i) => {
        // const dateObject = parseDate(d);
        return (
          // return (

          <text
            key={d.monat}
            x={xScale(d.monat)} // yScale(d) + yScale.bandwidth() / 2
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '0.8rem' }}
          >
            {longToShortMonth(d.monat)}
            {/* {/* {i % 6 == 0 ? (
              <tspan x={xScale(d)} y={10}>{`${formatMonthName(
                d
              )}`}</tspan>
            ) : undefined} */}
            {/* {i % 2 == 0 ? <tspan>{d.monat}</tspan> : undefined} */}
          </text>
          // ) : undefined}
        ); // );
        // undefined;
      })}
    </g>
  );
}

export default LineChartMonthAxis;