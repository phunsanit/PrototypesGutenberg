import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { find } from 'lodash';
import { Clipboard } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { withSpokenMessages } from '@wordpress/components';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { applyFormat, getActiveFormat, getTextContent, isCollapsed, removeFormat, slice } from '@wordpress/rich-text';
import { isURL } from '@wordpress/url';
import { link as linkIcon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import ModalLinkUI from './modal';
var name = 'core/link';
export var link = {
  name: name,
  title: __('Link'),
  tagName: 'a',
  className: null,
  attributes: {
    url: 'href',
    target: 'target'
  },
  edit: withSpokenMessages( /*#__PURE__*/function (_Component) {
    _inherits(LinkEdit, _Component);

    var _super = _createSuper(LinkEdit);

    function LinkEdit() {
      var _this;

      _classCallCheck(this, LinkEdit);

      _this = _super.apply(this, arguments);
      _this.addLink = _this.addLink.bind(_assertThisInitialized(_this));
      _this.stopAddingLink = _this.stopAddingLink.bind(_assertThisInitialized(_this));
      _this.onRemoveFormat = _this.onRemoveFormat.bind(_assertThisInitialized(_this));
      _this.getURLFromClipboard = _this.getURLFromClipboard.bind(_assertThisInitialized(_this));
      _this.state = {
        addingLink: false
      };
      return _this;
    }

    _createClass(LinkEdit, [{
      key: "addLink",
      value: function addLink() {
        var _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange;
        var text = getTextContent(slice(value));

        if (text && isURL(text)) {
          onChange(applyFormat(value, {
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
        var startFormat = getActiveFormat(value, 'core/link'); // if the link isn't selected, get the link manually by looking around the cursor
        // TODO: handle partly selected links

        if (startFormat && isCollapsed(value) && isActive) {
          var startIndex = value.start;
          var endIndex = value.end;

          while (find(value.formats[startIndex], startFormat)) {
            startIndex--;
          }

          endIndex++;

          while (find(value.formats[endIndex], startFormat)) {
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
        var startFormat = getActiveFormat(value, 'core/link'); // Before we try to remove anything we check if there is something at the caret position to remove.

        if (isCollapsed(value) && startFormat === undefined) {
          return;
        }

        var linkSelection = this.getLinkSelection();
        onChange(removeFormat(linkSelection, name));
        speak(__('Link removed.'), 'assertive');
      }
    }, {
      key: "getURLFromClipboard",
      value: function () {
        var _getURLFromClipboard = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var clipboardText;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Clipboard.getString();

                case 2:
                  clipboardText = _context.sent;

                  if (clipboardText) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt("return");

                case 5:
                  if (isURL(clipboardText)) {
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

        return createElement(Fragment, null, createElement(ModalLinkUI, {
          isVisible: this.state.addingLink,
          isActive: isActive,
          activeAttributes: activeAttributes,
          onClose: this.stopAddingLink,
          onChange: onChange,
          onRemove: this.onRemoveFormat,
          value: linkSelection
        }), createElement(RichTextToolbarButton, {
          name: "link",
          icon: linkIcon,
          title: __('Link'),
          onClick: this.addLink,
          isActive: isActive,
          shortcutType: "primary",
          shortcutCharacter: "k"
        }));
      }
    }]);

    return LinkEdit;
  }(Component))
};
//# sourceMappingURL=index.native.js.map