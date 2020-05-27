import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { useBlockNavigationContext } from './context';
import BlockNavigationBlockSlot from './block-slot';
import BlockNavigationBlockSelectButton from './block-select-button';
var BlockNavigationBlockContents = forwardRef(function (_ref, ref) {
  var onClick = _ref.onClick,
      block = _ref.block,
      isSelected = _ref.isSelected,
      position = _ref.position,
      siblingCount = _ref.siblingCount,
      level = _ref.level,
      props = _objectWithoutProperties(_ref, ["onClick", "block", "isSelected", "position", "siblingCount", "level"]);

  var _useBlockNavigationCo = useBlockNavigationContext(),
      withBlockNavigationSlots = _useBlockNavigationCo.__experimentalWithBlockNavigationSlots;

  return withBlockNavigationSlots ? createElement(BlockNavigationBlockSlot, _extends({
    ref: ref,
    className: "block-editor-block-navigation-block-contents",
    block: block,
    onClick: onClick,
    isSelected: isSelected,
    position: position,
    siblingCount: siblingCount,
    level: level
  }, props)) : createElement(BlockNavigationBlockSelectButton, _extends({
    ref: ref,
    className: "block-editor-block-navigation-block-contents",
    block: block,
    onClick: onClick,
    isSelected: isSelected,
    position: position,
    siblingCount: siblingCount,
    level: level
  }, props));
});
export default BlockNavigationBlockContents;
//# sourceMappingURL=block-contents.js.map