import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { Toolbar, Dropdown, ToolbarButton, RangeControl, FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { postList } from '@wordpress/icons';
export default function QueryToolbar(_ref) {
  var query = _ref.query,
      setQuery = _ref.setQuery;

  var _useSelect = useSelect(function (select) {
    var _categories = select('core').getEntityRecords('taxonomy', 'category');

    return _objectSpread({
      categories: _categories
    }, _categories === null || _categories === void 0 ? void 0 : _categories.reduce(function (acc, category) {
      return {
        categoriesMapById: _objectSpread({}, acc.categoriesMapById, _defineProperty({}, category.id, category)),
        categoriesMapByName: _objectSpread({}, acc.categoriesMapByName, _defineProperty({}, category.name, category))
      };
    }, {
      categoriesMapById: {},
      categoriesMapByName: {}
    }));
  }, []),
      categories = _useSelect.categories,
      categoriesMapById = _useSelect.categoriesMapById,
      categoriesMapByName = _useSelect.categoriesMapByName;

  return createElement(Toolbar, null, createElement(Dropdown, {
    renderToggle: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle;
      return createElement(ToolbarButton, {
        icon: postList,
        label: __('Query'),
        onClick: onToggle
      });
    },
    renderContent: function renderContent() {
      return createElement(Fragment, null, createElement(RangeControl, {
        label: __('Posts per Page'),
        min: 1,
        allowReset: true,
        value: query.perPage,
        onChange: function onChange(value) {
          return setQuery({
            perPage: value !== null && value !== void 0 ? value : -1
          });
        }
      }), createElement(RangeControl, {
        label: __('Number of Pages'),
        min: 1,
        allowReset: true,
        value: query.pages,
        onChange: function onChange(value) {
          return setQuery({
            pages: value !== null && value !== void 0 ? value : -1
          });
        }
      }), createElement(RangeControl, {
        label: __('Offset'),
        min: 0,
        allowReset: true,
        value: query.offset,
        onChange: function onChange(value) {
          return setQuery({
            offset: value !== null && value !== void 0 ? value : 0
          });
        }
      }), categories && createElement(FormTokenField, {
        label: __('Categories'),
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