"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActionsPanel;

var _element = require("@wordpress/element");

var _editor = require("@wordpress/editor");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _pluginPostPublishPanel = _interopRequireDefault(require("../sidebar/plugin-post-publish-panel"));

var _pluginPrePublishPanel = _interopRequireDefault(require("../sidebar/plugin-pre-publish-panel"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ActionsPanel(_ref) {
  var setEntitiesSavedStatesCallback = _ref.setEntitiesSavedStatesCallback,
      closeEntitiesSavedStates = _ref.closeEntitiesSavedStates,
      isEntitiesSavedStatesOpen = _ref.isEntitiesSavedStatesOpen;

  var _useDispatch = (0, _data.useDispatch)('core/edit-post'),
      closePublishSidebar = _useDispatch.closePublishSidebar,
      togglePublishSidebar = _useDispatch.togglePublishSidebar;

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      publishSidebarOpened: select('core/edit-post').isPublishSidebarOpened(),
      hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
      isSavingMetaBoxes: select('core/edit-post').isSavingMetaBoxes(),
      hasNonPostEntityChanges: select('core/editor').hasNonPostEntityChanges()
    };
  }, []),
      publishSidebarOpened = _useSelect.publishSidebarOpened,
      hasActiveMetaboxes = _useSelect.hasActiveMetaboxes,
      isSavingMetaBoxes = _useSelect.isSavingMetaBoxes,
      hasNonPostEntityChanges = _useSelect.hasNonPostEntityChanges;

  var openEntitiesSavedStates = (0, _element.useCallback)(function () {
    return setEntitiesSavedStatesCallback(true);
  }, []); // It is ok for these components to be unmounted when not in visual use.
  // We don't want more than one present at a time, decide which to render.

  var unmountableContent;

  if (publishSidebarOpened) {
    unmountableContent = (0, _element.createElement)(_editor.PostPublishPanel, {
      onClose: closePublishSidebar,
      forceIsDirty: hasActiveMetaboxes,
      forceIsSaving: isSavingMetaBoxes,
      PrePublishExtension: _pluginPrePublishPanel.default.Slot,
      PostPublishExtension: _pluginPostPublishPanel.default.Slot
    });
  } else if (hasNonPostEntityChanges) {
    unmountableContent = (0, _element.createElement)("div", {
      className: "edit-post-layout__toggle-entities-saved-states-panel"
    }, (0, _element.createElement)(_components.Button, {
      isSecondary: true,
      className: "edit-post-layout__toggle-entities-saved-states-panel-button",
      onClick: openEntitiesSavedStates,
      "aria-expanded": false
    }, (0, _i18n.__)('Open save panel')));
  } else {
    unmountableContent = (0, _element.createElement)("div", {
      className: "edit-post-layout__toggle-publish-panel"
    }, (0, _element.createElement)(_components.Button, {
      isSecondary: true,
      className: "edit-post-layout__toggle-publish-panel-button",
      onClick: togglePublishSidebar,
      "aria-expanded": false
    }, (0, _i18n.__)('Open publish panel')));
  } // Since EntitiesSavedStates controls its own panel, we can keep it
  // always mounted to retain its own component state (such as checkboxes).


  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.EntitiesSavedStates, {
    isOpen: isEntitiesSavedStatesOpen,
    close: closeEntitiesSavedStates
  }), !isEntitiesSavedStatesOpen && unmountableContent);
}
//# sourceMappingURL=actions-panel.js.map