import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map, compact } from 'lodash';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */

import BlockNavigationBlock from './block';
import BlockNavigationAppender from './appender';
export default function BlockNavigationBranch(props) {
  var blocks = props.blocks,
      selectBlock = props.selectBlock,
      selectedBlockClientId = props.selectedBlockClientId,
      showAppender = props.showAppender,
      showBlockMovers = props.showBlockMovers,
      showNestedBlocks = props.showNestedBlocks,
      parentBlockClientId = props.parentBlockClientId,
      _props$level = props.level,
      level = _props$level === void 0 ? 1 : _props$level,
      _props$terminatedLeve = props.terminatedLevels,
      terminatedLevels = _props$terminatedLeve === void 0 ? [] : _props$terminatedLeve,
      _props$path = props.path,
      path = _props$path === void 0 ? [] : _props$path;
  var isTreeRoot = !parentBlockClientId;
  var filteredBlocks = compact(blocks); // Add +1 to the rowCount to take the block appender into account.

  var rowCount = showAppender ? filteredBlocks.length + 1 : filteredBlocks.length;
  var hasAppender = showAppender && filteredBlocks.length > 0 && !isTreeRoot;
  var appenderPosition = rowCount;
  return createElement(Fragment, null, map(filteredBlocks, function (block, index) {
    var clientId = block.clientId,
        innerBlocks = block.innerBlocks;
    var hasNestedBlocks = showNestedBlocks && !!innerBlocks && !!innerBlocks.length;
    var position = index + 1;
    var isLastRowAtLevel = rowCount === position;
    var updatedTerminatedLevels = isLastRowAtLevel ? [].concat(_toConsumableArray(terminatedLevels), [level]) : terminatedLevels;
    var updatedPath = [].concat(_toConsumableArray(path), [position]);
    return createElement(Fragment, {
      key: clientId
    }, createElement(BlockNavigationBlock, {
      block: block,
      onClick: function onClick() {
        return selectBlock(clientId);
      },
      isSelected: selectedBlockClientId === clientId,
      level: level,
      position: position,
      rowCount: rowCount,
      showBlockMovers: showBlockMovers,
      terminatedLevels: terminatedLevels,
      path: updatedPath
    }), hasNestedBlocks && createElement(BlockNavigationBranch, {
      blocks: innerBlocks,
      selectedBlockClientId: selectedBlockClientId,
      selectBlock: selectBlock,
      showAppender: showAppender,
      showBlockMovers: showBlockMovers,
      showNestedBlocks: showNestedBlocks,
      parentBlockClientId: clientId,
      level: level + 1,
      terminatedLevels: updatedTerminatedLevels,
      path: updatedPath
    }));
  }), hasAppender && createElement(BlockNavigationAppender, {
    parentBlockClientId: parentBlockClientId,
    position: rowCount,
    rowCount: appenderPosition,
    level: level,
    terminatedLevels: terminatedLevels,
    path: [].concat(_toConsumableArray(path), [appenderPosition])
  }));
}
BlockNavigationBranch.defaultProps = {
  selectBlock: function selectBlock() {}
};
//# sourceMappingURL=branch.js.map