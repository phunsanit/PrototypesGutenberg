"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragHandle = exports.rightArrow = exports.leftArrow = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
var leftArrow = (0, _element.createElement)(_components.SVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0, _element.createElement)(_components.Polygon, {
  points: "14.5,8 10.6,12 14.5,16 13.5,17 8.4,12 13.5,7 "
}));
exports.leftArrow = leftArrow;
var rightArrow = (0, _element.createElement)(_components.SVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0, _element.createElement)(_components.Polygon, {
  points: "9.5,16 13.4,12 9.5,8 10.5,7 15.6,12 10.5,17 "
}));
exports.rightArrow = rightArrow;
var dragHandle = (0, _element.createElement)(_components.SVG, {
  width: "18",
  height: "18",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 18 18"
}, (0, _element.createElement)(_components.Path, {
  d: "M13,8c0.6,0,1-0.4,1-1s-0.4-1-1-1s-1,0.4-1,1S12.4,8,13,8z M5,6C4.4,6,4,6.4,4,7s0.4,1,1,1s1-0.4,1-1S5.6,6,5,6z M5,10 c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S5.6,10,5,10z M13,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S13.6,10,13,10z M9,6 C8.4,6,8,6.4,8,7s0.4,1,1,1s1-0.4,1-1S9.6,6,9,6z M9,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S9.6,10,9,10z"
}));
exports.dragHandle = dragHandle;
//# sourceMappingURL=icons.js.map