"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
function FullscreenModeClose(_ref) {
  var icon = _ref.icon;
  var isActive = (0, _data.useSelect)(function (select) {
    return select('core/edit-site').isFeatureActive('fullscreenMode');
  }, []);

  if (!isActive) {
    return null;
  }

  var buttonIcon = icon || _icons.wordpress;
  return (0, _element.createElement)(_components.Button, {
    className: "edit-site-fullscreen-mode-close",
    icon: buttonIcon,
    iconSize: 36,
    href: "index.php",
    label: (0, _i18n.__)('Back')
  });
}

var _default = FullscreenModeClose;
exports.default = _default;
//# sourceMappingURL=index.js.map