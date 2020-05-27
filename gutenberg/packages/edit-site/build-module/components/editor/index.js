import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { createContext, useContext, useState, useMemo, useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { SlotFillProvider, DropZoneProvider, Popover, FocusReturnProvider, Button } from '@wordpress/components';
import { EntityProvider } from '@wordpress/core-data';
import { BlockContextProvider, BlockSelectionClearer, BlockBreadcrumb, __unstableEditorStyles as EditorStyles, __experimentalUseResizeCanvas as useResizeCanvas, __experimentalLibrary as Library } from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
import { FullscreenMode, InterfaceSkeleton, ComplementaryArea } from '@wordpress/interface';
import { EntitiesSavedStates } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { PluginArea } from '@wordpress/plugins';
import { close } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import Notices from '../notices';
import Header from '../header';
import { SidebarComplementaryAreaFills } from '../sidebar';
import BlockEditor from '../block-editor';
import KeyboardShortcuts from '../keyboard-shortcuts';
var Context = createContext();
export function useEditorContext() {
  return useContext(Context);
}
var interfaceLabels = {
  leftSidebar: __('Block Library')
};

function Editor(_ref) {
  var _settings = _ref.settings;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isInserterOpen = _useState2[0],
      setIsInserterOpen = _useState2[1];

  var isMobile = useViewportMatch('medium', '<');

  var _useState3 = useState(_settings),
      _useState4 = _slicedToArray(_useState3, 2),
      settings = _useState4[0],
      setSettings = _useState4[1];

  var template = useSelect(function (select) {
    return select('core').getEntityRecord('postType', settings.templateType, settings.templateId);
  }, [settings.templateType, settings.templateId]);
  var context = useMemo(function () {
    return {
      settings: settings,
      setSettings: setSettings
    };
  }, [settings, setSettings]);

  var _useSelect = useSelect(function (select) {
    var _select = select('core/edit-site'),
        isFeatureActive = _select.isFeatureActive,
        __experimentalGetPreviewDeviceType = _select.__experimentalGetPreviewDeviceType;

    return {
      isFullscreenActive: isFeatureActive('fullscreenMode'),
      deviceType: __experimentalGetPreviewDeviceType(),
      sidebarIsOpened: !!select('core/interface').getActiveComplementaryArea('core/edit-site')
    };
  }, []),
      isFullscreenActive = _useSelect.isFullscreenActive,
      deviceType = _useSelect.deviceType,
      sidebarIsOpened = _useSelect.sidebarIsOpened;

  var inlineStyles = useResizeCanvas(deviceType);

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isEntitiesSavedStatesOpen = _useState6[0],
      setIsEntitiesSavedStatesOpen = _useState6[1];

  var openEntitiesSavedStates = useCallback(function () {
    return setIsEntitiesSavedStatesOpen(true);
  }, []);
  var closeEntitiesSavedStates = useCallback(function () {
    return setIsEntitiesSavedStatesOpen(false);
  }, []);
  var blockContext = useMemo(function () {
    if (!settings.page.context.queryContext) return settings.page.context;
    return _objectSpread({}, settings.page.context, {
      queryContext: [settings.page.context.queryContext, function (newQueryContext) {
        return setSettings(function (prevSettings) {
          return _objectSpread({}, prevSettings, {
            page: _objectSpread({}, prevSettings.page, {
              context: _objectSpread({}, prevSettings.page.context, {
                queryContext: _objectSpread({}, prevSettings.page.context.queryContext, {}, newQueryContext)
              })
            })
          });
        });
      }]
    });
  }, [settings.page.context]);
  return template ? createElement(Fragment, null, createElement(EditorStyles, {
    styles: settings.styles
  }), createElement(FullscreenMode, {
    isActive: isFullscreenActive
  }), createElement(SlotFillProvider, null, createElement(DropZoneProvider, null, createElement(EntityProvider, {
    kind: "root",
    type: "site"
  }, createElement(EntityProvider, {
    kind: "postType",
    type: settings.templateType,
    id: settings.templateId
  }, createElement(BlockContextProvider, {
    value: blockContext
  }, createElement(Context.Provider, {
    value: context
  }, createElement(FocusReturnProvider, null, createElement(KeyboardShortcuts.Register, null), createElement(SidebarComplementaryAreaFills, null), createElement(InterfaceSkeleton, {
    labels: interfaceLabels,
    leftSidebar: isInserterOpen && createElement("div", {
      className: "edit-site-editor__inserter-panel"
    }, createElement("div", {
      className: "edit-site-editor__inserter-panel-header"
    }, createElement(Button, {
      icon: close,
      onClick: function onClick() {
        return setIsInserterOpen(false);
      }
    })), createElement("div", {
      className: "edit-site-editor__inserter-panel-content"
    }, createElement(Library, {
      showInserterHelpPanel: true,
      onSelect: function onSelect() {
        if (isMobile) {
          setIsInserterOpen(false);
        }
      }
    }))),
    sidebar: sidebarIsOpened && createElement(ComplementaryArea.Slot, {
      scope: "core/edit-site"
    }),
    header: createElement(Header, {
      openEntitiesSavedStates: openEntitiesSavedStates,
      isInserterOpen: isInserterOpen,
      onToggleInserter: function onToggleInserter() {
        return setIsInserterOpen(!isInserterOpen);
      }
    }),
    content: createElement(BlockSelectionClearer, {
      className: "edit-site-visual-editor",
      style: inlineStyles
    }, createElement(Notices, null), createElement(Popover.Slot, {
      name: "block-toolbar"
    }), createElement(BlockEditor, null), createElement(KeyboardShortcuts, null)),
    actions: createElement(Fragment, null, createElement(EntitiesSavedStates, {
      isOpen: isEntitiesSavedStatesOpen,
      close: closeEntitiesSavedStates
    }), !isEntitiesSavedStatesOpen && createElement("div", {
      className: "edit-site-editor__toggle-save-panel"
    }, createElement(Button, {
      isSecondary: true,
      className: "edit-site-editor__toggle-save-panel-button",
      onClick: openEntitiesSavedStates,
      "aria-expanded": false
    }, __('Open save panel')))),
    footer: createElement(BlockBreadcrumb, null)
  }), createElement(Popover.Slot, null), createElement(PluginArea, null))))))))) : null;
}

export default Editor;
//# sourceMappingURL=index.js.map