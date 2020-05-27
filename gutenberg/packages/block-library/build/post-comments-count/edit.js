"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PostCommentsCountEdit;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _coreData = require("@wordpress/core-data");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _url = require("@wordpress/url");

/**
 * WordPress dependencies
 */
function PostCommentsCountDisplay(_ref) {
  var className = _ref.className;
  var postId = (0, _coreData.useEntityId)('postType', 'post');

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      commentsCount = _useState2[0],
      setCommentsCount = _useState2[1];

  (0, _element.useEffect)(function () {
    var currentPostId = postId;
    (0, _apiFetch.default)({
      path: (0, _url.addQueryArgs)('/wp/v2/comments', {
        post: postId
      }),
      parse: false
    }).then(function (res) {
      // Stale requests will have the `currentPostId` of an older closure.
      if (currentPostId === postId) {
        setCommentsCount(res.headers.get('X-WP-Total'));
      }
    });
  }, [postId]);
  return (0, _element.createElement)("span", {
    className: className
  }, commentsCount !== undefined && commentsCount);
}

function PostCommentsCountEdit(_ref2) {
  var className = _ref2.className;

  if (!(0, _coreData.useEntityId)('postType', 'post')) {
    return 'Post Comments Count Placeholder';
  }

  return (0, _element.createElement)(PostCommentsCountDisplay, {
    className: className
  });
}
//# sourceMappingURL=edit.js.map