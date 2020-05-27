import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { Button, Card, CardBody, Spinner, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import CreateMenuPanel from './create-menu-panel';
import MenuEditor from '../menu-editor';
export default function MenusEditor(_ref) {
  var blockEditorSettings = _ref.blockEditorSettings;

  var _useSelect = useSelect(function (select) {
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

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      hasCompletedFirstLoad = _useState2[0],
      setHasCompletedFirstLoad = _useState2[1];

  useEffect(function () {
    if (!hasCompletedFirstLoad && hasLoadedMenus) {
      setHasCompletedFirstLoad(true);
    }
  }, [hasLoadedMenus]);

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      menuId = _useState4[0],
      setMenuId = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      stateMenus = _useState6[0],
      setStateMenus = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showCreateMenuPanel = _useState8[0],
      setShowCreateMenuPanel = _useState8[1];

  useEffect(function () {
    if (menus === null || menus === void 0 ? void 0 : menus.length) {
      setStateMenus(menus); // Only set menuId if it's currently unset.

      if (!menuId) {
        setMenuId(menus[0].id);
      }
    }
  }, [menus, menuId]);

  if (!hasCompletedFirstLoad) {
    return createElement(Spinner, null);
  }

  var hasMenus = !!(stateMenus === null || stateMenus === void 0 ? void 0 : stateMenus.length);
  var isCreateMenuPanelVisible = hasCompletedFirstLoad && (!hasMenus || showCreateMenuPanel);
  return createElement(Fragment, null, createElement(Card, {
    className: "edit-navigation-menus-editor__menu-selection-card"
  }, createElement(CardBody, {
    className: "edit-navigation-menus-editor__menu-selection-card-body"
  }, hasCompletedFirstLoad && !hasMenus && createElement("p", {
    className: "edit-navigation-menus-editor__menu-selection-card-instructional-text"
  }, __('Create your first menu below.')), hasMenus && createElement(Fragment, null, createElement(SelectControl, {
    className: "edit-navigation-menus-editor__menu-select-control",
    label: __('Select navigation to edit:'),
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
  }), createElement(Button, {
    isLink: true,
    onClick: function onClick() {
      return setShowCreateMenuPanel(true);
    }
  }, __('Create a new menu'))))), isCreateMenuPanelVisible && createElement(CreateMenuPanel, {
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
  }), hasMenus && createElement(MenuEditor, {
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