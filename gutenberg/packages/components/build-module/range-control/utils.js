import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/**
 * External dependencies
 */
import { clamp, noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { useCallback, useRef, useEffect, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { useControlledState } from '../utils/hooks';
/**
 * A float supported clamp function for a specific value.
 *
 * @param {number|null} value The value to clamp
 * @param {number} min The minimum value
 * @param {number} max The maxinum value
 *
 * @return {number} A (float) number
 */

export function floatClamp(value, min, max) {
  if (typeof value !== 'number') {
    return null;
  }

  return parseFloat(clamp(value, min, max));
}
/**
 * Hook to store a clamped value, derived from props.
 */

export function useControlledRangeValue(_ref) {
  var min = _ref.min,
      max = _ref.max,
      valueProp = _ref.value;

  var _useControlledState = useControlledState(floatClamp(valueProp, min, max)),
      _useControlledState2 = _slicedToArray(_useControlledState, 2),
      value = _useControlledState2[0],
      setValue = _useControlledState2[1];

  var setClampValue = useCallback(function (nextValue) {
    if (nextValue === null) {
      setValue(null);
    } else {
      setValue(floatClamp(nextValue, min, max));
    }
  }, [min, max]);
  return [value, setClampValue];
}
/**
 * Hook to encapsulate the debouncing "hover" to better handle the showing
 * and hiding of the Tooltip.
 */

export function useDebouncedHoverInteraction(_ref2) {
  var _ref2$onShow = _ref2.onShow,
      onShow = _ref2$onShow === void 0 ? noop : _ref2$onShow,
      _ref2$onHide = _ref2.onHide,
      onHide = _ref2$onHide === void 0 ? noop : _ref2$onHide,
      _ref2$onMouseMove = _ref2.onMouseMove,
      onMouseMove = _ref2$onMouseMove === void 0 ? noop : _ref2$onMouseMove,
      _ref2$onMouseLeave = _ref2.onMouseLeave,
      onMouseLeave = _ref2$onMouseLeave === void 0 ? noop : _ref2$onMouseLeave,
      _ref2$timeout = _ref2.timeout,
      timeout = _ref2$timeout === void 0 ? 300 : _ref2$timeout;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var timeoutRef = useRef();
  var setDebouncedTimeout = useCallback(function (callback) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(callback, timeout);
  }, [timeout]);
  var handleOnMouseMove = useCallback(function (event) {
    onMouseMove(event);
    setDebouncedTimeout(function () {
      if (!show) {
        setShow(true);
        onShow();
      }
    });
  }, []);
  var handleOnMouseLeave = useCallback(function (event) {
    onMouseLeave(event);
    setDebouncedTimeout(function () {
      setShow(false);
      onHide();
    });
  }, []);
  useEffect(function () {
    return function () {
      window.clearTimeout(timeoutRef.current);
    };
  });
  return {
    onMouseMove: handleOnMouseMove,
    onMouseLeave: handleOnMouseLeave
  };
}
//# sourceMappingURL=utils.js.map