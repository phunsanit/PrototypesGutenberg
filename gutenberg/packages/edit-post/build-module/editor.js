import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
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
/**
 * WordPress dependencies
 */

import { withSelect, withDispatch } from '@wordpress/data';
import { EditorProvider, ErrorBoundary, PostLockedModal } from '@wordpress/editor';
import { StrictMode, Component } from '@wordpress/element';
import { KeyboardShortcuts, SlotFillProvider, DropZoneProvider } from '@wordpress/components';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import preventEventDiscovery from './prevent-event-discovery';
import Layout from './components/layout';
import EditorInitialization from './components/editor-initialization';
import EditPostSettings from './components/edit-post-settings';

var Editor = /*#__PURE__*/function (_Component) {
  _inherits(Editor, _Component);

  var _super = _createSuper(Editor);

  function Editor() {
    var _this;

    _classCallCheck(this, Editor);

    _this = _super.apply(this, arguments);
    _this.getEditorSettings = memize(_this.getEditorSettings, {
      maxSize: 1
    });
    return _this;
  }

  _createClass(Editor, [{
    key: "getEditorSettings",
    value: function getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes, preferredStyleVariations, __experimentalLocalAutosaveInterval, updatePreferredStyleVariations) {
      settings = _objectSpread({}, settings, {
        __experimentalPreferredStyleVariations: {
          value: preferredStyleVariations,
          onChange: updatePreferredStyleVariations
        },
        hasFixedToolbar: hasFixedToolbar,
        focusMode: focusMode,
        __experimentalLocalAutosaveInterval: __experimentalLocalAutosaveInterval
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
    key: "render",
    value: function render() {
      var _this$props = this.props,
          settings = _this$props.settings,
          hasFixedToolbar = _this$props.hasFixedToolbar,
          focusMode = _this$props.focusMode,
          post = _this$props.post,
          postId = _this$props.postId,
          initialEdits = _this$props.initialEdits,
          onError = _this$props.onError,
          hiddenBlockTypes = _this$props.hiddenBlockTypes,
          blockTypes = _this$props.blockTypes,
          preferredStyleVariations = _this$props.preferredStyleVariations,
          __experimentalLocalAutosaveInterval = _this$props.__experimentalLocalAutosaveInterval,
          updatePreferredStyleVariations = _this$props.updatePreferredStyleVariations,
          props = _objectWithoutProperties(_this$props, ["settings", "hasFixedToolbar", "focusMode", "post", "postId", "initialEdits", "onError", "hiddenBlockTypes", "blockTypes", "preferredStyleVariations", "__experimentalLocalAutosaveInterval", "updatePreferredStyleVariations"]);

      if (!post) {
        return null;
      }

      var editorSettings = this.getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes, preferredStyleVariations, __experimentalLocalAutosaveInterval, updatePreferredStyleVariations);
      return createElement(StrictMode, null, createElement(EditPostSettings.Provider, {
        value: settings
      }, createElement(SlotFillProvider, null, createElement(DropZoneProvider, null, createElement(EditorProvider, _extends({
        settings: editorSettings,
        post: post,
        initialEdits: initialEdits,
        useSubRegistry: false
      }, props), createElement(ErrorBoundary, {
        onError: onError
      }, createElement(EditorInitialization, {
        postId: postId
      }), createElement(Layout, null), createElement(KeyboardShortcuts, {
        shortcuts: preventEventDiscovery
      })), createElement(PostLockedModal, null))))));
    }
  }]);

  return Editor;
}(Component);

export default compose([withSelect(function (select, _ref) {
  var postId = _ref.postId,
      postType = _ref.postType;

  var _select = select('core/edit-post'),
      isFeatureActive = _select.isFeatureActive,
      getPreference = _select.getPreference,
      __experimentalGetPreviewDeviceType = _select.__experimentalGetPreviewDeviceType;

  var _select2 = select('core'),
      getEntityRecord = _select2.getEntityRecord;

  var _select3 = select('core/blocks'),
      getBlockTypes = _select3.getBlockTypes;

  return {
    hasFixedToolbar: isFeatureActive('fixedToolbar') || __experimentalGetPreviewDeviceType() !== 'Desktop',
    focusMode: isFeatureActive('focusMode'),
    post: getEntityRecord('postType', postType, postId),
    preferredStyleVariations: getPreference('preferredStyleVariations'),
    hiddenBlockTypes: getPreference('hiddenBlockTypes'),
    blockTypes: getBlockTypes(),
    __experimentalLocalAutosaveInterval: getPreference('localAutosaveInterval')
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      updatePreferredStyleVariations = _dispatch.updatePreferredStyleVariations;

  return {
    updatePreferredStyleVariations: updatePreferredStyleVariations
  };
})])(Editor);
//# sourceMappingURL=editor.js.map