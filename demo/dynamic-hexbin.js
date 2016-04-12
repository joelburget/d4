import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import './d3-hexbin';

const width = 960;
const height = 500;
let i = -1;
let theta = 0;
const deltaTheta = 0.3;
const n = 2000;
const k = 20;

let randomX = d3.random.normal(width / 2, 80);
let randomY = d3.random.normal(height / 2, 80);
let points = d3.range(n).map(function() { return [randomX(), randomY()]; });

const color = d3.scale.linear()
  .domain([0, 20])
  .range(["white", "steelblue"])
  .interpolate(d3.interpolateLab);

const hexbin = d3.hexbin()
  .size([width, height])
  .radius(20);

class DynamicHexbin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {points};
    window.setTimeout(() => { this._update(); }, 20);
  }

  _update() {
    theta += deltaTheta;
    randomX = d3.random.normal(width / 2 + 80 * Math.cos(theta), 80),
    randomY = d3.random.normal(height / 2 + 80 * Math.sin(theta), 80);

    for (var j = 0; j < k; ++j) {
      i = (i + 1) % n;
      points[i][0] = randomX();
      points[i][1] = randomY();
    }

    this.setState({ points });
  }

  render() {
    const hexagons = hexbin(this.state.points).map(point => (
      <path
        d={hexbin.hexagon(19.5)}
        transform={`translate(${point.x}, ${point.y})`}
        fill={color(point.length)}
      />
    ));

    return (
      <svg width={width} height={height}>
        <g className="hexagons">
          {hexagons}
        </g>
      </svg>
    );
  }
}

ReactDOM.render(<DynamicHexbin />, document.getElementById('d4'));
