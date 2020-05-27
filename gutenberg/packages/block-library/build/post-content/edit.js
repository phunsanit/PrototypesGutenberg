"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PostContentEdit;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _innerBlocks = _interopRequireDefault(require("./inner-blocks"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function PostContentEdit(_ref) {
  var _ref$context = _ref.context,
      postId = _ref$context.postId,
      postType = _ref$context.postType;

  if (postId && postType) {
    return (0, _element.createElement)(_innerBlocks.default, {
      postType: postType,
      postId: postId
    });
  }

  return (0, _element.createElement)("p", null, (0, _i18n.__)('This is a placeholder for post content.'));
}
//# sourceMappingURL=edit.js.map