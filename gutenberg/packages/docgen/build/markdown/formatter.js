"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

/**
 * Internal dependencies
 */
var getSymbolTagsByName = require('../get-symbol-tags-by-name');

var cleanSpaces = function cleanSpaces(paragraph) {
  return paragraph ? paragraph.split('\n').map(function (sentence) {
    return sentence.trim();
  }).reduce(function (acc, current) {
    return acc + ' ' + current;
  }, '').trim() : '';
};

var formatTag = function formatTag(title, tags, formatter, docs) {
  if (tags && tags.length > 0) {
    docs.push('\n');
    docs.push('\n');
    docs.push("*".concat(title, "*"));
    docs.push('\n');
    docs.push.apply(docs, (0, _toConsumableArray2.default)(tags.map(formatter)));
  }
};

var formatExamples = function formatExamples(tags, docs) {
  if (tags && tags.length > 0) {
    docs.push('\n');
    docs.push('\n');
    docs.push('*Usage*');
    docs.push('\n');
    docs.push('\n');
    docs.push.apply(docs, (0, _toConsumableArray2.default)(tags.map(function (tag) {
      return "".concat(tag.description);
    }).join('\n\n')));
  }
};

var formatDeprecated = function formatDeprecated(tags, docs) {
  if (tags && tags.length > 0) {
    docs.push('\n');
    docs.push.apply(docs, (0, _toConsumableArray2.default)(tags.map(function (tag) {
      return "\n> **Deprecated** ".concat(cleanSpaces(tag.description));
    })));
  }
};

var formatDescription = function formatDescription(description, docs) {
  docs.push('\n');
  docs.push('\n');
  docs.push(description);
};

var getHeading = function getHeading(index, text) {
  return '#'.repeat(index) + ' ' + text;
};

var getSymbolHeading = function getSymbolHeading(text) {
  return "<a name=\"".concat(text, "\" href=\"#").concat(text, "\">#</a> **").concat(text, "**");
};

var getTypeOutput = function getTypeOutput(type) {
  return type ? "`".concat(type, "`") : '(unknown type)';
};

module.exports = function (rootDir, docPath, symbols, headingTitle, headingStartIndex) {
  var docs = [];
  var headingIndex = headingStartIndex || 1;

  if (headingTitle) {
    docs.push(getHeading(headingIndex, "".concat(headingTitle)));
    headingIndex++;
  }

  docs.push('\n');
  docs.push('\n');
  symbols.sort(function (first, second) {
    var firstName = first.name.toUpperCase();
    var secondName = second.name.toUpperCase();

    if (firstName < secondName) {
      return -1;
    }

    if (firstName > secondName) {
      return 1;
    }

    return 0;
  });

  if (symbols && symbols.length > 0) {
    symbols.forEach(function (symbol) {
      docs.push(getSymbolHeading(symbol.name));
      formatDeprecated(getSymbolTagsByName(symbol, 'deprecated'), docs);
      formatDescription(symbol.description, docs);
      formatTag('Related', getSymbolTagsByName(symbol, 'see', 'link'), function (tag) {
        return "\n- ".concat(tag.description);
      }, docs);
      formatExamples(getSymbolTagsByName(symbol, 'example'), docs);
      formatTag('Type', getSymbolTagsByName(symbol, 'type'), function (tag) {
        return "\n- ".concat(getTypeOutput(tag.type), " ").concat(cleanSpaces(tag.description));
      }, docs);
      formatTag('Parameters', getSymbolTagsByName(symbol, 'param'), function (tag) {
        return "\n- *".concat(tag.name, "* ").concat(getTypeOutput(tag.type), ": ").concat(cleanSpaces(tag.description));
      }, docs);
      formatTag('Returns', getSymbolTagsByName(symbol, 'return'), function (tag) {
        return "\n- ".concat(getTypeOutput(tag.type), ": ").concat(cleanSpaces(tag.description));
      }, docs);
      formatTag('Type Definition', getSymbolTagsByName(symbol, 'typedef'), function (tag) {
        return "\n- *".concat(tag.name, "* ").concat(getTypeOutput(tag.type));
      }, docs);
      formatTag('Properties', getSymbolTagsByName(symbol, 'property'), function (tag) {
        return "\n- *".concat(tag.name, "* ").concat(getTypeOutput(tag.type), ": ").concat(cleanSpaces(tag.description));
      }, docs);
      docs.push('\n');
      docs.push('\n');
    });
    docs.pop(); // remove last \n, we want one blank line at the end of the file.
  } else {
    docs.push('Nothing to document.');
    docs.push('\n');
  }

  return docs.join('');
};
//# sourceMappingURL=formatter.js.map