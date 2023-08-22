'use client';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { stratify, treemap, hierarchy } from 'd3-hierarchy';
import { select, selectAll } from 'd3-selection';
import { scaleSequential, scaleBand, scaleOrdinal } from 'd3-scale';
import { interpolateOranges, schemeDark2 } from 'd3-scale-chromatic';

function TreeMap({ treeData }) {
  const width = 250;
  const height = 250;
  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const svgRef = useRef(null);

  const treemapLayout = treemap()
    .size([innerWidth, innerHeight])
    .padding(1);

  const root = treemapLayout(
    hierarchy({ children: treeData }).sum((d) => d.value)
  );

  const namesArray = treeData.map((item) => item.name);

  // const colorScale = scaleBand(schemeDark2).domain(namesArray);
  const colorScale = scaleOrdinal()
    .domain(namesArray)
    .range(schemeDark2);

  console.log('root leaves', root.leaves());

  console.log('names array', namesArray);

  console.log('color fussgänger', colorScale('Fußgänger'));

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ border: '1px solid black' }}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        {root.leaves().map((d) => (
          <g key={d.data.name}>
            <rect
              x={d.x0}
              y={d.y0}
              width={d.x1 - d.x0}
              height={d.y1 - d.y0}
              fill={colorScale(d.data.name)}
              // fill={colorScale(d.value)}
            />
            <text
              x={d.x0}
              y={d.y0}
              textAnchor="start"
              dominantBaseline="hanging"
            >
              {d.value > 0 ? d.data.name : ''}
            </text>
            <text
              x={d.x0}
              y={d.y0 + 15}
              textAnchor="start"
              dominantBaseline="hanging"
            >
              {d.value > 0 ? d.value : ''}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default TreeMap;
