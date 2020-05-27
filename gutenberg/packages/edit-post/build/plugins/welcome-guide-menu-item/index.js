"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WelcomeGuideMenuItem;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function WelcomeGuideMenuItem() {
  var _useDispatch = (0, _data.useDispatch)('core/edit-post'),
      toggleFeature = _useDispatch.toggleFeature;

  return (0, _element.createElement)(_components.MenuItem, {
    onClick: function onClick() {
      return toggleFeature('welcomeGuide');
    }
  }, (0, _i18n.__)('Welcome Guide'));
}
//# sourceMappingURL=index.js.map