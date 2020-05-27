"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useImageSize;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _element = require("@wordpress/element");

var _utils = require("./utils");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function useImageSize(ref, src, dependencies) {
  var _useState = (0, _element.useState)({
    imageWidth: null,
    imageHeight: null,
    imageWidthWithinContainer: null,
    imageHeightWithinContainer: null
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  (0, _element.useEffect)(function () {
    if (!src) {
      return;
    }

    var defaultView = ref.current.ownerDocument.defaultView;
    var image = new defaultView.Image();

    function calculateSize() {
      var _calculatePreferedIma = (0, _utils.calculatePreferedImageSize)(image, ref.current),
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
  }, [src].concat((0, _toConsumableArray2.default)(dependencies)));
  return state;
}
//# sourceMappingURL=image-size.js.map