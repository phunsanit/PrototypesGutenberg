"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AdminNotices = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Mapping of server-supported notice class names to an equivalent notices
 * module status.
 *
 * @type {Map}
 */
var NOTICE_CLASS_STATUSES = {
  'notice-success': 'success',
  updated: 'success',
  'notice-warning': 'warning',
  'notice-error': 'error',
  error: 'error',
  'notice-info': 'info'
};
/**
 * Returns an array of admin notice Elements.
 *
 * @return {Element[]} Admin notice elements.
 */

function getAdminNotices() {
  // The order is reversed to match expectations of rendered order, since a
  // NoticesList is itself rendered in reverse order (newest to oldest).
  return Array.from(document.querySelectorAll('#wpbody-content > .notice')).reverse();
}
/**
 * Given an admin notice Element, returns the relevant notice content HTML.
 *
 * @param {Element} element Admin notice element.
 *
 * @return {Element} Upgraded notice HTML.
 */


function getNoticeHTML(element) {
  var fragments = [];

  var _iterator = _createForOfIteratorHelper(element.childNodes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var child = _step.value;

      if (child.nodeType !== window.Node.ELEMENT_NODE) {
        var value = child.nodeValue.trim();

        if (value) {
          fragments.push(child.nodeValue);
        }
      } else if (!child.classList.contains('notice-dismiss')) {
        fragments.push(child.outerHTML);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return fragments.join('');
}
/**
 * Given an admin notice Element, returns the upgraded status type, or
 * undefined if one cannot be determined (i.e. one is not assigned).
 *
 * @param {Element} element Admin notice element.
 *
 * @return {?string} Upgraded status type.
 */


function getNoticeStatus(element) {
  var _iterator2 = _createForOfIteratorHelper(element.classList),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var className = _step2.value;

      if (NOTICE_CLASS_STATUSES.hasOwnProperty(className)) {
        return NOTICE_CLASS_STATUSES[className];
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

var AdminNotices = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(AdminNotices, _Component);

  var _super = _createSuper(AdminNotices);

  function AdminNotices() {
    (0, _classCallCheck2.default)(this, AdminNotices);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(AdminNotices, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.convertNotices();
    }
  }, {
    key: "convertNotices",
    value: function convertNotices() {
      var createNotice = this.props.createNotice;
      getAdminNotices().forEach(function (element) {
        // Convert and create.
        var status = getNoticeStatus(element);
        var content = getNoticeHTML(element);
        var isDismissible = element.classList.contains('is-dismissible');
        createNotice(status, content, {
          speak: false,
          __unstableHTML: true,
          isDismissible: isDismissible
        }); // Remove (now-redundant) admin notice element.

        element.parentNode.removeChild(element);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return AdminNotices;
}(_element.Component);

exports.AdminNotices = AdminNotices;

var _default = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/notices'),
      createNotice = _dispatch.createNotice;

  return {
    createNotice: createNotice
  };
})(AdminNotices);

exports.default = _default;
//# sourceMappingURL=index.js.map