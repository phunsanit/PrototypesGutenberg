import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import RovingTabIndexItem from './roving-tab-index-item';
export default function TreeGridCell(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return createElement("td", _extends({}, props, {
    role: "gridcell"
  }), createElement(RovingTabIndexItem, null, children));
}
//# sourceMappingURL=cell.js.map