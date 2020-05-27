import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import classnames from 'classnames';
import { first, last, omit } from 'lodash';
import { animated } from 'react-spring/web.cjs';
/**
 * WordPress dependencies
 */

import { useRef, useEffect, useContext, forwardRef } from '@wordpress/element';
import { focus, isTextField, placeCaretAtHorizontalEdge } from '@wordpress/dom';
import { BACKSPACE, DELETE, ENTER } from '@wordpress/keycodes';
import { __, sprintf } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { isInsideRootBlock } from '../../utils/dom';
import useMovingAnimation from '../use-moving-animation';
import { Context, SetBlockNodes } from './root-container';
import { BlockListBlockContext } from './block';
import ELEMENTS from './block-wrapper-elements';
var BlockComponent = forwardRef(function (_ref, wrapper) {
  var children = _ref.children,
      _ref$tagName = _ref.tagName,
      tagName = _ref$tagName === void 0 ? 'div' : _ref$tagName,
      __unstableIsHtml = _ref.__unstableIsHtml,
      props = _objectWithoutProperties(_ref, ["children", "tagName", "__unstableIsHtml"]);

  var onSelectionStart = useContext(Context);
  var setBlockNodes = useContext(SetBlockNodes);

  var _useContext = useContext(BlockListBlockContext),
      clientId = _useContext.clientId,
      rootClientId = _useContext.rootClientId,
      isSelected = _useContext.isSelected,
      isFirstMultiSelected = _useContext.isFirstMultiSelected,
      isLastMultiSelected = _useContext.isLastMultiSelected,
      isMultiSelecting = _useContext.isMultiSelecting,
      isNavigationMode = _useContext.isNavigationMode,
      isPartOfMultiSelection = _useContext.isPartOfMultiSelection,
      enableAnimation = _useContext.enableAnimation,
      index = _useContext.index,
      className = _useContext.className,
      isLocked = _useContext.isLocked,
      name = _useContext.name,
      mode = _useContext.mode,
      blockTitle = _useContext.blockTitle,
      wrapperProps = _useContext.wrapperProps;

  var _useSelect = useSelect(function (select) {
    if (!isSelected) {
      return {};
    }

    return {
      initialPosition: select('core/block-editor').getSelectedBlocksInitialCaretPosition()
    };
  }, [isSelected]),
      initialPosition = _useSelect.initialPosition;

  var _useDispatch = useDispatch('core/block-editor'),
      removeBlock = _useDispatch.removeBlock,
      insertDefaultBlock = _useDispatch.insertDefaultBlock;

  var fallbackRef = useRef();
  var isAligned = wrapperProps && !!wrapperProps['data-align'];
  wrapper = wrapper || fallbackRef; // Provide the selected node, or the first and last nodes of a multi-
  // selection, so it can be used to position the contextual block toolbar.
  // We only provide what is necessary, and remove the nodes again when they
  // are no longer selected.

  useEffect(function () {
    if (isSelected || isFirstMultiSelected || isLastMultiSelected) {
      var node = wrapper.current;
      setBlockNodes(function (nodes) {
        return _objectSpread({}, nodes, _defineProperty({}, clientId, node));
      });
      return function () {
        setBlockNodes(function (nodes) {
          return omit(nodes, clientId);
        });
      };
    }
  }, [isSelected, isFirstMultiSelected, isLastMultiSelected]); // translators: %s: Type of block (i.e. Text, Image etc)

  var blockLabel = sprintf(__('Block: %s'), blockTitle); // Handing the focus of the block on creation and update

  /**
   * When a block becomes selected, transition focus to an inner tabbable.
   */

  var focusTabbable = function focusTabbable() {
    // Focus is captured by the wrapper node, so while focus transition
    // should only consider tabbables within editable display, since it
    // may be the wrapper itself or a side control which triggered the
    // focus event, don't unnecessary transition to an inner tabbable.
    if (document.activeElement && isInsideRootBlock(wrapper.current, document.activeElement)) {
      return;
    } // Find all tabbables within node.


    var textInputs = focus.tabbable.find(wrapper.current).filter(isTextField) // Exclude inner blocks and block appenders
    .filter(function (node) {
      return isInsideRootBlock(wrapper.current, node) && !node.closest('.block-list-appender');
    }); // If reversed (e.g. merge via backspace), use the last in the set of
    // tabbables.

    var isReverse = -1 === initialPosition;
    var target = (isReverse ? last : first)(textInputs) || wrapper.current;
    placeCaretAtHorizontalEdge(target, isReverse);
  };

  useEffect(function () {
    if (!isMultiSelecting && !isNavigationMode && isSelected) {
      focusTabbable();
    }
  }, [isSelected, isMultiSelecting, isNavigationMode]); // Block Reordering animation

  var animationStyle = useMovingAnimation(wrapper, isSelected || isPartOfMultiSelection, isSelected || isFirstMultiSelected, enableAnimation, index);
  /**
   * Interprets keydown event intent to remove or insert after block if key
   * event occurs on wrapper node. This can occur when the block has no text
   * fields of its own, particularly after initial insertion, to allow for
   * easy deletion and continuous writing flow to add additional content.
   *
   * @param {KeyboardEvent} event Keydown event.
   */

  var onKeyDown = function onKeyDown(event) {
    var keyCode = event.keyCode,
        target = event.target;

    if (props.onKeyDown) {
      props.onKeyDown(event);
    }

    if (keyCode !== ENTER && keyCode !== BACKSPACE && keyCode !== DELETE) {
      return;
    }

    if (target !== wrapper.current || isTextField(target)) {
      return;
    }

    event.preventDefault();

    if (keyCode === ENTER) {
      insertDefaultBlock({}, rootClientId, index + 1);
    } else {
      removeBlock(clientId);
    }
  };

  var onMouseLeave = function onMouseLeave(_ref2) {
    var which = _ref2.which,
        buttons = _ref2.buttons;

    // The primary button must be pressed to initiate selection. Fall back
    // to `which` if the standard `buttons` property is falsy. There are
    // cases where Firefox might always set `buttons` to `0`.
    // See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
    // See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which
    if ((buttons || which) === 1) {
      onSelectionStart(clientId);
    }
  };

  var htmlSuffix = mode === 'html' && !__unstableIsHtml ? '-visual' : '';
  var blockElementId = "block-".concat(clientId).concat(htmlSuffix);
  var Animated = animated[tagName];
  var blockWrapper = createElement(Animated // Overrideable props.
  , _extends({
    "aria-label": blockLabel,
    role: "group"
  }, omit(wrapperProps, ['data-align']), props, {
    id: blockElementId,
    ref: wrapper,
    className: classnames(className, props.className, wrapperProps && wrapperProps.className, !isAligned && 'wp-block'),
    "data-block": clientId,
    "data-type": name,
    "data-title": blockTitle // Only allow shortcuts when a blocks is selected and not locked.
    ,
    onKeyDown: isSelected && !isLocked ? onKeyDown : undefined // Only allow selection to be started from a selected block.
    ,
    onMouseLeave: isSelected ? onMouseLeave : undefined,
    tabIndex: "0",
    style: _objectSpread({}, wrapperProps ? wrapperProps.style : {}, {}, props.style || {}, {}, animationStyle)
  }), children); // For aligned blocks, provide a wrapper element so the block can be
  // positioned relative to the block column.

  if (isAligned) {
    var alignmentWrapperProps = {
      'data-align': wrapperProps['data-align']
    };
    return createElement("div", _extends({
      className: "wp-block"
    }, alignmentWrapperProps), blockWrapper);
  }

  return blockWrapper;
});
var ExtendedBlockComponent = ELEMENTS.reduce(function (acc, element) {
  acc[element] = forwardRef(function (props, ref) {
    return createElement(BlockComponent, _extends({}, props, {
      ref: ref,
      tagName: element
    }));
  });
  return acc;
}, BlockComponent);
export var Block = ExtendedBlockComponent;
//# sourceMappingURL=block-wrapper.js.map