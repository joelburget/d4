import React from 'react';

function Tick({ text, transform }) {
  return (
    <g className="tick" transform={`translate(${transform}, 0)`}>
      <line x1={0} y1={0} x2={0} y2={0} />
      <text dy=".71em" x={0} y={0} style={{textAnchor: 'middle'}}>{text}</text>
    </g>
  );
}

function Axis({ scale }) {
  const ticks = scale.domain();
  const tickElems = ticks.map(tick => (
    <Tick text={tick} key={tick} transform={scale(tick)} />
  ));

  return (
    <g className="axis" transform={`translate(0, 20)`}>
      {tickElems}
    </g>
  );
}

function Rects({ scale, data }) {
  const rects = data.map(datum => (
    <rect
      className="bar"
      key={datum.title}
      width={scale(datum.title)}
      height={height}
    />
  ));

  return (
    <g className="rects">{rects}</g>
  );
}
