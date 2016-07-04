import React from 'react';
import poissonDiscSampler from 'poisson-disc-sampler';
import {voronoi as d3Voronoi} from 'd3-voronoi';
import {lab} from 'd3-color';

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

export default function Mesh() {
  const paths = voronoi(samples)
    .polygons()
    .map(sample => (
      <path
        d={`M${sample.join('L')}Z`}
        fill={color(sample.data)}
        stroke={color(sample.data)}
      />
    ));

  return (
    <svg width={width} height={height}>
      {paths}
    </svg>
  );
}
