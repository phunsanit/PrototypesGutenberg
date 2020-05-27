import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { AutosaveMonitor, LocalAutosaveMonitor, UnsavedChangesWarning, EditorNotices, EditorKeyboardShortcutsRegister } from '@wordpress/editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockBreadcrumb, __experimentalLibrary as Library } from '@wordpress/block-editor';
import { Button, ScrollLock, Popover, FocusReturnProvider } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { PluginArea } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';
import { ComplementaryArea, FullscreenMode, InterfaceSkeleton } from '@wordpress/interface';
import { useState, useEffect, useCallback } from '@wordpress/element';
import { close } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import TextEditor from '../text-editor';
import VisualEditor from '../visual-editor';
import EditPostKeyboardShortcuts from '../keyboard-shortcuts';
import KeyboardShortcutHelpModal from '../keyboard-shortcut-help-modal';
import ManageBlocksModal from '../manage-blocks-modal';
import OptionsModal from '../options-modal';
import BrowserURL from '../browser-url';
import Header from '../header';
import SettingsSidebar from '../sidebar/settings-sidebar';
import MetaBoxes from '../meta-boxes';
import WelcomeGuide from '../welcome-guide';
import ActionsPanel from './actions-panel';
var interfaceLabels = {
  leftSidebar: __('Block Library')
};

function Layout() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isInserterOpen = _useState2[0],
      setIsInserterOpen = _useState2[1];

  var isMobileViewport = useViewportMatch('medium', '<');
  var isHugeViewport = useViewportMatch('huge', '>=');

  var _useDispatch = useDispatch('core/edit-post'),
      openGeneralSidebar = _useDispatch.openGeneralSidebar,
      closeGeneralSidebar = _useDispatch.closeGeneralSidebar;

  var _useSelect = useSelect(function (select) {
    return {
      hasFixedToolbar: select('core/edit-post').isFeatureActive('fixedToolbar'),
      sidebarIsOpened: !!(select('core/interface').getActiveComplementaryArea('core/edit-post') || select('core/edit-post').isPublishSidebarOpened()),
      isFullscreenActive: select('core/edit-post').isFeatureActive('fullscreenMode'),
      mode: select('core/edit-post').getEditorMode(),
      isRichEditingEnabled: select('core/editor').getEditorSettings().richEditingEnabled,
      hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
      previousShortcut: select('core/keyboard-shortcuts').getAllShortcutRawKeyCombinations('core/edit-post/previous-region'),
      nextShortcut: select('core/keyboard-shortcuts').getAllShortcutRawKeyCombinations('core/edit-post/next-region')
    };
  }, []),
      mode = _useSelect.mode,
      isFullscreenActive = _useSelect.isFullscreenActive,
      isRichEditingEnabled = _useSelect.isRichEditingEnabled,
      sidebarIsOpened = _useSelect.sidebarIsOpened,
      hasActiveMetaboxes = _useSelect.hasActiveMetaboxes,
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      previousShortcut = _useSelect.previousShortcut,
      nextShortcut = _useSelect.nextShortcut,
      hasBlockSelected = _useSelect.hasBlockSelected;

  var className = classnames('edit-post-layout', 'is-mode-' + mode, {
    'is-sidebar-opened': sidebarIsOpened,
    'has-fixed-toolbar': hasFixedToolbar,
    'has-metaboxes': hasActiveMetaboxes
  });

  var openSidebarPanel = function openSidebarPanel() {
    return openGeneralSidebar(hasBlockSelected ? 'edit-post/block' : 'edit-post/document');
  }; // Inserter and Sidebars are mutually exclusive


  useEffect(function () {
    if (sidebarIsOpened && !isHugeViewport) {
      setIsInserterOpen(false);
    }
  }, [sidebarIsOpened, isHugeViewport]);
  useEffect(function () {
    if (isInserterOpen && !isHugeViewport) {
      closeGeneralSidebar();
    }
  }, [isInserterOpen, isHugeViewport]); // Local state for save panel.
  // Note 'thruthy' callback implies an open panel.

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      entitiesSavedStatesCallback = _useState4[0],
      setEntitiesSavedStatesCallback = _useState4[1];

  var closeEntitiesSavedStates = useCallback(function (arg) {
    if (typeof entitiesSavedStatesCallback === 'function') {
      entitiesSavedStatesCallback(arg);
    }

    setEntitiesSavedStatesCallback(false);
  }, [entitiesSavedStatesCallback]);
  return createElement(Fragment, null, createElement(FullscreenMode, {
    isActive: isFullscreenActive
  }), createElement(BrowserURL, null), createElement(UnsavedChangesWarning, null), createElement(AutosaveMonitor, null), createElement(LocalAutosaveMonitor, null), createElement(EditPostKeyboardShortcuts, null), createElement(EditorKeyboardShortcutsRegister, null), createElement(SettingsSidebar, null), createElement(FocusReturnProvider, null, createElement(InterfaceSkeleton, {
    className: className,
    labels: interfaceLabels,
    header: createElement(Header, {
      isInserterOpen: isInserterOpen,
      onToggleInserter: function onToggleInserter() {
        return setIsInserterOpen(!isInserterOpen);
      },
      setEntitiesSavedStatesCallback: setEntitiesSavedStatesCallback
    }),
    leftSidebar: mode === 'visual' && isInserterOpen && createElement("div", {
      className: "edit-post-layout__inserter-panel"
    }, createElement("div", {
      className: "edit-post-layout__inserter-panel-header"
    }, createElement(Button, {
      icon: close,
      onClick: function onClick() {
        return setIsInserterOpen(false);
      }
    })), createElement("div", {
      className: "edit-post-layout__inserter-panel-content"
    }, createElement(Library, {
      showInserterHelpPanel: true,
      onSelect: function onSelect() {
        if (isMobileViewport) {
          setIsInserterOpen(false);
        }
      }
    }))),
    sidebar: (!isMobileViewport || sidebarIsOpened) && createElement(Fragment, null, !isMobileViewport && !sidebarIsOpened && createElement("div", {
      className: "edit-post-layout__toogle-sidebar-panel"
    }, createElement(Button, {
      isSecondary: true,
      className: "edit-post-layout__toogle-sidebar-panel-button",
      onClick: openSidebarPanel,
      "aria-expanded": false
    }, hasBlockSelected ? __('Open block settings') : __('Open document settings'))), createElement(ComplementaryArea.Slot, {
      scope: "core/edit-post"
    })),
    content: createElement(Fragment, null, createElement(EditorNotices, null), (mode === 'text' || !isRichEditingEnabled) && createElement(TextEditor, null), isRichEditingEnabled && mode === 'visual' && createElement(VisualEditor, null), createElement("div", {
      className: "edit-post-layout__metaboxes"
    }, createElement(MetaBoxes, {
      location: "normal"
    }), createElement(MetaBoxes, {
      location: "advanced"
    })), isMobileViewport && sidebarIsOpened && createElement(ScrollLock, null)),
    footer: !isMobileViewport && isRichEditingEnabled && mode === 'visual' && createElement("div", {
      className: "edit-post-layout__footer"
    }, createElement(BlockBreadcrumb, null)),
    actions: createElement(ActionsPanel, {
      closeEntitiesSavedStates: closeEntitiesSavedStates,
      isEntitiesSavedStatesOpen: entitiesSavedStatesCallback,
      setEntitiesSavedStatesCallback: setEntitiesSavedStatesCallback
    }),
    shortcuts: {
      previous: previousShortcut,
      next: nextShortcut
    }
  }), createElement(ManageBlocksModal, null), createElement(OptionsModal, null), createElement(KeyboardShortcutHelpModal, null), createElement(WelcomeGuide, null), createElement(Popover.Slot, null), createElement(PluginArea, null)));
}

export default Layout;
//# sourceMappingURL=index.js.map