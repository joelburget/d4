import React from 'react';
import ReactDOM from 'react-dom';
import {RadioGroup, Radio} from 'react-radio-group'

import BarChart from './demo/bar';
import Delaunay from './demo/delaunay-color-mesh';
import DynamicBarChart from './demo/dynamic-bar';
import DynamicHexbin from './demo/dynamic-hexbin';
import PopulationChoropleth from './demo/population-choropleth';
import TileBoundingBox from './demo/tile-bounding-box';
import Voronoi from './demo/voronoi-color-mesh';
import Now from './demo/now';

import Markdown from './md';

const descriptions = {
  DynamicHexbin: `
Computing hexbins from a constantly-fluctuating sample of 2,000 random points.

Compare [the original](https://bl.ocks.org/mbostock/7833311) to the [d4 version](https://github.com/joelburget/d4/blob/master/demo/dynamic-hexbin.js)
`,
  PopulationChoropleth: `
A translation of [Population Choropleth](https://bl.ocks.org/mbostock/6320825) (shaded by population density)

Compare [the original](https://bl.ocks.org/mbostock/6320825) to the [d4 version](https://github.com/joelburget/d4/blob/master/demo/population-choropleth.js)
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
A translation of [Now + Solar Terminator](https://bl.ocks.org/mbostock/9232962) -- A south polar azimuthal equidistant projection, oriented so that noon is as 12 o'clock, as in [xkcd:1335](http://xkcd.com/1335/). The map updates continuously.

Compare [the original](https://bl.ocks.org/mbostock/9232962) to the [d4 version](https://github.com/joelburget/d4/blob/master/demo/now.js)
`,
};

const componentMap = {
  // BarChart,
  // Delaunay,
  // DynamicBarChart,
  DynamicHexbin,
  PopulationChoropleth,
  TileBoundingBox,
  Voronoi,
  Now,
};

class Demos extends React.Component {
  constructor() {
    super();
    this.state = {selected: 'DynamicHexbin'};
    this.handleChange = selected => this._handleChange(selected);
  }

  _handleChange(selected) {
    this.setState({selected});
  }

  render() {
    return (
      <div>
        <h2>Select Demo</h2>
        <RadioGroup
          className="demo-group"
          name="demo"
          selectedValue={this.state.selected}
          onChange={this.handleChange}
        >
          <label><Radio value="DynamicHexbin" /><span>dynamic hexbin</span></label>
          <label><Radio value="PopulationChoropleth" /><span>population choropleth</span></label>
          <label><Radio value="TileBoundingBox" /><span>tile bounding box</span></label>
          <label><Radio value="Voronoi" /><span>voronoi color mesh</span></label>
          <label><Radio value="Now" /><span>now + solar terminator</span></label>
        </RadioGroup>
        <Markdown source={descriptions[this.state.selected]} />
        {React.createElement(componentMap[this.state.selected])}
      </div>
    );
  }
}

ReactDOM.render(<Demos />, document.getElementById('inject'));
