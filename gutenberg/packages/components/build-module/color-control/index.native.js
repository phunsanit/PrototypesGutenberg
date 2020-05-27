import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import ColorCell from '../mobile/bottom-sheet/color-cell';

function ColorControl(_ref) {
  var label = _ref.label,
      help = _ref.help,
      instanceId = _ref.instanceId,
      className = _ref.className,
      onPress = _ref.onPress,
      color = _ref.color,
      props = _objectWithoutProperties(_ref, ["label", "help", "instanceId", "className", "onPress", "color"]);

  var id = "inspector-color-control-".concat(instanceId);
  return createElement(ColorCell, _extends({
    label: label,
    id: id,
    help: help,
    className: className,
    "aria-describedby": !!help ? id + '__help' : undefined,
    onPress: onPress,
    color: color
  }, props));
}

export default ColorControl;
//# sourceMappingURL=index.native.js.map