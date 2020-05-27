/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/post-author",
  category: "layout",
  attributes: {
    align: {
      type: "string"
    },
    avatarSize: {
      type: "number"
    },
    showAvatar: {
      type: "boolean"
    },
    showBio: {
      type: "boolean"
    },
    byline: {
      type: "string"
    },
    backgroundColor: {
      type: "string"
    },
    textColor: {
      type: "string"
    },
    customBackgroundColor: {
      type: "string"
    },
    customTextColor: {
      type: "string"
    }
  },
  context: ["postType", "postId"],
  supports: {
    html: false
  }
};
import edit from './edit';
import icon from './icon';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Post Author'),
  icon: icon,
  edit: edit
};
//# sourceMappingURL=index.js.map