"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PostTitleEdit;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
function PostTitleEdit(_ref) {
  var context = _ref.context;
  var postType = context.postType,
      postId = context.postId;
  var post = (0, _data.useSelect)(function (select) {
    return select('core').getEditedEntityRecord('postType', postType, postId);
  }, [postType, postId]);

  if (!post) {
    return null;
  }

  return (0, _element.createElement)("h2", null, post.title);
}
//# sourceMappingURL=edit.js.map