"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _blob = require("@wordpress/blob");

var _compose = require("@wordpress/compose");

var _icons = require("@wordpress/icons");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GalleryImage = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(GalleryImage, _Component);

  var _super = _createSuper(GalleryImage);

  function GalleryImage() {
    var _this;

    (0, _classCallCheck2.default)(this, GalleryImage);
    _this = _super.apply(this, arguments);
    _this.onBlur = _this.onBlur.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSelectImage = _this.onSelectImage.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSelectCaption = _this.onSelectCaption.bind((0, _assertThisInitialized2.default)(_this));
    _this.onRemoveImage = _this.onRemoveImage.bind((0, _assertThisInitialized2.default)(_this));
    _this.bindContainer = _this.bindContainer.bind((0, _assertThisInitialized2.default)(_this)); // The onDeselect prop is used to signal that the GalleryImage component
    // has lost focus. We want to call it when focus has been lost
    // by the figure element or any of its children but only if
    // the element that gained focus isn't any of them.
    //
    // debouncedOnSelect is scheduled every time a figure's children
    // is blurred and cancelled when any is focused. If none gain focus,
    // the call to onDeselect will be executed.
    //
    // onBlur / onFocus events are quick operations (<5ms apart in my testing),
    // so 50ms accounts for 10x lagging while feels responsive to the user.

    _this.debouncedOnDeselect = (0, _lodash.debounce)(_this.props.onDeselect, 50);
    _this.state = {
      captionSelected: false
    };
    return _this;
  }

  (0, _createClass2.default)(GalleryImage, [{
    key: "bindContainer",
    value: function bindContainer(ref) {
      this.container = ref;
    }
  }, {
    key: "onSelectCaption",
    value: function onSelectCaption() {
      if (!this.state.captionSelected) {
        this.setState({
          captionSelected: true
        });
      }

      if (!this.props.isSelected) {
        this.props.onSelect();
      }
    }
  }, {
    key: "onSelectImage",
    value: function onSelectImage() {
      if (!this.props.isSelected) {
        this.props.onSelect();
      }

      if (this.state.captionSelected) {
        this.setState({
          captionSelected: false
        });
      }
    }
  }, {
    key: "onRemoveImage",
    value: function onRemoveImage(event) {
      if (this.container === document.activeElement && this.props.isSelected && [_keycodes.BACKSPACE, _keycodes.DELETE].indexOf(event.keyCode) !== -1) {
        event.stopPropagation();
        event.preventDefault();
        this.props.onRemove();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          isSelected = _this$props.isSelected,
          image = _this$props.image,
          url = _this$props.url,
          __unstableMarkNextChangeAsNotPersistent = _this$props.__unstableMarkNextChangeAsNotPersistent;

      if (image && !url) {
        __unstableMarkNextChangeAsNotPersistent();

        this.props.setAttributes({
          url: image.source_url,
          alt: image.alt_text
        });
      } // unselect the caption so when the user selects other image and comeback
      // the caption is not immediately selected


      if (this.state.captionSelected && !isSelected && prevProps.isSelected) {
        this.setState({
          captionSelected: false
        });
      }
    }
    /**
     * Note that, unlike the DOM, all React events bubble,
     * so this will be called after the onBlur event of any figure's children.
     */

  }, {
    key: "onBlur",
    value: function onBlur() {
      this.debouncedOnDeselect();
    }
    /**
     * Note that, unlike the DOM, all React events bubble,
     * so this will be called after the onBlur event of any figure's children.
     */

  }, {
    key: "onFocus",
    value: function onFocus() {
      this.debouncedOnDeselect.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          url = _this$props2.url,
          alt = _this$props2.alt,
          id = _this$props2.id,
          linkTo = _this$props2.linkTo,
          link = _this$props2.link,
          isFirstItem = _this$props2.isFirstItem,
          isLastItem = _this$props2.isLastItem,
          isSelected = _this$props2.isSelected,
          caption = _this$props2.caption,
          onRemove = _this$props2.onRemove,
          onMoveForward = _this$props2.onMoveForward,
          onMoveBackward = _this$props2.onMoveBackward,
          setAttributes = _this$props2.setAttributes,
          ariaLabel = _this$props2['aria-label'];
      var href;

      switch (linkTo) {
        case 'media':
          href = url;
          break;

        case 'attachment':
          href = link;
          break;
      }

      var img = // Disable reason: Image itself is not meant to be interactive, but should
      // direct image selection and unfocus caption fields.

      /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
      (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("img", {
        src: url,
        alt: alt,
        "data-id": id,
        onClick: this.onSelectImage,
        onFocus: this.onSelectImage,
        onKeyDown: this.onRemoveImage,
        tabIndex: "0",
        "aria-label": ariaLabel,
        ref: this.bindContainer
      }), (0, _blob.isBlobURL)(url) && (0, _element.createElement)(_components.Spinner, null))
      /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
      ;
      var className = (0, _classnames.default)({
        'is-selected': isSelected,
        'is-transient': (0, _blob.isBlobURL)(url)
      });
      return (0, _element.createElement)("figure", {
        className: className,
        onBlur: this.onBlur,
        onFocus: this.onFocus
      }, href ? (0, _element.createElement)("a", {
        href: href
      }, img) : img, (0, _element.createElement)("div", {
        className: "block-library-gallery-item__move-menu"
      }, (0, _element.createElement)(_components.Button, {
        icon: _icons.chevronLeft,
        onClick: isFirstItem ? undefined : onMoveBackward,
        className: "blocks-gallery-item__move-backward",
        label: (0, _i18n.__)('Move image backward'),
        "aria-disabled": isFirstItem,
        disabled: !isSelected
      }), (0, _element.createElement)(_components.Button, {
        icon: _icons.chevronRight,
        onClick: isLastItem ? undefined : onMoveForward,
        className: "blocks-gallery-item__move-forward",
        label: (0, _i18n.__)('Move image forward'),
        "aria-disabled": isLastItem,
        disabled: !isSelected
      })), (0, _element.createElement)("div", {
        className: "block-library-gallery-item__inline-menu"
      }, (0, _element.createElement)(_components.Button, {
        icon: _icons.close,
        onClick: onRemove,
        className: "blocks-gallery-item__remove",
        label: (0, _i18n.__)('Remove image'),
        disabled: !isSelected
      })), (isSelected || caption) && (0, _element.createElement)(_blockEditor.RichText, {
        tagName: "figcaption",
        placeholder: isSelected ? (0, _i18n.__)('Write caption…') : null,
        value: caption,
        isSelected: this.state.captionSelected,
        onChange: function onChange(newCaption) {
          return setAttributes({
            caption: newCaption
          });
        },
        unstableOnFocus: this.onSelectCaption,
        inlineToolbar: true
      }));
    }
  }]);
  return GalleryImage;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, ownProps) {
  var _select = select('core'),
      getMedia = _select.getMedia;

  var id = ownProps.id;
  return {
    image: id ? getMedia(parseInt(id, 10)) : null
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      __unstableMarkNextChangeAsNotPersistent = _dispatch.__unstableMarkNextChangeAsNotPersistent;

  return {
    __unstableMarkNextChangeAsNotPersistent: __unstableMarkNextChangeAsNotPersistent
  };
})])(GalleryImage);

exports.default = _default;
//# sourceMappingURL=gallery-image.js.map