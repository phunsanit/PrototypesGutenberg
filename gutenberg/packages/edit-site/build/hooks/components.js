"use strict";

var _hooks = require("@wordpress/hooks");

var _mediaUtils = require("@wordpress/media-utils");

/**
 * WordPress dependencies
 */
(0, _hooks.addFilter)('editor.MediaUpload', 'core/edit-site/components/media-upload', function () {
  return _mediaUtils.MediaUpload;
});
//# sourceMappingURL=components.js.map