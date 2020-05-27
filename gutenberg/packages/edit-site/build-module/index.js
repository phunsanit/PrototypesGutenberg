import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import '@wordpress/notices';
import { registerCoreBlocks, __experimentalRegisterExperimentalCoreBlocks } from '@wordpress/block-library';
import { render } from '@wordpress/element';
/**
 * Internal dependencies
 */

import './plugins';
import './hooks';
import './store';
import Editor from './components/editor';

var fetchLinkSuggestions = function fetchLinkSuggestions(search) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$perPage = _ref.perPage,
      perPage = _ref$perPage === void 0 ? 20 : _ref$perPage;

  return apiFetch({
    path: addQueryArgs('/wp/v2/search', {
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
        title: decodeEntities(post.title) || __('(no title)')
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


export function initialize(id, settings) {
  registerCoreBlocks();

  if (process.env.GUTENBERG_PHASE === 2) {
    __experimentalRegisterExperimentalCoreBlocks(settings);
  }

  settings.__experimentalFetchLinkSuggestions = fetchLinkSuggestions;
  render(createElement(Editor, {
    settings: settings
  }), document.getElementById(id));
}
export { default as __experimentalFullscreenModeClose } from './components/header/fullscreen-mode-close';
//# sourceMappingURL=index.js.map