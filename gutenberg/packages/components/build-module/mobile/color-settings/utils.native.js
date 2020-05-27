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

export var colorsUtils = {
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
//# sourceMappingURL=utils.native.js.map