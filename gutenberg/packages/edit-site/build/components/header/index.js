"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _compose = require("@wordpress/compose");

var _url = require("@wordpress/url");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _interface = require("@wordpress/interface");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _components = require("@wordpress/components");

var _editor = require("../editor");

var _moreMenu = _interopRequireDefault(require("./more-menu"));

var _pageSwitcher = _interopRequireDefault(require("../page-switcher"));

var _templateSwitcher = _interopRequireDefault(require("../template-switcher"));

var _saveButton = _interopRequireDefault(require("../save-button"));

var _undo = _interopRequireDefault(require("./undo-redo/undo"));

var _redo = _interopRequireDefault(require("./undo-redo/redo"));

var _fullscreenModeClose = _interopRequireDefault(require("./fullscreen-mode-close"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Browser dependencies
 */
var _window = window,
    fetch = _window.fetch;

function Header(_ref) {
  var openEntitiesSavedStates = _ref.openEntitiesSavedStates,
      isInserterOpen = _ref.isInserterOpen,
      onToggleInserter = _ref.onToggleInserter;

  var _useEditorContext = (0, _editor.useEditorContext)(),
      settings = _useEditorContext.settings,
      setSettings = _useEditorContext.setSettings;

  var setActiveTemplateId = (0, _element.useCallback)(function (newTemplateId) {
    return setSettings(function (prevSettings) {
      return _objectSpread({}, prevSettings, {
        templateId: newTemplateId,
        templateType: 'wp_template'
      });
    });
  }, []);
  var setActiveTemplatePartId = (0, _element.useCallback)(function (newTemplatePartId) {
    return setSettings(function (prevSettings) {
      return _objectSpread({}, prevSettings, {
        templateId: newTemplatePartId,
        templateType: 'wp_template_part'
      });
    });
  }, []);
  var addTemplateId = (0, _element.useCallback)(function (newTemplateId) {
    return setSettings(function (prevSettings) {
      return _objectSpread({}, prevSettings, {
        templateId: newTemplateId,
        templateIds: [].concat((0, _toConsumableArray2.default)(prevSettings.templateIds), [newTemplateId])
      });
    });
  }, []);
  var setActivePage = (0, _element.useCallback)( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(newPage) {
      var _yield$fetch$then, success, data, newTemplateId;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch((0, _url.addQueryArgs)(newPage.path, {
                '_wp-find-template': true
              })).then(function (res) {
                return res.json();
              });

            case 3:
              _yield$fetch$then = _context.sent;
              success = _yield$fetch$then.success;
              data = _yield$fetch$then.data;

              if (!success) {
                _context.next = 13;
                break;
              }

              newTemplateId = data.ID;

              if (!(newTemplateId === null)) {
                _context.next = 12;
                break;
              }

              _context.next = 11;
              return (0, _data.__experimentalResolveSelect)('core').getEntityRecords('postType', 'wp_template', {
                resolved: true,
                slug: data.post_name
              });

            case 11:
              newTemplateId = _context.sent[0].id;

            case 12:
              setSettings(function (prevSettings) {
                return _objectSpread({}, prevSettings, {
                  page: newPage,
                  templateId: newTemplateId,
                  templateType: 'wp_template'
                });
              });

            case 13:
              _context.next = 17;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }(), []);

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/edit-site'),
        __experimentalGetPreviewDeviceType = _select.__experimentalGetPreviewDeviceType,
        isFeatureActive = _select.isFeatureActive;

    return {
      deviceType: __experimentalGetPreviewDeviceType(),
      hasFixedToolbar: isFeatureActive('fixedToolbar')
    };
  }, []),
      deviceType = _useSelect.deviceType,
      hasFixedToolbar = _useSelect.hasFixedToolbar;

  var _useDispatch = (0, _data.useDispatch)('core/edit-site'),
      setPreviewDeviceType = _useDispatch.__experimentalSetPreviewDeviceType;

  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  var displayBlockToolbar = !isLargeViewport || deviceType !== 'Desktop' || hasFixedToolbar;
  return (0, _element.createElement)("div", {
    className: "edit-site-header"
  }, (0, _element.createElement)(_interface.__experimentalMainDashboardButton.Slot, null, (0, _element.createElement)(_fullscreenModeClose.default, null)), (0, _element.createElement)("div", {
    className: "edit-site-header__toolbar"
  }, (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    isPressed: isInserterOpen,
    onClick: onToggleInserter,
    icon: _icons.plus,
    label: (0, _i18n._x)('Add block', 'Generic label for block inserter button')
  }), (0, _element.createElement)(_blockEditor.ToolSelector, null), (0, _element.createElement)(_undo.default, null), (0, _element.createElement)(_redo.default, null), (0, _element.createElement)(_blockEditor.BlockNavigationDropdown, null), displayBlockToolbar && (0, _element.createElement)("div", {
    className: "edit-site-header-toolbar__block-toolbar"
  }, (0, _element.createElement)(_blockEditor.BlockToolbar, {
    hideDragHandle: true
  })), (0, _element.createElement)("div", {
    className: "edit-site-header__toolbar-switchers"
  }, (0, _element.createElement)(_pageSwitcher.default, {
    showOnFront: settings.showOnFront,
    activePage: settings.page,
    onActivePageChange: setActivePage
  }), (0, _element.createElement)("div", {
    className: "edit-site-header__toolbar-switchers-separator"
  }, "/"), (0, _element.createElement)(_templateSwitcher.default, {
    ids: settings.templateIds,
    templatePartIds: settings.templatePartIds,
    activeId: settings.templateId,
    homeId: settings.homeTemplateId,
    isTemplatePart: settings.templateType === 'wp_template_part',
    onActiveIdChange: setActiveTemplateId,
    onActiveTemplatePartIdChange: setActiveTemplatePartId,
    onAddTemplateId: addTemplateId
  }))), (0, _element.createElement)("div", {
    className: "edit-site-header__actions"
  }, (0, _element.createElement)(_blockEditor.__experimentalPreviewOptions, {
    deviceType: deviceType,
    setDeviceType: setPreviewDeviceType
  }), (0, _element.createElement)(_saveButton.default, {
    openEntitiesSavedStates: openEntitiesSavedStates
  }), (0, _element.createElement)(_interface.PinnedItems.Slot, {
    scope: "core/edit-site"
  }), (0, _element.createElement)(_moreMenu.default, null)));
}
//# sourceMappingURL=index.js.map