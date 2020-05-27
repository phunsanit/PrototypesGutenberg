import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { EntitiesSavedStates, PostPublishPanel } from '@wordpress/editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
/**
 * Internal dependencies
 */

import PluginPostPublishPanel from '../sidebar/plugin-post-publish-panel';
import PluginPrePublishPanel from '../sidebar/plugin-pre-publish-panel';
export default function ActionsPanel(_ref) {
  var setEntitiesSavedStatesCallback = _ref.setEntitiesSavedStatesCallback,
      closeEntitiesSavedStates = _ref.closeEntitiesSavedStates,
      isEntitiesSavedStatesOpen = _ref.isEntitiesSavedStatesOpen;

  var _useDispatch = useDispatch('core/edit-post'),
      closePublishSidebar = _useDispatch.closePublishSidebar,
      togglePublishSidebar = _useDispatch.togglePublishSidebar;

  var _useSelect = useSelect(function (select) {
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

  var openEntitiesSavedStates = useCallback(function () {
    return setEntitiesSavedStatesCallback(true);
  }, []); // It is ok for these components to be unmounted when not in visual use.
  // We don't want more than one present at a time, decide which to render.

  var unmountableContent;

  if (publishSidebarOpened) {
    unmountableContent = createElement(PostPublishPanel, {
      onClose: closePublishSidebar,
      forceIsDirty: hasActiveMetaboxes,
      forceIsSaving: isSavingMetaBoxes,
      PrePublishExtension: PluginPrePublishPanel.Slot,
      PostPublishExtension: PluginPostPublishPanel.Slot
    });
  } else if (hasNonPostEntityChanges) {
    unmountableContent = createElement("div", {
      className: "edit-post-layout__toggle-entities-saved-states-panel"
    }, createElement(Button, {
      isSecondary: true,
      className: "edit-post-layout__toggle-entities-saved-states-panel-button",
      onClick: openEntitiesSavedStates,
      "aria-expanded": false
    }, __('Open save panel')));
  } else {
    unmountableContent = createElement("div", {
      className: "edit-post-layout__toggle-publish-panel"
    }, createElement(Button, {
      isSecondary: true,
      className: "edit-post-layout__toggle-publish-panel-button",
      onClick: togglePublishSidebar,
      "aria-expanded": false
    }, __('Open publish panel')));
  } // Since EntitiesSavedStates controls its own panel, we can keep it
  // always mounted to retain its own component state (such as checkboxes).


  return createElement(Fragment, null, createElement(EntitiesSavedStates, {
    isOpen: isEntitiesSavedStatesOpen,
    close: closeEntitiesSavedStates
  }), !isEntitiesSavedStatesOpen && unmountableContent);
}
//# sourceMappingURL=actions-panel.js.map