import React from 'react';
import ReactDOM from 'react-dom';
import {RadioGroup, Radio} from 'react-radio-group'
import ReactMarkdown from 'react-markdown';

import BarChart from './demo/bar';
import Delaunay from './demo/delaunay-color-mesh';
import DynamicBarChart from './demo/dynamic-bar';
import DynamicHexbin from './demo/dynamic-hexbin';
import PopulationChloropleth from './demo/population-chloropleth';
import TileBoundingBox from './demo/tile-bounding-box';
import Voronoi from './demo/voronoi-color-mesh';
import Now from './demo/now';

import Readme from 'raw!./README.md'

const componentMap = {
  BarChart,
  // Delaunay,
  DynamicBarChart,
  DynamicHexbin,
  PopulationChloropleth,
  TileBoundingBox,
  Voronoi,
  Now,
};

class Page extends React.Component {
  constructor() {
    super();
    this.state = {selected: 'Now'};
    this.handleChange = selected => this._handleChange(selected);
  }

  _handleChange(selected) {
    this.setState({selected});
  }

  render() {
    return (
      <div>
        <ReactMarkdown source={Readme} />
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
          <label><Radio value="Now" />now</label>
        </RadioGroup>
        {React.createElement(componentMap[this.state.selected])}
        <ReactMarkdown source="Style inspired by [jlord/hello](https://github.com/jlord/hello)" />
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('d4'));
