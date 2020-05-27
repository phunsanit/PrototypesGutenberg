"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmbedEditComponent = getEmbedEditComponent;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _util = require("./util");

var _embedControls = _interopRequireDefault(require("./embed-controls"));

var _embedLoading = _interopRequireDefault(require("./embed-loading"));

var _embedPlaceholder = _interopRequireDefault(require("./embed-placeholder"));

var _embedPreview = _interopRequireDefault(require("./embed-preview"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function getEmbedEditComponent(title, icon) {
  var responsive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return /*#__PURE__*/function (_Component) {
    (0, _inherits2.default)(_class, _Component);

    var _super = _createSuper(_class);

    function _class() {
      var _this;

      (0, _classCallCheck2.default)(this, _class);
      _this = _super.apply(this, arguments);
      _this.switchBackToURLInput = _this.switchBackToURLInput.bind((0, _assertThisInitialized2.default)(_this));
      _this.setUrl = _this.setUrl.bind((0, _assertThisInitialized2.default)(_this));
      _this.getMergedAttributes = _this.getMergedAttributes.bind((0, _assertThisInitialized2.default)(_this));
      _this.setMergedAttributes = _this.setMergedAttributes.bind((0, _assertThisInitialized2.default)(_this));
      _this.getResponsiveHelp = _this.getResponsiveHelp.bind((0, _assertThisInitialized2.default)(_this));
      _this.toggleResponsive = _this.toggleResponsive.bind((0, _assertThisInitialized2.default)(_this));
      _this.handleIncomingPreview = _this.handleIncomingPreview.bind((0, _assertThisInitialized2.default)(_this));
      _this.state = {
        editingURL: false,
        url: _this.props.attributes.url
      };

      if (_this.props.preview) {
        _this.handleIncomingPreview();
      }

      return _this;
    }

    (0, _createClass2.default)(_class, [{
      key: "handleIncomingPreview",
      value: function handleIncomingPreview() {
        this.setMergedAttributes();

        if (this.props.onReplace) {
          var upgradedBlock = (0, _util.createUpgradedEmbedBlock)(this.props, this.getMergedAttributes());

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
        return _objectSpread({}, this.props.attributes, {}, (0, _util.getAttributesFromPreview)(preview, title, className, responsive, allowResponsive));
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
        return checked ? (0, _i18n.__)('This embed will preserve its aspect ratio when the browser is resized.') : (0, _i18n.__)('This embed may not preserve its aspect ratio when the browser is resized.');
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
          className: (0, _util.getClassNames)(html, className, responsive && newAllowResponsive)
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
          return (0, _element.createElement)(_embedLoading.default, null);
        } // translators: %s: type of embed e.g: "YouTube", "Twitter", etc. "Embed" is used when no specific type exists


        var label = (0, _i18n.sprintf)((0, _i18n.__)('%s URL'), title); // No preview, or we can't embed the current URL, or we've clicked the edit button.

        if (!preview || cannotEmbed || editingURL) {
          return (0, _element.createElement)(_embedPlaceholder.default, {
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
              return (0, _util.fallback)(url, _this2.props.onReplace);
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
        var className = (0, _classnames.default)(previewAttributes.className, this.props.className);
        return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_embedControls.default, {
          showEditButton: preview && !cannotEmbed,
          themeSupportsResponsive: themeSupportsResponsive,
          blockSupportsResponsive: responsive,
          allowResponsive: allowResponsive,
          getResponsiveHelp: this.getResponsiveHelp,
          toggleResponsive: this.toggleResponsive,
          switchBackToURLInput: this.switchBackToURLInput
        }), (0, _element.createElement)(_embedPreview.default, {
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
  }(_element.Component);
}
//# sourceMappingURL=edit.js.map