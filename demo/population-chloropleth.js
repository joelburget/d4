import React from 'react';
import {quantile} from 'd3-array';
import {scaleLog} from 'd3-scale';
import {interpolateHcl} from 'd3-interpolate';
import {geoPath} from 'd3-geo';
import topojson from 'topojson';

import us from '../data/us-albers.json';

const width = 960;
const height = 500;

const color = scaleLog()
  .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
  .interpolate(interpolateHcl);

const path = geoPath()
  .projection(null);

export default function Population() {
  const counties = topojson.feature(us, us.objects.counties).features;

  const densities = counties
    // TODO(joel): make this not side effect
    .map(d => { return d.properties.density = d.properties.pop / path.area(d); })
    .sort((a, b) => a - b);

  color.domain([quantile(densities, .01), quantile(densities, .99)]);

  const paths = counties.map(county => (
    <path
      key={county.id}
      fill={color(county.properties.density)}
      d={path(county)}
    />
  ));

  return (
    <svg width={width} height={height}>
      <g className="counties">
        {paths}
      </g>
    </svg>
  );
}
