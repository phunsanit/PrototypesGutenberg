import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import classnames from 'classnames';
import { debounce } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BACKSPACE, DELETE } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { compose } from '@wordpress/compose';
import { close, chevronLeft, chevronRight } from '@wordpress/icons';

var GalleryImage = /*#__PURE__*/function (_Component) {
  _inherits(GalleryImage, _Component);

  var _super = _createSuper(GalleryImage);

  function GalleryImage() {
    var _this;

    _classCallCheck(this, GalleryImage);

    _this = _super.apply(this, arguments);
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onSelectImage = _this.onSelectImage.bind(_assertThisInitialized(_this));
    _this.onSelectCaption = _this.onSelectCaption.bind(_assertThisInitialized(_this));
    _this.onRemoveImage = _this.onRemoveImage.bind(_assertThisInitialized(_this));
    _this.bindContainer = _this.bindContainer.bind(_assertThisInitialized(_this)); // The onDeselect prop is used to signal that the GalleryImage component
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

    _this.debouncedOnDeselect = debounce(_this.props.onDeselect, 50);
    _this.state = {
      captionSelected: false
    };
    return _this;
  }

  _createClass(GalleryImage, [{
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
      if (this.container === document.activeElement && this.props.isSelected && [BACKSPACE, DELETE].indexOf(event.keyCode) !== -1) {
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
      createElement(Fragment, null, createElement("img", {
        src: url,
        alt: alt,
        "data-id": id,
        onClick: this.onSelectImage,
        onFocus: this.onSelectImage,
        onKeyDown: this.onRemoveImage,
        tabIndex: "0",
        "aria-label": ariaLabel,
        ref: this.bindContainer
      }), isBlobURL(url) && createElement(Spinner, null))
      /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
      ;
      var className = classnames({
        'is-selected': isSelected,
        'is-transient': isBlobURL(url)
      });
      return createElement("figure", {
        className: className,
        onBlur: this.onBlur,
        onFocus: this.onFocus
      }, href ? createElement("a", {
        href: href
      }, img) : img, createElement("div", {
        className: "block-library-gallery-item__move-menu"
      }, createElement(Button, {
        icon: chevronLeft,
        onClick: isFirstItem ? undefined : onMoveBackward,
        className: "blocks-gallery-item__move-backward",
        label: __('Move image backward'),
        "aria-disabled": isFirstItem,
        disabled: !isSelected
      }), createElement(Button, {
        icon: chevronRight,
        onClick: isLastItem ? undefined : onMoveForward,
        className: "blocks-gallery-item__move-forward",
        label: __('Move image forward'),
        "aria-disabled": isLastItem,
        disabled: !isSelected
      })), createElement("div", {
        className: "block-library-gallery-item__inline-menu"
      }, createElement(Button, {
        icon: close,
        onClick: onRemove,
        className: "blocks-gallery-item__remove",
        label: __('Remove image'),
        disabled: !isSelected
      })), (isSelected || caption) && createElement(RichText, {
        tagName: "figcaption",
        placeholder: isSelected ? __('Write caption…') : null,
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
}(Component);

export default compose([withSelect(function (select, ownProps) {
  var _select = select('core'),
      getMedia = _select.getMedia;

  var id = ownProps.id;
  return {
    image: id ? getMedia(parseInt(id, 10)) : null
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      __unstableMarkNextChangeAsNotPersistent = _dispatch.__unstableMarkNextChangeAsNotPersistent;

  return {
    __unstableMarkNextChangeAsNotPersistent: __unstableMarkNextChangeAsNotPersistent
  };
})])(GalleryImage);
//# sourceMappingURL=gallery-image.js.map