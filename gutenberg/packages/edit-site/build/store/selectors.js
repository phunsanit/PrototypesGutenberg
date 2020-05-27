"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFeatureActive = isFeatureActive;
exports.__experimentalGetPreviewDeviceType = __experimentalGetPreviewDeviceType;

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Returns whether the given feature is enabled or not.
 *
 * @param {Object} state   Global application state.
 * @param {string} feature Feature slug.
 *
 * @return {boolean} Is active.
 */
function isFeatureActive(state, feature) {
  return (0, _lodash.get)(state.preferences.features, [feature], false);
}
/**
 * Returns the current editing canvas device type.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Device type.
 */


function __experimentalGetPreviewDeviceType(state) {
  return state.deviceType;
}
//# sourceMappingURL=selectors.js.map