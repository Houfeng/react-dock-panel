import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DockPanel from '../src';

function App() {
  return <div>
    <DockPanel style={{ width: '100%', height: '100%' }}>
      <DockPanel dock="left"
        style={{ background: 'red', width: 100 }}>
      </DockPanel>
      <DockPanel dock="top"
        style={{ background: 'green', height: 100 }}>
      </DockPanel>
      <DockPanel dock="bottom"
        style={{ background: 'blue', height: 100 }}>
      </DockPanel>
      <DockPanel dock="fill" style={{ background: 'black' }} >
      </DockPanel>
    </DockPanel>
  </div>
}

ReactDOM.render(<App />, root);