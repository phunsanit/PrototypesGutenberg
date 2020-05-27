/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
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
      var calendarBlock = createBlock('core/calendar');

      if (!instance || !instance.title) {
        return calendarBlock;
      }

      return [createBlock('core/heading', {
        content: instance.title
      }), calendarBlock];
    }
  }]
};
export default transforms;
//# sourceMappingURL=transforms.js.map