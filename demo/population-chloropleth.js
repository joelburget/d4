import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import topojson from 'topojson';

import us from '../data/us-albers.json';

const width = 960;
const height = 500;

const color = d3.scale.log()
  .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
  .interpolate(d3.interpolateHcl);

const path = d3.geo.path()
  .projection(null);

const counties = topojson.feature(us, us.objects.counties).features;

const densities = counties
  // TODO(joel): make this not side effect
  .map(d => { return d.properties.density = d.properties.pop / path.area(d); })
  .sort((a, b) => a - b);

color.domain([d3.quantile(densities, .01), d3.quantile(densities, .99)]);

function Population() {
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

ReactDOM.render(<Population />, document.getElementById('d4'));
