"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.others = exports.common = exports.settings = exports.name = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _coreEmbeds = require("./core-embeds");

var _icons = require("./icons");

var _settings = require("./settings");

var _transforms = _interopRequireDefault(require("./transforms"));

var _i18n = require("@wordpress/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var name = 'core/embed';
exports.name = name;
var settings = (0, _settings.getEmbedBlockSettings)({
  title: (0, _i18n._x)('Embed', 'block title'),
  description: (0, _i18n.__)('Embed videos, images, tweets, audio, and other content from external sources.'),
  icon: _icons.embedContentIcon,
  // Unknown embeds should not be responsive by default.
  responsive: false,
  transforms: _transforms.default
});
exports.settings = settings;

var common = _coreEmbeds.common.map(function (embedDefinition) {
  var embedSettings = (0, _settings.getEmbedBlockSettings)(embedDefinition.settings);
  return _objectSpread({}, embedDefinition, {
    settings: _objectSpread({}, embedSettings, {
      transforms: _transforms.default
    })
  });
});

exports.common = common;

var others = _coreEmbeds.others.map(function (embedDefinition) {
  var embedSettings = (0, _settings.getEmbedBlockSettings)(embedDefinition.settings);
  return _objectSpread({}, embedDefinition, {
    settings: _objectSpread({}, embedSettings, {
      transforms: _transforms.default
    })
  });
});

exports.others = others;
//# sourceMappingURL=index.js.map