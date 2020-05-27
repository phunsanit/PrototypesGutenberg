/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
export function InlineWarning(_ref) {
  var forwardedRef = _ref.forwardedRef;
  useEffect(function () {
    if (process.env.NODE_ENV === 'development') {
      var target = forwardedRef.current;
      var defaultView = target.ownerDocument.defaultView;
      var computedStyle = defaultView.getComputedStyle(target);

      if (computedStyle.display === 'inline') {
        // eslint-disable-next-line no-console
        console.warn('RichText cannot be used with an inline container. Please use a different tagName.');
      }
    }
  }, []);
  return null;
}
//# sourceMappingURL=inline-warning.js.map