import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Dock, DockType } from "./Dock";

/**
 * DockPanel 属性
 */
export interface IDockPanelProps {
  /**
   * 停靠类型
   */
  dock?: DockType;

  /**
   * 其它属性
   */
  [name: string]: any;
}

/**
 * DockPanel 组件类
 */
export class DockPanel extends Component<IDockPanelProps> {
  public dock: Dock;

  render() {
    const { dock = DockType.fill, children, ...other } = this.props;
    return (
      <div {...other} data-layout="dock" data-dock={dock}>
        {children}
      </div>
    );
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    this.dock = new Dock(element);
  }

  componentDidUpdate() {
    if (this.dock) this.dock.calc(true);
  }

  componentWillUnMount() {
    if (this.dock) this.dock.destory();
  }
}
