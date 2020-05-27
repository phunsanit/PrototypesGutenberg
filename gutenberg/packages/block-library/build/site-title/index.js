"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = exports.metadata = void 0;

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var metadata = {
  name: "core/site-title",
  category: "layout",
  attributes: {
    level: {
      type: "number",
      "default": 1
    }
  },
  supports: {
    html: false,
    lightBlockWrapper: true
  }
};
exports.metadata = metadata;
var name = metadata.name;
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Site Title'),
  icon: _icons.mapMarker,
  edit: _edit.default
};
exports.settings = settings;
//# sourceMappingURL=index.js.map