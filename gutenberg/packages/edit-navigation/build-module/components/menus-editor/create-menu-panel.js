import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { some } from 'lodash';
/**
 * WordPress dependencies
 */

import { Button, Panel, PanelBody, TextControl, withFocusReturn } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
var _window = window,
    DOMParser = _window.DOMParser;
var noticeId = 'edit-navigation-create-menu-error';

var menuNameMatches = function menuNameMatches(menuName) {
  return function (menu) {
    return menu.name.toLowerCase() === menuName.toLowerCase();
  };
};

export function CreateMenuForm(_ref) {
  var onCancel = _ref.onCancel,
      onCreateMenu = _ref.onCreateMenu,
      menus = _ref.menus;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      menuName = _useState2[0],
      setMenuName = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isCreatingMenu = _useState4[0],
      setIsCreatingMenu = _useState4[1];

  var menuSaveError = useSelect(function (select) {
    return select('core').getLastEntitySaveError('root', 'menu');
  });

  var _useDispatch = useDispatch('core'),
      saveMenu = _useDispatch.saveMenu;

  var _useDispatch2 = useDispatch('core/notices'),
      createInfoNotice = _useDispatch2.createInfoNotice,
      createErrorNotice = _useDispatch2.createErrorNotice,
      removeNotice = _useDispatch2.removeNotice; // Handle REST API Error messages.


  useEffect(function () {
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
  var createMenu = useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(event) {
      var message, menu;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
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
              if (!some(menus, menuNameMatches(menuName))) {
                _context.next = 8;
                break;
              }

              message = sprintf( // translators: %s: the name of a menu.
              __('The menu name %s conflicts with another menu name. Please try another.'), menuName);
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
                createInfoNotice(__('Menu created'), {
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
  return createElement(Panel, {
    className: "edit-navigation-menus-editor__create-menu-panel"
  }, createElement(PanelBody, {
    title: __('Create navigation menu')
  }, createElement("form", {
    onSubmit: createMenu
  }, createElement(TextControl // Disable reason - autoFocus is legitimate in this usage,
  // The first focusable on the form should be focused,
  // which is this element.
  // eslint-disable-next-line jsx-a11y/no-autofocus
  , {
    autoFocus: true,
    label: __('Menu name'),
    value: menuName,
    onChange: setMenuName,
    placeholder: __('Main Navigation')
  }), createElement(Button, {
    type: "submit",
    isBusy: isCreatingMenu,
    onClick: createMenu,
    "aria-disabled": menuName.length === 0,
    isPrimary: true
  }, __('Create menu')), onCancel && createElement(Button, {
    className: "edit-navigation-menus-editor__cancel-create-menu-button",
    isSecondary: true,
    onClick: onCancel
  }, __('Cancel')))));
}
export default withFocusReturn(CreateMenuForm);
//# sourceMappingURL=create-menu-panel.js.map