import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { castArray } from 'lodash';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { displayShortcutList, shortcutAriaLabel } from '@wordpress/keycodes';

function KeyCombination(_ref) {
  var keyCombination = _ref.keyCombination,
      forceAriaLabel = _ref.forceAriaLabel;
  var shortcut = keyCombination.modifier ? displayShortcutList[keyCombination.modifier](keyCombination.character) : keyCombination.character;
  var ariaLabel = keyCombination.modifier ? shortcutAriaLabel[keyCombination.modifier](keyCombination.character) : keyCombination.character;
  return createElement("kbd", {
    className: "edit-post-keyboard-shortcut-help-modal__shortcut-key-combination",
    "aria-label": forceAriaLabel || ariaLabel
  }, castArray(shortcut).map(function (character, index) {
    if (character === '+') {
      return createElement(Fragment, {
        key: index
      }, character);
    }

    return createElement("kbd", {
      key: index,
      className: "edit-post-keyboard-shortcut-help-modal__shortcut-key"
    }, character);
  }));
}

function Shortcut(_ref2) {
  var description = _ref2.description,
      keyCombination = _ref2.keyCombination,
      _ref2$aliases = _ref2.aliases,
      aliases = _ref2$aliases === void 0 ? [] : _ref2$aliases,
      ariaLabel = _ref2.ariaLabel;
  return createElement(Fragment, null, createElement("div", {
    className: "edit-post-keyboard-shortcut-help-modal__shortcut-description"
  }, description), createElement("div", {
    className: "edit-post-keyboard-shortcut-help-modal__shortcut-term"
  }, createElement(KeyCombination, {
    keyCombination: keyCombination,
    forceAriaLabel: ariaLabel
  }), aliases.map(function (alias, index) {
    return createElement(KeyCombination, {
      keyCombination: alias,
      forceAriaLabel: ariaLabel,
      key: index
    });
  })));
}

export default Shortcut;
//# sourceMappingURL=shortcut.js.map