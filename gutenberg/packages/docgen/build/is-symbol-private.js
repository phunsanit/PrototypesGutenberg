"use strict";

/**
 * Internal dependencies
 */
var getSymbolTagsByName = require('./get-symbol-tags-by-name');
/**
 * Returns true if, given a symbol object, it contains a @private tag, or false
 * otherwise.
 *
 * @param {Object} symbol Symbol object.
 *
 * @return {boolean} Whether symbol is private.
 */


var isSymbolPrivate = function isSymbolPrivate(symbol) {
  return getSymbolTagsByName(symbol, 'private').length > 0;
};

module.exports = isSymbolPrivate;
//# sourceMappingURL=is-symbol-private.js.map