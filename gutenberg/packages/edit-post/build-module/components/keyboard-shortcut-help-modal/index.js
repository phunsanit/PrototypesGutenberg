import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isString } from 'lodash';
/**
 * WordPress dependencies
 */

import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { withSelect, withDispatch, useSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { textFormattingShortcuts } from './config';
import Shortcut from './shortcut';
import DynamicShortcut from './dynamic-shortcut';
var MODAL_NAME = 'edit-post/keyboard-shortcut-help';

var ShortcutList = function ShortcutList(_ref) {
  var shortcuts = _ref.shortcuts;
  return (
    /*
     * Disable reason: The `list` ARIA role is redundant but
     * Safari+VoiceOver won't announce the list otherwise.
     */

    /* eslint-disable jsx-a11y/no-redundant-roles */
    createElement("ul", {
      className: "edit-post-keyboard-shortcut-help-modal__shortcut-list",
      role: "list"
    }, shortcuts.map(function (shortcut, index) {
      return createElement("li", {
        className: "edit-post-keyboard-shortcut-help-modal__shortcut",
        key: index
      }, isString(shortcut) ? createElement(DynamicShortcut, {
        name: shortcut
      }) : createElement(Shortcut, shortcut));
    }))
    /* eslint-enable jsx-a11y/no-redundant-roles */

  );
};

var ShortcutSection = function ShortcutSection(_ref2) {
  var title = _ref2.title,
      shortcuts = _ref2.shortcuts,
      className = _ref2.className;
  return createElement("section", {
    className: classnames('edit-post-keyboard-shortcut-help-modal__section', className)
  }, !!title && createElement("h2", {
    className: "edit-post-keyboard-shortcut-help-modal__section-title"
  }, title), createElement(ShortcutList, {
    shortcuts: shortcuts
  }));
};

var ShortcutCategorySection = function ShortcutCategorySection(_ref3) {
  var title = _ref3.title,
      categoryName = _ref3.categoryName,
      _ref3$additionalShort = _ref3.additionalShortcuts,
      additionalShortcuts = _ref3$additionalShort === void 0 ? [] : _ref3$additionalShort;
  var categoryShortcuts = useSelect(function (select) {
    return select('core/keyboard-shortcuts').getCategoryShortcuts(categoryName);
  }, [categoryName]);
  return createElement(ShortcutSection, {
    title: title,
    shortcuts: categoryShortcuts.concat(additionalShortcuts)
  });
};

export function KeyboardShortcutHelpModal(_ref4) {
  var isModalActive = _ref4.isModalActive,
      toggleModal = _ref4.toggleModal;
  useShortcut('core/edit-post/keyboard-shortcuts', toggleModal, {
    bindGlobal: true
  });

  if (!isModalActive) {
    return null;
  }

  return createElement(Modal, {
    className: "edit-post-keyboard-shortcut-help-modal",
    title: __('Keyboard shortcuts'),
    closeLabel: __('Close'),
    onRequestClose: toggleModal
  }, createElement(ShortcutSection, {
    className: "edit-post-keyboard-shortcut-help-modal__main-shortcuts",
    shortcuts: ['core/edit-post/keyboard-shortcuts']
  }), createElement(ShortcutCategorySection, {
    title: __('Global shortcuts'),
    categoryName: "global"
  }), createElement(ShortcutCategorySection, {
    title: __('Selection shortcuts'),
    categoryName: "selection"
  }), createElement(ShortcutCategorySection, {
    title: __('Block shortcuts'),
    categoryName: "block",
    additionalShortcuts: [{
      keyCombination: {
        character: '/'
      },
      description: __('Change the block type after adding a new paragraph.'),

      /* translators: The forward-slash character. e.g. '/'. */
      ariaLabel: __('Forward-slash')
    }]
  }), createElement(ShortcutSection, {
    title: __('Text formatting'),
    shortcuts: textFormattingShortcuts
  }));
}
export default compose([withSelect(function (select) {
  return {
    isModalActive: select('core/edit-post').isModalActive(MODAL_NAME)
  };
}), withDispatch(function (dispatch, _ref5) {
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
//# sourceMappingURL=index.js.map