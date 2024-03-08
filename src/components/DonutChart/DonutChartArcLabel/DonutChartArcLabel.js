import { numberWithSeparator } from '@/utils/calc';
import { splitStringOnSlash } from '@/utils/strings';

import React from 'react';

function DonutChartArcLabel({
  label,
  count,
  labelPosition,
  svgFontSize,
}) {
  const labelArray = splitStringOnSlash(label);
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
      <tspan x={labelPosition.x} dy="1.4em">
        {numberWithSeparator(count)}
      </tspan>
    </text>
  );
}

export default DonutChartArcLabel;
