"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RedoButton;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _keycodes = require("@wordpress/keycodes");

/**
 * WordPress dependencies
 */
function RedoButton() {
  var hasRedo = (0, _data.useSelect)(function (select) {
    return select('core').hasRedo();
  });

  var _useDispatch = (0, _data.useDispatch)('core'),
      redo = _useDispatch.redo;

  return (0, _element.createElement)(_components.Button, {
    icon: _icons.redo,
    label: (0, _i18n.__)('Redo'),
    shortcut: _keycodes.displayShortcut.primaryShift('z') // If there are no undo levels we don't want to actually disable this
    // button, because it will remove focus for keyboard users.
    // See: https://github.com/WordPress/gutenberg/issues/3486
    ,
    "aria-disabled": !hasRedo,
    onClick: hasRedo ? redo : undefined
  });
}
//# sourceMappingURL=redo.js.map