"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = QueryToolbar;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function QueryToolbar(_ref) {
  var query = _ref.query,
      setQuery = _ref.setQuery;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _categories = select('core').getEntityRecords('taxonomy', 'category');

    return _objectSpread({
      categories: _categories
    }, _categories === null || _categories === void 0 ? void 0 : _categories.reduce(function (acc, category) {
      return {
        categoriesMapById: _objectSpread({}, acc.categoriesMapById, (0, _defineProperty2.default)({}, category.id, category)),
        categoriesMapByName: _objectSpread({}, acc.categoriesMapByName, (0, _defineProperty2.default)({}, category.name, category))
      };
    }, {
      categoriesMapById: {},
      categoriesMapByName: {}
    }));
  }, []),
      categories = _useSelect.categories,
      categoriesMapById = _useSelect.categoriesMapById,
      categoriesMapByName = _useSelect.categoriesMapByName;

  return (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_components.Dropdown, {
    renderToggle: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle;
      return (0, _element.createElement)(_components.ToolbarButton, {
        icon: _icons.postList,
        label: (0, _i18n.__)('Query'),
        onClick: onToggle
      });
    },
    renderContent: function renderContent() {
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Posts per Page'),
        min: 1,
        allowReset: true,
        value: query.perPage,
        onChange: function onChange(value) {
          return setQuery({
            perPage: value !== null && value !== void 0 ? value : -1
          });
        }
      }), (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Number of Pages'),
        min: 1,
        allowReset: true,
        value: query.pages,
        onChange: function onChange(value) {
          return setQuery({
            pages: value !== null && value !== void 0 ? value : -1
          });
        }
      }), (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Offset'),
        min: 0,
        allowReset: true,
        value: query.offset,
        onChange: function onChange(value) {
          return setQuery({
            offset: value !== null && value !== void 0 ? value : 0
          });
        }
      }), categories && (0, _element.createElement)(_components.FormTokenField, {
        label: (0, _i18n.__)('Categories'),
        value: query.categoryIds.map(function (categoryId) {
          return {
            id: categoryId,
            value: categoriesMapById[categoryId].name
          };
        }),
        suggestions: categories.map(function (category) {
          return category.name;
        }),
        onChange: function onChange(newCategoryNames) {
          var categoryIds = newCategoryNames.map(function (categoryName) {
            var _categoriesMapByName$;

            return (_categoriesMapByName$ = categoriesMapByName[categoryName]) === null || _categoriesMapByName$ === void 0 ? void 0 : _categoriesMapByName$.id;
          });
          if (categoryIds.includes(undefined)) return;
          setQuery({
            categoryIds: categoryIds
          });
        }
      }));
    }
  }));
}
//# sourceMappingURL=query-toolbar.js.map