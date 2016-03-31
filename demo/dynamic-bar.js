import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import preData from 'dsv!../data/bar.tsv';

const width = 960;
const height = 500;

// coerce value to number
const data = preData.map(({name, value}) => ({name, value: +value}));

function Button({ onClick, children }) {
  return (
    <g onClick={onClick}>
      <rect x="20" y="1" width="100" height="22" />
      <text x="25" y="16">{children}</text>
    </g>
  );
}

class BarChart extends React.Component {
  constructor() {
    this.state = {data};
  }

  render() {
    const {data} = this.state;
    const maxDatum = Math.max(...data.map(datum => datum.value));

    const y = d3.scale.linear()
      .domain([0, maxDatum])
      .range([height, 0]);

    const barWidth = width / data.length;

    const bars = data.map(({name, value}, i) => (
      <g transform={`translate(${i * barWidth}`}>
        <rect y={y(value)} height={height - y(value)} width={barWidth - 1} />
        <text x={barWidth / 2} y={y(value) + 3} dy=".75em">
          {value}
        </text>
        <Button onClick={::this.handleUpdate(name)}>update</Button>
        <Button onClick={::this.handleDelete(name)}>delete</Button>
      </g>
    ));

    return (
      <svg width={width} height={height}>
        {bars}
        <Button onClick={::this.handleEnter()}>enter</Button>
      </svg>
    );
  }

  handleEnter() {
    const {data} = this.state.data;

  }

  handleUpdate(key) {
  }

  handleDelete(key) {
  }
}

ReactDOM.render(<BarChart />, document.getElementById('d4'));
