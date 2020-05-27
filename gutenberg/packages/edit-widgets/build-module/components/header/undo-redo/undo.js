import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { undo as undoIcon } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';
export default function UndoButton() {
  var hasUndo = useSelect(function (select) {
    return select('core').hasUndo();
  });

  var _useDispatch = useDispatch('core'),
      undo = _useDispatch.undo;

  return createElement(Button, {
    icon: undoIcon,
    label: __('Undo'),
    shortcut: displayShortcut.primary('z') // If there are no undo levels we don't want to actually disable this
    // button, because it will remove focus for keyboard users.
    // See: https://github.com/WordPress/gutenberg/issues/3486
    ,
    "aria-disabled": !hasUndo,
    onClick: hasUndo ? undo : undefined
  });
}
//# sourceMappingURL=undo.js.map