"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _layout = _interopRequireDefault(require("../layout"));

/**
 * Internal dependencies
 */
function EditWidgetsInitializer(_ref) {
  var settings = _ref.settings;
  return (0, _element.createElement)(_layout.default, {
    blockEditorSettings: settings
  });
}

var _default = EditWidgetsInitializer;
exports.default = _default;
//# sourceMappingURL=index.js.map