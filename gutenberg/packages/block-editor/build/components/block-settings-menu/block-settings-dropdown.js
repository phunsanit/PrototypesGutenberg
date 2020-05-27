"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockSettingsDropdown = BlockSettingsDropdown;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _blocks = require("@wordpress/blocks");

var _blockActions = _interopRequireDefault(require("../block-actions"));

var _blockModeToggle = _interopRequireDefault(require("./block-mode-toggle"));

var _blockHtmlConvertButton = _interopRequireDefault(require("./block-html-convert-button"));

var _blockUnknownConvertButton = _interopRequireDefault(require("./block-unknown-convert-button"));

var _blockSettingsMenuFirstItem = _interopRequireDefault(require("./block-settings-menu-first-item"));

var _blockSettingsMenuControls = _interopRequireDefault(require("../block-settings-menu-controls"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var POPOVER_PROPS = {
  className: 'block-editor-block-settings-menu__popover',
  position: 'bottom right',
  isAlternate: true
};

function BlockSettingsDropdown(_ref) {
  var clientIds = _ref.clientIds,
      props = (0, _objectWithoutProperties2.default)(_ref, ["clientIds"]);
  var blockClientIds = (0, _lodash.castArray)(clientIds);
  var count = blockClientIds.length;
  var firstBlockClientId = blockClientIds[0];
  var shortcuts = (0, _data.useSelect)(function (select) {
    var _select = select('core/keyboard-shortcuts'),
        getShortcutRepresentation = _select.getShortcutRepresentation;

    return {
      duplicate: getShortcutRepresentation('core/block-editor/duplicate'),
      remove: getShortcutRepresentation('core/block-editor/remove'),
      insertAfter: getShortcutRepresentation('core/block-editor/insert-after'),
      insertBefore: getShortcutRepresentation('core/block-editor/insert-before')
    };
  }, []);

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hasCopied = _useState2[0],
      setHasCopied = _useState2[1];

  return (0, _element.createElement)(_blockActions.default, {
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
    return (0, _element.createElement)(_components.DropdownMenu, (0, _extends2.default)({
      icon: _icons.moreHorizontal,
      label: (0, _i18n.__)('More options'),
      className: "block-editor-block-settings-menu",
      popoverProps: POPOVER_PROPS,
      noIcons: true
    }, props), function (_ref3) {
      var onClose = _ref3.onClose;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuGroup, null, (0, _element.createElement)(_blockSettingsMenuFirstItem.default.Slot, {
        fillProps: {
          onClose: onClose
        }
      }), count === 1 && (0, _element.createElement)(_blockUnknownConvertButton.default, {
        clientId: firstBlockClientId
      }), count === 1 && (0, _element.createElement)(_blockHtmlConvertButton.default, {
        clientId: firstBlockClientId
      }), (0, _element.createElement)(_components.ClipboardButton, {
        text: function text() {
          return (0, _blocks.serialize)(blocks);
        },
        role: "menuitem",
        className: "components-menu-item__button",
        onCopy: function onCopy() {
          setHasCopied(true);
        },
        onFinishCopy: function onFinishCopy() {
          return setHasCopied(false);
        }
      }, hasCopied ? (0, _i18n.__)('Copied!') : (0, _i18n.__)('Copy')), canDuplicate && (0, _element.createElement)(_components.MenuItem, {
        onClick: (0, _lodash.flow)(onClose, onDuplicate),
        shortcut: shortcuts.duplicate
      }, (0, _i18n.__)('Duplicate')), canInsertDefaultBlock && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuItem, {
        onClick: (0, _lodash.flow)(onClose, onInsertBefore),
        shortcut: shortcuts.insertBefore
      }, (0, _i18n.__)('Insert Before')), (0, _element.createElement)(_components.MenuItem, {
        onClick: (0, _lodash.flow)(onClose, onInsertAfter),
        shortcut: shortcuts.insertAfter
      }, (0, _i18n.__)('Insert After'))), count === 1 && (0, _element.createElement)(_blockModeToggle.default, {
        clientId: firstBlockClientId,
        onToggle: onClose
      })), (0, _element.createElement)(_blockSettingsMenuControls.default.Slot, {
        fillProps: {
          onClose: onClose
        },
        clientIds: clientIds
      }), (0, _element.createElement)(_components.MenuGroup, null, !isLocked && (0, _element.createElement)(_components.MenuItem, {
        onClick: (0, _lodash.flow)(onClose, onRemove),
        shortcut: shortcuts.remove
      }, (0, _i18n._n)('Remove Block', 'Remove Blocks', count))));
    });
  });
}

var _default = BlockSettingsDropdown;
exports.default = _default;
//# sourceMappingURL=block-settings-dropdown.js.map