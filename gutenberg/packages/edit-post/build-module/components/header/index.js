import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PostSavedState, PostPreviewButton } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { PinnedItems, __experimentalMainDashboardButton as MainDashboardButton } from '@wordpress/interface';
/**
 * Internal dependencies
 */

import FullscreenModeClose from './fullscreen-mode-close';
import HeaderToolbar from './header-toolbar';
import MoreMenu from './more-menu';
import PostPublishButtonOrToggle from './post-publish-button-or-toggle';
import { default as DevicePreview } from '../device-preview';

function Header(_ref) {
  var onToggleInserter = _ref.onToggleInserter,
      isInserterOpen = _ref.isInserterOpen,
      setEntitiesSavedStatesCallback = _ref.setEntitiesSavedStatesCallback;

  var _useSelect = useSelect(function (select) {
    return {
      hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
      isPublishSidebarOpened: select('core/edit-post').isPublishSidebarOpened(),
      isSaving: select('core/edit-post').isSavingMetaBoxes()
    };
  }, []),
      hasActiveMetaboxes = _useSelect.hasActiveMetaboxes,
      isPublishSidebarOpened = _useSelect.isPublishSidebarOpened,
      isSaving = _useSelect.isSaving;

  return createElement("div", {
    className: "edit-post-header"
  }, createElement(MainDashboardButton.Slot, null, createElement(FullscreenModeClose, null)), createElement("div", {
    className: "edit-post-header__toolbar"
  }, createElement(HeaderToolbar, {
    onToggleInserter: onToggleInserter,
    isInserterOpen: isInserterOpen
  })), createElement("div", {
    className: "edit-post-header__settings"
  }, !isPublishSidebarOpened && // This button isn't completely hidden by the publish sidebar.
  // We can't hide the whole toolbar when the publish sidebar is open because
  // we want to prevent mounting/unmounting the PostPublishButtonOrToggle DOM node.
  // We track that DOM node to return focus to the PostPublishButtonOrToggle
  // when the publish sidebar has been closed.
  createElement(PostSavedState, {
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving
  }), createElement(DevicePreview, null), createElement(PostPreviewButton, {
    forceIsAutosaveable: hasActiveMetaboxes,
    forcePreviewLink: isSaving ? null : undefined
  }), createElement(PostPublishButtonOrToggle, {
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving,
    setEntitiesSavedStatesCallback: setEntitiesSavedStatesCallback
  }), createElement(PinnedItems.Slot, {
    scope: "core/edit-post"
  }), createElement(MoreMenu, null)));
}

export default Header;
//# sourceMappingURL=index.js.map