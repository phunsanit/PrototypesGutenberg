import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { ColorControl, BottomSheetConsumer, PanelBody } from '@wordpress/components';
export default function PanelColorGradientSettings(_ref) {
  var settings = _ref.settings,
      title = _ref.title;
  return createElement(PanelBody, {
    title: title
  }, createElement(BottomSheetConsumer, null, function (_ref2) {
    var onReplaceSubsheet = _ref2.onReplaceSubsheet;
    return settings.map(function (_ref3) {
      var onColorChange = _ref3.onColorChange,
          colorValue = _ref3.colorValue,
          onGradientChange = _ref3.onGradientChange,
          gradientValue = _ref3.gradientValue,
          label = _ref3.label;
      return createElement(ColorControl, {
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