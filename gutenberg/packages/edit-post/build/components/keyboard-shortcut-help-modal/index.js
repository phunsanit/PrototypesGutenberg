"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardShortcutHelpModal = KeyboardShortcutHelpModal;
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _config = require("./config");

var _shortcut = _interopRequireDefault(require("./shortcut"));

var _dynamicShortcut = _interopRequireDefault(require("./dynamic-shortcut"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MODAL_NAME = 'edit-post/keyboard-shortcut-help';

var ShortcutList = function ShortcutList(_ref) {
  var shortcuts = _ref.shortcuts;
  return (
    /*
     * Disable reason: The `list` ARIA role is redundant but
     * Safari+VoiceOver won't announce the list otherwise.
     */

    /* eslint-disable jsx-a11y/no-redundant-roles */
    (0, _element.createElement)("ul", {
      className: "edit-post-keyboard-shortcut-help-modal__shortcut-list",
      role: "list"
    }, shortcuts.map(function (shortcut, index) {
      return (0, _element.createElement)("li", {
        className: "edit-post-keyboard-shortcut-help-modal__shortcut",
        key: index
      }, (0, _lodash.isString)(shortcut) ? (0, _element.createElement)(_dynamicShortcut.default, {
        name: shortcut
      }) : (0, _element.createElement)(_shortcut.default, shortcut));
    }))
    /* eslint-enable jsx-a11y/no-redundant-roles */

  );
};

var ShortcutSection = function ShortcutSection(_ref2) {
  var title = _ref2.title,
      shortcuts = _ref2.shortcuts,
      className = _ref2.className;
  return (0, _element.createElement)("section", {
    className: (0, _classnames.default)('edit-post-keyboard-shortcut-help-modal__section', className)
  }, !!title && (0, _element.createElement)("h2", {
    className: "edit-post-keyboard-shortcut-help-modal__section-title"
  }, title), (0, _element.createElement)(ShortcutList, {
    shortcuts: shortcuts
  }));
};

var ShortcutCategorySection = function ShortcutCategorySection(_ref3) {
  var title = _ref3.title,
      categoryName = _ref3.categoryName,
      _ref3$additionalShort = _ref3.additionalShortcuts,
      additionalShortcuts = _ref3$additionalShort === void 0 ? [] : _ref3$additionalShort;
  var categoryShortcuts = (0, _data.useSelect)(function (select) {
    return select('core/keyboard-shortcuts').getCategoryShortcuts(categoryName);
  }, [categoryName]);
  return (0, _element.createElement)(ShortcutSection, {
    title: title,
    shortcuts: categoryShortcuts.concat(additionalShortcuts)
  });
};

function KeyboardShortcutHelpModal(_ref4) {
  var isModalActive = _ref4.isModalActive,
      toggleModal = _ref4.toggleModal;
  (0, _keyboardShortcuts.useShortcut)('core/edit-post/keyboard-shortcuts', toggleModal, {
    bindGlobal: true
  });

  if (!isModalActive) {
    return null;
  }

  return (0, _element.createElement)(_components.Modal, {
    className: "edit-post-keyboard-shortcut-help-modal",
    title: (0, _i18n.__)('Keyboard shortcuts'),
    closeLabel: (0, _i18n.__)('Close'),
    onRequestClose: toggleModal
  }, (0, _element.createElement)(ShortcutSection, {
    className: "edit-post-keyboard-shortcut-help-modal__main-shortcuts",
    shortcuts: ['core/edit-post/keyboard-shortcuts']
  }), (0, _element.createElement)(ShortcutCategorySection, {
    title: (0, _i18n.__)('Global shortcuts'),
    categoryName: "global"
  }), (0, _element.createElement)(ShortcutCategorySection, {
    title: (0, _i18n.__)('Selection shortcuts'),
    categoryName: "selection"
  }), (0, _element.createElement)(ShortcutCategorySection, {
    title: (0, _i18n.__)('Block shortcuts'),
    categoryName: "block",
    additionalShortcuts: [{
      keyCombination: {
        character: '/'
      },
      description: (0, _i18n.__)('Change the block type after adding a new paragraph.'),

      /* translators: The forward-slash character. e.g. '/'. */
      ariaLabel: (0, _i18n.__)('Forward-slash')
    }]
  }), (0, _element.createElement)(ShortcutSection, {
    title: (0, _i18n.__)('Text formatting'),
    shortcuts: _config.textFormattingShortcuts
  }));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    isModalActive: select('core/edit-post').isModalActive(MODAL_NAME)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref5) {
  var isModalActive = _ref5.isModalActive;

  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal,
      closeModal = _dispatch.closeModal;

  return {
    toggleModal: function toggleModal() {
      return isModalActive ? closeModal() : openModal(MODAL_NAME);
    }
  };
})])(KeyboardShortcutHelpModal);

exports.default = _default;
//# sourceMappingURL=index.js.map