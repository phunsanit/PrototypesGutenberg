import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { BlockNavigationDropdown, ToolSelector, BlockToolbar, __experimentalPreviewOptions as PreviewOptions } from '@wordpress/block-editor';
import { __experimentalResolveSelect as resolveSelect, useSelect, useDispatch } from '@wordpress/data';
import { PinnedItems, __experimentalMainDashboardButton as MainDashboardButton } from '@wordpress/interface';
import { _x } from '@wordpress/i18n';
import { plus } from '@wordpress/icons';
import { Button } from '@wordpress/components';
/**
 * Internal dependencies
 */

import { useEditorContext } from '../editor';
import MoreMenu from './more-menu';
import PageSwitcher from '../page-switcher';
import TemplateSwitcher from '../template-switcher';
import SaveButton from '../save-button';
import UndoButton from './undo-redo/undo';
import RedoButton from './undo-redo/redo';
import FullscreenModeClose from './fullscreen-mode-close';
/**
 * Browser dependencies
 */

var _window = window,
    fetch = _window.fetch;
export default function Header(_ref) {
  var openEntitiesSavedStates = _ref.openEntitiesSavedStates,
      isInserterOpen = _ref.isInserterOpen,
      onToggleInserter = _ref.onToggleInserter;

  var _useEditorContext = useEditorContext(),
      settings = _useEditorContext.settings,
      setSettings = _useEditorContext.setSettings;

  var setActiveTemplateId = useCallback(function (newTemplateId) {
    return setSettings(function (prevSettings) {
      return _objectSpread({}, prevSettings, {
        templateId: newTemplateId,
        templateType: 'wp_template'
      });
    });
  }, []);
  var setActiveTemplatePartId = useCallback(function (newTemplatePartId) {
    return setSettings(function (prevSettings) {
      return _objectSpread({}, prevSettings, {
        templateId: newTemplatePartId,
        templateType: 'wp_template_part'
      });
    });
  }, []);
  var addTemplateId = useCallback(function (newTemplateId) {
    return setSettings(function (prevSettings) {
      return _objectSpread({}, prevSettings, {
        templateId: newTemplateId,
        templateIds: [].concat(_toConsumableArray(prevSettings.templateIds), [newTemplateId])
      });
    });
  }, []);
  var setActivePage = useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(newPage) {
      var _yield$fetch$then, success, data, newTemplateId;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch(addQueryArgs(newPage.path, {
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
              return resolveSelect('core').getEntityRecords('postType', 'wp_template', {
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

  var _useSelect = useSelect(function (select) {
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

  var _useDispatch = useDispatch('core/edit-site'),
      setPreviewDeviceType = _useDispatch.__experimentalSetPreviewDeviceType;

  var isLargeViewport = useViewportMatch('medium');
  var displayBlockToolbar = !isLargeViewport || deviceType !== 'Desktop' || hasFixedToolbar;
  return createElement("div", {
    className: "edit-site-header"
  }, createElement(MainDashboardButton.Slot, null, createElement(FullscreenModeClose, null)), createElement("div", {
    className: "edit-site-header__toolbar"
  }, createElement(Button, {
    isPrimary: true,
    isPressed: isInserterOpen,
    onClick: onToggleInserter,
    icon: plus,
    label: _x('Add block', 'Generic label for block inserter button')
  }), createElement(ToolSelector, null), createElement(UndoButton, null), createElement(RedoButton, null), createElement(BlockNavigationDropdown, null), displayBlockToolbar && createElement("div", {
    className: "edit-site-header-toolbar__block-toolbar"
  }, createElement(BlockToolbar, {
    hideDragHandle: true
  })), createElement("div", {
    className: "edit-site-header__toolbar-switchers"
  }, createElement(PageSwitcher, {
    showOnFront: settings.showOnFront,
    activePage: settings.page,
    onActivePageChange: setActivePage
  }), createElement("div", {
    className: "edit-site-header__toolbar-switchers-separator"
  }, "/"), createElement(TemplateSwitcher, {
    ids: settings.templateIds,
    templatePartIds: settings.templatePartIds,
    activeId: settings.templateId,
    homeId: settings.homeTemplateId,
    isTemplatePart: settings.templateType === 'wp_template_part',
    onActiveIdChange: setActiveTemplateId,
    onActiveTemplatePartIdChange: setActiveTemplatePartId,
    onAddTemplateId: addTemplateId
  }))), createElement("div", {
    className: "edit-site-header__actions"
  }, createElement(PreviewOptions, {
    deviceType: deviceType,
    setDeviceType: setPreviewDeviceType
  }), createElement(SaveButton, {
    openEntitiesSavedStates: openEntitiesSavedStates
  }), createElement(PinnedItems.Slot, {
    scope: "core/edit-site"
  }), createElement(MoreMenu, null)));
}
//# sourceMappingURL=index.js.map