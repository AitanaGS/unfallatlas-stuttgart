import React from 'react';

import DonutChart from '../DonutChart';

function StrasseDonutChart({ chartWidth, visData, svgFontSize }) {
  const kategorien = ['nass/glatt', 'trocken'];

  return (
    <DonutChart
      chartWidth={chartWidth}
      data={visData}
      variable="strzust2"
      kategorien={kategorien}
      title="Straßenzustand"
      svgFontSize={svgFontSize}
      descId="strasseDonutChartDesc"
      description="Donut-Diagramm zum Straßenzustand."
    />
  );
}

export default React.memo(StrasseDonutChart);
