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

const descriptions = {
  DynamicHexbin: `
Computing hexbins from a constantly-fluctuating sample of 2,000 random points.

Compare [the original](https://bl.ocks.org/mbostock/7833311) to the [d4 version](https://github.com/joelburget/d4/blob/master/demo/dynamic-hexbin.js)
`,
  PopulationChloropleth: `
A translation of [Population Chloropleth](https://bl.ocks.org/mbostock/6320825) (shaded by population density)

Compare [the original](https://bl.ocks.org/mbostock/6320825) to the [d4 version](https://github.com/joelburget/d4/blob/master/demo/population-chloropleth.js)
`,
  TileBoundingBox: `
A translation of [Tile by Bounding Box](https://bl.ocks.org/mbostock/eb0c48375fcdcdc00c54a92724733d0d) -- A demo of d3-tile when projecting to fit a bounding box.

Compare [the original](https://bl.ocks.org/mbostock/eb0c48375fcdcdc00c54a92724733d0d) to the [d4 version](https://github.com/joelburget/d4/blob/master/demo/tile-bounding-box.js)
`,
  Voronoi: `
A translation of [Color Mesh](https://bl.ocks.org/mbostock/99049112373e12709381)

Compare [the original](https://bl.ocks.org/mbostock/99049112373e12709381) to the [d4 version](https://github.com/joelburget/d4/blob/master/demo/voronoi-color-mesh.js)
`,
  Now: `
A translation of [Now](https://bl.ocks.org/mbostock/9231621) -- A south polar azimuthal equidistant projection, oriented so that noon is as 12 o'clock, as in [xkcd:1335](http://xkcd.com/1335/). The map updates continuously.

Compare [the original](https://bl.ocks.org/mbostock/9232962) to the [d4 version](https://github.com/joelburget/d4/blob/master/demo/now.js)
`,
};

const componentMap = {
  // BarChart,
  // Delaunay,
  // DynamicBarChart,
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
        <h2>Select Demo</h2>
        <RadioGroup
          className="demo-group"
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
        <Markdown source={descriptions[this.state.selected]} />
        {React.createElement(componentMap[this.state.selected])}
        <footer>
          <div>
            <a href="https://github.com/joelburget/d4">Github</a>
          </div>
          <div>
            By <a href="http://joelburget.com">Joel Burget</a>
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
