/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
/**
 * Calculates and renders the format boundary style when the active formats
 * change.
 */

export function BoundaryStyle(_ref) {
  var activeFormats = _ref.activeFormats,
      forwardedRef = _ref.forwardedRef;
  useEffect(function () {
    // There's no need to recalculate the boundary styles if no formats are
    // active, because no boundary styles will be visible.
    if (!activeFormats || !activeFormats.length) {
      return;
    }

    var boundarySelector = '*[data-rich-text-format-boundary]';
    var element = forwardedRef.current.querySelector(boundarySelector);

    if (!element) {
      return;
    }

    var ownerDocument = element.ownerDocument;
    var defaultView = ownerDocument.defaultView;
    var computedStyle = defaultView.getComputedStyle(element);
    var newColor = computedStyle.color.replace(')', ', 0.2)').replace('rgb', 'rgba');
    var selector = ".rich-text:focus ".concat(boundarySelector);
    var rule = "background-color: ".concat(newColor);
    var style = "".concat(selector, " {").concat(rule, "}");
    var globalStyleId = 'rich-text-boundary-style';
    var globalStyle = ownerDocument.getElementById(globalStyleId);

    if (!globalStyle) {
      globalStyle = ownerDocument.createElement('style');
      globalStyle.id = globalStyleId;
      ownerDocument.head.appendChild(globalStyle);
    }

    if (globalStyle.innerHTML !== style) {
      globalStyle.innerHTML = style;
    }
  }, [activeFormats]);
  return null;
}
//# sourceMappingURL=boundary-style.js.map