"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DevicePreview;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

var _icons = require("@wordpress/icons");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
function DevicePreview() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
      isSaving: select('core/edit-post').isSavingMetaBoxes(),
      isPostSaveable: select('core/editor').isEditedPostSaveable(),
      deviceType: select('core/edit-post').__experimentalGetPreviewDeviceType()
    };
  }, []),
      hasActiveMetaboxes = _useSelect.hasActiveMetaboxes,
      isPostSaveable = _useSelect.isPostSaveable,
      isSaving = _useSelect.isSaving,
      deviceType = _useSelect.deviceType;

  var _useDispatch = (0, _data.useDispatch)('core/edit-post'),
      setPreviewDeviceType = _useDispatch.__experimentalSetPreviewDeviceType;

  return (0, _element.createElement)(_blockEditor.__experimentalPreviewOptions, {
    isEnabled: isPostSaveable,
    className: "edit-post-post-preview-dropdown",
    deviceType: deviceType,
    setDeviceType: setPreviewDeviceType
  }, (0, _element.createElement)(_components.MenuGroup, null, (0, _element.createElement)("div", {
    className: "edit-post-header-preview__grouping-external"
  }, (0, _element.createElement)(_editor.PostPreviewButton, {
    className: 'edit-post-header-preview__button-external',
    forceIsAutosaveable: hasActiveMetaboxes,
    forcePreviewLink: isSaving ? null : undefined,
    textContent: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Icon, {
      icon: _icons.external
    }), (0, _i18n.__)('Preview in new tab'))
  }))));
}
//# sourceMappingURL=index.js.map