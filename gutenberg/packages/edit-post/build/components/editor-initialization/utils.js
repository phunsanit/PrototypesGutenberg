"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onChangeListener = void 0;

/**
 * Given a selector returns a functions that returns the listener only
 * if the returned value from the selector changes.
 *
 * @param  {Function} selector Selector.
 * @param  {Function} listener Listener.
 * @param  {boolean}  initial  Flags whether listener should be invoked on
 *                             initial call.
 * @return {Function}          Listener creator.
 */
var onChangeListener = function onChangeListener(selector, listener) {
  var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var previousValue = selector();

  if (initial) {
    listener(selector());
  }

  return function () {
    var selectedValue = selector();

    if (selectedValue !== previousValue) {
      previousValue = selectedValue;
      listener(selectedValue);
    }
  };
};

exports.onChangeListener = onChangeListener;
//# sourceMappingURL=utils.js.map