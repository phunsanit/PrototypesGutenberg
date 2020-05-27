import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { AsyncModeProvider, useSelect } from '@wordpress/data';
import { useRef, forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import BlockListBlock from './block';
import BlockListAppender from '../block-list-appender';
import RootContainer from './root-container';
import useBlockDropZone from '../use-block-drop-zone';
/**
 * If the block count exceeds the threshold, we disable the reordering animation
 * to avoid laginess.
 */

var BLOCK_ANIMATION_THRESHOLD = 200;

function BlockList(_ref, ref) {
  var className = _ref.className,
      rootClientId = _ref.rootClientId,
      renderAppender = _ref.renderAppender,
      _ref$__experimentalTa = _ref.__experimentalTagName,
      __experimentalTagName = _ref$__experimentalTa === void 0 ? 'div' : _ref$__experimentalTa,
      __experimentalAppenderTagName = _ref.__experimentalAppenderTagName,
      _ref$__experimentalPa = _ref.__experimentalPassedProps,
      __experimentalPassedProps = _ref$__experimentalPa === void 0 ? {} : _ref$__experimentalPa;

  function selector(select) {
    var _select = select('core/block-editor'),
        getBlockOrder = _select.getBlockOrder,
        isMultiSelecting = _select.isMultiSelecting,
        getSelectedBlockClientId = _select.getSelectedBlockClientId,
        getMultiSelectedBlockClientIds = _select.getMultiSelectedBlockClientIds,
        hasMultiSelection = _select.hasMultiSelection,
        getGlobalBlockCount = _select.getGlobalBlockCount,
        isTyping = _select.isTyping;

    return {
      blockClientIds: getBlockOrder(rootClientId),
      isMultiSelecting: isMultiSelecting(),
      selectedBlockClientId: getSelectedBlockClientId(),
      multiSelectedBlockClientIds: getMultiSelectedBlockClientIds(),
      hasMultiSelection: hasMultiSelection(),
      enableAnimation: !isTyping() && getGlobalBlockCount() <= BLOCK_ANIMATION_THRESHOLD
    };
  }

  var _useSelect = useSelect(selector, [rootClientId]),
      blockClientIds = _useSelect.blockClientIds,
      isMultiSelecting = _useSelect.isMultiSelecting,
      selectedBlockClientId = _useSelect.selectedBlockClientId,
      multiSelectedBlockClientIds = _useSelect.multiSelectedBlockClientIds,
      hasMultiSelection = _useSelect.hasMultiSelection,
      enableAnimation = _useSelect.enableAnimation;

  var Container = rootClientId ? __experimentalTagName : RootContainer;
  var targetClientId = useBlockDropZone({
    element: ref,
    rootClientId: rootClientId
  });
  return createElement(Container, _extends({}, __experimentalPassedProps, {
    ref: ref,
    className: classnames('block-editor-block-list__layout', className, __experimentalPassedProps.className)
  }), blockClientIds.map(function (clientId, index) {
    var isBlockInSelection = hasMultiSelection ? multiSelectedBlockClientIds.includes(clientId) : selectedBlockClientId === clientId;
    return createElement(AsyncModeProvider, {
      key: clientId,
      value: !isBlockInSelection
    }, createElement(BlockListBlock, {
      rootClientId: rootClientId,
      clientId: clientId,
      isMultiSelecting: isMultiSelecting // This prop is explicitly computed and passed down
      // to avoid being impacted by the async mode
      // otherwise there might be a small delay to trigger the animation.
      ,
      index: index,
      enableAnimation: enableAnimation,
      className: clientId === targetClientId ? 'is-drop-target' : undefined
    }));
  }), createElement(BlockListAppender, {
    tagName: __experimentalAppenderTagName,
    rootClientId: rootClientId,
    renderAppender: renderAppender,
    className: targetClientId === null ? 'is-drop-target' : undefined
  }));
}

var ForwardedBlockList = forwardRef(BlockList); // This component needs to always be synchronous
// as it's the one changing the async mode
// depending on the block selection.

export default forwardRef(function (props, ref) {
  var fallbackRef = useRef();
  return createElement(AsyncModeProvider, {
    value: false
  }, createElement(ForwardedBlockList, _extends({
    ref: ref || fallbackRef
  }, props)));
});
//# sourceMappingURL=index.js.map