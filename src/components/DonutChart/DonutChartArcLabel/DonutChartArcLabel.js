import { numberWithSeparator } from '@/utils/calc';

import React from 'react';

function DonutChartArcLabel({
  count,
  labelArray,
  numberLabelShiftY,
  labelPosition,
  svgFontSize,
}) {
  return (
    <text
      y={labelPosition.y}
      textAnchor={labelPosition.textAnchor}
      dominantBaseline="middle"
      fontSize={`${svgFontSize.text}rem`}
      role="presentation"
      aria-hidden="true"
    >
      {labelArray.map((label, i) => (
        <tspan
          key={label}
          x={labelPosition.x}
          dy={`${i === 0 ? 0 : 1.4}em`}
        >
          {label}
        </tspan>
      ))}
      <tspan
        x={labelPosition.x}
        dy={`${
          labelArray.length === numberLabelShiftY
            ? 1.4
            : numberLabelShiftY * 1.4
        }em`}
      >
        {numberWithSeparator(count)}
      </tspan>
    </text>
  );
}

export default DonutChartArcLabel;
