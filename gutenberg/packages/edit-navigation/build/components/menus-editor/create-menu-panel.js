"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateMenuForm = CreateMenuForm;
exports.default = void 0;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _window = window,
    DOMParser = _window.DOMParser;
var noticeId = 'edit-navigation-create-menu-error';

var menuNameMatches = function menuNameMatches(menuName) {
  return function (menu) {
    return menu.name.toLowerCase() === menuName.toLowerCase();
  };
};

function CreateMenuForm(_ref) {
  var onCancel = _ref.onCancel,
      onCreateMenu = _ref.onCreateMenu,
      menus = _ref.menus;

  var _useState = (0, _element.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      menuName = _useState2[0],
      setMenuName = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isCreatingMenu = _useState4[0],
      setIsCreatingMenu = _useState4[1];

  var menuSaveError = (0, _data.useSelect)(function (select) {
    return select('core').getLastEntitySaveError('root', 'menu');
  });

  var _useDispatch = (0, _data.useDispatch)('core'),
      saveMenu = _useDispatch.saveMenu;

  var _useDispatch2 = (0, _data.useDispatch)('core/notices'),
      createInfoNotice = _useDispatch2.createInfoNotice,
      createErrorNotice = _useDispatch2.createErrorNotice,
      removeNotice = _useDispatch2.removeNotice; // Handle REST API Error messages.


  (0, _element.useEffect)(function () {
    if (menuSaveError) {
      // Error messages from the REST API often contain HTML.
      // createErrorNotice does not support HTML in error text, so first
      // strip HTML out using DOMParser.
      var document = new DOMParser().parseFromString(menuSaveError.message, 'text/html');
      var errorText = document.body.textContent || '';
      createErrorNotice(errorText, {
        id: noticeId
      });
    }
  }, [menuSaveError]);
  var createMenu = (0, _element.useCallback)( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(event) {
      var message, menu;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Prevent form submission.
              event.preventDefault(); // Remove existing notices.

              removeNotice(noticeId);

              if (!(menuName.length === 0)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              if (!(0, _lodash.some)(menus, menuNameMatches(menuName))) {
                _context.next = 8;
                break;
              }

              message = (0, _i18n.sprintf)( // translators: %s: the name of a menu.
              (0, _i18n.__)('The menu name %s conflicts with another menu name. Please try another.'), menuName);
              createErrorNotice(message, {
                id: noticeId
              });
              return _context.abrupt("return");

            case 8:
              setIsCreatingMenu(true);
              _context.next = 11;
              return saveMenu({
                name: menuName
              });

            case 11:
              menu = _context.sent;

              if (menu) {
                createInfoNotice((0, _i18n.__)('Menu created'), {
                  type: 'snackbar',
                  isDismissible: true
                });
                onCreateMenu(menu.id);
              }

              setIsCreatingMenu(false);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [menuName, menus]);
  return (0, _element.createElement)(_components.Panel, {
    className: "edit-navigation-menus-editor__create-menu-panel"
  }, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Create navigation menu')
  }, (0, _element.createElement)("form", {
    onSubmit: createMenu
  }, (0, _element.createElement)(_components.TextControl // Disable reason - autoFocus is legitimate in this usage,
  // The first focusable on the form should be focused,
  // which is this element.
  // eslint-disable-next-line jsx-a11y/no-autofocus
  , {
    autoFocus: true,
    label: (0, _i18n.__)('Menu name'),
    value: menuName,
    onChange: setMenuName,
    placeholder: (0, _i18n.__)('Main Navigation')
  }), (0, _element.createElement)(_components.Button, {
    type: "submit",
    isBusy: isCreatingMenu,
    onClick: createMenu,
    "aria-disabled": menuName.length === 0,
    isPrimary: true
  }, (0, _i18n.__)('Create menu')), onCancel && (0, _element.createElement)(_components.Button, {
    className: "edit-navigation-menus-editor__cancel-create-menu-button",
    isSecondary: true,
    onClick: onCancel
  }, (0, _i18n.__)('Cancel')))));
}

var _default = (0, _components.withFocusReturn)(CreateMenuForm);

exports.default = _default;
//# sourceMappingURL=create-menu-panel.js.map