# DockPanel

![image](https://img.alicdn.com/tfs/TB1.rsTaXT7gK0jSZFpXXaTkpXa-1916-1108.png)

面向 React 的 Dock 布局组件，类似 .NET Window Forms 中的 Dock 布局模式。

# 安装

```bash
npm i dock-panel --save
```

# 使用

```tsx
import React from "react";
import { DockPanel, DockType } from "dock-panel";

function App() {
  return (
    <DockPanel style={{ width: "100%", height: "100%" }}>
      <DockPanel
        dock={DockType.left}
        style={{ background: "red", width: 100 }}
      >
        left
      </DockPanel>
      <DockPanel
        dock={DockType.top}
        style={{ background: "green", height: "20%" }}
      >
        top
      </DockPanel>
      <DockPanel
        dock={DockType.bottom}
        style={{ background: "blue", height: 100 }}
      >
        bottom
      </DockPanel>
      <DockPanel dock={DockType.fill} style={{ background: "black" }}>
        fill
      </DockPanel>
    </DockPanel>
  );
}
```