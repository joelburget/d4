import React from 'react';
import {scaleLinear} from 'd3-scale';
import preData from 'dsv?delimiter=\t!../data/bar.tsv';

const width = 960;
const height = 500;

// coerce value to number
const data = preData.map(({name, value}) => ({name, value: +value}));

const maxDatum = Math.max(...data.map(datum => datum.value));

const y = scaleLinear()
  .domain([0, maxDatum])
  .range([height, 0]);

const barWidth = width / data.length;

export default function BarChart() {
  const bars = data.map(({name, value}, i) => (
    <g transform={`translate(${i * barWidth}, 0)`} key={name}>
      <rect y={y(value)} height={height - y(value)} width={barWidth - 1} />
      <text x={barWidth / 2} y={y(value) + 3} dy=".75em">
        {value}
      </text>
    </g>
  ));

  return (
    <svg width={width} height={height}>
      {bars}
    </svg>
  );
}
