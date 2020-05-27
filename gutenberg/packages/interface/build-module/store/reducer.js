import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { flow, get, isEmpty, omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { combineReducers } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { DEFAULTS } from './defaults';
/**
 * Higher-order reducer creator which provides the given initial state for the
 * original reducer.
 *
 * @param {*} initialState Initial state to provide to reducer.
 *
 * @return {Function} Higher-order reducer.
 */

var createWithInitialState = function createWithInitialState(initialState) {
  return function (reducer) {
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
      return reducer(state, action);
    };
  };
};
/**
 * Reducer to keep tract of the active area per scope.
 *
 * @param {boolean}  state   Previous state.
 * @param {Object}   action  Action Object.
 *
 * @return {Object} Updated state.
 */


export function singleEnableItems() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      itemType = _ref.itemType,
      scope = _ref.scope,
      item = _ref.item;

  if (type !== 'SET_SINGLE_ENABLE_ITEM' || !itemType || !scope) {
    return state;
  }

  if (!item && !get(DEFAULTS.enableItems.singleEnableItems, [itemType, scope])) {
    var newTypeState = omit(state[itemType], [scope]);
    return isEmpty(newTypeState) ? omit(state, [itemType]) : _objectSpread({}, state, _defineProperty({}, itemType, newTypeState));
  }

  return _objectSpread({}, state, _defineProperty({}, itemType, _objectSpread({}, state[itemType], _defineProperty({}, scope, item || null))));
}
/**
 * Reducer keeping track of the "pinned" items per scope
 *
 * @param {boolean}  state   Previous state.
 * @param {Object}   action  Action Object.
 *
 * @return {Object} Updated state.
 */

export function multipleEnableItems() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref2.type,
      itemType = _ref2.itemType,
      scope = _ref2.scope,
      item = _ref2.item,
      isEnable = _ref2.isEnable;

  if (type !== 'SET_MULTIPLE_ENABLE_ITEM' || !itemType || !scope || !item || get(state, [itemType, scope, item]) === isEnable) {
    return state;
  }

  var currentTypeState = state[itemType] || {};
  var currentScopeState = currentTypeState[scope] || {};
  return _objectSpread({}, state, _defineProperty({}, itemType, _objectSpread({}, currentTypeState, _defineProperty({}, scope, _objectSpread({}, currentScopeState, _defineProperty({}, item, isEnable || false))))));
}
var enableItems = combineReducers({
  singleEnableItems: singleEnableItems,
  multipleEnableItems: multipleEnableItems
});
export default flow([combineReducers, createWithInitialState(DEFAULTS)])({
  enableItems: enableItems
});
//# sourceMappingURL=reducer.js.map