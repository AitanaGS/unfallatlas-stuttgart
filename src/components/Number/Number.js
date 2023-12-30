import React from 'react';
import { numberWithSeparator } from '../../utils/calc';
import ChartContainer from '../ChartContainer';
import { COLORS } from '../../utils/constants';
import styled from 'styled-components';

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
  const width = 100;
  const height = 50;
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
            height={height}
            rx={'10px'}
            ry={'10px'}
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

export default Number;
