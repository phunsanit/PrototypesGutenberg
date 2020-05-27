import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import memize from 'memize';
import { size, map, without } from 'lodash';
import { subscribeSetFocusOnTitle } from 'react-native-gutenberg-bridge';
import { I18nManager } from 'react-native';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { EditorProvider } from '@wordpress/editor';
import { parse, serialize } from '@wordpress/blocks';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { SlotFillProvider, SiteCapabilitiesContext } from '@wordpress/components';
/**
 * Internal dependencies
 */

import Layout from './components/layout';

var Editor = /*#__PURE__*/function (_Component) {
  _inherits(Editor, _Component);

  var _super = _createSuper(Editor);

  function Editor(props) {
    var _this;

    _classCallCheck(this, Editor);

    _this = _super.apply(this, arguments);

    if (props.initialHtmlModeEnabled && props.mode === 'visual') {
      // enable html mode if the initial mode the parent wants it but we're not already in it
      _this.props.switchEditorMode('text');
    }

    _this.getEditorSettings = memize(_this.getEditorSettings, {
      maxSize: 1
    });
    _this.setTitleRef = _this.setTitleRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Editor, [{
    key: "getEditorSettings",
    value: function getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes) {
      settings = _objectSpread({}, settings, {
        isRTL: I18nManager.isRTL,
        hasFixedToolbar: hasFixedToolbar,
        focusMode: focusMode
      }); // Omit hidden block types if exists and non-empty.

      if (size(hiddenBlockTypes) > 0) {
        // Defer to passed setting for `allowedBlockTypes` if provided as
        // anything other than `true` (where `true` is equivalent to allow
        // all block types).
        var defaultAllowedBlockTypes = true === settings.allowedBlockTypes ? map(blockTypes, 'name') : settings.allowedBlockTypes || [];
        settings.allowedBlockTypes = without.apply(void 0, [defaultAllowedBlockTypes].concat(_toConsumableArray(hiddenBlockTypes)));
      }

      return settings;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscriptionParentSetFocusOnTitle = subscribeSetFocusOnTitle(function () {
        if (_this2.postTitleRef) {
          _this2.postTitleRef.focus();
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscriptionParentSetFocusOnTitle) {
        this.subscriptionParentSetFocusOnTitle.remove();
      }
    }
  }, {
    key: "setTitleRef",
    value: function setTitleRef(titleRef) {
      this.postTitleRef = titleRef;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          settings = _this$props.settings,
          hasFixedToolbar = _this$props.hasFixedToolbar,
          focusMode = _this$props.focusMode,
          initialEdits = _this$props.initialEdits,
          hiddenBlockTypes = _this$props.hiddenBlockTypes,
          blockTypes = _this$props.blockTypes,
          post = _this$props.post,
          postType = _this$props.postType,
          props = _objectWithoutProperties(_this$props, ["settings", "hasFixedToolbar", "focusMode", "initialEdits", "hiddenBlockTypes", "blockTypes", "post", "postType"]);

      var editorSettings = this.getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes);
      var normalizedPost = post || {
        id: 1,
        title: {
          raw: props.initialTitle
        },
        content: {
          // make sure the post content is in sync with gutenberg store
          // to avoid marking the post as modified when simply loaded
          // For now, let's assume: serialize( parse( html ) ) !== html
          raw: serialize(parse(props.initialHtml || ''))
        },
        type: postType,
        status: 'draft',
        meta: []
      };
      return createElement(SlotFillProvider, null, createElement(SiteCapabilitiesContext.Provider, {
        value: this.props.capabilities
      }, createElement(EditorProvider, _extends({
        settings: editorSettings,
        post: normalizedPost,
        initialEdits: initialEdits,
        useSubRegistry: false
      }, props), createElement(Layout, {
        setTitleRef: this.setTitleRef
      }))));
    }
  }]);

  return Editor;
}(Component);

export default compose([withSelect(function (select) {
  var _select = select('core/edit-post'),
      isFeatureActive = _select.isFeatureActive,
      getEditorMode = _select.getEditorMode,
      getPreference = _select.getPreference,
      __experimentalGetPreviewDeviceType = _select.__experimentalGetPreviewDeviceType;

  var _select2 = select('core/blocks'),
      getBlockTypes = _select2.getBlockTypes;

  return {
    hasFixedToolbar: isFeatureActive('fixedToolbar') || __experimentalGetPreviewDeviceType() !== 'Desktop',
    focusMode: isFeatureActive('focusMode'),
    mode: getEditorMode(),
    hiddenBlockTypes: getPreference('hiddenBlockTypes'),
    blockTypes: getBlockTypes()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      switchEditorMode = _dispatch.switchEditorMode;

  return {
    switchEditorMode: switchEditorMode
  };
})])(Editor);
//# sourceMappingURL=editor.native.js.map