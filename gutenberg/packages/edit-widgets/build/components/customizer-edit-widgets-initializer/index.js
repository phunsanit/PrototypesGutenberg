"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _interface = require("@wordpress/interface");

require("./sync-customizer");

var _header = _interopRequireDefault(require("../header"));

var _sidebar = _interopRequireDefault(require("../sidebar"));

var _widgetAreasBlockEditorProvider = _interopRequireDefault(require("../widget-areas-block-editor-provider"));

var _widgetAreasBlockEditorContent = _interopRequireDefault(require("../widget-areas-block-editor-content"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function CustomizerEditWidgetsInitializer(_ref) {
  var settings = _ref.settings;
  (0, _blockEditor.useSimulatedMediaQuery)('resizable-editor-section', 360);
  var blockEditorSettings = (0, _element.useMemo)(function () {
    return _objectSpread({}, settings, {
      hasFixedToolbar: true
    });
  }, [settings]);
  return (0, _element.createElement)(_widgetAreasBlockEditorProvider.default, {
    blockEditorSettings: blockEditorSettings
  }, (0, _element.createElement)("div", {
    className: "edit-widgets-customizer-edit-widgets-initializer__content",
    role: "region",
    "aria-label": (0, _i18n.__)('Widgets screen content'),
    tabIndex: "-1"
  }, (0, _element.createElement)(_header.default, {
    isCustomizer: true
  }), (0, _element.createElement)(_widgetAreasBlockEditorContent.default, null), (0, _element.createElement)(_interface.ComplementaryArea.Slot, {
    scope: "core/edit-widgets"
  }), (0, _element.createElement)(_sidebar.default, null)));
}

var _default = (0, _components.navigateRegions)(CustomizerEditWidgetsInitializer);

exports.default = _default;
//# sourceMappingURL=index.js.map