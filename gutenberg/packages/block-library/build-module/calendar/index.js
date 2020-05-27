/**
 * WordPress dependencies
 */
import { calendar as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/calendar",
  category: "widgets",
  attributes: {
    align: {
      type: "string",
      "enum": ["left", "center", "right", "wide", "full"]
    },
    className: {
      type: "string"
    },
    month: {
      type: "integer"
    },
    year: {
      type: "integer"
    }
  },
  supports: {
    align: true
  }
};
import edit from './edit';
import transforms from './transforms';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Calendar'),
  description: __('A calendar of your site’s posts.'),
  icon: icon,
  keywords: [__('posts'), __('archive')],
  example: {},
  edit: edit,
  transforms: transforms
};
//# sourceMappingURL=index.js.map