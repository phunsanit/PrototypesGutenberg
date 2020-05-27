/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { MediaUpload } from '@wordpress/media-utils';

var replaceMediaUpload = function replaceMediaUpload() {
  return MediaUpload;
};

addFilter('editor.MediaUpload', 'core/edit-post/replace-media-upload', replaceMediaUpload);
//# sourceMappingURL=index.js.map