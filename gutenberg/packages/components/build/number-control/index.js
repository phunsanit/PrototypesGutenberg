"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberControl = NumberControl;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _numberControlStyles = require("./styles/number-control-styles");

var _utils = require("./utils");

var _utils2 = require("../input-control/utils");

var _state = require("../input-control/state");

var _styleMixins = require("../utils/style-mixins");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function NumberControl(_ref, ref) {
  var _ref$__unstableStateR = _ref.__unstableStateReducer,
      stateReducer = _ref$__unstableStateR === void 0 ? function (state) {
    return state;
  } : _ref$__unstableStateR,
      className = _ref.className,
      _ref$dragDirection = _ref.dragDirection,
      dragDirection = _ref$dragDirection === void 0 ? 'n' : _ref$dragDirection,
      _ref$hideHTMLArrows = _ref.hideHTMLArrows,
      hideHTMLArrows = _ref$hideHTMLArrows === void 0 ? false : _ref$hideHTMLArrows,
      _ref$isDragEnabled = _ref.isDragEnabled,
      isDragEnabled = _ref$isDragEnabled === void 0 ? true : _ref$isDragEnabled,
      _ref$isShiftStepEnabl = _ref.isShiftStepEnabled,
      isShiftStepEnabled = _ref$isShiftStepEnabl === void 0 ? true : _ref$isShiftStepEnabl,
      label = _ref.label,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? Infinity : _ref$max,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? -Infinity : _ref$min,
      _ref$shiftStep = _ref.shiftStep,
      shiftStep = _ref$shiftStep === void 0 ? 10 : _ref$shiftStep,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      _ref$type = _ref.type,
      typeProp = _ref$type === void 0 ? 'number' : _ref$type,
      valueProp = _ref.value,
      props = (0, _objectWithoutProperties2.default)(_ref, ["__unstableStateReducer", "className", "dragDirection", "hideHTMLArrows", "isDragEnabled", "isShiftStepEnabled", "label", "max", "min", "shiftStep", "step", "type", "value"]);
  var initialValue = (0, _utils.getValue)(valueProp, min, max);
  var baseValue = (0, _lodash.clamp)(0, min, max);
  var isRtl = (0, _styleMixins.useRTL)();
  var autoComplete = typeProp === 'number' ? 'off' : null;
  var classes = (0, _classnames.default)('components-number-control', className);
  /**
   * "Middleware" function that intercepts updates from InputControl.
   * This allows us to tap into actions to transform the (next) state for
   * InputControl.
   *
   * @param {Object} state State from InputControl
   * @param {Object} action Action triggering state change
   * @return {Object} The updated state to apply to InputControl
   */

  var numberControlStateReducer = function numberControlStateReducer(state, action) {
    var type = action.type,
        payload = action.payload;
    var event = payload === null || payload === void 0 ? void 0 : payload.event;
    var currentValue = state.value;
    /**
     * Handles custom UP and DOWN Keyboard events
     */

    if (type === _state.inputControlActionTypes.PRESS_UP || type === _state.inputControlActionTypes.PRESS_DOWN) {
      var enableShift = event.shiftKey && isShiftStepEnabled;
      var incrementalValue = enableShift ? parseFloat(shiftStep) : parseFloat(step);
      var nextValue = (0, _utils2.isValueEmpty)(currentValue) ? baseValue : currentValue;

      if (event === null || event === void 0 ? void 0 : event.preventDefault) {
        event.preventDefault();
      }

      if (type === _state.inputControlActionTypes.PRESS_UP) {
        nextValue = (0, _utils.add)(nextValue, incrementalValue);
      }

      if (type === _state.inputControlActionTypes.PRESS_DOWN) {
        nextValue = (0, _utils.subtract)(nextValue, incrementalValue);
      }

      nextValue = (0, _utils.roundClamp)(nextValue, min, max, incrementalValue);
      state.value = nextValue;
    }
    /**
     * Handles drag to update events
     */


    if (type === _state.inputControlActionTypes.DRAG && isDragEnabled) {
      var delta = payload.delta,
          shiftKey = payload.shiftKey;

      var _delta = (0, _slicedToArray2.default)(delta, 2),
          x = _delta[0],
          y = _delta[1];

      var modifier = shiftKey ? shiftStep : 1;
      var directionModifier;
      var directionBaseValue;

      switch (dragDirection) {
        case 'n':
          directionBaseValue = y;
          directionModifier = -1;
          break;

        case 'e':
          directionBaseValue = x;
          directionModifier = isRtl ? -1 : 1;
          break;

        case 's':
          directionBaseValue = y;
          directionModifier = 1;
          break;

        case 'w':
          directionBaseValue = x;
          directionModifier = isRtl ? 1 : -1;
          break;
      }

      var distance = directionBaseValue * modifier * directionModifier;

      var _nextValue;

      if (distance !== 0) {
        _nextValue = (0, _utils.roundClamp)((0, _utils.add)(currentValue, distance), min, max, modifier);
        state.value = _nextValue;
      }
    }
    /**
     * Handles ENTER key press and submit
     */


    if (type === _state.inputControlActionTypes.PRESS_ENTER || type === _state.inputControlActionTypes.SUBMIT) {
      state.value = (0, _utils.roundClamp)(currentValue, min, max);
    }

    return state;
  };

  return (0, _element.createElement)(_numberControlStyles.Input, (0, _extends2.default)({
    autoComplete: autoComplete,
    inputMode: "numeric"
  }, props, {
    className: classes,
    dragDirection: dragDirection,
    hideHTMLArrows: hideHTMLArrows,
    isDragEnabled: isDragEnabled,
    label: label,
    max: max,
    min: min,
    ref: ref,
    type: typeProp,
    value: initialValue,
    __unstableStateReducer: (0, _state.composeStateReducers)(numberControlStateReducer, stateReducer)
  }));
}

var _default = (0, _element.forwardRef)(NumberControl);

exports.default = _default;
//# sourceMappingURL=index.js.map