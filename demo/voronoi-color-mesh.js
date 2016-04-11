import React from 'react';
import ReactDOM from 'react-dom';
import poissonDiscSampler from 'poisson-disc-sampler';
import d3 from 'd3';

const width = 960;
const height = 500;

const sampler = poissonDiscSampler(width, height, 30);
const samples = [];
let sample;

while (sample = sampler()) {
  samples.push(sample);
}

var voronoi = d3.geom.voronoi()
  .clipExtent([[-1, -1], [width + 1, height + 1]]);

function color([x, y]) {
  const dx = x - width / 2;
  const dy = y - height / 2;

  // TODO(joel) replace with color package
  return d3.lab(100 - (dx * dx + dy * dy) / 5000, dx / 10, dy / 10);
}

function Mesh() {
  const paths = voronoi(samples).map(sample => (
    <path
      d={`M${sample.join('L')}Z`}
      fill={color(sample.point)}
      stroke={color(sample.point)}
    />
  ));

  return (
    <svg width={width} height={height}>
      {paths}
    </svg>
  );
}

ReactDOM.render(<Mesh />, document.getElementById('d4'));
