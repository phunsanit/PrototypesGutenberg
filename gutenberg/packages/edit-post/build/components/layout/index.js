"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _editor = require("@wordpress/editor");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _plugins = require("@wordpress/plugins");

var _i18n = require("@wordpress/i18n");

var _interface = require("@wordpress/interface");

var _icons = require("@wordpress/icons");

var _textEditor = _interopRequireDefault(require("../text-editor"));

var _visualEditor = _interopRequireDefault(require("../visual-editor"));

var _keyboardShortcuts = _interopRequireDefault(require("../keyboard-shortcuts"));

var _keyboardShortcutHelpModal = _interopRequireDefault(require("../keyboard-shortcut-help-modal"));

var _manageBlocksModal = _interopRequireDefault(require("../manage-blocks-modal"));

var _optionsModal = _interopRequireDefault(require("../options-modal"));

var _browserUrl = _interopRequireDefault(require("../browser-url"));

var _header = _interopRequireDefault(require("../header"));

var _settingsSidebar = _interopRequireDefault(require("../sidebar/settings-sidebar"));

var _metaBoxes = _interopRequireDefault(require("../meta-boxes"));

var _welcomeGuide = _interopRequireDefault(require("../welcome-guide"));

var _actionsPanel = _interopRequireDefault(require("./actions-panel"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var interfaceLabels = {
  leftSidebar: (0, _i18n.__)('Block Library')
};

function Layout() {
  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isInserterOpen = _useState2[0],
      setIsInserterOpen = _useState2[1];

  var isMobileViewport = (0, _compose.useViewportMatch)('medium', '<');
  var isHugeViewport = (0, _compose.useViewportMatch)('huge', '>=');

  var _useDispatch = (0, _data.useDispatch)('core/edit-post'),
      openGeneralSidebar = _useDispatch.openGeneralSidebar,
      closeGeneralSidebar = _useDispatch.closeGeneralSidebar;

  var _useSelect = (0, _data.useSelect)(function (select) {
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

  var className = (0, _classnames.default)('edit-post-layout', 'is-mode-' + mode, {
    'is-sidebar-opened': sidebarIsOpened,
    'has-fixed-toolbar': hasFixedToolbar,
    'has-metaboxes': hasActiveMetaboxes
  });

  var openSidebarPanel = function openSidebarPanel() {
    return openGeneralSidebar(hasBlockSelected ? 'edit-post/block' : 'edit-post/document');
  }; // Inserter and Sidebars are mutually exclusive


  (0, _element.useEffect)(function () {
    if (sidebarIsOpened && !isHugeViewport) {
      setIsInserterOpen(false);
    }
  }, [sidebarIsOpened, isHugeViewport]);
  (0, _element.useEffect)(function () {
    if (isInserterOpen && !isHugeViewport) {
      closeGeneralSidebar();
    }
  }, [isInserterOpen, isHugeViewport]); // Local state for save panel.
  // Note 'thruthy' callback implies an open panel.

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      entitiesSavedStatesCallback = _useState4[0],
      setEntitiesSavedStatesCallback = _useState4[1];

  var closeEntitiesSavedStates = (0, _element.useCallback)(function (arg) {
    if (typeof entitiesSavedStatesCallback === 'function') {
      entitiesSavedStatesCallback(arg);
    }

    setEntitiesSavedStatesCallback(false);
  }, [entitiesSavedStatesCallback]);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_interface.FullscreenMode, {
    isActive: isFullscreenActive
  }), (0, _element.createElement)(_browserUrl.default, null), (0, _element.createElement)(_editor.UnsavedChangesWarning, null), (0, _element.createElement)(_editor.AutosaveMonitor, null), (0, _element.createElement)(_editor.LocalAutosaveMonitor, null), (0, _element.createElement)(_keyboardShortcuts.default, null), (0, _element.createElement)(_editor.EditorKeyboardShortcutsRegister, null), (0, _element.createElement)(_settingsSidebar.default, null), (0, _element.createElement)(_components.FocusReturnProvider, null, (0, _element.createElement)(_interface.InterfaceSkeleton, {
    className: className,
    labels: interfaceLabels,
    header: (0, _element.createElement)(_header.default, {
      isInserterOpen: isInserterOpen,
      onToggleInserter: function onToggleInserter() {
        return setIsInserterOpen(!isInserterOpen);
      },
      setEntitiesSavedStatesCallback: setEntitiesSavedStatesCallback
    }),
    leftSidebar: mode === 'visual' && isInserterOpen && (0, _element.createElement)("div", {
      className: "edit-post-layout__inserter-panel"
    }, (0, _element.createElement)("div", {
      className: "edit-post-layout__inserter-panel-header"
    }, (0, _element.createElement)(_components.Button, {
      icon: _icons.close,
      onClick: function onClick() {
        return setIsInserterOpen(false);
      }
    })), (0, _element.createElement)("div", {
      className: "edit-post-layout__inserter-panel-content"
    }, (0, _element.createElement)(_blockEditor.__experimentalLibrary, {
      showInserterHelpPanel: true,
      onSelect: function onSelect() {
        if (isMobileViewport) {
          setIsInserterOpen(false);
        }
      }
    }))),
    sidebar: (!isMobileViewport || sidebarIsOpened) && (0, _element.createElement)(_element.Fragment, null, !isMobileViewport && !sidebarIsOpened && (0, _element.createElement)("div", {
      className: "edit-post-layout__toogle-sidebar-panel"
    }, (0, _element.createElement)(_components.Button, {
      isSecondary: true,
      className: "edit-post-layout__toogle-sidebar-panel-button",
      onClick: openSidebarPanel,
      "aria-expanded": false
    }, hasBlockSelected ? (0, _i18n.__)('Open block settings') : (0, _i18n.__)('Open document settings'))), (0, _element.createElement)(_interface.ComplementaryArea.Slot, {
      scope: "core/edit-post"
    })),
    content: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.EditorNotices, null), (mode === 'text' || !isRichEditingEnabled) && (0, _element.createElement)(_textEditor.default, null), isRichEditingEnabled && mode === 'visual' && (0, _element.createElement)(_visualEditor.default, null), (0, _element.createElement)("div", {
      className: "edit-post-layout__metaboxes"
    }, (0, _element.createElement)(_metaBoxes.default, {
      location: "normal"
    }), (0, _element.createElement)(_metaBoxes.default, {
      location: "advanced"
    })), isMobileViewport && sidebarIsOpened && (0, _element.createElement)(_components.ScrollLock, null)),
    footer: !isMobileViewport && isRichEditingEnabled && mode === 'visual' && (0, _element.createElement)("div", {
      className: "edit-post-layout__footer"
    }, (0, _element.createElement)(_blockEditor.BlockBreadcrumb, null)),
    actions: (0, _element.createElement)(_actionsPanel.default, {
      closeEntitiesSavedStates: closeEntitiesSavedStates,
      isEntitiesSavedStatesOpen: entitiesSavedStatesCallback,
      setEntitiesSavedStatesCallback: setEntitiesSavedStatesCallback
    }),
    shortcuts: {
      previous: previousShortcut,
      next: nextShortcut
    }
  }), (0, _element.createElement)(_manageBlocksModal.default, null), (0, _element.createElement)(_optionsModal.default, null), (0, _element.createElement)(_keyboardShortcutHelpModal.default, null), (0, _element.createElement)(_welcomeGuide.default, null), (0, _element.createElement)(_components.Popover.Slot, null), (0, _element.createElement)(_plugins.PluginArea, null)));
}

var _default = Layout;
exports.default = _default;
//# sourceMappingURL=index.js.map