"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = exports.metadata = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _edit = _interopRequireDefault(require("./edit"));

var _save = _interopRequireDefault(require("./save"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Internal dependencies
 */
var metadata = {
  name: "core/navigation-link",
  category: "layout",
  parent: ["core/navigation"],
  attributes: {
    label: {
      type: "string"
    },
    nofollow: {
      type: "boolean",
      "default": false
    },
    type: {
      type: "string"
    },
    description: {
      type: "string"
    },
    id: {
      type: "number"
    },
    opensInNewTab: {
      type: "boolean",
      "default": false
    },
    url: {
      type: "string"
    }
  },
  supports: {
    reusable: false,
    html: false,
    lightBlockWrapper: true
  }
};
exports.metadata = metadata;
var name = metadata.name;
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Navigation Link'),
  icon: _icons.mapMarker,
  description: (0, _i18n.__)('Add a page, link, or another item to your navigation.'),
  __experimentalLabel: function __experimentalLabel(_ref) {
    var label = _ref.label;
    return label;
  },
  merge: function merge(leftAttributes, _ref2) {
    var _ref2$label = _ref2.label,
        rightLabel = _ref2$label === void 0 ? '' : _ref2$label;
    return _objectSpread({}, leftAttributes, {
      label: leftAttributes.label + rightLabel
    });
  },
  edit: _edit.default,
  save: _save.default
};
exports.settings = settings;
//# sourceMappingURL=index.js.map