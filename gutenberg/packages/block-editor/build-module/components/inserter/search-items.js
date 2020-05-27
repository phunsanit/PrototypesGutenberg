import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { deburr, differenceWith, find, intersectionWith, isEmpty, words } from 'lodash';
/**
 * Converts the search term into a list of normalized terms.
 *
 * @param {string} term The search term to normalize.
 *
 * @return {string[]} The normalized list of search terms.
 */

export var normalizeSearchTerm = function normalizeSearchTerm() {
  var term = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  // Disregard diacritics.
  //  Input: "média"
  term = deburr(term); // Accommodate leading slash, matching autocomplete expectations.
  //  Input: "/media"

  term = term.replace(/^\//, ''); // Lowercase.
  //  Input: "MEDIA"

  term = term.toLowerCase(); // Extract words.

  return words(term);
};

var removeMatchingTerms = function removeMatchingTerms(unmatchedTerms, unprocessedTerms) {
  return differenceWith(unmatchedTerms, normalizeSearchTerm(unprocessedTerms), function (unmatchedTerm, unprocessedTerm) {
    return unprocessedTerm.includes(unmatchedTerm);
  });
};

export var searchBlockItems = function searchBlockItems(items, categories, collections, searchTerm) {
  var normalizedSearchTerms = normalizeSearchTerm(searchTerm);

  if (normalizedSearchTerms.length === 0) {
    return items;
  }

  return searchItems(items, searchTerm, {
    getCategory: function getCategory(item) {
      var _find;

      return (_find = find(categories, {
        slug: item.category
      })) === null || _find === void 0 ? void 0 : _find.title;
    },
    getCollection: function getCollection(item) {
      var _collections$item$nam;

      return (_collections$item$nam = collections[item.name.split('/')[0]]) === null || _collections$item$nam === void 0 ? void 0 : _collections$item$nam.title;
    },
    getVariations: function getVariations(item) {
      return (item.variations || []).map(function (variation) {
        return variation.title;
      });
    }
  }).map(function (item) {
    if (isEmpty(item.variations)) {
      return item;
    }

    var matchedVariations = item.variations.filter(function (variation) {
      return intersectionWith(normalizedSearchTerms, normalizeSearchTerm(variation.title), function (termToMatch, labelTerm) {
        return labelTerm.includes(termToMatch);
      }).length > 0;
    }); // When no variations matched, fallback to all variations.

    if (isEmpty(matchedVariations)) {
      return item;
    }

    return _objectSpread({}, item, {
      variations: matchedVariations
    });
  });
};
/**
 * Filters an item list given a search term.
 *
 * @param {Array} items       Item list
 * @param {string} searchTerm Search term.
 * @param {Object} config     Search Config.
 * @return {Array}            Filtered item list.
 */

export var searchItems = function searchItems(items, searchTerm) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var normalizedSearchTerms = normalizeSearchTerm(searchTerm);

  if (normalizedSearchTerms.length === 0) {
    return items;
  }

  var defaultGetTitle = function defaultGetTitle(item) {
    return item.title;
  };

  var defaultGetKeywords = function defaultGetKeywords(item) {
    return item.keywords || [];
  };

  var defaultGetCategory = function defaultGetCategory(item) {
    return item.category;
  };

  var defaultGetCollection = function defaultGetCollection() {
    return null;
  };

  var defaultGetVariations = function defaultGetVariations() {
    return [];
  };

  var _config$getTitle = config.getTitle,
      getTitle = _config$getTitle === void 0 ? defaultGetTitle : _config$getTitle,
      _config$getKeywords = config.getKeywords,
      getKeywords = _config$getKeywords === void 0 ? defaultGetKeywords : _config$getKeywords,
      _config$getCategory = config.getCategory,
      getCategory = _config$getCategory === void 0 ? defaultGetCategory : _config$getCategory,
      _config$getCollection = config.getCollection,
      getCollection = _config$getCollection === void 0 ? defaultGetCollection : _config$getCollection,
      _config$getVariations = config.getVariations,
      getVariations = _config$getVariations === void 0 ? defaultGetVariations : _config$getVariations;
  return items.filter(function (item) {
    var title = getTitle(item);
    var keywords = getKeywords(item);
    var category = getCategory(item);
    var collection = getCollection(item);
    var variations = getVariations(item);
    var terms = [title].concat(_toConsumableArray(keywords), [category, collection], _toConsumableArray(variations)).join(' ');
    var unmatchedTerms = removeMatchingTerms(normalizedSearchTerms, terms);
    return unmatchedTerms.length === 0;
  });
};
//# sourceMappingURL=search-items.js.map