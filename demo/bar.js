import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import preData from 'dsv?delimiter=\t!../data/bar.tsv';

const width = 960;
const height = 500;

// coerce value to number
const data = preData.map(({name, value}) => ({name, value: +value}));
console.log(preData)
console.log(data)

const maxDatum = Math.max(...data.map(datum => datum.value));

const y = d3.scale.linear()
  .domain([0, maxDatum])
  .range([height, 0]);

const barWidth = width / data.length;

function BarChart() {
  const bars = data.map(({name, value}, i) => (
    <g transform={`translate(${i * barWidth}, 0)`}>
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

ReactDOM.render(<BarChart />, document.getElementById('d4'));
