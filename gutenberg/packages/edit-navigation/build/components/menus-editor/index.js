"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MenusEditor;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _createMenuPanel = _interopRequireDefault(require("./create-menu-panel"));

var _menuEditor = _interopRequireDefault(require("../menu-editor"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function MenusEditor(_ref) {
  var blockEditorSettings = _ref.blockEditorSettings;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        getMenus = _select.getMenus,
        hasFinishedResolution = _select.hasFinishedResolution;

    return {
      menus: getMenus(),
      hasLoadedMenus: hasFinishedResolution('getMenus')
    };
  }, []),
      menus = _useSelect.menus,
      hasLoadedMenus = _useSelect.hasLoadedMenus;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hasCompletedFirstLoad = _useState2[0],
      setHasCompletedFirstLoad = _useState2[1];

  (0, _element.useEffect)(function () {
    if (!hasCompletedFirstLoad && hasLoadedMenus) {
      setHasCompletedFirstLoad(true);
    }
  }, [hasLoadedMenus]);

  var _useState3 = (0, _element.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      menuId = _useState4[0],
      setMenuId = _useState4[1];

  var _useState5 = (0, _element.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      stateMenus = _useState6[0],
      setStateMenus = _useState6[1];

  var _useState7 = (0, _element.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      showCreateMenuPanel = _useState8[0],
      setShowCreateMenuPanel = _useState8[1];

  (0, _element.useEffect)(function () {
    if (menus === null || menus === void 0 ? void 0 : menus.length) {
      setStateMenus(menus); // Only set menuId if it's currently unset.

      if (!menuId) {
        setMenuId(menus[0].id);
      }
    }
  }, [menus, menuId]);

  if (!hasCompletedFirstLoad) {
    return (0, _element.createElement)(_components.Spinner, null);
  }

  var hasMenus = !!(stateMenus === null || stateMenus === void 0 ? void 0 : stateMenus.length);
  var isCreateMenuPanelVisible = hasCompletedFirstLoad && (!hasMenus || showCreateMenuPanel);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Card, {
    className: "edit-navigation-menus-editor__menu-selection-card"
  }, (0, _element.createElement)(_components.CardBody, {
    className: "edit-navigation-menus-editor__menu-selection-card-body"
  }, hasCompletedFirstLoad && !hasMenus && (0, _element.createElement)("p", {
    className: "edit-navigation-menus-editor__menu-selection-card-instructional-text"
  }, (0, _i18n.__)('Create your first menu below.')), hasMenus && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.SelectControl, {
    className: "edit-navigation-menus-editor__menu-select-control",
    label: (0, _i18n.__)('Select navigation to edit:'),
    options: stateMenus === null || stateMenus === void 0 ? void 0 : stateMenus.map(function (menu) {
      return {
        value: menu.id,
        label: menu.name
      };
    }),
    onChange: function onChange(selectedMenuId) {
      return setMenuId(selectedMenuId);
    },
    value: menuId
  }), (0, _element.createElement)(_components.Button, {
    isLink: true,
    onClick: function onClick() {
      return setShowCreateMenuPanel(true);
    }
  }, (0, _i18n.__)('Create a new menu'))))), isCreateMenuPanelVisible && (0, _element.createElement)(_createMenuPanel.default, {
    menus: stateMenus,
    onCancel: // User can only cancel out of menu creation if there
    // are other menus to fall back to showing.
    hasMenus ? function () {
      return setShowCreateMenuPanel(false);
    } : undefined,
    onCreateMenu: function onCreateMenu(newMenuId) {
      setMenuId(newMenuId);
      setShowCreateMenuPanel(false);
    }
  }), hasMenus && (0, _element.createElement)(_menuEditor.default, {
    menuId: menuId,
    blockEditorSettings: blockEditorSettings,
    onDeleteMenu: function onDeleteMenu(deletedMenu) {
      var newStateMenus = stateMenus.filter(function (menu) {
        return menu.id !== deletedMenu;
      });
      setStateMenus(newStateMenus);

      if (newStateMenus.length) {
        setMenuId(newStateMenus[0].id);
      } else {
        setMenuId();
      }
    }
  }));
}
//# sourceMappingURL=index.js.map