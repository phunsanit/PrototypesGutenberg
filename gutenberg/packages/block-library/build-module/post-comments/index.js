/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/post-comments",
  category: "layout",
  context: ["postId"]
};
import edit from './edit';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Post Comments'),
  edit: edit
};
//# sourceMappingURL=index.js.map