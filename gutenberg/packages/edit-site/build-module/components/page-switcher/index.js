import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { getPath, getQueryString } from '@wordpress/url';
import { useSelect } from '@wordpress/data';
import { DropdownMenu, MenuGroup, MenuItemsChoice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';

function getPathFromLink(link) {
  var path = getPath(link);
  var queryString = getQueryString(link);
  var value = '/';
  if (path) value += path;
  if (queryString) value += "?".concat(queryString);
  return value;
}

export default function PageSwitcher(_ref) {
  var _find2;

  var showOnFront = _ref.showOnFront,
      activePage = _ref.activePage,
      onActivePageChange = _ref.onActivePageChange;

  var _useSelect = useSelect(function (select) {
    var _getEntityRecords, _getEntityRecords2;

    var _select = select('core'),
        getEntityRecords = _select.getEntityRecords;

    var pageGroups = {
      pages: (_getEntityRecords = getEntityRecords('postType', 'page')) === null || _getEntityRecords === void 0 ? void 0 : _getEntityRecords.map(function (_page) {
        var path = getPathFromLink(_page.link);
        return {
          label: _page.title.rendered,
          value: path,
          context: {
            postType: 'page',
            postId: _page.id
          }
        };
      }),
      categories: (_getEntityRecords2 = getEntityRecords('taxonomy', 'category')) === null || _getEntityRecords2 === void 0 ? void 0 : _getEntityRecords2.map(function (category) {
        var path = getPathFromLink(category.link);
        return {
          label: category.name,
          value: path,
          context: {
            query: {
              categoryIds: [category.id]
            },
            queryContext: {
              page: 1
            }
          }
        };
      }),
      posts: []
    };
    if (showOnFront === 'posts') pageGroups.posts.unshift({
      label: __('All Posts'),
      value: '/',
      context: {
        query: {
          categoryIds: []
        },
        queryContext: {
          page: 1
        }
      }
    });
    return pageGroups;
  }, [showOnFront]),
      _useSelect$pages = _useSelect.pages,
      pages = _useSelect$pages === void 0 ? [] : _useSelect$pages,
      _useSelect$categories = _useSelect.categories,
      categories = _useSelect$categories === void 0 ? [] : _useSelect$categories,
      _useSelect$posts = _useSelect.posts,
      posts = _useSelect$posts === void 0 ? [] : _useSelect$posts;

  var onPageSelect = function onPageSelect(newPath) {
    var _find = [].concat(_toConsumableArray(pages), _toConsumableArray(categories)).find(function (choice) {
      return choice.value === newPath;
    }),
        path = _find.value,
        context = _find.context;

    onActivePageChange({
      path: path,
      context: context
    });
  };

  var onPostSelect = function onPostSelect(post) {
    return onActivePageChange({
      path: getPathFromLink(post.url),
      context: {
        postType: post.type,
        postId: post.id
      }
    });
  };

  return createElement(DropdownMenu, {
    icon: null,
    label: __('Switch Page'),
    toggleProps: {
      children: ((_find2 = [].concat(_toConsumableArray(pages), _toConsumableArray(categories), _toConsumableArray(posts)).find(function (choice) {
        return choice.value === activePage.path;
      })) === null || _find2 === void 0 ? void 0 : _find2.label) || activePage.path
    },
    menuProps: {
      className: 'edit-site-page-switcher__menu'
    }
  }, function () {
    return createElement(Fragment, null, createElement(MenuGroup, {
      label: __('Pages')
    }, createElement(MenuItemsChoice, {
      choices: pages,
      value: activePage.path,
      onSelect: onPageSelect
    })), createElement(MenuGroup, {
      label: __('Categories')
    }, createElement(MenuItemsChoice, {
      choices: categories,
      value: activePage.path,
      onSelect: onPageSelect
    })), createElement(MenuGroup, {
      label: __('Posts')
    }, createElement(MenuItemsChoice, {
      choices: posts,
      value: activePage.path,
      onSelect: onPageSelect
    }), createElement(LinkControl, {
      searchInputPlaceholder: __('Search for Post'),
      onChange: onPostSelect,
      settings: {},
      noDirectEntry: true,
      showInitialSuggestions: true
    })));
  });
}
//# sourceMappingURL=index.js.map