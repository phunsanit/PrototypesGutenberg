"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reinitializeEditor = reinitializeEditor;
exports.initializeEditor = initializeEditor;
Object.defineProperty(exports, "PluginBlockSettingsMenuItem", {
  enumerable: true,
  get: function get() {
    return _pluginBlockSettingsMenuItem.default;
  }
});
Object.defineProperty(exports, "PluginDocumentSettingPanel", {
  enumerable: true,
  get: function get() {
    return _pluginDocumentSettingPanel.default;
  }
});
Object.defineProperty(exports, "PluginMoreMenuItem", {
  enumerable: true,
  get: function get() {
    return _pluginMoreMenuItem.default;
  }
});
Object.defineProperty(exports, "PluginPostPublishPanel", {
  enumerable: true,
  get: function get() {
    return _pluginPostPublishPanel.default;
  }
});
Object.defineProperty(exports, "PluginPostStatusInfo", {
  enumerable: true,
  get: function get() {
    return _pluginPostStatusInfo.default;
  }
});
Object.defineProperty(exports, "PluginPrePublishPanel", {
  enumerable: true,
  get: function get() {
    return _pluginPrePublishPanel.default;
  }
});
Object.defineProperty(exports, "PluginSidebar", {
  enumerable: true,
  get: function get() {
    return _pluginSidebar.default;
  }
});
Object.defineProperty(exports, "PluginSidebarMoreMenuItem", {
  enumerable: true,
  get: function get() {
    return _pluginSidebarMoreMenuItem.default;
  }
});
Object.defineProperty(exports, "__experimentalFullscreenModeClose", {
  enumerable: true,
  get: function get() {
    return _fullscreenModeClose.default;
  }
});

var _element = require("@wordpress/element");

require("@wordpress/core-data");

require("@wordpress/block-editor");

require("@wordpress/editor");

require("@wordpress/keyboard-shortcuts");

require("@wordpress/viewport");

require("@wordpress/notices");

var _blockLibrary = require("@wordpress/block-library");

require("./hooks");

require("./plugins");

require("./store");

var _editor2 = _interopRequireDefault(require("./editor"));

var _pluginBlockSettingsMenuItem = _interopRequireDefault(require("./components/block-settings-menu/plugin-block-settings-menu-item"));

var _pluginDocumentSettingPanel = _interopRequireDefault(require("./components/sidebar/plugin-document-setting-panel"));

var _pluginMoreMenuItem = _interopRequireDefault(require("./components/header/plugin-more-menu-item"));

var _pluginPostPublishPanel = _interopRequireDefault(require("./components/sidebar/plugin-post-publish-panel"));

var _pluginPostStatusInfo = _interopRequireDefault(require("./components/sidebar/plugin-post-status-info"));

var _pluginPrePublishPanel = _interopRequireDefault(require("./components/sidebar/plugin-pre-publish-panel"));

var _pluginSidebar = _interopRequireDefault(require("./components/sidebar/plugin-sidebar"));

var _pluginSidebarMoreMenuItem = _interopRequireDefault(require("./components/header/plugin-sidebar-more-menu-item"));

var _fullscreenModeClose = _interopRequireDefault(require("./components/header/fullscreen-mode-close"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Reinitializes the editor after the user chooses to reboot the editor after
 * an unhandled error occurs, replacing previously mounted editor element using
 * an initial state from prior to the crash.
 *
 * @param {Object}  postType     Post type of the post to edit.
 * @param {Object}  postId       ID of the post to edit.
 * @param {Element} target       DOM node in which editor is rendered.
 * @param {?Object} settings     Editor settings object.
 * @param {Object}  initialEdits Programmatic edits to apply initially, to be
 *                               considered as non-user-initiated (bypass for
 *                               unsaved changes prompt).
 */
function reinitializeEditor(postType, postId, target, settings, initialEdits) {
  (0, _element.unmountComponentAtNode)(target);
  var reboot = reinitializeEditor.bind(null, postType, postId, target, settings, initialEdits);
  (0, _element.render)((0, _element.createElement)(_editor2.default, {
    settings: settings,
    onError: reboot,
    postId: postId,
    postType: postType,
    initialEdits: initialEdits,
    recovery: true
  }), target);
}
/**
 * Initializes and returns an instance of Editor.
 *
 * The return value of this function is not necessary if we change where we
 * call initializeEditor(). This is due to metaBox timing.
 *
 * @param {string}  id           Unique identifier for editor instance.
 * @param {Object}  postType     Post type of the post to edit.
 * @param {Object}  postId       ID of the post to edit.
 * @param {?Object} settings     Editor settings object.
 * @param {Object}  initialEdits Programmatic edits to apply initially, to be
 *                               considered as non-user-initiated (bypass for
 *                               unsaved changes prompt).
 */


function initializeEditor(id, postType, postId, settings, initialEdits) {
  var target = document.getElementById(id);
  var reboot = reinitializeEditor.bind(null, postType, postId, target, settings, initialEdits);
  (0, _blockLibrary.registerCoreBlocks)();

  if (process.env.GUTENBERG_PHASE === 2) {
    (0, _blockLibrary.__experimentalRegisterExperimentalCoreBlocks)(settings);
  } // Show a console log warning if the browser is not in Standards rendering mode.


  var documentMode = document.compatMode === 'CSS1Compat' ? 'Standards' : 'Quirks';

  if (documentMode !== 'Standards') {
    // eslint-disable-next-line no-console
    console.warn("Your browser is using Quirks Mode. \nThis can cause rendering issues such as blocks overlaying meta boxes in the editor. Quirks Mode can be triggered by PHP errors or HTML code appearing before the opening <!DOCTYPE html>. Try checking the raw page source or your site's PHP error log and resolving errors there, removing any HTML before the doctype, or disabling plugins.");
  } // This is a temporary fix for a couple of issues specific to Webkit on iOS.
  // Without this hack the browser scrolls the mobile toolbar off-screen.
  // Once supported in Safari we can replace this in favor of preventScroll.
  // For details see issue #18632 and PR #18686
  // Specifically, we scroll `interface-interface-skeleton__body` to enable a fixed top toolbar.
  // But Mobile Safari forces the `html` element to scroll upwards, hiding the toolbar.


  var isIphone = window.navigator.userAgent.indexOf('iPhone') !== -1;

  if (isIphone) {
    window.addEventListener('scroll', function (event) {
      var editorScrollContainer = document.getElementsByClassName('interface-interface-skeleton__body')[0];

      if (event.target === document) {
        // Scroll element into view by scrolling the editor container by the same amount
        // that Mobile Safari tried to scroll the html element upwards.
        if (window.scrollY > 100) {
          editorScrollContainer.scrollTop = editorScrollContainer.scrollTop + window.scrollY;
        } // Undo unwanted scroll on html element, but only in the visual editor.


        if (document.getElementsByClassName('is-mode-visual')[0]) {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  (0, _element.render)((0, _element.createElement)(_editor2.default, {
    settings: settings,
    onError: reboot,
    postId: postId,
    postType: postType,
    initialEdits: initialEdits
  }), target);
}
//# sourceMappingURL=index.js.map