import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useState, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { BlockContextProvider, InnerBlocks, BlockPreview } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import { useQueryContext } from '../query';
var TEMPLATE = [['core/post-title'], ['core/post-content']];
export default function QueryLoopEdit(_ref) {
  var clientId = _ref.clientId,
      _ref$context = _ref.context,
      _ref$context$query = _ref$context.query,
      perPage = _ref$context$query.perPage,
      offset = _ref$context$query.offset,
      categoryIds = _ref$context$query.categoryIds,
      queryContext = _ref$context.queryContext;

  var _ref2 = useQueryContext() || queryContext,
      _ref3 = _slicedToArray(_ref2, 1),
      page = _ref3[0].page;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      activeBlockContext = _useState2[0],
      setActiveBlockContext = _useState2[1];

  var _useSelect = useSelect(function (select) {
    var query = {
      offset: perPage ? perPage * (page - 1) + offset : 0,
      categories: categoryIds
    };

    if (perPage) {
      query.per_page = perPage;
    }

    return {
      posts: select('core').getEntityRecords('postType', 'post', query),
      blocks: select('core/block-editor').getBlocks(clientId)
    };
  }, [perPage, page, offset, categoryIds, clientId]),
      posts = _useSelect.posts,
      blocks = _useSelect.blocks;

  var blockContexts = useMemo(function () {
    return posts === null || posts === void 0 ? void 0 : posts.map(function (post) {
      return {
        postType: post.type,
        postId: post.id
      };
    });
  }, [posts]);
  return blockContexts ? blockContexts.map(function (blockContext) {
    return createElement(BlockContextProvider, {
      key: blockContext.postId,
      value: blockContext
    }, blockContext === (activeBlockContext || blockContexts[0]) ? createElement(InnerBlocks, {
      template: TEMPLATE
    }) : createElement(BlockPreview, {
      blocks: blocks,
      __experimentalLive: true,
      __experimentalOnClick: function __experimentalOnClick() {
        return setActiveBlockContext(blockContext);
      }
    }));
  }) : null;
}
//# sourceMappingURL=edit.js.map