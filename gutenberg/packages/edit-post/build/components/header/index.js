"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _editor = require("@wordpress/editor");

var _data = require("@wordpress/data");

var _interface = require("@wordpress/interface");

var _fullscreenModeClose = _interopRequireDefault(require("./fullscreen-mode-close"));

var _headerToolbar = _interopRequireDefault(require("./header-toolbar"));

var _moreMenu = _interopRequireDefault(require("./more-menu"));

var _postPublishButtonOrToggle = _interopRequireDefault(require("./post-publish-button-or-toggle"));

var _devicePreview = _interopRequireDefault(require("../device-preview"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Header(_ref) {
  var onToggleInserter = _ref.onToggleInserter,
      isInserterOpen = _ref.isInserterOpen,
      setEntitiesSavedStatesCallback = _ref.setEntitiesSavedStatesCallback;

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
      isPublishSidebarOpened: select('core/edit-post').isPublishSidebarOpened(),
      isSaving: select('core/edit-post').isSavingMetaBoxes()
    };
  }, []),
      hasActiveMetaboxes = _useSelect.hasActiveMetaboxes,
      isPublishSidebarOpened = _useSelect.isPublishSidebarOpened,
      isSaving = _useSelect.isSaving;

  return (0, _element.createElement)("div", {
    className: "edit-post-header"
  }, (0, _element.createElement)(_interface.__experimentalMainDashboardButton.Slot, null, (0, _element.createElement)(_fullscreenModeClose.default, null)), (0, _element.createElement)("div", {
    className: "edit-post-header__toolbar"
  }, (0, _element.createElement)(_headerToolbar.default, {
    onToggleInserter: onToggleInserter,
    isInserterOpen: isInserterOpen
  })), (0, _element.createElement)("div", {
    className: "edit-post-header__settings"
  }, !isPublishSidebarOpened && // This button isn't completely hidden by the publish sidebar.
  // We can't hide the whole toolbar when the publish sidebar is open because
  // we want to prevent mounting/unmounting the PostPublishButtonOrToggle DOM node.
  // We track that DOM node to return focus to the PostPublishButtonOrToggle
  // when the publish sidebar has been closed.
  (0, _element.createElement)(_editor.PostSavedState, {
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving
  }), (0, _element.createElement)(_devicePreview.default, null), (0, _element.createElement)(_editor.PostPreviewButton, {
    forceIsAutosaveable: hasActiveMetaboxes,
    forcePreviewLink: isSaving ? null : undefined
  }), (0, _element.createElement)(_postPublishButtonOrToggle.default, {
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving,
    setEntitiesSavedStatesCallback: setEntitiesSavedStatesCallback
  }), (0, _element.createElement)(_interface.PinnedItems.Slot, {
    scope: "core/edit-post"
  }), (0, _element.createElement)(_moreMenu.default, null)));
}

var _default = Header;
exports.default = _default;
//# sourceMappingURL=index.js.map