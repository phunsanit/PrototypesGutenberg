"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeleteMenuButton;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function DeleteMenuButton(_ref) {
  var menuId = _ref.menuId,
      onDelete = _ref.onDelete;

  var deleteMenu = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(recordId) {
      var path, deletedRecord;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              path = "/__experimental/menus/".concat(recordId, "?force=true");
              _context.next = 3;
              return (0, _apiFetch.default)({
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
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var deletedMenu;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (! // eslint-disable-next-line no-alert
              window.confirm((0, _i18n.__)('Are you sure you want to delete this navigation?'))) {
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

  return (0, _element.createElement)(_components.Button, {
    className: "menu-editor-button__delete",
    isPrimary: true,
    onClick: askToDelete,
    isLink: true
  }, (0, _i18n.__)('Delete navigation'));
}
//# sourceMappingURL=index.js.map