'use client';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { stratify, treemap, hierarchy } from 'd3-hierarchy';
import { select, selectAll } from 'd3-selection';
import { scaleSequential, scaleBand, scaleOrdinal } from 'd3-scale';
import { interpolateOranges, schemeDark2 } from 'd3-scale-chromatic';
import ChartContainer from '../ChartContainer';
import TreeMapRect from './TreeMapRect';

function TreeMap({ treeData, dashboardWidth }) {
  const width = dashboardWidth; // 250
  const height = 250;
  const margin = {
    top: 10,
    right: 40,
    bottom: 10,
    left: 10,
  };

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  // const svgRef = useRef(null);

  // const treemapLayout = treemap()
  //   .size([innerWidth, innerHeight])
  //   .padding(1);

  // const root = treemapLayout(
  //   hierarchy({ children: treeData }).sum((d) => d.value)
  // );

  const root = useMemo(() => {
    const treemapLayout = treemap()
      .size([innerWidth, innerHeight])
      .padding(1);

    return treemapLayout(
      hierarchy({ children: treeData }).sum((d) => d.value)
    );
  }, [treeData, innerWidth, innerHeight]);

  const namesArray = treeData.map((item) => item.name);

  // const colorScale = scaleBand(schemeDark2).domain(namesArray);
  const colorScale = scaleOrdinal()
    .domain(namesArray)
    .range(schemeDark2);

  // console.log('root leaves', root.leaves());

  // console.log('names array', namesArray);

  // console.log('color fussgänger', colorScale('Fußgänger'));

  return (
    <ChartContainer width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {root.leaves().map((d) => (
          <TreeMapRect
            key={d.data.name}
            d={d}
            colorScale={colorScale}
          />
          // <g key={d.data.name}>
          //   <rect
          //     x={d.x0}
          //     y={d.y0}
          //     width={d.x1 - d.x0}
          //     height={d.y1 - d.y0}
          //     fill={colorScale(d.data.name)}
          //     // fill={colorScale(d.value)}
          //   />
          //   <text
          //     x={d.x0}
          //     y={d.y0}
          //     textAnchor="start"
          //     dominantBaseline="hanging"
          //   >
          //     {d.value > 0 ? d.data.name : ''}
          //   </text>
          //   <text
          //     x={d.x0}
          //     y={d.y0 + 15}
          //     textAnchor="start"
          //     dominantBaseline="hanging"
          //   >
          //     {d.value > 0 ? d.value : ''}
          //   </text>
          // </g>
        ))}
      </g>
    </ChartContainer>
  );
}

export default TreeMap;
