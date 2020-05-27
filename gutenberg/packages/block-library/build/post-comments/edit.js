"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PostCommentsEdit;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _coreData = require("@wordpress/core-data");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function PostCommentsDisplay(_ref) {
  var postId = _ref.postId;
  return (0, _data.useSelect)(function (select) {
    var comments = select('core').getEntityRecords('root', 'comment', {
      post: postId
    }); // TODO: "No Comments" placeholder should be editable.

    return comments && comments.length ? comments.map(function (comment) {
      return (0, _element.createElement)("p", {
        key: comment.id
      }, comment.content.raw);
    }) : (0, _i18n.__)('No comments.');
  }, [postId]);
}

function PostCommentsEdit() {
  // TODO: Update to handle multiple post types.
  var postId = (0, _coreData.useEntityId)('postType', 'post');

  if (!postId) {
    return 'Post Comments Placeholder';
  }

  return (0, _element.createElement)(PostCommentsDisplay, {
    postId: postId
  });
}
//# sourceMappingURL=edit.js.map