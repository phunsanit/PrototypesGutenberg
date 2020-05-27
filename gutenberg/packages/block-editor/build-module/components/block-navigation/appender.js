import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __experimentalTreeGridCell as TreeGridCell } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import BlockNavigationLeaf from './leaf';
import ButtonBlockAppender from '../button-block-appender';
import DescenderLines from './descender-lines';
export default function BlockNavigationAppender(_ref) {
  var parentBlockClientId = _ref.parentBlockClientId,
      position = _ref.position,
      level = _ref.level,
      rowCount = _ref.rowCount,
      terminatedLevels = _ref.terminatedLevels,
      path = _ref.path;
  var instanceId = useInstanceId(BlockNavigationAppender);
  var descriptionId = "block-navigation-appender-row__description_".concat(instanceId);
  var appenderPositionDescription = sprintf(
  /* translators: 1: The numerical position of the block that will be inserted. 2: The level of nesting for the block that will be inserted. */
  __('Add block at position %1$d, Level %2$d'), position, level);
  return createElement(BlockNavigationLeaf, {
    level: level,
    position: position,
    rowCount: rowCount,
    path: path
  }, createElement(TreeGridCell, {
    className: "block-editor-block-navigation-appender__cell",
    colSpan: "3"
  }, function (props) {
    return createElement("div", {
      className: "block-editor-block-navigation-appender__container"
    }, createElement(DescenderLines, {
      level: level,
      isLastRow: position === rowCount,
      terminatedLevels: terminatedLevels
    }), createElement(ButtonBlockAppender, _extends({
      rootClientId: parentBlockClientId,
      __experimentalSelectBlockOnInsert: false,
      "aria-describedby": descriptionId
    }, props)), createElement("div", {
      className: "block-editor-block-navigation-appender__description",
      id: descriptionId
    }, appenderPositionDescription));
  }));
}
//# sourceMappingURL=appender.js.map