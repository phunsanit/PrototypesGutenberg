"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDragCursor = getDragCursor;
exports.useDragCursor = useDragCursor;
exports.isValueEmpty = isValueEmpty;

var _element = require("@wordpress/element");

var _styleMixins = require("../utils/style-mixins");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Gets a CSS cursor value based on a drag direction.
 *
 * @param {string} dragDirection The drag direction.
 * @return {string} The CSS cursor value.
 */
function getDragCursor(dragDirection) {
  var isRtl = (0, _styleMixins.getRTL)();
  var dragCursor = 'n-resize';

  switch (dragDirection) {
    case 'n':
      dragCursor = 'n-resize';
      break;

    case 'e':
      dragCursor = isRtl ? 'w-resize' : 'e-resize';
      break;

    case 's':
      dragCursor = 's-resize';
      break;

    case 'w':
      dragCursor = isRtl ? 'e-resize' : 'w-resize';
      break;
  }

  return dragCursor;
}
/**
 * Custom hook that renders a drag cursor when dragging.
 *
 * @param {boolean} isDragging The dragging state.
 * @param {string} dragDirection The drag direction.
 *
 * @return {string} The CSS cursor value.
 */


function useDragCursor(isDragging, dragDirection) {
  var dragCursor = getDragCursor(dragDirection);
  (0, _element.useEffect)(function () {
    if (isDragging) {
      document.documentElement.style.cursor = dragCursor;
      document.documentElement.style.pointerEvents = 'none';
    } else {
      document.documentElement.style.cursor = null;
      document.documentElement.style.pointerEvents = null;
    }
  }, [isDragging]);
  return dragCursor;
}
/**
 * Determines if a value is empty, null, or undefined.
 *
 * @param {any} value The value to check.
 * @return {boolean} Whether value is empty.
 */


function isValueEmpty(value) {
  var isNullish = typeof value === 'undefined' || value === null;
  var isEmptyString = value === '';
  return isNullish || isEmptyString;
}
//# sourceMappingURL=utils.js.map