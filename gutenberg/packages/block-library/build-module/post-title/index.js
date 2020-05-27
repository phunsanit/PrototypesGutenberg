/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { title as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/post-title",
  category: "layout",
  context: ["postId", "postType"],
  supports: {
    html: false
  }
};
import edit from './edit';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Post Title'),
  icon: icon,
  edit: edit
};
//# sourceMappingURL=index.js.map