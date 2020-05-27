import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { calculatePreferedImageSize } from './utils';
export default function useImageSize(ref, src, dependencies) {
  var _useState = useState({
    imageWidth: null,
    imageHeight: null,
    imageWidthWithinContainer: null,
    imageHeightWithinContainer: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  useEffect(function () {
    if (!src) {
      return;
    }

    var defaultView = ref.current.ownerDocument.defaultView;
    var image = new defaultView.Image();

    function calculateSize() {
      var _calculatePreferedIma = calculatePreferedImageSize(image, ref.current),
          width = _calculatePreferedIma.width,
          height = _calculatePreferedIma.height;

      setState({
        imageWidth: image.width,
        imageHeight: image.height,
        imageWidthWithinContainer: width,
        imageHeightWithinContainer: height
      });
    }

    defaultView.addEventListener('resize', calculateSize);
    image.addEventListener('load', calculateSize);
    image.src = src;
    return function () {
      defaultView.removeEventListener('resize', calculateSize);
      image.removeEventListener('load', calculateSize);
    };
  }, [src].concat(_toConsumableArray(dependencies)));
  return state;
}
//# sourceMappingURL=image-size.js.map