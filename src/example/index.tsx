import React from "react";
import ReactDOM from "react-dom";
import { DockPanel, DockType } from "../";

function App() {
  return (
    <div>
      <DockPanel style={{ width: "100%", height: "100%" }}>
        <DockPanel
          dock={DockType.left}
          style={{ background: "red", width: 200 }}
        >
          left
        </DockPanel>
        <DockPanel
          dock={DockType.top}
          style={{ background: "green", height: 56 }}
        >
          top
        </DockPanel>
        <DockPanel
          dock={DockType.bottom}
          style={{ background: "blue", height: 56 }}
        >
          bottom
        </DockPanel>
        <DockPanel dock={DockType.fill} style={{ background: "black" }}>
          fill
        </DockPanel>
      </DockPanel>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
