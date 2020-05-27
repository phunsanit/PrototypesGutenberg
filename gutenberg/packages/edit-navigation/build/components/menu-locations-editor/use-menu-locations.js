"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMenuLocations;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useMenuLocations() {
  var _useDispatch = (0, _data.useDispatch)('core'),
      saveMenu = _useDispatch.saveMenu;

  var _useState = (0, _element.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      menuLocations = _useState2[0],
      setMenuLocations = _useState2[1];

  var _useState3 = (0, _element.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      emptyLocations = _useState4[0],
      setEmptyLocations = _useState4[1]; // a local state which maps menus to locations
  // so that we can send one call per menu when
  // updating locations, otherwise, without this local state
  // we'd send one call per location


  var _useState5 = (0, _element.useState)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      menuLocationMap = _useState6[0],
      setMenuLocationMap = _useState6[1];

  var initMenuLocations = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var path, apiLocations;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              path = '/__experimental/menu-locations';
              _context.next = 3;
              return (0, _apiFetch.default)({
                path: path,
                method: 'GET'
              });

            case 3:
              apiLocations = _context.sent;
              setMenuLocations((0, _lodash.flatMap)(apiLocations));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function initMenuLocations() {
      return _ref.apply(this, arguments);
    };
  }(); // we need to fetch the list of locations
  // because the menu location entity
  // caches their menu associations


  (0, _element.useEffect)(function () {
    initMenuLocations();
  }, []); // as soon as we have the menus we group
  // all locations by the menuId they are assigned to

  (0, _element.useEffect)(function () {
    if (menuLocations) {
      var locationsByMenu = (0, _lodash.mapValues)((0, _lodash.groupBy)(menuLocations, 'menu'), function (locations) {
        return (0, _lodash.map)(locations, 'name');
      });
      setMenuLocationMap(locationsByMenu);
    }
  }, [menuLocations]);

  var assignMenuToLocation = function assignMenuToLocation(newLocation, newMenuId) {
    newMenuId = parseInt(newMenuId); // we need the old menu ID so that we can set empty locations

    var oldMenuId = (0, _lodash.findKey)(menuLocationMap, function (locations) {
      return (0, _lodash.includes)(locations, newLocation);
    }); // we save a list on menus that were unassigned from their location
    // and the location is now empty because we need to send
    // an update to the API for these menus with an empty location set

    var newEmptyLocations = (0, _toConsumableArray2.default)(emptyLocations);

    if (newMenuId === 0) {
      if (!(0, _lodash.includes)(newEmptyLocations, oldMenuId)) {
        newEmptyLocations.push(oldMenuId);
      }
    } else if ((0, _lodash.includes)(newEmptyLocations, oldMenuId)) {
      // if the menu is assigned to another location
      // we remove it from this list because the API
      // will unassign it from the past location
      delete newEmptyLocations[oldMenuId];
    }

    setEmptyLocations(newEmptyLocations);

    var updatedLocation = _objectSpread({}, (0, _lodash.find)(menuLocations, {
      name: newLocation
    }));

    updatedLocation.menu = newMenuId;
    var updatedLocationKey = (0, _lodash.findKey)(menuLocations, {
      name: newLocation
    });
    var newMenuLocations = (0, _toConsumableArray2.default)(menuLocations);
    newMenuLocations[updatedLocationKey] = _objectSpread({}, updatedLocation);
    setMenuLocations(newMenuLocations);
  };

  var saveMenuLocations = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var _iterator, _step, _menuId, menuId;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // first call the API to empty the locations of unset menus
              _iterator = _createForOfIteratorHelper(emptyLocations);
              _context2.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context2.next = 9;
                break;
              }

              _menuId = _step.value;
              _context2.next = 7;
              return saveMenu({
                id: _menuId,
                locations: []
              });

            case 7:
              _context2.next = 3;
              break;

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);

              _iterator.e(_context2.t0);

            case 14:
              _context2.prev = 14;

              _iterator.f();

              return _context2.finish(14);

            case 17:
              _context2.t1 = _regenerator.default.keys(menuLocationMap);

            case 18:
              if ((_context2.t2 = _context2.t1()).done) {
                _context2.next = 25;
                break;
              }

              menuId = _context2.t2.value;

              if (!(menuId > 0)) {
                _context2.next = 23;
                break;
              }

              _context2.next = 23;
              return saveMenu({
                id: menuId,
                locations: menuLocationMap[menuId]
              });

            case 23:
              _context2.next = 18;
              break;

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 11, 14, 17]]);
    }));

    return function saveMenuLocations() {
      return _ref2.apply(this, arguments);
    };
  }();

  return [menuLocations, saveMenuLocations, assignMenuToLocation];
}
//# sourceMappingURL=use-menu-locations.js.map