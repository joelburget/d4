import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import scale from 'd3-scale';
import preData from 'dsv?delimiter=\t!../data/bar.tsv';
import uuid from 'uuid';

const width = 960;
const height = 500;

// coerce value to number
const data = Immutable.OrderedMap(
  preData.map(({name, value}) => [name, +value])
);

function Button({ onClick, children }) {
  return (
    <g onClick={onClick}>
      <rect x="20" y="1" width="100" height="22" className="button" />
      <text x="25" y="16" dy=".75em">{children}</text>
    </g>
  );
}

class BarChart extends React.Component {
  constructor() {
    super();
    this.state = {data};
  }

  render() {
    const {data} = this.state;
    const maxDatum = data.max();

    const y = scale.scaleLinear()
      .domain([0, maxDatum])
      .range([height, 0]);

    const barWidth = width / data.size;

    const bars = data.entrySeq().map(([name, value], i) => (
      <g
        transform={`translate(${i * barWidth}, 0)`}
        key={name}
      >
        <rect
          y={y(value)}
          height={height - y(value)}
          width={barWidth - 1}
          className="bar"
        />
        <text x={barWidth / 2} y={y(value) + 3} dy=".75em">
          {value}
        </text>
        <Button onClick={() => this.handleUpdate(name)}>update</Button>
        <Button onClick={() => this.handleDelete(name)}>delete</Button>
      </g>
    ));

    return (
      <svg width={width} height={height}>
        {bars}
        <Button onClick={() => this.handleEnter()}>enter</Button>
      </svg>
    );
  }

  handleEnter() {
    const data = this.state.data.set(uuid.v4(), Math.random());
    this.setState({ data });
  }

  handleUpdate(key) {
    const data = this.state.data.set(key, Math.random());
    this.setState({ data });
  }

  handleDelete(key) {
    const data = this.state.data.delete(key);
    this.setState({ data });
  }
}

ReactDOM.render(<BarChart />, document.getElementById('d4'));
