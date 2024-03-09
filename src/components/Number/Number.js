import ChartContainer from '../ChartContainer';
import { numberWithSeparator } from '@/utils/calc';
import { COLORS } from '@/utils/constants';

import React from 'react';
import styled from 'styled-components';

function Number({ number, label, description }) {
  const width = 90;
  const height = 40;

  return (
    <NumberWrapper>
      <p
        style={{ marginRight: '10px' }}
        role="presentation"
        aria-hidden="true"
      >
        {label}:
      </p>
      <ChartContainer
        width={width}
        height={height}
        descId="numberDesc"
      >
        <desc id="numberDesc">
          {description}: {numberWithSeparator(number)}
        </desc>
        <g>
          <rect
            width={width}
            height={height}
            rx="5px"
            ry="5px"
            style={{
              fill: COLORS.yellow.medium,
            }}
          />
          <text
            x={width / 2}
            y={height / 2}
            dominantBaseline="middle"
            textAnchor="middle"
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
            fill={COLORS.gray.dark}
          >
            {number !== undefined ? numberWithSeparator(number) : 0}
          </text>
        </g>
      </ChartContainer>
    </NumberWrapper>
  );
}

const NumberWrapper = styled.div`
  font-weight: 700;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export default React.memo(Number);
