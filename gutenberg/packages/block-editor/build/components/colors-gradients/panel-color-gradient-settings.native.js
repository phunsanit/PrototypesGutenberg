"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PanelColorGradientSettings;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
function PanelColorGradientSettings(_ref) {
  var settings = _ref.settings,
      title = _ref.title;
  return (0, _element.createElement)(_components.PanelBody, {
    title: title
  }, (0, _element.createElement)(_components.BottomSheetConsumer, null, function (_ref2) {
    var onReplaceSubsheet = _ref2.onReplaceSubsheet;
    return settings.map(function (_ref3) {
      var onColorChange = _ref3.onColorChange,
          colorValue = _ref3.colorValue,
          onGradientChange = _ref3.onGradientChange,
          gradientValue = _ref3.gradientValue,
          label = _ref3.label;
      return (0, _element.createElement)(_components.ColorControl, {
        onPress: function onPress() {
          onReplaceSubsheet('Color', {
            onColorChange: onColorChange,
            colorValue: gradientValue || colorValue,
            gradientValue: gradientValue,
            onGradientChange: onGradientChange,
            label: label
          });
        },
        key: "color-setting-".concat(label),
        label: label,
        color: gradientValue || colorValue
      });
    });
  }));
}
//# sourceMappingURL=panel-color-gradient-settings.native.js.map