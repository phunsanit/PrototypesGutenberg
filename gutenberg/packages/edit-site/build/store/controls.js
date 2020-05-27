"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
var controls = {
  SELECT: (0, _data.createRegistryControl)(function (registry) {
    return function (_ref) {
      var _registry$select;

      var storeName = _ref.storeName,
          selectorName = _ref.selectorName,
          args = _ref.args;
      return (_registry$select = registry.select(storeName))[selectorName].apply(_registry$select, (0, _toConsumableArray2.default)(args));
    };
  })
};
var _default = controls;
exports.default = _default;
//# sourceMappingURL=controls.js.map