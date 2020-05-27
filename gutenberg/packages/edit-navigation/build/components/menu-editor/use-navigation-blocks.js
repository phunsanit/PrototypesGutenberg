"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNavigationBlocks;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function createBlockFromMenuItem(menuItem) {
  var innerBlocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _blocks.createBlock)('core/navigation-link', {
    label: menuItem.title.rendered,
    url: menuItem.url
  }, innerBlocks);
}

function createMenuItemAttributesFromBlock(block) {
  return {
    title: block.attributes.label,
    url: block.attributes.url
  };
}

function useNavigationBlocks(menuId) {
  // menuItems is an array of menu item objects.
  var menuItems = (0, _data.useSelect)(function (select) {
    return select('core').getMenuItems({
      menus: menuId,
      per_page: -1
    });
  }, [menuId]);

  var _useDispatch = (0, _data.useDispatch)('core'),
      saveMenuItem = _useDispatch.saveMenuItem;

  var _useDispatch2 = (0, _data.useDispatch)('core/notices'),
      createSuccessNotice = _useDispatch2.createSuccessNotice;

  var _useState = (0, _element.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      blocks = _useState2[0],
      setBlocks = _useState2[1];

  var menuItemsRef = (0, _element.useRef)({});
  (0, _element.useEffect)(function () {
    if (!menuItems) {
      return;
    }

    var itemsByParentID = (0, _lodash.groupBy)(menuItems, 'parent');
    menuItemsRef.current = {};

    var createMenuItemBlocks = function createMenuItemBlocks(items) {
      var innerBlocks = [];

      if (!items) {
        return;
      }

      var _iterator = _createForOfIteratorHelper(items),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _itemsByParentID$item;

          var item = _step.value;
          var menuItemInnerBlocks = [];

          if ((_itemsByParentID$item = itemsByParentID[item.id]) === null || _itemsByParentID$item === void 0 ? void 0 : _itemsByParentID$item.length) {
            menuItemInnerBlocks = createMenuItemBlocks(itemsByParentID[item.id]);
          }

          var block = createBlockFromMenuItem(item, menuItemInnerBlocks);
          menuItemsRef.current[block.clientId] = item;
          innerBlocks.push(block);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return innerBlocks;
    }; // createMenuItemBlocks takes an array of top-level menu items and recursively creates all their innerBlocks


    var innerBlocks = createMenuItemBlocks(itemsByParentID[0]);
    setBlocks([(0, _blocks.createBlock)('core/navigation', {}, innerBlocks)]);
  }, [menuItems]);

  var saveBlocks = function saveBlocks() {
    var _menuItemsRef$current;

    var _blocks$ = blocks[0],
        clientId = _blocks$.clientId,
        innerBlocks = _blocks$.innerBlocks;
    var parentItemId = (_menuItemsRef$current = menuItemsRef.current[clientId]) === null || _menuItemsRef$current === void 0 ? void 0 : _menuItemsRef$current.parent;

    var saveNestedBlocks = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(nestedBlocks) {
        var parentId,
            _iterator2,
            _step2,
            block,
            menuItem,
            currentItemId,
            savedItem,
            _args = arguments;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                parentId = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
                _iterator2 = _createForOfIteratorHelper(nestedBlocks);
                _context.prev = 2;

                _iterator2.s();

              case 4:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 17;
                  break;
                }

                block = _step2.value;
                menuItem = menuItemsRef.current[block.clientId];
                currentItemId = (menuItem === null || menuItem === void 0 ? void 0 : menuItem.id) || 0;

                if (menuItem) {
                  _context.next = 13;
                  break;
                }

                _context.next = 11;
                return saveMenuItem(_objectSpread({}, createMenuItemAttributesFromBlock(block), {
                  menus: menuId,
                  parent: parentId
                }));

              case 11:
                savedItem = _context.sent;

                if (block.innerBlocks.length) {
                  currentItemId = savedItem.id;
                }

              case 13:
                if (menuItem && !(0, _lodash.isEqual)(block.attributes, createBlockFromMenuItem(menuItem).attributes)) {
                  saveMenuItem(_objectSpread({}, menuItem, {}, createMenuItemAttributesFromBlock(block), {
                    menus: menuId,
                    // Gotta do this because REST API doesn't like receiving an array here. Maybe a bug in the REST API?
                    parent: parentId
                  }));
                }

                if (block.innerBlocks.length) {
                  saveNestedBlocks(block.innerBlocks, currentItemId);
                }

              case 15:
                _context.next = 4;
                break;

              case 17:
                _context.next = 22;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](2);

                _iterator2.e(_context.t0);

              case 22:
                _context.prev = 22;

                _iterator2.f();

                return _context.finish(22);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 19, 22, 25]]);
      }));

      return function saveNestedBlocks(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    saveNestedBlocks(innerBlocks, parentItemId);
    var deletedClientIds = (0, _lodash.difference)(Object.keys(menuItemsRef.current), innerBlocks.map(function (block) {
      return block.clientId;
    })); // Disable reason, this code will eventually be implemented.
    // eslint-disable-next-line no-unused-vars

    var _iterator3 = _createForOfIteratorHelper(deletedClientIds),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {// TODO - delete menu items.

        var deletedClientId = _step3.value;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    createSuccessNotice((0, _i18n.__)('Navigation saved.'), {
      type: 'snackbar'
    });
  };

  return [blocks, setBlocks, saveBlocks];
}
//# sourceMappingURL=use-navigation-blocks.js.map