"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TemplatePartEdit;

var _element = require("@wordpress/element");

var _coreData = require("@wordpress/core-data");

var _useTemplatePartPost = _interopRequireDefault(require("./use-template-part-post"));

var _innerBlocks = _interopRequireDefault(require("./inner-blocks"));

var _placeholder = _interopRequireDefault(require("./placeholder"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function TemplatePartEdit(_ref) {
  var _ref$attributes = _ref.attributes,
      _postId = _ref$attributes.postId,
      slug = _ref$attributes.slug,
      theme = _ref$attributes.theme,
      setAttributes = _ref.setAttributes;
  var initialPostId = (0, _element.useRef)(_postId);
  var initialSlug = (0, _element.useRef)(slug);
  var initialTheme = (0, _element.useRef)(theme); // Resolve the post ID if not set, and load its post.

  var postId = (0, _useTemplatePartPost.default)(_postId, slug, theme); // Set the post ID, once found, so that edits persist.

  (0, _element.useEffect)(function () {
    if ((initialPostId.current === undefined || initialPostId.current === null) && postId !== undefined && postId !== null) {
      setAttributes({
        postId: postId
      });
    }
  }, [postId]);

  if (postId) {
    // Part of a template file, post ID already resolved.
    return (0, _element.createElement)(_coreData.EntityProvider, {
      kind: "postType",
      type: "wp_template_part",
      id: postId
    }, (0, _element.createElement)(_innerBlocks.default, null));
  }

  if (!initialSlug.current && !initialTheme.current) {
    // Fresh new block.
    return (0, _element.createElement)(_placeholder.default, {
      setAttributes: setAttributes
    });
  } // Part of a template file, post ID not resolved yet.


  return null;
}
//# sourceMappingURL=index.js.map