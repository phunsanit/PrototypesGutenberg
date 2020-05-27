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
 * Internal dependencies
 */
import { createUpgradedEmbedBlock, getClassNames, fallback as _fallback, getAttributesFromPreview } from './util';
import EmbedControls from './embed-controls';
import EmbedLoading from './embed-loading';
import EmbedPlaceholder from './embed-placeholder';
import EmbedPreview from './embed-preview';
/**
 * External dependencies
 */

import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
export function getEmbedEditComponent(title, icon) {
  var responsive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return /*#__PURE__*/function (_Component) {
    _inherits(_class, _Component);

    var _super = _createSuper(_class);

    function _class() {
      var _this;

      _classCallCheck(this, _class);

      _this = _super.apply(this, arguments);
      _this.switchBackToURLInput = _this.switchBackToURLInput.bind(_assertThisInitialized(_this));
      _this.setUrl = _this.setUrl.bind(_assertThisInitialized(_this));
      _this.getMergedAttributes = _this.getMergedAttributes.bind(_assertThisInitialized(_this));
      _this.setMergedAttributes = _this.setMergedAttributes.bind(_assertThisInitialized(_this));
      _this.getResponsiveHelp = _this.getResponsiveHelp.bind(_assertThisInitialized(_this));
      _this.toggleResponsive = _this.toggleResponsive.bind(_assertThisInitialized(_this));
      _this.handleIncomingPreview = _this.handleIncomingPreview.bind(_assertThisInitialized(_this));
      _this.state = {
        editingURL: false,
        url: _this.props.attributes.url
      };

      if (_this.props.preview) {
        _this.handleIncomingPreview();
      }

      return _this;
    }

    _createClass(_class, [{
      key: "handleIncomingPreview",
      value: function handleIncomingPreview() {
        this.setMergedAttributes();

        if (this.props.onReplace) {
          var upgradedBlock = createUpgradedEmbedBlock(this.props, this.getMergedAttributes());

          if (upgradedBlock) {
            this.props.onReplace(upgradedBlock);
          }
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var hasPreview = undefined !== this.props.preview;
        var hadPreview = undefined !== prevProps.preview;
        var previewChanged = prevProps.preview && this.props.preview && this.props.preview.html !== prevProps.preview.html;
        var switchedPreview = previewChanged || hasPreview && !hadPreview;
        var switchedURL = this.props.attributes.url !== prevProps.attributes.url;

        if (switchedPreview || switchedURL) {
          if (this.props.cannotEmbed) {
            // We either have a new preview or a new URL, but we can't embed it.
            if (!this.props.fetching) {
              // If we're not fetching the preview, then we know it can't be embedded, so try
              // removing any trailing slash, and resubmit.
              this.resubmitWithoutTrailingSlash();
            }

            return;
          }

          this.handleIncomingPreview();
        }
      }
    }, {
      key: "resubmitWithoutTrailingSlash",
      value: function resubmitWithoutTrailingSlash() {
        this.setState(function (prevState) {
          return {
            url: prevState.url.replace(/\/$/, '')
          };
        }, this.setUrl);
      }
    }, {
      key: "setUrl",
      value: function setUrl(event) {
        if (event) {
          event.preventDefault();
        }

        var url = this.state.url;
        var setAttributes = this.props.setAttributes;
        this.setState({
          editingURL: false
        });
        setAttributes({
          url: url
        });
      }
      /***
       * @return {Object} Attributes derived from the preview, merged with the current attributes.
       */

    }, {
      key: "getMergedAttributes",
      value: function getMergedAttributes() {
        var preview = this.props.preview;
        var _this$props$attribute = this.props.attributes,
            className = _this$props$attribute.className,
            allowResponsive = _this$props$attribute.allowResponsive;
        return _objectSpread({}, this.props.attributes, {}, getAttributesFromPreview(preview, title, className, responsive, allowResponsive));
      }
      /***
       * Sets block attributes based on the current attributes and preview data.
       */

    }, {
      key: "setMergedAttributes",
      value: function setMergedAttributes() {
        var setAttributes = this.props.setAttributes;
        setAttributes(this.getMergedAttributes());
      }
    }, {
      key: "switchBackToURLInput",
      value: function switchBackToURLInput() {
        this.setState({
          editingURL: true
        });
      }
    }, {
      key: "getResponsiveHelp",
      value: function getResponsiveHelp(checked) {
        return checked ? __('This embed will preserve its aspect ratio when the browser is resized.') : __('This embed may not preserve its aspect ratio when the browser is resized.');
      }
    }, {
      key: "toggleResponsive",
      value: function toggleResponsive() {
        var _this$props$attribute2 = this.props.attributes,
            allowResponsive = _this$props$attribute2.allowResponsive,
            className = _this$props$attribute2.className;
        var html = this.props.preview.html;
        var newAllowResponsive = !allowResponsive;
        this.props.setAttributes({
          allowResponsive: newAllowResponsive,
          className: getClassNames(html, className, responsive && newAllowResponsive)
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$state = this.state,
            url = _this$state.url,
            editingURL = _this$state.editingURL;
        var _this$props = this.props,
            fetching = _this$props.fetching,
            setAttributes = _this$props.setAttributes,
            isSelected = _this$props.isSelected,
            preview = _this$props.preview,
            cannotEmbed = _this$props.cannotEmbed,
            themeSupportsResponsive = _this$props.themeSupportsResponsive,
            tryAgain = _this$props.tryAgain;

        if (fetching) {
          return createElement(EmbedLoading, null);
        } // translators: %s: type of embed e.g: "YouTube", "Twitter", etc. "Embed" is used when no specific type exists


        var label = sprintf(__('%s URL'), title); // No preview, or we can't embed the current URL, or we've clicked the edit button.

        if (!preview || cannotEmbed || editingURL) {
          return createElement(EmbedPlaceholder, {
            icon: icon,
            label: label,
            onSubmit: this.setUrl,
            value: url,
            cannotEmbed: cannotEmbed,
            onChange: function onChange(event) {
              return _this2.setState({
                url: event.target.value
              });
            },
            fallback: function fallback() {
              return _fallback(url, _this2.props.onReplace);
            },
            tryAgain: tryAgain
          });
        } // Even though we set attributes that get derived from the preview,
        // we don't access them directly because for the initial render,
        // the `setAttributes` call will not have taken effect. If we're
        // rendering responsive content, setting the responsive classes
        // after the preview has been rendered can result in unwanted
        // clipping or scrollbars. The `getAttributesFromPreview` function
        // that `getMergedAttributes` uses is memoized so that we're not
        // calculating them on every render.


        var previewAttributes = this.getMergedAttributes();
        var caption = previewAttributes.caption,
            type = previewAttributes.type,
            allowResponsive = previewAttributes.allowResponsive;
        var className = classnames(previewAttributes.className, this.props.className);
        return createElement(Fragment, null, createElement(EmbedControls, {
          showEditButton: preview && !cannotEmbed,
          themeSupportsResponsive: themeSupportsResponsive,
          blockSupportsResponsive: responsive,
          allowResponsive: allowResponsive,
          getResponsiveHelp: this.getResponsiveHelp,
          toggleResponsive: this.toggleResponsive,
          switchBackToURLInput: this.switchBackToURLInput
        }), createElement(EmbedPreview, {
          preview: preview,
          className: className,
          url: url,
          type: type,
          caption: caption,
          onCaptionChange: function onCaptionChange(value) {
            return setAttributes({
              caption: value
            });
          },
          isSelected: isSelected,
          icon: icon,
          label: label
        }));
      }
    }]);

    return _class;
  }(Component);
}
//# sourceMappingURL=edit.js.map