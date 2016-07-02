import React from 'react';
import ReactDOM from 'react-dom';
import {RadioGroup, Radio} from 'react-radio-group'

import BarChart from './bar';
import Delaunay from './delaunay-color-mesh';
import DynamicBarChart from './dynamic-bar';
import DynamicHexbin from './dynamic-hexbin';
import PopulationChloropleth from './population-chloropleth';
import TileBoundingBox from './tile-bounding-box';
import Voronoi from './voronoi-color-mesh';

const componentMap = {
  BarChart,
  // Delaunay,
  DynamicBarChart,
  DynamicHexbin,
  PopulationChloropleth,
  TileBoundingBox,
  Voronoi,
};

class Page extends React.Component {
  constructor() {
    super();
    this.state = {selected: 'Voronoi'};
    this.handleChange = selected => this._handleChange(selected);
  }

  _handleChange(selected) {
    this.setState({selected});
  }

  render() {
    return (
      <div>
        <p>
This is a demonstration of authoring d3-like documents in a declarative style.
We're still able to use most of d3's functionality, but avoiding the mutable
core. Instead, we use React to specify the svg we want to see.
        </p>
        <RadioGroup
          name="demo"
          selectedValue={this.state.selected}
          onChange={this.handleChange}
        >
          <label><Radio value="BarChart" />bar chart</label>
          <label><Radio value="DynamicBarChart" />dynamic bar chart</label>
          <label><Radio value="DynamicHexbin" />dynamic hexbin</label>
          <label><Radio value="PopulationChloropleth" />population chloropleth</label>
          <label><Radio value="TileBoundingBox" />tile bounding box</label>
          <label><Radio value="Voronoi" />voronoi color mesh</label>
        </RadioGroup>
        {React.createElement(componentMap[this.state.selected])}
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('d4'));
