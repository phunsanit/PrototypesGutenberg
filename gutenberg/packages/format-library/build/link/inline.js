"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _url = require("@wordpress/url");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function InlineLinkUI(_ref) {
  var isActive = _ref.isActive,
      activeAttributes = _ref.activeAttributes,
      addingLink = _ref.addingLink,
      value = _ref.value,
      onChange = _ref.onChange,
      speak = _ref.speak,
      stopAddingLink = _ref.stopAddingLink;

  /**
   * A unique key is generated when switching between editing and not editing
   * a link, based on:
   *
   * - This component may be rendered _either_ when a link is active _or_
   *   when adding or editing a link.
   * - It's only desirable to shift focus into the Popover when explicitly
   *   adding or editing a link, not when in the inline boundary of a link.
   * - Focus behavior can only be controlled on a Popover at the time it
   *   mounts, so a new instance of the component must be mounted to
   *   programmatically enact the focusOnMount behavior.
   *
   * @type {string}
   */
  var mountingKey = (0, _element.useMemo)(_lodash.uniqueId, [addingLink]);
  /**
   * Pending settings to be applied to the next link. When inserting a new
   * link, toggle values cannot be applied immediately, because there is not
   * yet a link for them to apply to. Thus, they are maintained in a state
   * value until the time that the link can be inserted or edited.
   *
   * @type {[Object|undefined,Function]}
   */

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      nextLinkValue = _useState2[0],
      setNextLinkValue = _useState2[1];

  var anchorRef = (0, _element.useMemo)(function () {
    var selection = window.getSelection();

    if (!selection.rangeCount) {
      return;
    }

    var range = selection.getRangeAt(0);

    if (addingLink && !isActive) {
      return range;
    }

    var element = range.startContainer; // If the caret is right before the element, select the next element.

    element = element.nextElementSibling || element;

    while (element.nodeType !== window.Node.ELEMENT_NODE) {
      element = element.parentNode;
    }

    return element.closest('a');
  }, [addingLink, value.start, value.end]);

  var linkValue = _objectSpread({
    url: activeAttributes.url,
    type: activeAttributes.type,
    id: activeAttributes.id,
    opensInNewTab: activeAttributes.target === '_blank'
  }, nextLinkValue);

  function onChangeLink(nextValue) {
    // Merge with values from state, both for the purpose of assigning the
    // next state value, and for use in constructing the new link format if
    // the link is ready to be applied.
    nextValue = _objectSpread({}, nextLinkValue, {}, nextValue); // LinkControl calls `onChange` immediately upon the toggling a setting.

    var didToggleSetting = linkValue.opensInNewTab !== nextValue.opensInNewTab && linkValue.url === nextValue.url; // If change handler was called as a result of a settings change during
    // link insertion, it must be held in state until the link is ready to
    // be applied.

    var didToggleSettingForNewLink = didToggleSetting && nextValue.url === undefined; // If link will be assigned, the state value can be considered flushed.
    // Otherwise, persist the pending changes.

    setNextLinkValue(didToggleSettingForNewLink ? nextValue : undefined);

    if (didToggleSettingForNewLink) {
      return;
    }

    var newUrl = (0, _url.prependHTTP)(nextValue.url);
    var format = (0, _utils.createLinkFormat)({
      url: newUrl,
      type: nextValue.type,
      id: nextValue.id !== undefined && nextValue.id !== null ? String(nextValue.id) : undefined,
      opensInNewWindow: nextValue.opensInNewTab
    });

    if ((0, _richText.isCollapsed)(value) && !isActive) {
      var newText = nextValue.title || newUrl;
      var toInsert = (0, _richText.applyFormat)((0, _richText.create)({
        text: newText
      }), format, 0, newText.length);
      onChange((0, _richText.insert)(value, toInsert));
    } else {
      var newValue = (0, _richText.applyFormat)(value, format);
      newValue.start = newValue.end;
      newValue.activeFormats = [];
      onChange(newValue);
    } // Focus should only be shifted back to the formatted segment when the
    // URL is submitted.


    if (!didToggleSetting) {
      stopAddingLink();
    }

    if (!(0, _utils.isValidHref)(newUrl)) {
      speak((0, _i18n.__)('Warning: the link has been inserted but may have errors. Please test it.'), 'assertive');
    } else if (isActive) {
      speak((0, _i18n.__)('Link edited.'), 'assertive');
    } else {
      speak((0, _i18n.__)('Link inserted.'), 'assertive');
    }
  }

  return (0, _element.createElement)(_components.Popover, {
    key: mountingKey,
    anchorRef: anchorRef,
    focusOnMount: addingLink ? 'firstElement' : false,
    onClose: stopAddingLink,
    position: "bottom center"
  }, (0, _element.createElement)(_blockEditor.__experimentalLinkControl, {
    value: linkValue,
    onChange: onChangeLink,
    forceIsEditingLink: addingLink
  }));
}

var _default = (0, _components.withSpokenMessages)(InlineLinkUI);

exports.default = _default;
//# sourceMappingURL=inline.js.map