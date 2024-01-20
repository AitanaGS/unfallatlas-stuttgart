import React from 'react';
import { numberWithSeparator } from '@/utils/calc';
import { splitStringOnSlash } from '@/utils/strings';

function DonutChartArcLabel({ label, count, labelPosition }) {
  const labelArray = splitStringOnSlash(label);
  // console.log('labelarray', labelArray);
  // console.log(count);
  return (
    <text
      // x={20}
      y={labelPosition.y}
      textAnchor={labelPosition.textAnchor}
      dominantBaseline="middle"
      // style={{ fontSize: '0.8rem' }}
    >
      {/* <tspan x={labelPosition.x} dy="0">
        Dämmerung/
      </tspan>
      <tspan x={labelPosition.x} dy="1.4em">
        Dunkelheit
      </tspan> */}
      {labelArray.map((label, i) => (
        <tspan
          key={label}
          x={labelPosition.x}
          dy={`${i === 0 ? 0 : 1.4}em`}
        >
          {/* dy={`${i * 1.4}em`} */}
          {label}
        </tspan>
      ))}
      <tspan x={labelPosition.x} dy="1.4em">
        {numberWithSeparator(count)}
        {/* {variableCount.get('Dämmerung/Dunkelheit')
        ? numberWithSeparator(
            variableCount.get('Dämmerung/Dunkelheit')
          )
        : 0} */}
      </tspan>
    </text>
  );
}

export default DonutChartArcLabel;
