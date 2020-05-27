/**
 * WordPress dependencies
 */
import { widget as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/legacy-widget",
  category: "widgets",
  attributes: {
    widgetClass: {
      type: "string"
    },
    id: {
      type: "string"
    },
    idBase: {
      type: "string"
    },
    number: {
      type: "number"
    },
    instance: {
      type: "object"
    }
  },
  supports: {
    html: false,
    customClassName: false
  }
};
import edit from './edit';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Legacy Widget (Experimental)'),
  description: __('Display a legacy widget.'),
  icon: icon,
  edit: edit
};
//# sourceMappingURL=index.js.map