"use strict";

var _hooks = require("@wordpress/hooks");

var _mediaUtils = require("@wordpress/media-utils");

/**
 * WordPress dependencies
 */
var replaceMediaUpload = function replaceMediaUpload() {
  return _mediaUtils.MediaUpload;
};

(0, _hooks.addFilter)('editor.MediaUpload', 'core/edit-post/replace-media-upload', replaceMediaUpload);
//# sourceMappingURL=index.js.map