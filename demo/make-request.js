import React from 'react';
import 'whatwg-fetch';

const cache = [];

const WAITING = 'WAITING';
const DONE = 'DONE';
const ERROR = 'ERROR';

export default function makeRequest(dataSource, Component) {
  return React.createClass({
    getInitialState() {
      const status = cache[dataSource] ? DONE : WAITING;
      return {status};
    },

    componentDidMount() {
      if (!cache[dataSource]) {
        fetch(dataSource)
          .then(response => response.json())
          .then(data => {
            cache[dataSource] = data;
            this.setState({ status: DONE });
          })
          .catch(e => { this.setState({ status: ERROR }); });
      }
    },

    render: function() {
      const {status} = this.state;
      return status === DONE
        ? <Component data={cache[dataSource]} />
        : status === WAITING
          ? <div style={{backgroundColor: 'green'}}>WAITING</div>
          : <div style={{backgroundColor: 'red'}}>ERROR</div>;
    }
  });
}
