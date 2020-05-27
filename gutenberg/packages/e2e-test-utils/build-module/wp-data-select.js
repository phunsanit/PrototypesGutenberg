/**
 * Queries the WordPress data module.
 *
 * @param {string}    store      Store to query e.g: core/editor, core/blocks...
 * @param {string}    selector   Selector to exectute e.g: getBlocks.
 * @param {...Object} parameters Parameters to pass to the selector.
 *
 * @return {?Object} Result of querying.
 */
export function wpDataSelect(store, selector) {
  for (var _len = arguments.length, parameters = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    parameters[_key - 2] = arguments[_key];
  }

  return page.evaluate(function (_store, _selector) {
    var _window$wp$data$selec;

    for (var _len2 = arguments.length, _parameters = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      _parameters[_key2 - 2] = arguments[_key2];
    }

    return (_window$wp$data$selec = window.wp.data.select(_store))[_selector].apply(_window$wp$data$selec, _parameters);
  }, store, selector, parameters);
}
//# sourceMappingURL=wp-data-select.js.map