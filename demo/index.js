import React from 'react';
import ReactDOM from 'react-dom';
import {RadioGroup, Radio} from 'react-radio-group'
import ReactMarkdown from 'react-markdown';

import BarChart from './bar';
import Delaunay from './delaunay-color-mesh';
import DynamicBarChart from './dynamic-bar';
import DynamicHexbin from './dynamic-hexbin';
import PopulationChloropleth from './population-chloropleth';
import TileBoundingBox from './tile-bounding-box';
import Voronoi from './voronoi-color-mesh';
import Readme from 'raw!../README.md'

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
        </RadioGroup>
        {React.createElement(componentMap[this.state.selected])}
        <ReactMarkdown source="Style inspired by [jlord/hello](https://github.com/jlord/hello)" />
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('d4'));
