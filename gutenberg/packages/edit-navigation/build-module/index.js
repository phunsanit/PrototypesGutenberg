import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map } from 'lodash';
/**
 * WordPress dependencies
 */

import '@wordpress/notices';
import { registerCoreBlocks, __experimentalRegisterExperimentalCoreBlocks } from '@wordpress/block-library';
import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
/**
 * Internal dependencies
 */

import Layout from './components/layout';
/**
 * Fetches link suggestions from the API. This function is an exact copy of a function found at:
 *
 * wordpress/editor/src/components/provider/index.js
 *
 * It seems like there is no suitable package to import this from. Ideally it would be either part of core-data.
 * Until we refactor it, just copying the code is the simplest solution.
 *
 * @param {Object} search
 * @param {number} perPage
 * @return {Promise<Object[]>} List of suggestions
 */

var fetchLinkSuggestions = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(search) {
    var _ref2,
        _ref2$perPage,
        perPage,
        posts,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$perPage = _ref2.perPage, perPage = _ref2$perPage === void 0 ? 20 : _ref2$perPage;
            _context.next = 3;
            return apiFetch({
              path: addQueryArgs('/wp/v2/search', {
                search: search,
                per_page: perPage,
                type: 'post'
              })
            });

          case 3:
            posts = _context.sent;
            return _context.abrupt("return", map(posts, function (post) {
              return {
                id: post.id,
                url: post.url,
                title: decodeEntities(post.title) || __('(no title)'),
                type: post.subtype || post.type
              };
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchLinkSuggestions(_x) {
    return _ref.apply(this, arguments);
  };
}();

export function initialize(id, settings) {
  registerCoreBlocks();

  if (process.env.GUTENBERG_PHASE === 2) {
    __experimentalRegisterExperimentalCoreBlocks(settings);
  }

  settings.__experimentalFetchLinkSuggestions = fetchLinkSuggestions;
  render(createElement(Layout, {
    blockEditorSettings: settings
  }), document.getElementById(id));
}
//# sourceMappingURL=index.js.map