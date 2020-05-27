"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditorContext = useEditorContext;
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _coreData = require("@wordpress/core-data");

var _blockEditor = require("@wordpress/block-editor");

var _compose = require("@wordpress/compose");

var _interface = require("@wordpress/interface");

var _editor = require("@wordpress/editor");

var _i18n = require("@wordpress/i18n");

var _plugins = require("@wordpress/plugins");

var _icons = require("@wordpress/icons");

var _notices = _interopRequireDefault(require("../notices"));

var _header = _interopRequireDefault(require("../header"));

var _sidebar = require("../sidebar");

var _blockEditor2 = _interopRequireDefault(require("../block-editor"));

var _keyboardShortcuts = _interopRequireDefault(require("../keyboard-shortcuts"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Context = (0, _element.createContext)();

function useEditorContext() {
  return (0, _element.useContext)(Context);
}

var interfaceLabels = {
  leftSidebar: (0, _i18n.__)('Block Library')
};

function Editor(_ref) {
  var _settings = _ref.settings;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isInserterOpen = _useState2[0],
      setIsInserterOpen = _useState2[1];

  var isMobile = (0, _compose.useViewportMatch)('medium', '<');

  var _useState3 = (0, _element.useState)(_settings),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      settings = _useState4[0],
      setSettings = _useState4[1];

  var template = (0, _data.useSelect)(function (select) {
    return select('core').getEntityRecord('postType', settings.templateType, settings.templateId);
  }, [settings.templateType, settings.templateId]);
  var context = (0, _element.useMemo)(function () {
    return {
      settings: settings,
      setSettings: setSettings
    };
  }, [settings, setSettings]);

  var _useSelect = (0, _data.useSelect)(function (select) {
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

  var inlineStyles = (0, _blockEditor.__experimentalUseResizeCanvas)(deviceType);

  var _useState5 = (0, _element.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isEntitiesSavedStatesOpen = _useState6[0],
      setIsEntitiesSavedStatesOpen = _useState6[1];

  var openEntitiesSavedStates = (0, _element.useCallback)(function () {
    return setIsEntitiesSavedStatesOpen(true);
  }, []);
  var closeEntitiesSavedStates = (0, _element.useCallback)(function () {
    return setIsEntitiesSavedStatesOpen(false);
  }, []);
  var blockContext = (0, _element.useMemo)(function () {
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
  return template ? (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.__unstableEditorStyles, {
    styles: settings.styles
  }), (0, _element.createElement)(_interface.FullscreenMode, {
    isActive: isFullscreenActive
  }), (0, _element.createElement)(_components.SlotFillProvider, null, (0, _element.createElement)(_components.DropZoneProvider, null, (0, _element.createElement)(_coreData.EntityProvider, {
    kind: "root",
    type: "site"
  }, (0, _element.createElement)(_coreData.EntityProvider, {
    kind: "postType",
    type: settings.templateType,
    id: settings.templateId
  }, (0, _element.createElement)(_blockEditor.BlockContextProvider, {
    value: blockContext
  }, (0, _element.createElement)(Context.Provider, {
    value: context
  }, (0, _element.createElement)(_components.FocusReturnProvider, null, (0, _element.createElement)(_keyboardShortcuts.default.Register, null), (0, _element.createElement)(_sidebar.SidebarComplementaryAreaFills, null), (0, _element.createElement)(_interface.InterfaceSkeleton, {
    labels: interfaceLabels,
    leftSidebar: isInserterOpen && (0, _element.createElement)("div", {
      className: "edit-site-editor__inserter-panel"
    }, (0, _element.createElement)("div", {
      className: "edit-site-editor__inserter-panel-header"
    }, (0, _element.createElement)(_components.Button, {
      icon: _icons.close,
      onClick: function onClick() {
        return setIsInserterOpen(false);
      }
    })), (0, _element.createElement)("div", {
      className: "edit-site-editor__inserter-panel-content"
    }, (0, _element.createElement)(_blockEditor.__experimentalLibrary, {
      showInserterHelpPanel: true,
      onSelect: function onSelect() {
        if (isMobile) {
          setIsInserterOpen(false);
        }
      }
    }))),
    sidebar: sidebarIsOpened && (0, _element.createElement)(_interface.ComplementaryArea.Slot, {
      scope: "core/edit-site"
    }),
    header: (0, _element.createElement)(_header.default, {
      openEntitiesSavedStates: openEntitiesSavedStates,
      isInserterOpen: isInserterOpen,
      onToggleInserter: function onToggleInserter() {
        return setIsInserterOpen(!isInserterOpen);
      }
    }),
    content: (0, _element.createElement)(_blockEditor.BlockSelectionClearer, {
      className: "edit-site-visual-editor",
      style: inlineStyles
    }, (0, _element.createElement)(_notices.default, null), (0, _element.createElement)(_components.Popover.Slot, {
      name: "block-toolbar"
    }), (0, _element.createElement)(_blockEditor2.default, null), (0, _element.createElement)(_keyboardShortcuts.default, null)),
    actions: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.EntitiesSavedStates, {
      isOpen: isEntitiesSavedStatesOpen,
      close: closeEntitiesSavedStates
    }), !isEntitiesSavedStatesOpen && (0, _element.createElement)("div", {
      className: "edit-site-editor__toggle-save-panel"
    }, (0, _element.createElement)(_components.Button, {
      isSecondary: true,
      className: "edit-site-editor__toggle-save-panel-button",
      onClick: openEntitiesSavedStates,
      "aria-expanded": false
    }, (0, _i18n.__)('Open save panel')))),
    footer: (0, _element.createElement)(_blockEditor.BlockBreadcrumb, null)
  }), (0, _element.createElement)(_components.Popover.Slot, null), (0, _element.createElement)(_plugins.PluginArea, null))))))))) : null;
}

var _default = Editor;
exports.default = _default;
//# sourceMappingURL=index.js.map