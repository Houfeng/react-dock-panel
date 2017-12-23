import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dock from './dock';

export default class DockPanel extends Component {

  render() {
    const { dock = 'fill', children, ...other } = this.props;
    return <div {...other}
      data-layout="dock"
      data-dock={dock}>
      {children}
    </div>;
  }

  componentDidMount() {
    this.dock = new Dock(ReactDOM.findDOMNode(this));
  }

  componentWillUnMount() {
    if (this.dock) this.dock.destory();
  }

}