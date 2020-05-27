/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/post-excerpt",
  category: "layout",
  attributes: {
    wordCount: {
      type: "number",
      "default": 55
    },
    moreText: {
      type: "string"
    },
    showMoreOnNewLine: {
      type: "boolean",
      "default": true
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
  title: __('Post Excerpt'),
  edit: edit
};
//# sourceMappingURL=index.js.map