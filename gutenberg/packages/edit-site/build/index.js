"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
Object.defineProperty(exports, "__experimentalFullscreenModeClose", {
  enumerable: true,
  get: function get() {
    return _fullscreenModeClose.default;
  }
});

var _element = require("@wordpress/element");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _url = require("@wordpress/url");

var _htmlEntities = require("@wordpress/html-entities");

var _i18n = require("@wordpress/i18n");

require("@wordpress/notices");

var _blockLibrary = require("@wordpress/block-library");

require("./plugins");

require("./hooks");

require("./store");

var _editor = _interopRequireDefault(require("./components/editor"));

var _fullscreenModeClose = _interopRequireDefault(require("./components/header/fullscreen-mode-close"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var fetchLinkSuggestions = function fetchLinkSuggestions(search) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$perPage = _ref.perPage,
      perPage = _ref$perPage === void 0 ? 20 : _ref$perPage;

  return (0, _apiFetch.default)({
    path: (0, _url.addQueryArgs)('/wp/v2/search', {
      per_page: perPage,
      search: search,
      type: 'post',
      subtype: 'post'
    })
  }).then(function (posts) {
    return posts.map(function (post) {
      return {
        url: post.url,
        type: post.subtype || post.type,
        id: post.id,
        title: (0, _htmlEntities.decodeEntities)(post.title) || (0, _i18n.__)('(no title)')
      };
    });
  });
};
/**
 * Initializes the site editor screen.
 *
 * @param {string} id       ID of the root element to render the screen in.
 * @param {Object} settings Editor settings.
 */


function initialize(id, settings) {
  (0, _blockLibrary.registerCoreBlocks)();

  if (process.env.GUTENBERG_PHASE === 2) {
    (0, _blockLibrary.__experimentalRegisterExperimentalCoreBlocks)(settings);
  }

  settings.__experimentalFetchLinkSuggestions = fetchLinkSuggestions;
  (0, _element.render)((0, _element.createElement)(_editor.default, {
    settings: settings
  }), document.getElementById(id));
}
//# sourceMappingURL=index.js.map