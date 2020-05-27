import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
export default function DeleteMenuButton(_ref) {
  var menuId = _ref.menuId,
      onDelete = _ref.onDelete;

  var deleteMenu = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(recordId) {
      var path, deletedRecord;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              path = "/__experimental/menus/".concat(recordId, "?force=true");
              _context.next = 3;
              return apiFetch({
                path: path,
                method: 'DELETE'
              });

            case 3:
              deletedRecord = _context.sent;
              return _context.abrupt("return", deletedRecord.previous);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function deleteMenu(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var askToDelete = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var deletedMenu;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (! // eslint-disable-next-line no-alert
              window.confirm(__('Are you sure you want to delete this navigation?'))) {
                _context2.next = 5;
                break;
              }

              _context2.next = 3;
              return deleteMenu(menuId);

            case 3:
              deletedMenu = _context2.sent;
              onDelete(deletedMenu.id);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function askToDelete() {
      return _ref3.apply(this, arguments);
    };
  }();

  return createElement(Button, {
    className: "menu-editor-button__delete",
    isPrimary: true,
    onClick: askToDelete,
    isLink: true
  }, __('Delete navigation'));
}
//# sourceMappingURL=index.js.map