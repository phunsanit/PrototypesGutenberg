"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveComplementaryArea = getActiveComplementaryArea;
exports.isItemPinned = isItemPinned;

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Returns the item that is enabled in a given scope.
 *
 * @param {Object} state    Global application state.
 * @param {string} itemType Type of item.
 * @param {string} scope    Item scope.
 *
 * @return {string} The item that is enabled in the passed scope and type.
 */
function getSingleEnableItem(state, itemType, scope) {
  return (0, _lodash.get)(state.enableItems.singleEnableItems, [itemType, scope], null);
}
/**
 * Returns the complementary area that is active in a given scope.
 *
 * @param {Object} state    Global application state.
 * @param {string} scope    Item scope.
 *
 * @return {string} The complementary area that is active in the given scope.
 */


function getActiveComplementaryArea(state, scope) {
  return getSingleEnableItem(state, 'complementaryArea', scope);
}
/**
 * Returns a boolean indicating if an item is enabled or not in a given scope.
 *
 * @param {Object} state    Global application state.
 * @param {string} itemType Type of item.
 * @param {string} scope    Scope.
 * @param {string} item     Item to check.
 *
 * @return {boolean|undefined} True if the item is enabled, false otherwise if the item is explicitly disabled, and undefined if there is no information for that item.
 */


function isMultipleEnabledItemEnabled(state, itemType, scope, item) {
  return (0, _lodash.get)(state.enableItems.multipleEnableItems, [itemType, scope, item]);
}
/**
 * Returns a boolean indicating if an item is pinned or not.
 *
 * @param {Object} state    Global application state.
 * @param {string} scope    Scope.
 * @param {string} item     Item to check.
 *
 * @return {boolean} True if the item is pinned and false otherwise.
 */


function isItemPinned(state, scope, item) {
  return isMultipleEnabledItemEnabled(state, 'pinnedItems', scope, item) !== false;
}
//# sourceMappingURL=selectors.js.map