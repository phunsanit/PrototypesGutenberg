"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCoreBlocks = exports.coreBlocks = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _blocks = require("@wordpress/blocks");

var _hooks = require("@wordpress/hooks");

var paragraph = _interopRequireWildcard(require("./paragraph"));

var image = _interopRequireWildcard(require("./image"));

var heading = _interopRequireWildcard(require("./heading"));

var quote = _interopRequireWildcard(require("./quote"));

var gallery = _interopRequireWildcard(require("./gallery"));

var archives = _interopRequireWildcard(require("./archives"));

var audio = _interopRequireWildcard(require("./audio"));

var button = _interopRequireWildcard(require("./button"));

var calendar = _interopRequireWildcard(require("./calendar"));

var categories = _interopRequireWildcard(require("./categories"));

var code = _interopRequireWildcard(require("./code"));

var columns = _interopRequireWildcard(require("./columns"));

var column = _interopRequireWildcard(require("./column"));

var cover = _interopRequireWildcard(require("./cover"));

var embed = _interopRequireWildcard(require("./embed"));

var file = _interopRequireWildcard(require("./file"));

var html = _interopRequireWildcard(require("./html"));

var mediaText = _interopRequireWildcard(require("./media-text"));

var latestComments = _interopRequireWildcard(require("./latest-comments"));

var latestPosts = _interopRequireWildcard(require("./latest-posts"));

var list = _interopRequireWildcard(require("./list"));

var missing = _interopRequireWildcard(require("./missing"));

var more = _interopRequireWildcard(require("./more"));

var nextpage = _interopRequireWildcard(require("./nextpage"));

var preformatted = _interopRequireWildcard(require("./preformatted"));

var pullquote = _interopRequireWildcard(require("./pullquote"));

var reusableBlock = _interopRequireWildcard(require("./block"));

var rss = _interopRequireWildcard(require("./rss"));

var search = _interopRequireWildcard(require("./search"));

var separator = _interopRequireWildcard(require("./separator"));

var shortcode = _interopRequireWildcard(require("./shortcode"));

var spacer = _interopRequireWildcard(require("./spacer"));

var subhead = _interopRequireWildcard(require("./subhead"));

var table = _interopRequireWildcard(require("./table"));

var textColumns = _interopRequireWildcard(require("./text-columns"));

var verse = _interopRequireWildcard(require("./verse"));

var video = _interopRequireWildcard(require("./video"));

var tagCloud = _interopRequireWildcard(require("./tag-cloud"));

var classic = _interopRequireWildcard(require("./classic"));

var group = _interopRequireWildcard(require("./group"));

var buttons = _interopRequireWildcard(require("./buttons"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var coreBlocks = [// Common blocks are grouped at the top to prioritize their display
// in various contexts — like the inserter and auto-complete components.
paragraph, image, heading, gallery, list, quote, // Register all remaining core blocks.
shortcode, archives, audio, button, calendar, categories, code, columns, column, cover, embed].concat((0, _toConsumableArray2.default)(embed.common), (0, _toConsumableArray2.default)(embed.others), [file, html, mediaText, latestComments, latestPosts, missing, more, nextpage, preformatted, pullquote, rss, search, separator, reusableBlock, spacer, subhead, table, tagCloud, textColumns, verse, video, classic, buttons]).reduce(function (accumulator, block) {
  accumulator[block.name] = block;
  return accumulator;
}, {});
/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */

exports.coreBlocks = coreBlocks;

var registerBlock = function registerBlock(block) {
  if (!block) {
    return;
  }

  var metadata = block.metadata,
      settings = block.settings,
      name = block.name;
  (0, _blocks.registerBlockType)(name, _objectSpread({}, metadata, {}, settings));
}; // only enable code block for development
// eslint-disable-next-line no-undef


var devOnly = function devOnly(block) {
  return !!__DEV__ ? block : null;
}; // Hide the Classic block


(0, _hooks.addFilter)('blocks.registerBlockType', 'core/react-native-editor', function (settings, name) {
  if (name === 'core/freeform' && (0, _blocks.hasBlockSupport)(settings, 'inserter', true)) {
    settings.supports = _objectSpread({}, settings.supports, {
      inserter: false
    });
  }

  return settings;
});
/**
 * Function to register core blocks provided by the block editor.
 *
 * @example
 * ```js
 * import { registerCoreBlocks } from '@wordpress/block-library';
 *
 * registerCoreBlocks();
 * ```
 */

var registerCoreBlocks = function registerCoreBlocks() {
  [paragraph, heading, devOnly(code), missing, more, image, video, nextpage, separator, list, quote, mediaText, preformatted, gallery, columns, column, group, classic, button, spacer, shortcode, buttons, latestPosts, verse, cover, pullquote].forEach(registerBlock);
  (0, _blocks.setDefaultBlockName)(paragraph.name);
  (0, _blocks.setFreeformContentHandlerName)(classic.name);
  (0, _blocks.setUnregisteredTypeHandlerName)(missing.name);

  if (group) {
    (0, _blocks.setGroupingBlockName)(group.name);
  }
};

exports.registerCoreBlocks = registerCoreBlocks;
//# sourceMappingURL=index.native.js.map