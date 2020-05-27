import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { truncate } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';

function ThemePreview(_ref) {
  var _ref$theme = _ref.theme,
      authorName = _ref$theme.author_name,
      description = _ref$theme.description,
      name = _ref$theme.name,
      screenshot = _ref$theme.screenshot,
      version = _ref$theme.version;
  return createElement("div", {
    className: "edit-site-template-switcher__theme-preview"
  }, createElement("span", {
    className: "edit-site-template-switcher__theme-preview-name"
  }, name), ' ', createElement("span", {
    className: "edit-site-template-switcher__theme-preview-version"
  }, 'v' + version), createElement("div", {
    className: "edit-site-template-switcher__theme-preview-byline"
  }, // translators: %s: theme author name.
  sprintf(__('By %s'), [authorName])), createElement("img", {
    className: "edit-site-template-switcher__theme-preview-screenshot",
    src: screenshot,
    alt: 'Theme Preview'
  }), createElement("div", {
    className: "edit-site-template-switcher__theme-preview-description"
  }, truncate(description, {
    length: 120,
    separator: /\. +/
  })));
}

export default ThemePreview;
//# sourceMappingURL=theme-preview.js.map