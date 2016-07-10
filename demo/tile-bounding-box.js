// see https://bl.ocks.org/mbostock/eb0c48375fcdcdc00c54a92724733d0d

import React from 'react';
import {geoMercator, geoPath} from 'd3-geo';
import {tile} from 'd3-tile';
import topojson from 'topojson';

import us from '../data/us.json';

const pi = Math.PI;
const tau = 2 * pi;

const width = 960;
const height = 600;

const projection = geoMercator()
  .scale(1 / tau)
  .translate([0, 0]);

const bounds = [[-124.408585, 32.534291], [-114.138271, 42.007768]];
const p0 = projection([bounds[0][0], bounds[1][1]]);
const p1 = projection([bounds[1][0], bounds[0][1]]);

function floor(k) {
  return Math.pow(2, Math.floor(Math.log(k) / Math.LN2));
}

const k = floor(0.95 / Math.max((p1[0] - p0[0]) / width, (p1[1] - p0[1]) / height));
const tx = (width - k * (p1[0] + p0[0])) / 2;
const ty = (height - k * (p1[1] + p0[1])) / 2;

projection
  .scale(k / tau)
  .translate([tx, ty]);

const tiles = tile()
  .size([width, height])
  .scale(k)
  .translate([tx, ty])
  ();

const path = geoPath().projection(projection);

export default function TileMap() {
  const states = topojson.feature(us, us.objects.states).features;

  const imgs = tiles.map(tile => {
    const style = {
      position: 'absolute',
      left: (tile[0] + tiles.translate[0]) * tiles.scale + "px",
      top: (tile[1] + tiles.translate[1]) * tiles.scale + "px",
    };

    const src = "http://" + "abc"[tile[1] % 3] + ".tile.openstreetmap.org/" + tile[2] + "/" + tile[0] + "/" + tile[1] + ".png";

    return (
      <img
        style={style}
        src={src}
        width={tiles.scale}
        height={tiles.scale}
      />
    );
  });

  const paths = states.map(state => (
    <path
      key={state.id}
      fill='none'
      stroke='#000'
      d={path(state)}
    />
  ));

  const style = {width, height, position: 'absolute', overflow: 'hidden'};

  return (
    <div style={{position: 'relative', width, height}}>
      <div style={style}>
        {imgs}
      </div>
      <svg width={width} height={height} style={style}>
        {paths}
      </svg>
    </div>
  );
}
