import React from 'react';
import ReactDOM from 'react-dom';
import {RadioGroup, Radio} from 'react-radio-group'

import BarChart from './demo/bar';
import Delaunay from './demo/delaunay-color-mesh';
import DynamicBarChart from './demo/dynamic-bar';
import DynamicHexbin from './demo/dynamic-hexbin';
import PopulationChloropleth from './demo/population-chloropleth';
import TileBoundingBox from './demo/tile-bounding-box';
import Voronoi from './demo/voronoi-color-mesh';
import Now from './demo/now';

import Markdown from './md';
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
        <Markdown source={Readme} />
        <RadioGroup
          name="demo"
          selectedValue={this.state.selected}
          onChange={this.handleChange}
        >
          <label><Radio value="DynamicHexbin" />dynamic hexbin</label>
          <label><Radio value="PopulationChloropleth" />population chloropleth</label>
          <label><Radio value="TileBoundingBox" />tile bounding box</label>
          <label><Radio value="Voronoi" />voronoi color mesh</label>
          <label><Radio value="Now" />now</label>
        </RadioGroup>
        {React.createElement(componentMap[this.state.selected])}
        <footer>
          <div>
            By <a href="http://joelburget.com">Joel Burget</a>
          </div>
          <div>
            <a href="https://github.com/joelburget/d4">Github</a>
          </div>
        </footer>
        <div>
          <a className="jsorg" href="https://js.org" target="_blank" title="JS.ORG | JavaScript Community">
            <img src="https://logo.js.org/dark_horz.png" width="102" alt="JS.ORG Logo"/>
          </a>
          Style inspired by <a href="https://github.com/jlord/hello">jlord/hello</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('d4'));
