"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = getValue;
exports.add = add;
exports.subtract = subtract;
exports.roundClamp = roundClamp;
exports.roundClampString = roundClampString;

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Parses and retrieves a number value.
 *
 * @param {any} value The incoming value.
 * @return {number} The parsed number value.
 */
function getNumberValue(value) {
  var number = Number(value);
  return isNaN(number) ? 0 : number;
}
/**
 * Parses a value to safely store value state.
 *
 * @param {any} value The incoming value.
 * @return {number} The parsed number value.
 */


function getValue(value) {
  var parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? value : parsedValue;
}
/**
 * Safely adds 2 values.
 *
 * @param {any} a First value.
 * @param {any} b Second value.
 * @return {number} The sum of the 2 values.
 */


function add(a, b) {
  return getNumberValue(a) + getNumberValue(b);
}
/**
 * Safely subtracts 2 values.
 *
 * @param {any} a First value.
 * @param {any} b Second value.
 * @return {number} The difference of the 2 values.
 */


function subtract(a, b) {
  return getNumberValue(a) - getNumberValue(b);
}
/**
 * Clamps a value based on a min/max range with rounding
 *
 * @param {number} value The value.
 * @param {number} min The minimum range.
 * @param {number} max The maximum range.
 * @param {number} step A multiplier for the value.
 * @return {number} The rounded and clamped value.
 */


function roundClamp() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var baseValue = getNumberValue(value);
  var stepValue = getNumberValue(step);
  var rounded = Math.round(baseValue / stepValue) * stepValue;
  var clampedValue = (0, _lodash.clamp)(rounded, min, max);
  return clampedValue;
}
/**
 * Clamps a value based on a min/max range with rounding.
 * Returns a string.
 *
 * @param {any} args Arguments for roundClamp().
 * @property {number} value The value.
 * @property {number} min The minimum range.
 * @property {number} max The maximum range.
 * @property {number} step A multiplier for the value.
 * @return {string} The rounded and clamped value.
 */


function roundClampString() {
  return roundClamp.apply(void 0, arguments).toString();
}
//# sourceMappingURL=utils.js.map