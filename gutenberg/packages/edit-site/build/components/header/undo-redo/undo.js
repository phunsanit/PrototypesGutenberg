"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UndoButton;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _keycodes = require("@wordpress/keycodes");

/**
 * WordPress dependencies
 */
function UndoButton() {
  var hasUndo = (0, _data.useSelect)(function (select) {
    return select('core').hasUndo();
  });

  var _useDispatch = (0, _data.useDispatch)('core'),
      undo = _useDispatch.undo;

  return (0, _element.createElement)(_components.Button, {
    icon: _icons.undo,
    label: (0, _i18n.__)('Undo'),
    shortcut: _keycodes.displayShortcut.primary('z') // If there are no undo levels we don't want to actually disable this
    // button, because it will remove focus for keyboard users.
    // See: https://github.com/WordPress/gutenberg/issues/3486
    ,
    "aria-disabled": !hasUndo,
    onClick: hasUndo ? undo : undefined
  });
}
//# sourceMappingURL=undo.js.map