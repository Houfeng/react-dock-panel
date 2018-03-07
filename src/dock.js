/**
 * DockLayout
 * varstion 1.0.0
 * by Houfeng
 * admin@xhou.net
 */

//自动创建样式
(function (document) {
  const styleContainer = (document.head || document.body);
  const styleElement = document.createElement('style');
  styleContainer.appendChild(styleElement);
  styleElement.innerHTML = `[data-layout="dock"]{
    position:relative;
    box-sizing:border-box !important;
  }
  [data-layout="dock"] [data-dock]{
    position:absolute !important;
    box-sizing:border-box !important;
  }`;
})(document);

//dock 类
export default class Dock {

  //构建一个 dock 容器
  constructor(box, options) {
    this.box = box;
    this.options = options || {};
    this.box.setAttribute('data-layout', 'dock');
    this._findItems();
    this.calc();
    this._bindEvents();
  }

  //为元素添加事件
  _addEvent(element, eventName, eventHandler) {
    this._removeEvent(element, eventName, eventHandler);
    element.addEventListener(eventName, eventHandler, false);
  }

  _removeEvent(element, eventName, eventHandler) {
    element.removeEventListener(eventName, eventHandler, false);
  }

  _onResize = (event) => {
    event.stopPropagation();
    setTimeout(() => this.calc(false), 0);
  };

  _onDOMChanged = event => {
    event.stopPropagation();
    setTimeout(() => this.calc(true), 0);
  };

  //绑定事件
  _bindEvents() {
    this._addEvent(window, 'resize', this._onResize);
    this._addEvent(this.box, 'resize', this._onResize);
    // this._addEvent(this.box, 'DOMNodeInserted', this._onDOMChanged);
    // this._addEvent(this.box, 'DOMNodeRemoved', this._onDOMChanged);
    this.items.forEach(item => {
      this._addEvent(item, 'resize', this._onResize);
      // this._addEvent(item, 'DOMNodeInserted', this._onDOMChanged);
      // this._addEvent(item, 'DOMNodeRemoved', this._onDOMChanged);
    });
  }

  destory() {
    this._removeEvent(window, 'resize', this._onResize);
    this._removeEvent(this.box, 'resize', this._onResize);
    // this._removeEvent(this.box, 'DOMNodeInserted', this._onDOMChanged);
    // this._removeEvent(this.box, 'DOMNodeRemoved', this._onDOMChanged);
    this.items.forEach(item => {
      this._removeEvent(item, 'resize', this._onResize);
      // this._removeEvent(item, 'DOMNodeInserted', this._onDOMChanged);
      // this._removeEvent(item, 'DOMNodeRemoved', this._onDOMChanged);
    });
  }

  //查找所有项
  _findItems() {
    this.items = [].slice.call(this.box.querySelectorAll('[data-dock]'))
      .filter(item => item.parentNode == this.box);
  }

  //计算一个布局元素
  _calcItem(item, dock) {
    switch (dock) {
      case 'top':
        item.style.bottom = 'auto';
        item.style.top = this.padding.top + 'px';
        item.style.left = this.padding.left + 'px';
        item.style.right = this.padding.right + 'px';
        this.padding.top += item.offsetHeight;
        break;
      case 'right':
        item.style.left = 'auto';
        item.style.right = this.padding.right + 'px';
        item.style.top = this.padding.top + 'px';
        item.style.bottom = this.padding.bottom + 'px';
        this.padding.right += item.offsetWidth;
        break;
      case 'bottom':
        item.style.top = 'auto';
        item.style.bottom = this.padding.bottom + 'px';
        item.style.left = this.padding.left + 'px';
        item.style.right = this.padding.right + 'px';
        this.padding.bottom += item.offsetHeight;
        break;
      case 'left':
        item.style.right = 'auto';
        item.style.left = this.padding.left + 'px';
        item.style.top = this.padding.top + 'px';
        item.style.bottom = this.padding.bottom + 'px';
        this.padding.left += item.offsetWidth;
        break;
      case 'fill':
      default:
        item.style.left = this.padding.left + 'px';
        item.style.right = this.padding.right + 'px';
        item.style.top = this.padding.top + 'px';
        item.style.bottom = this.padding.bottom + 'px';
        this.padding.top += item.offsetHeight;
        this.padding.right += item.offsetWidth;
        this.padding.bottom += item.offsetHeight;
        this.padding.left += item.offsetWidth;
        break;
    }
  }

  //计算布局
  calc(reFind) {
    this.padding = {
      top: parseInt(this.box.style.paddingTop || 0),
      right: parseInt(this.box.style.paddingRight || 0),
      bottom: parseInt(this.box.style.paddingBottom || 0),
      left: parseInt(this.box.style.paddingLeft || 0)
    };
    this.width =
      this.box.offsetWidth - this.padding.left - this.padding.right;
    this.height =
      this.box.offsetHeight - this.padding.top - this.padding.bottom;
    if (reFind) this._findItems();
    this.items.forEach(item => {
      let dock = item.getAttribute('data-dock');
      if (dock) this._calcItem(item, dock);
    });
    if (reFind) this._bindEvents();
  }

};