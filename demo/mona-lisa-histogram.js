import React from 'react';
import ReactDOM from 'react-dom';

const width = 960;
const height = 1452;

const image = new Image;
image.src = 'mona-lisa.jpg';
image.onload = () => {

};

function MonaLisa() {
  return (
    <svg width={width} height={height}>
      <g className="histogram">
      </g>
    </svg>
  );
}

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
  },
  histogram: {
    isolation: 'isolate',
  },
  histogramArea: {
    mix-blend-mode: 'screen',
  },
  histogramLine: {
    fill: 'none',
    stroke: '#000',
    shapeRendering: 'crispEdges',
  },
});
