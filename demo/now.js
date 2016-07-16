import React from 'react';
import {geoAzimuthalEquidistant, geoPath, geoGraticule, geoCircle} from 'd3-geo';
import {utcDay} from 'd3-time';
import topojson from 'topojson';

import world from '../data/world-50m.json';

const width = 700;
const height = 700;

const pi = Math.PI;
const radians = pi / 180;
const degrees = 180 / pi;

const circle = geoCircle()
  .radius(90);

const projection = geoAzimuthalEquidistant()
  .scale(85)
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
  const sun = antipode(solarPosition(now));
  const angle = 180 - sun[0];
  const translate1 = `translate(${width / 2}, ${height / 2})`;
  const rotate = `rotate(${angle})`;
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
        <path
          className="night"
          d={path(circle.center(sun)())}
        />
      </g>
    </svg>
  );
}

function antipode(position) {
  return [position[0] + 180, -position[1]];
}

function solarPosition(time) {
  var centuries = (time - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525, // since J2000
      longitude = (utcDay.floor(time) - time) / 864e5 * 360 - 180;
  return [
    longitude - equationOfTime(centuries) * degrees,
    solarDeclination(centuries) * degrees
  ];
}

// Equations based on NOAA’s Solar Calculator; all angles in radians.
// http://www.esrl.noaa.gov/gmd/grad/solcalc/

function equationOfTime(centuries) {
  var e = eccentricityEarthOrbit(centuries),
      m = solarGeometricMeanAnomaly(centuries),
      l = solarGeometricMeanLongitude(centuries),
      y = Math.tan(obliquityCorrection(centuries) / 2);
  y *= y;
  return y * Math.sin(2 * l)
      - 2 * e * Math.sin(m)
      + 4 * e * y * Math.sin(m) * Math.cos(2 * l)
      - 0.5 * y * y * Math.sin(4 * l)
      - 1.25 * e * e * Math.sin(2 * m);
}

function solarDeclination(centuries) {
  return Math.asin(Math.sin(obliquityCorrection(centuries)) * Math.sin(solarApparentLongitude(centuries)));
}

function solarApparentLongitude(centuries) {
  return solarTrueLongitude(centuries) - (0.00569 + 0.00478 * Math.sin((125.04 - 1934.136 * centuries) * radians)) * radians;
}

function solarTrueLongitude(centuries) {
  return solarGeometricMeanLongitude(centuries) + solarEquationOfCenter(centuries);
}

function solarGeometricMeanAnomaly(centuries) {
  return (357.52911 + centuries * (35999.05029 - 0.0001537 * centuries)) * radians;
}

function solarGeometricMeanLongitude(centuries) {
  var l = (280.46646 + centuries * (36000.76983 + centuries * 0.0003032)) % 360;
  return (l < 0 ? l + 360 : l) / 180 * pi;
}

function solarEquationOfCenter(centuries) {
  var m = solarGeometricMeanAnomaly(centuries);
  return (Math.sin(m) * (1.914602 - centuries * (0.004817 + 0.000014 * centuries))
      + Math.sin(m + m) * (0.019993 - 0.000101 * centuries)
      + Math.sin(m + m + m) * 0.000289) * radians;
}

function obliquityCorrection(centuries) {
  return meanObliquityOfEcliptic(centuries) + 0.00256 * Math.cos((125.04 - 1934.136 * centuries) * radians) * radians;
}

function meanObliquityOfEcliptic(centuries) {
  return (23 + (26 + (21.448 - centuries * (46.8150 + centuries * (0.00059 - centuries * 0.001813))) / 60) / 60) * radians;
}

function eccentricityEarthOrbit(centuries) {
  return 0.016708634 - centuries * (0.000042037 + 0.0000001267 * centuries);
}
