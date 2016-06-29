import React from 'react';
import ReactDOM from 'react-dom';
import poissonDiscSampler from 'poisson-disc-sampler';
import {voronoi as d3Voronoi} from 'd3-voronoi';
import {lab} from 'd3-color';
import {polygonCentroid} from 'd3-polygon';

const width = 960;
const height = 500;

const sampler = poissonDiscSampler(width, height, 30);
const samples = [];
let sample;

while (sample = sampler()) {
  samples.push(sample);
}

var voronoi = d3Voronoi()
  .extent([[-1, -1], [width + 1, height + 1]]);

function color([x, y]) {
  const dx = x - width / 2;
  const dy = y - height / 2;

  return lab(100 - (dx * dx + dy * dy) / 5000, dx / 10, dy / 10);
}

function Mesh() {
  const paths = voronoi.triangles(samples)
    .map(sample => (
      <path
        d={`M${sample.join('L')}Z`}
        fill={color(polygonCentroid(sample))}
        stroke={color(polygonCentroid(sample))}
      />
    ));

  return (
    <svg width={width} height={height}>
      {paths}
    </svg>
  );
}

ReactDOM.render(<Mesh />, document.getElementById('d4'));
