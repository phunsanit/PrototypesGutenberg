/**
 * Given a symbol object and tag name(s), returns tag objects from the symbol
 * matching the given name.
 *
 * @param {Object}    symbol Symbol object.
 * @param {...string} names  Names of tags to return.
 *
 * @return {Object[]} Matching tag objects.
 */
function getSymbolTagsByName(symbol) {
  for (var _len = arguments.length, names = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  return symbol.tags.filter(function (tag) {
    return names.some(function (name) {
      return name === tag.title;
    });
  });
}

module.exports = getSymbolTagsByName;
//# sourceMappingURL=get-symbol-tags-by-name.js.map