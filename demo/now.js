import React from 'react';
import {geoAzimuthalEquidistant, geoPath, geoGraticule} from 'd3-geo';
import {utcDay} from 'd3-time';
import topojson from 'topojson';

import world from '../data/world-50m.json';

const width = 480;
const height = 480;

const projection = geoAzimuthalEquidistant()
  .scale(75)
  .translate([width / 2, height / 2])
  .clipAngle(180 - 1e-3)
  .rotate([0, 90])
  .precision(.1);

const path = geoPath()
  .projection(projection);

const graticule = geoGraticule();

export default function World() {
  const now = new Date();
  const today = utcDay(now);
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
