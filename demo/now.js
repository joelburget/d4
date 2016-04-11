import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import topojson from 'topojson';

import world from 'json!../data/world-50m.json';

const width = 960;
const height = 960;

const projection = d3.geo.azimuthalEquidistant()
  .scale(150)
  .translate([width / 2, height / 2])
  .clipAngle(180 - 1e-3)
  .rotate([0, 90])
  .precision(.1);

const path = d3.geo.path()
  .projection(projection);

const graticule = d3.geo.graticule();

function World() {
  const now = new Date();
  const today = d3.time.day.utc(now);
  const translate1 = `translate(${width / 2}, ${height / 2})`;
  const rotate = `rotate(${(now - today) / (1000 * 60 * 60 * 24) * 360 - 180})`;
  const translate2 = `translate(${-width / 2}, ${ -height / 2})`;
  const transform = translate1 + rotate + translate2;

  return (
    <svg width={width} height={height}>
      <defs>
        <path
          id="sphere"
          d={path({type: 'Sphere'})}
        />
      </defs>
      <use className="stroke" xlinkHref="#sphere" />
      <use className="fill" xlinkHref="#sphere" />
      <g transform={transform}>
        <path className="graticule" d={path(graticule())} />
        <path
          className="land"
          d={path(topojson.feature(world, world.objects.land))}
        />
        <path
          className="boundary"
          d={path(topojson.feature(
            world,
            world.objects.countries,
            (a, b) => a !== b
          ))}
        />
      </g>
    </svg>
  );
}

ReactDOM.render(<World />, document.getElementById('d4'));
