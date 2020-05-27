import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockMover from '../block-mover';
import BlockParentSelector from '../block-parent-selector';
import BlockSwitcher from '../block-switcher';
import BlockControls from '../block-controls';
import BlockFormatControls from '../block-format-controls';
import BlockSettingsMenu from '../block-settings-menu';
import { useShowMoversGestures, useToggleBlockHighlight } from './utils';
export default function BlockToolbar(_ref) {
  var hideDragHandle = _ref.hideDragHandle;

  var _useSelect = useSelect(function (select) {
    var _select = select('core/block-editor'),
        getBlockMode = _select.getBlockMode,
        getSelectedBlockClientIds = _select.getSelectedBlockClientIds,
        isBlockValid = _select.isBlockValid,
        getBlockRootClientId = _select.getBlockRootClientId,
        getBlockListSettings = _select.getBlockListSettings,
        getSettings = _select.getSettings;

    var selectedBlockClientIds = getSelectedBlockClientIds();
    var selectedBlockClientId = selectedBlockClientIds[0];
    var blockRootClientId = getBlockRootClientId(selectedBlockClientId);

    var _ref2 = getBlockListSettings(blockRootClientId) || {},
        __experimentalMoverDirection = _ref2.__experimentalMoverDirection;

    return {
      blockClientIds: selectedBlockClientIds,
      blockClientId: selectedBlockClientId,
      hasFixedToolbar: getSettings().hasFixedToolbar,
      rootClientId: blockRootClientId,
      isValid: selectedBlockClientIds.length === 1 ? isBlockValid(selectedBlockClientIds[0]) : null,
      mode: selectedBlockClientIds.length === 1 ? getBlockMode(selectedBlockClientIds[0]) : null,
      moverDirection: __experimentalMoverDirection
    };
  }, []),
      blockClientIds = _useSelect.blockClientIds,
      blockClientId = _useSelect.blockClientId,
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      isValid = _useSelect.isValid,
      mode = _useSelect.mode,
      moverDirection = _useSelect.moverDirection;

  var toggleBlockHighlight = useToggleBlockHighlight(blockClientId);
  var nodeRef = useRef();

  var _useShowMoversGesture = useShowMoversGestures({
    ref: nodeRef,
    onChange: toggleBlockHighlight
  }),
      showMovers = _useShowMoversGesture.showMovers,
      showMoversGestures = _useShowMoversGesture.gestures;

  var displayHeaderToolbar = useViewportMatch('medium', '<') || hasFixedToolbar;
  var shouldShowMovers = displayHeaderToolbar || showMovers;

  if (blockClientIds.length === 0) {
    return null;
  }

  var shouldShowVisualToolbar = isValid && mode === 'visual';
  var isMultiToolbar = blockClientIds.length > 1;
  var animatedMoverStyles = {
    opacity: shouldShowMovers ? 1 : 0,
    transform: shouldShowMovers ? 'translateX(0px)' : 'translateX(100%)'
  };
  var classes = classnames('block-editor-block-toolbar', shouldShowMovers && 'is-showing-movers', !displayHeaderToolbar && 'has-responsive-movers');
  return createElement("div", {
    className: classes
  }, createElement("div", {
    className: "block-editor-block-toolbar__mover-switcher-container",
    ref: nodeRef
  }, !isMultiToolbar && createElement("div", {
    className: "block-editor-block-toolbar__block-parent-selector-wrapper"
  }, createElement(BlockParentSelector, {
    clientIds: blockClientIds
  })), createElement("div", _extends({
    className: "block-editor-block-toolbar__mover-trigger-container"
  }, showMoversGestures), createElement("div", {
    className: "block-editor-block-toolbar__mover-trigger-wrapper",
    style: animatedMoverStyles
  }, createElement(BlockMover, {
    clientIds: blockClientIds,
    __experimentalOrientation: moverDirection,
    hideDragHandle: hideDragHandle
  }))), (shouldShowVisualToolbar || isMultiToolbar) && createElement("div", _extends({}, showMoversGestures, {
    className: "block-editor-block-toolbar__block-switcher-wrapper"
  }), createElement(BlockSwitcher, {
    clientIds: blockClientIds
  }))), shouldShowVisualToolbar && !isMultiToolbar && createElement(Fragment, null, createElement(BlockControls.Slot, {
    bubblesVirtually: true,
    className: "block-editor-block-toolbar__slot"
  }), createElement(BlockFormatControls.Slot, {
    bubblesVirtually: true,
    className: "block-editor-block-toolbar__slot"
  })), createElement(BlockSettingsMenu, {
    clientIds: blockClientIds
  }));
}
//# sourceMappingURL=index.js.map