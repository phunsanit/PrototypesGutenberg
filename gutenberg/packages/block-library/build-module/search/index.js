/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { search as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/search",
  category: "widgets",
  attributes: {
    align: {
      type: "string",
      "enum": ["left", "center", "right", "wide", "full"]
    },
    className: {
      type: "string"
    },
    label: {
      type: "string"
    },
    placeholder: {
      type: "string",
      "default": ""
    },
    buttonText: {
      type: "string"
    }
  },
  supports: {
    align: true,
    html: false
  }
};
import edit from './edit';
import variations from './variations';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Search'),
  description: __('Help visitors find your content.'),
  icon: icon,
  keywords: [__('find')],
  example: {},
  variations: variations,
  edit: edit
};
//# sourceMappingURL=index.js.map