"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _keycodes = require("@wordpress/keycodes");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function KeyCombination(_ref) {
  var keyCombination = _ref.keyCombination,
      forceAriaLabel = _ref.forceAriaLabel;
  var shortcut = keyCombination.modifier ? _keycodes.displayShortcutList[keyCombination.modifier](keyCombination.character) : keyCombination.character;
  var ariaLabel = keyCombination.modifier ? _keycodes.shortcutAriaLabel[keyCombination.modifier](keyCombination.character) : keyCombination.character;
  return (0, _element.createElement)("kbd", {
    className: "edit-post-keyboard-shortcut-help-modal__shortcut-key-combination",
    "aria-label": forceAriaLabel || ariaLabel
  }, (0, _lodash.castArray)(shortcut).map(function (character, index) {
    if (character === '+') {
      return (0, _element.createElement)(_element.Fragment, {
        key: index
      }, character);
    }

    return (0, _element.createElement)("kbd", {
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
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    className: "edit-post-keyboard-shortcut-help-modal__shortcut-description"
  }, description), (0, _element.createElement)("div", {
    className: "edit-post-keyboard-shortcut-help-modal__shortcut-term"
  }, (0, _element.createElement)(KeyCombination, {
    keyCombination: keyCombination,
    forceAriaLabel: ariaLabel
  }), aliases.map(function (alias, index) {
    return (0, _element.createElement)(KeyCombination, {
      keyCombination: alias,
      forceAriaLabel: ariaLabel,
      key: index
    });
  })));
}

var _default = Shortcut;
exports.default = _default;
//# sourceMappingURL=shortcut.js.map