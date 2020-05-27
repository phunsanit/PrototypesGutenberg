import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { castArray, flow } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _n } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup, MenuItem, ClipboardButton } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { moreHorizontal } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { serialize } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import BlockActions from '../block-actions';
import BlockModeToggle from './block-mode-toggle';
import BlockHTMLConvertButton from './block-html-convert-button';
import BlockUnknownConvertButton from './block-unknown-convert-button';
import __experimentalBlockSettingsMenuFirstItem from './block-settings-menu-first-item';
import BlockSettingsMenuControls from '../block-settings-menu-controls';
var POPOVER_PROPS = {
  className: 'block-editor-block-settings-menu__popover',
  position: 'bottom right',
  isAlternate: true
};
export function BlockSettingsDropdown(_ref) {
  var clientIds = _ref.clientIds,
      props = _objectWithoutProperties(_ref, ["clientIds"]);

  var blockClientIds = castArray(clientIds);
  var count = blockClientIds.length;
  var firstBlockClientId = blockClientIds[0];
  var shortcuts = useSelect(function (select) {
    var _select = select('core/keyboard-shortcuts'),
        getShortcutRepresentation = _select.getShortcutRepresentation;

    return {
      duplicate: getShortcutRepresentation('core/block-editor/duplicate'),
      remove: getShortcutRepresentation('core/block-editor/remove'),
      insertAfter: getShortcutRepresentation('core/block-editor/insert-after'),
      insertBefore: getShortcutRepresentation('core/block-editor/insert-before')
    };
  }, []);

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      hasCopied = _useState2[0],
      setHasCopied = _useState2[1];

  return createElement(BlockActions, {
    clientIds: clientIds
  }, function (_ref2) {
    var canDuplicate = _ref2.canDuplicate,
        canInsertDefaultBlock = _ref2.canInsertDefaultBlock,
        isLocked = _ref2.isLocked,
        onDuplicate = _ref2.onDuplicate,
        onInsertAfter = _ref2.onInsertAfter,
        onInsertBefore = _ref2.onInsertBefore,
        onRemove = _ref2.onRemove,
        blocks = _ref2.blocks;
    return createElement(DropdownMenu, _extends({
      icon: moreHorizontal,
      label: __('More options'),
      className: "block-editor-block-settings-menu",
      popoverProps: POPOVER_PROPS,
      noIcons: true
    }, props), function (_ref3) {
      var onClose = _ref3.onClose;
      return createElement(Fragment, null, createElement(MenuGroup, null, createElement(__experimentalBlockSettingsMenuFirstItem.Slot, {
        fillProps: {
          onClose: onClose
        }
      }), count === 1 && createElement(BlockUnknownConvertButton, {
        clientId: firstBlockClientId
      }), count === 1 && createElement(BlockHTMLConvertButton, {
        clientId: firstBlockClientId
      }), createElement(ClipboardButton, {
        text: function text() {
          return serialize(blocks);
        },
        role: "menuitem",
        className: "components-menu-item__button",
        onCopy: function onCopy() {
          setHasCopied(true);
        },
        onFinishCopy: function onFinishCopy() {
          return setHasCopied(false);
        }
      }, hasCopied ? __('Copied!') : __('Copy')), canDuplicate && createElement(MenuItem, {
        onClick: flow(onClose, onDuplicate),
        shortcut: shortcuts.duplicate
      }, __('Duplicate')), canInsertDefaultBlock && createElement(Fragment, null, createElement(MenuItem, {
        onClick: flow(onClose, onInsertBefore),
        shortcut: shortcuts.insertBefore
      }, __('Insert Before')), createElement(MenuItem, {
        onClick: flow(onClose, onInsertAfter),
        shortcut: shortcuts.insertAfter
      }, __('Insert After'))), count === 1 && createElement(BlockModeToggle, {
        clientId: firstBlockClientId,
        onToggle: onClose
      })), createElement(BlockSettingsMenuControls.Slot, {
        fillProps: {
          onClose: onClose
        },
        clientIds: clientIds
      }), createElement(MenuGroup, null, !isLocked && createElement(MenuItem, {
        onClick: flow(onClose, onRemove),
        shortcut: shortcuts.remove
      }, _n('Remove Block', 'Remove Blocks', count))));
    });
  });
}
export default BlockSettingsDropdown;
//# sourceMappingURL=block-settings-dropdown.js.map