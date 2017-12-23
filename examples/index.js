import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DockPanel from '../src';

function App() {
  return <div>
    <DockPanel style={{ width: '100%', height: '100%' }}>
      <DockPanel dock="top"
        style={{ background: 'red', height: 100 }}>
      </DockPanel>
      <DockPanel style={{ background: 'black' }} >
        <DockPanel dock="left"
          style={{ background: 'blue', width: 100 }}>
        </DockPanel>
        <DockPanel style={{ background: 'orange' }} ></DockPanel>
      </DockPanel>
    </DockPanel>
  </div>
}

ReactDOM.render(<App />, root);