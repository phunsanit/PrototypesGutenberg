"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */
var transforms = {
  from: [{
    type: 'block',
    blocks: ['core/legacy-widget'],
    isMatch: function isMatch(_ref) {
      var widgetClass = _ref.widgetClass;
      return widgetClass === 'WP_Widget_Calendar';
    },
    transform: function transform(_ref2) {
      var instance = _ref2.instance;
      var calendarBlock = (0, _blocks.createBlock)('core/calendar');

      if (!instance || !instance.title) {
        return calendarBlock;
      }

      return [(0, _blocks.createBlock)('core/heading', {
        content: instance.title
      }), calendarBlock];
    }
  }]
};
var _default = transforms;
exports.default = _default;
//# sourceMappingURL=transforms.js.map