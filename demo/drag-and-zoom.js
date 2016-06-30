import React from 'react';
import ReactDOM from 'react-dom';

const width = 960;
const height = 500;

function phyllotaxis(radius) {
  const theta = Math.PI * (3 - Math.sqrt(5));
  return function(i) {
    const r = radius * Math.sqrt(i);
    const a = theta * i;
    return {
      x: width / 2 + r * Math.cos(a),
      y: height / 2 + r * Math.sin(a)
    };
  };
}

const points = [];
const f = phyllotaxis(10);
for (let i = 0; i < 2000; i++) {
  points[i] = f(i);
}

class DragAndZoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {points, selected: null};
  }

  handleDragStart(i) {
    this.setState({selected: i});
  }

  handleDragEnd(i) {
    this.setState({selected: null});
  }

  handlePointMouseMove(evt) {
    const {selected} = this.state;
    if (selected) {
      const {clientX, clientY} = evt;
      const {offsetLeft, offsetTop} = evt.target.parentElement.parentElement;
      points[selected].x = clientX - offsetLeft;
      points[selected].y = clientY - offsetTop;

      this.setState({points});
    }
  }

  onWheel(e) {
    console.log('wheel', e.deltaY);
  }

  render() {
    const pointElems = points.map(({x, y}, i) => (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={2.5}
        onMouseDown={() => this.handleDragStart(i)}
        onTouchStart={() => this.handleDragStart(i)}
        onMouseUp={() => this.handleDragEnd(i)}
        onTouchEnd={() => this.handleDragEnd(i)}
      />
    ));

    return (
      <svg
        width={width}
        height={height}
        onWheel={this.onWheel}
        onMouseMove={evt => this.handlePointMouseMove(evt)}
        onTouchMove={evt => this.handlePointMouseMove(evt)}
      >
        <g>
          {pointElems}
        </g>
      </svg>
    );
  }
}

ReactDOM.render(<DragAndZoom />, document.getElementById('d4'));
