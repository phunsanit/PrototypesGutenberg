/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/post-date",
  category: "layout",
  attributes: {
    format: {
      type: "string"
    }
  },
  context: ["postId"],
  supports: {
    html: false
  }
};
import edit from './edit';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Post Date'),
  edit: edit
};
//# sourceMappingURL=index.js.map