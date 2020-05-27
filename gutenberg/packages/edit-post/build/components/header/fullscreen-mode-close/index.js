"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _url = require("@wordpress/url");

var _icons = require("@wordpress/icons");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function FullscreenModeClose() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/editor'),
        getCurrentPostType = _select.getCurrentPostType;

    var _select2 = select('core/edit-post'),
        isFeatureActive = _select2.isFeatureActive;

    var _select3 = select('core'),
        getPostType = _select3.getPostType;

    return {
      isActive: isFeatureActive('fullscreenMode'),
      postType: getPostType(getCurrentPostType())
    };
  }, []),
      isActive = _useSelect.isActive,
      postType = _useSelect.postType;

  if (!isActive || !postType) {
    return null;
  }

  return (0, _element.createElement)(_components.Button, {
    className: "edit-post-fullscreen-mode-close",
    icon: _icons.wordpress,
    iconSize: 36,
    href: (0, _url.addQueryArgs)('edit.php', {
      post_type: postType.slug
    }),
    label: (0, _lodash.get)(postType, ['labels', 'view_items'], (0, _i18n.__)('Back'))
  });
}

var _default = FullscreenModeClose;
exports.default = _default;
//# sourceMappingURL=index.js.map