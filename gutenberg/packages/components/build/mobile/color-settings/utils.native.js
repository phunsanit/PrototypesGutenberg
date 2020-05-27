"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorsUtils = void 0;
var gradients = {
  linear: 'linear-gradient',
  radial: 'radial-gradient'
};

var getGradientType = function getGradientType(color) {
  if (color === null || color === void 0 ? void 0 : color.includes(gradients.radial)) {
    return gradients.radial;
  } else if (color === null || color === void 0 ? void 0 : color.includes(gradients.linear)) {
    return gradients.linear;
  }

  return false;
};

var colorsUtils = {
  subsheets: {
    settings: 'Settings',
    color: 'Color'
  },
  segments: ['Solid', 'Gradient'],
  gradients: gradients,
  getGradientType: getGradientType,
  isGradient: function isGradient(color) {
    return !!getGradientType(color);
  }
};
exports.colorsUtils = colorsUtils;
//# sourceMappingURL=utils.native.js.map