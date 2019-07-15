/******************************************************************************
 * DockLayout
 * varstion 1.0.0
 * by Houfeng
 * admin@xhou.net
 *****************************************************************************/

// 自动创建样式
((document: Document) => {
  const styleContainer = document.head || document.body;
  const styleElement = document.createElement("style");
  styleContainer.appendChild(styleElement);
  styleElement.innerHTML = `[data-layout="dock"]{
    position:relative;
    box-sizing:border-box !important;
  }
  [data-layout="dock"]>[data-dock]{
    position:absolute !important;
    box-sizing:border-box !important;
  }`;
})(document);

/**
 * padding 信息
 */
export interface IPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * DockType 停靠类型
 */
export enum DockType {
  /**
   * 停靠在上部
   */
  top = "top",

  /**
   * 停靠在右侧
   */
  right = "right",

  /**
   * 停靠在下部
   */
  bottom = "bottom",

  /**
   * 停靠在左侧
   */
  left = "left",

  /**
   * 填充剩余区域
   */
  fill = "fill"
}

/**
 * Dock 类，提供 Dock 布局的能力，
 * 通过 element 可创建新的 dock 实例
 */
export class Dock {
  public element: HTMLElement;
  public children: HTMLElement[];
  public options: any;
  public padding: IPadding;
  public width: number;
  public height: number;

  // 构建一个 dock 容器
  constructor(box: HTMLElement, options: any = {}) {
    this.element = box;
    this.options = { ...options };
    this.element.setAttribute("data-layout", "dock");
    this._findChildren();
    this.calc();
    this._bindEvents();
  }

  // 为元素添加事件
  protected _addEvent(
    node: Node | Window,
    name: string,
    handler: EventListenerOrEventListenerObject
  ) {
    this._removeEvent(node, name, handler);
    node.addEventListener(name, handler, false);
  }

  protected _removeEvent(
    node: Node | Window,
    name: string,
    handler: EventListenerOrEventListenerObject
  ) {
    node.removeEventListener(name, handler, false);
  }

  protected _onResize = (event: Event) => {
    event.stopPropagation();
    setTimeout(() => this.calc(false), 0);
  };

  protected _onDOMChanged = (event: Event) => {
    event.stopPropagation();
    setTimeout(() => this.calc(true), 0);
  };

  // 绑定事件
  protected _bindEvents() {
    this._addEvent(window, "resize", this._onResize);
    this._addEvent(this.element, "resize", this._onResize);
    this._addEvent(this.element, "DOMNodeInserted", this._onDOMChanged);
    this._addEvent(this.element, "DOMNodeRemoved", this._onDOMChanged);
    this.children.forEach(item => {
      this._addEvent(item, "resize", this._onResize);
      this._addEvent(item, "DOMNodeInserted", this._onDOMChanged);
      this._addEvent(item, "DOMNodeRemoved", this._onDOMChanged);
    });
  }

  public destory() {
    this._removeEvent(window, "resize", this._onResize);
    this._removeEvent(this.element, "resize", this._onResize);
    this._removeEvent(this.element, "DOMNodeInserted", this._onDOMChanged);
    this._removeEvent(this.element, "DOMNodeRemoved", this._onDOMChanged);
    this.children.forEach(item => {
      this._removeEvent(item, "resize", this._onResize);
      this._removeEvent(item, "DOMNodeInserted", this._onDOMChanged);
      this._removeEvent(item, "DOMNodeRemoved", this._onDOMChanged);
    });
  }

  // 查找所有项
  protected _findChildren() {
    this.children = [].slice
      .call(this.element.querySelectorAll("[data-dock]"))
      .filter((item: HTMLElement) => item.parentNode === this.element);
  }

  // 计算一个布局元素
  protected _calcItem(item: HTMLElement, dockType: DockType) {
    switch (dockType) {
      case DockType.top:
        item.style.bottom = "auto";
        item.style.top = this.padding.top + "px";
        item.style.left = this.padding.left + "px";
        item.style.right = this.padding.right + "px";
        this.padding.top += item.offsetHeight;
        break;
      case DockType.right:
        item.style.left = "auto";
        item.style.right = this.padding.right + "px";
        item.style.top = this.padding.top + "px";
        item.style.bottom = this.padding.bottom + "px";
        this.padding.right += item.offsetWidth;
        break;
      case DockType.bottom:
        item.style.top = "auto";
        item.style.bottom = this.padding.bottom + "px";
        item.style.left = this.padding.left + "px";
        item.style.right = this.padding.right + "px";
        this.padding.bottom += item.offsetHeight;
        break;
      case DockType.left:
        item.style.right = "auto";
        item.style.left = this.padding.left + "px";
        item.style.top = this.padding.top + "px";
        item.style.bottom = this.padding.bottom + "px";
        this.padding.left += item.offsetWidth;
        break;
      case DockType.fill:
      default:
        item.style.left = this.padding.left + "px";
        item.style.right = this.padding.right + "px";
        item.style.top = this.padding.top + "px";
        item.style.bottom = this.padding.bottom + "px";
        this.padding.top += item.offsetHeight;
        this.padding.right += item.offsetWidth;
        this.padding.bottom += item.offsetHeight;
        this.padding.left += item.offsetWidth;
        break;
    }
  }

  // 计算布局
  public calc(reFind = false) {
    this.padding = {
      top: parseInt(this.element.style.paddingTop || "0"),
      right: parseInt(this.element.style.paddingRight || "0"),
      bottom: parseInt(this.element.style.paddingBottom || "0"),
      left: parseInt(this.element.style.paddingLeft || "0")
    };
    this.width =
      this.element.offsetWidth - this.padding.left - this.padding.right;
    this.height =
      this.element.offsetHeight - this.padding.top - this.padding.bottom;
    if (reFind) this._findChildren();
    this.children.forEach(item => {
      const dockType = item.getAttribute("data-dock") as DockType;
      if (dockType) this._calcItem(item, dockType);
    });
    if (reFind) this._bindEvents();
  }
}
