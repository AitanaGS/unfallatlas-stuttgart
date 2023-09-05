import React, { useEffect, useRef, useMemo } from 'react';
import ChartContainer from '../ChartContainer';
import { scaleTime, scaleLinear, scaleBand } from 'd3-scale';
import { extent, rollup, max } from 'd3-array';
import { line, curve, curveMonotoneX, curveBasis } from 'd3-shape';
import { select, selectAll } from 'd3-selection';
import LineChartMonthAxis from '../LineChartMonthAxis';

function LineChartMonth({ visData }) {
  const width = 500;
  const height = 300;
  const margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 60,
  };

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  // const gRef = useRef();

  // Perform data aggregation to count the total rows for each month
  var monthCount = rollup(
    visData,
    (v) => v.length, // Aggregation function: count the length of each group
    (d) => d.monatn // Grouping key: the "datum" property representing the month
  );

  const months = [
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

  const monthCountArray = useMemo(() => {
    const unsortedArray = months.map((monat) => ({
      monat: monat,
      count: monthCount.get(monat) || 0, // Use 0 if no count exists
    }));

    // Sort the array by the "datum" property
    return unsortedArray.sort((a, b) => a.jahr - b.jahr);
  }, [months, monthCount]); // Recalculate when timeDataDates or aggregatedTimeData changes

  // console.log('check', timeDataDates);
  // const xScale = scaleTime()
  //   .domain(extent(months))
  //   .range([0, innerWidth]);

  const xScale = scaleBand().domain(months).range([0, innerWidth]);

  // console.log(
  //   'herre',
  //   monthCountArray,
  //   xScale('März'),
  //   xScale('Mai'),
  //   xScale.keys,
  //   extent(months)
  // );

  // console.log('time', aggregatedArray);

  // Create an array of months and corresponding total rows
  // var months = aggregatedArray.map((d) => d.key);
  // var totalRows = aggregatedArray.map((d) => d.value);

  // Create a y-scale based on total rows
  // const yScale = scaleLinear()
  //   .domain(extent(yearCountArray, (d) => d.count))
  //   // .domain(timeCountExtent) // Set the y-domain based on the maximum total rows
  //   .range([innerHeight, 0]); // Set the y-range based on your chart's height
  const yScale = scaleLinear()
    .domain([0, max(monthCountArray, (d) => d.count)])
    // .domain(timeCountExtent) // Set the y-domain based on the maximum total rows
    .range([innerHeight, 0]); // Set the y-range based on your chart's height

  const pathLine = line()
    .x((d) => xScale(d.monat))
    .y((d) => yScale(d.count));
  // .curve(curveBasis); // curveMonotoneX, curveBasis

  // // const valueLine = line()
  // //   .x((d) => timeScale(d.datum))
  // //   .y((d) => yScale(d.value))
  // //   .curve(curveMonotoneX);

  // const pathLine = line()
  //   .x((d) => xScale(d.datum))
  //   .y((d) => yScale(d.count))
  //   .curve(curveMonotoneX); // curveMonotoneX, curveBasis

  // useEffect(() => {
  //   const gElement = select(gRef.current);
  //   gElement
  //     .selectAll('path')
  //     .data(aggregatedArray)
  //     .join('path')
  //     .attr('d', (d) => valueLine(d))
  //     .attr('fill', 'none')
  //     .attr('stroke', 'blue');
  // }, [aggregatedArray, valueLine]);

  // console.log(timeScale(visData[0].datum));

  // // Perform data aggregation to count the total rows for each month
  // var aggregatedData = rollup(
  //   visData,
  //   (v) => v.length, // Aggregation function: count the length of each group
  //   (d) => d.datum // Grouping key: the "datum" property representing the month
  // );

  // // Now "aggregatedData" is a Map object with keys representing months and values representing total rows

  // // Convert the Map to an array of objects
  // var aggregatedArray = Array.from(
  //   aggregatedData,
  //   ([key, value]) => ({ key, value })
  // );

  // const timeScale = scaleTime()
  //   .domain(
  //     extent(aggregatedArray, function (d) {
  //       return d.key;
  //     })
  //   )
  //   .range([0, innerWidth]);

  // console.log(
  //   'time',
  //   aggregatedArray[0].key,
  //   aggregatedArray[0].value
  // );

  // // Create an array of months and corresponding total rows
  // var months = aggregatedArray.map((d) => d.key);
  // var totalRows = aggregatedArray.map((d) => d.value);

  // // Create a y-scale based on total rows
  // var yScale = scaleLinear()
  //   .domain([0, max(totalRows)]) // Set the y-domain based on the maximum total rows
  //   .range([innerHeight, 0]); // Set the y-range based on your chart's height

  // const valueLine = line()
  //   .x((d) => timeScale(d.key))
  //   .y((d) => yScale(d.value));
  //   .curve(curveMonotoneX);

  // var valueLine = line()
  // .x((d) => { return x(d.key); })
  // .y((d) => { return y(d.value); });
  // console.log('line aggregatedData', aggregatedData);
  // console.log('line aggregatedArray', aggregatedArray);
  // console.log('line totalrows', totalRows);
  // console.log('line yscale', yScale(totalRows[0]));

  // Continue with your D3 chart rendering code using yScale

  // const yScale = scaleLinear()
  //     .domain(extent(visData, () => d.))

  return (
    <ChartContainer width={width} height={height}>
      {/* <LineChartTimeAxis
        xScale={xScale}
        innerWidth={innerWidth}
        margin={margin}
        timeDataDates={timeDataDates}
        innerHeight={innerHeight}
      /> */}
      <LineChartMonthAxis
        xScale={xScale}
        innerWidth={innerWidth}
        margin={margin}
        innerHeight={innerHeight}
        monthCountArray={monthCountArray}
      />
      <g
        transform={`translate(${margin.left},${margin.top})`}
        // ref={gRef}
      >
        <path
          d={pathLine(monthCountArray)}
          style={{
            stroke: 'blue',
            strokeWidth: 2,
            fill: 'none',
            strokeLinecap: 'round',
          }}
        />
        {monthCountArray.map((d, i) => (
          <g key={d.monat}>
            <circle
              cx={xScale(d.monat)}
              cy={yScale(d.count)}
              r="5"
              style={{
                // stroke: 'blue',
                // strokeWidth: 2,
                // fill: 'none',
                fill: 'blue',
              }}
            />
            <text
              x={xScale(d.monat)}
              y={yScale(d.count) - 10}
              textAnchor="middle"
              dominantBaseline={'middle'}
            >
              {d.count}
            </text>
          </g>
        ))}
      </g>
    </ChartContainer>
  );
}

export default LineChartMonth;
