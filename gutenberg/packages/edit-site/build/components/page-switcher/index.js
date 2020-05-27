"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PageSwitcher;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _url = require("@wordpress/url");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function getPathFromLink(link) {
  var path = (0, _url.getPath)(link);
  var queryString = (0, _url.getQueryString)(link);
  var value = '/';
  if (path) value += path;
  if (queryString) value += "?".concat(queryString);
  return value;
}

function PageSwitcher(_ref) {
  var _find2;

  var showOnFront = _ref.showOnFront,
      activePage = _ref.activePage,
      onActivePageChange = _ref.onActivePageChange;

  var _useSelect = (0, _data.useSelect)(function (select) {
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
      label: (0, _i18n.__)('All Posts'),
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
    var _find = [].concat((0, _toConsumableArray2.default)(pages), (0, _toConsumableArray2.default)(categories)).find(function (choice) {
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

  return (0, _element.createElement)(_components.DropdownMenu, {
    icon: null,
    label: (0, _i18n.__)('Switch Page'),
    toggleProps: {
      children: ((_find2 = [].concat((0, _toConsumableArray2.default)(pages), (0, _toConsumableArray2.default)(categories), (0, _toConsumableArray2.default)(posts)).find(function (choice) {
        return choice.value === activePage.path;
      })) === null || _find2 === void 0 ? void 0 : _find2.label) || activePage.path
    },
    menuProps: {
      className: 'edit-site-page-switcher__menu'
    }
  }, function () {
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Pages')
    }, (0, _element.createElement)(_components.MenuItemsChoice, {
      choices: pages,
      value: activePage.path,
      onSelect: onPageSelect
    })), (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Categories')
    }, (0, _element.createElement)(_components.MenuItemsChoice, {
      choices: categories,
      value: activePage.path,
      onSelect: onPageSelect
    })), (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Posts')
    }, (0, _element.createElement)(_components.MenuItemsChoice, {
      choices: posts,
      value: activePage.path,
      onSelect: onPageSelect
    }), (0, _element.createElement)(_blockEditor.__experimentalLinkControl, {
      searchInputPlaceholder: (0, _i18n.__)('Search for Post'),
      onChange: onPostSelect,
      settings: {},
      noDirectEntry: true,
      showInitialSuggestions: true
    })));
  });
}
//# sourceMappingURL=index.js.map