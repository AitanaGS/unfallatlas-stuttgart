import DonutChart from '../DonutChart';

import React from 'react';

function LichtDonutChart({ chartWidth, visData, svgFontSize }) {
  const kategorien = ['Dämmerung/Dunkelheit', 'Tageslicht'];

  return (
    <DonutChart
      chartWidth={chartWidth}
      data={visData}
      variable="licht2"
      kategorien={kategorien}
      title="Lichtverhältnisse"
      svgFontSize={svgFontSize}
      descId="LichtDonutChartDesc"
      description="Donut-Diagramm zu den Lichtverhältnissen."
    />
  );
}

export default React.memo(LichtDonutChart);
