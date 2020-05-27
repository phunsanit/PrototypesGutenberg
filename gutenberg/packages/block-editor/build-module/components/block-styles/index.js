import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * External dependencies
 */
import { find, noop } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import TokenList from '@wordpress/token-list';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { _x } from '@wordpress/i18n';
import { getBlockType, cloneBlock, getBlockFromExample } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import BlockPreview from '../block-preview';
/**
 * Returns the active style from the given className.
 *
 * @param {Array} styles Block style variations.
 * @param {string} className  Class name
 *
 * @return {Object?} The active style.
 */

export function getActiveStyle(styles, className) {
  var _iterator = _createForOfIteratorHelper(new TokenList(className).values()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var style = _step.value;

      if (style.indexOf('is-style-') === -1) {
        continue;
      }

      var potentialStyleName = style.substring(9);
      var activeStyle = find(styles, {
        name: potentialStyleName
      });

      if (activeStyle) {
        return activeStyle;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return find(styles, 'isDefault');
}
/**
 * Replaces the active style in the block's className.
 *
 * @param {string}  className   Class name.
 * @param {Object?} activeStyle The replaced style.
 * @param {Object}  newStyle    The replacing style.
 *
 * @return {string} The updated className.
 */

export function replaceActiveStyle(className, activeStyle, newStyle) {
  var list = new TokenList(className);

  if (activeStyle) {
    list.remove('is-style-' + activeStyle.name);
  }

  if (!newStyle.isDefault) {
    list.add('is-style-' + newStyle.name);
  }

  return list.value;
}

var useGenericPreviewBlock = function useGenericPreviewBlock(block, type) {
  return useMemo(function () {
    return type.example ? getBlockFromExample(block.name, {
      attributes: type.example.attributes,
      innerBlocks: type.example.innerBlocks
    }) : cloneBlock(block);
  }, [type.example ? block.name : block, type]);
};

function BlockStyles(_ref) {
  var clientId = _ref.clientId,
      _ref$onSwitch = _ref.onSwitch,
      onSwitch = _ref$onSwitch === void 0 ? noop : _ref$onSwitch,
      _ref$onHoverClassName = _ref.onHoverClassName,
      onHoverClassName = _ref$onHoverClassName === void 0 ? noop : _ref$onHoverClassName;

  var selector = function selector(select) {
    var _select = select('core/block-editor'),
        getBlock = _select.getBlock;

    var _select2 = select('core/blocks'),
        getBlockStyles = _select2.getBlockStyles;

    var block = getBlock(clientId);
    var blockType = getBlockType(block.name);
    return {
      block: block,
      type: blockType,
      styles: getBlockStyles(block.name),
      className: block.attributes.className || ''
    };
  };

  var _useSelect = useSelect(selector, [clientId]),
      styles = _useSelect.styles,
      block = _useSelect.block,
      type = _useSelect.type,
      className = _useSelect.className;

  var _useDispatch = useDispatch('core/block-editor'),
      updateBlockAttributes = _useDispatch.updateBlockAttributes;

  var genericPreviewBlock = useGenericPreviewBlock(block, type);

  if (!styles || styles.length === 0) {
    return null;
  }

  if (!type.styles && !find(styles, 'isDefault')) {
    styles.unshift({
      name: 'default',
      label: _x('Default', 'block style'),
      isDefault: true
    });
  }

  var activeStyle = getActiveStyle(styles, className);
  return createElement("div", {
    className: "block-editor-block-styles"
  }, styles.map(function (style) {
    var styleClassName = replaceActiveStyle(className, activeStyle, style);
    return createElement(BlockStyleItem, {
      genericPreviewBlock: genericPreviewBlock,
      className: className,
      isActive: activeStyle === style,
      key: style.name,
      onSelect: function onSelect() {
        updateBlockAttributes(clientId, {
          className: styleClassName
        });
        onHoverClassName(null);
        onSwitch();
      },
      onBlur: function onBlur() {
        return onHoverClassName(null);
      },
      onHover: function onHover() {
        return onHoverClassName(styleClassName);
      },
      style: style,
      styleClassName: styleClassName
    });
  }));
}

function BlockStyleItem(_ref2) {
  var genericPreviewBlock = _ref2.genericPreviewBlock,
      style = _ref2.style,
      isActive = _ref2.isActive,
      onBlur = _ref2.onBlur,
      onHover = _ref2.onHover,
      onSelect = _ref2.onSelect,
      styleClassName = _ref2.styleClassName;
  var previewBlocks = useMemo(function () {
    return _objectSpread({}, genericPreviewBlock, {
      attributes: _objectSpread({}, genericPreviewBlock.attributes, {
        className: styleClassName
      })
    });
  }, [genericPreviewBlock, styleClassName]);
  return createElement("div", {
    key: style.name,
    className: classnames('block-editor-block-styles__item', {
      'is-active': isActive
    }),
    onClick: function onClick() {
      return onSelect();
    },
    onKeyDown: function onKeyDown(event) {
      if (ENTER === event.keyCode || SPACE === event.keyCode) {
        event.preventDefault();
        onSelect();
      }
    },
    onMouseEnter: onHover,
    onMouseLeave: onBlur,
    role: "button",
    tabIndex: "0",
    "aria-label": style.label || style.name
  }, createElement("div", {
    className: "block-editor-block-styles__item-preview"
  }, createElement(BlockPreview, {
    viewportWidth: 500,
    blocks: previewBlocks
  })), createElement("div", {
    className: "block-editor-block-styles__item-label"
  }, style.label || style.name));
}

export default BlockStyles;
//# sourceMappingURL=index.js.map