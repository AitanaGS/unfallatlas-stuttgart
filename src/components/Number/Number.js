import React from 'react';
import { numberWithSeparator } from '../../utils/calc';
import ChartContainer from '../ChartContainer';
import { COLORS } from '../../utils/constants';
import styled from 'styled-components';
// import { useSpring, animated } from '@react-spring/web';

function Number({ number, label }) {
  // console.log(
  //   'number',
  //   number,
  //   colorScale ? colorScale(number) : undefined,
  //   colorScale ? colorScale(number || 0) : undefined
  // );
  // TODO: numberwithseparator performance
  // TODO: check number is undefined

  // const width = 150;
  // const height = 100;
  const width = 90;
  const height = 40;

  // const spring = useSpring({
  //   // // rectX: xScale(0),
  //   // rectY: yScale(kat),
  //   // rectWidth: xScale(variableCount.get(kat)),
  //   // // rectHeight: yScale.bandwidth(),
  //   // textX: xScale(variableCount.get(kat)) + 10,
  //   // textY: yScale(kat) + yScale.bandwidth() / 2,
  //   // rectFill: colorScale(weekHourCount[week]?.[hour] || 0) || 'white',
  //   // textFill:
  //   //   (weekHourCount[week]?.[hour] || 0) > extentCounts[1] / 2
  //   //     ? 'white'
  //   //     : 'black',
  //   // text: weekHourCount[week]?.[hour] || 0,
  //   // x: d.x0,
  //   // y: d.y0,
  //   // y2: d.y0 + 16,
  //   // width: d.x1 - d.x0,
  //   // height: d.y1 - d.y0,
  //   // rectX: hourScale(hour),
  //   // rectY: weekScale(week),
  //   rectWidth: width,
  //   // rectHeight: weekScale.bandwidth(),
  //   // textX: hourScale(hour) + hourScale.bandwidth() / 2,
  //   // textY: weekScale(week) + weekScale.bandwidth() / 2,
  //   config: {
  //     mass: 1,
  //     tension: 120,
  //     friction: 20,
  //   },
  // });
  return (
    <NumberWrapper>
      {label}:
      <ChartContainer width={width} height={height}>
        {/* <text x={10} y={10}>
        {number}
      </text> */}
        <g>
          <rect
            width={width}
            // width={spring.rectWidth}
            height={height}
            rx={'5px'}
            ry={'5px'}
            // stroke={COLORS.gray.dark}
            // strokeWidth={'6px'}
            style={{
              // stroke: 'blue',
              // strokeWidth: '2px',
              // fill: colorScale
              //   ? colorScale(number || 0) || 'white'
              //   : 'white',
              fill: COLORS.yellow.medium,
              // borderRadius: '10px',
              // fill:
              //   colorScale(weekHourCount.get(d).get(e)) ||
              //   'white',
              // fill: 'transparent',
            }}
          />
          <text
            x={width / 2}
            y={height / 2}
            // textAnchor="middle"
            // dominantBaseline={'hanging'}
            dominantBaseline={'middle'}
            textAnchor="middle"
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              // fill: 'rgba(32, 35, 56, 1)',
            }}
            fill={COLORS.gray.dark}
          >
            {number !== undefined ? numberWithSeparator(number) : 0}
            {/* <tspan textAnchor="start" x={3} y={height / 2 - 20}>
            {label}:
          </tspan> */}
            {/* <tspan textAnchor="middle" x={width / 2} y={height / 2}>
              {number !== undefined ? numberWithSeparator(number) : 0}
            </tspan> */}
            {/* <tspan x={0} y={height / 4}>
            {label}
          </tspan>
          <tspan x={0} y={height / 4 + 15}>
            {number !== undefined ? numberWithSeparator(number) : 0}
          </tspan> */}
          </text>
        </g>
      </ChartContainer>
    </NumberWrapper>
  );
}

const NumberWrapper = styled.div`
  font-weight: 700;
`;

export default React.memo(Number);
