"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.link = void 0;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _richText = require("@wordpress/rich-text");

var _url = require("@wordpress/url");

var _icons = require("@wordpress/icons");

var _modal = _interopRequireDefault(require("./modal"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var name = 'core/link';
var link = {
  name: name,
  title: (0, _i18n.__)('Link'),
  tagName: 'a',
  className: null,
  attributes: {
    url: 'href',
    target: 'target'
  },
  edit: (0, _components.withSpokenMessages)( /*#__PURE__*/function (_Component) {
    (0, _inherits2.default)(LinkEdit, _Component);

    var _super = _createSuper(LinkEdit);

    function LinkEdit() {
      var _this;

      (0, _classCallCheck2.default)(this, LinkEdit);
      _this = _super.apply(this, arguments);
      _this.addLink = _this.addLink.bind((0, _assertThisInitialized2.default)(_this));
      _this.stopAddingLink = _this.stopAddingLink.bind((0, _assertThisInitialized2.default)(_this));
      _this.onRemoveFormat = _this.onRemoveFormat.bind((0, _assertThisInitialized2.default)(_this));
      _this.getURLFromClipboard = _this.getURLFromClipboard.bind((0, _assertThisInitialized2.default)(_this));
      _this.state = {
        addingLink: false
      };
      return _this;
    }

    (0, _createClass2.default)(LinkEdit, [{
      key: "addLink",
      value: function addLink() {
        var _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange;
        var text = (0, _richText.getTextContent)((0, _richText.slice)(value));

        if (text && (0, _url.isURL)(text)) {
          onChange((0, _richText.applyFormat)(value, {
            type: name,
            attributes: {
              url: text
            }
          }));
        } else {
          this.setState({
            addingLink: true
          });
          this.getURLFromClipboard();
        }
      }
    }, {
      key: "stopAddingLink",
      value: function stopAddingLink() {
        this.setState({
          addingLink: false
        });
      }
    }, {
      key: "getLinkSelection",
      value: function getLinkSelection() {
        var _this$props2 = this.props,
            value = _this$props2.value,
            isActive = _this$props2.isActive;
        var startFormat = (0, _richText.getActiveFormat)(value, 'core/link'); // if the link isn't selected, get the link manually by looking around the cursor
        // TODO: handle partly selected links

        if (startFormat && (0, _richText.isCollapsed)(value) && isActive) {
          var startIndex = value.start;
          var endIndex = value.end;

          while ((0, _lodash.find)(value.formats[startIndex], startFormat)) {
            startIndex--;
          }

          endIndex++;

          while ((0, _lodash.find)(value.formats[endIndex], startFormat)) {
            endIndex++;
          }

          return _objectSpread({}, value, {
            start: startIndex + 1,
            end: endIndex
          });
        }

        return value;
      }
    }, {
      key: "onRemoveFormat",
      value: function onRemoveFormat() {
        var _this$props3 = this.props,
            onChange = _this$props3.onChange,
            speak = _this$props3.speak,
            value = _this$props3.value;
        var startFormat = (0, _richText.getActiveFormat)(value, 'core/link'); // Before we try to remove anything we check if there is something at the caret position to remove.

        if ((0, _richText.isCollapsed)(value) && startFormat === undefined) {
          return;
        }

        var linkSelection = this.getLinkSelection();
        onChange((0, _richText.removeFormat)(linkSelection, name));
        speak((0, _i18n.__)('Link removed.'), 'assertive');
      }
    }, {
      key: "getURLFromClipboard",
      value: function () {
        var _getURLFromClipboard = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
          var clipboardText;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _reactNative.Clipboard.getString();

                case 2:
                  clipboardText = _context.sent;

                  if (clipboardText) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt("return");

                case 5:
                  if ((0, _url.isURL)(clipboardText)) {
                    _context.next = 7;
                    break;
                  }

                  return _context.abrupt("return");

                case 7:
                  this.setState({
                    clipboardURL: clipboardText
                  });

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getURLFromClipboard() {
          return _getURLFromClipboard.apply(this, arguments);
        }

        return getURLFromClipboard;
      }()
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            isActive = _this$props4.isActive,
            activeAttributes = _this$props4.activeAttributes,
            onChange = _this$props4.onChange;
        var linkSelection = this.getLinkSelection(); // If no URL is set and we have a clipboard URL let's use it

        if (!activeAttributes.url && this.state.clipboardURL) {
          activeAttributes.url = this.state.clipboardURL;
        }

        return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_modal.default, {
          isVisible: this.state.addingLink,
          isActive: isActive,
          activeAttributes: activeAttributes,
          onClose: this.stopAddingLink,
          onChange: onChange,
          onRemove: this.onRemoveFormat,
          value: linkSelection
        }), (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
          name: "link",
          icon: _icons.link,
          title: (0, _i18n.__)('Link'),
          onClick: this.addLink,
          isActive: isActive,
          shortcutType: "primary",
          shortcutCharacter: "k"
        }));
      }
    }]);
    return LinkEdit;
  }(_element.Component))
};
exports.link = link;
//# sourceMappingURL=index.native.js.map