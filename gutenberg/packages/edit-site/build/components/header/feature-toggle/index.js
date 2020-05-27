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

var _icons = require("@wordpress/icons");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function FeatureToggle(_ref) {
  var feature = _ref.feature,
      label = _ref.label,
      info = _ref.info,
      messageActivated = _ref.messageActivated,
      messageDeactivated = _ref.messageDeactivated,
      speak = _ref.speak;

  var speakMessage = function speakMessage() {
    if (isActive) {
      speak(messageDeactivated || (0, _i18n.__)('Feature deactivated'));
    } else {
      speak(messageActivated || (0, _i18n.__)('Feature activated'));
    }
  };

  var isActive = (0, _data.useSelect)(function (select) {
    return select('core/edit-site').isFeatureActive(feature);
  }, []);

  var _useDispatch = (0, _data.useDispatch)('core/edit-site'),
      toggleFeature = _useDispatch.toggleFeature;

  return (0, _element.createElement)(_components.MenuItem, {
    icon: isActive && _icons.check,
    isSelected: isActive,
    onClick: (0, _lodash.flow)(toggleFeature.bind(null, feature), speakMessage),
    role: "menuitemcheckbox",
    info: info
  }, label);
}

var _default = (0, _components.withSpokenMessages)(FeatureToggle);

exports.default = _default;
//# sourceMappingURL=index.js.map