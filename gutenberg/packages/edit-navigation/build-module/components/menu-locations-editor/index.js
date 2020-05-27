import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { SelectControl, Button, Panel, PanelBody, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import useMenuLocations from './use-menu-locations';
export default function MenuLocationsEditor() {
  var menus = useSelect(function (select) {
    return select('core').getMenus();
  });

  var _useMenuLocations = useMenuLocations(),
      _useMenuLocations2 = _slicedToArray(_useMenuLocations, 3),
      menuLocations = _useMenuLocations2[0],
      saveMenuLocations = _useMenuLocations2[1],
      assignMenuToLocation = _useMenuLocations2[2];

  if (!menus || !menuLocations) {
    return createElement(Spinner, null);
  }

  var menuSelectControlOptions = [{
    value: 0,
    label: __('— Select a Menu —')
  }].concat(_toConsumableArray(menus.map(function (_ref) {
    var id = _ref.id,
        name = _ref.name;
    return {
      value: id,
      label: name
    };
  })));

  if (menuLocations.length === 0) {
    return createElement(Panel, {
      className: "edit-navigation-menu-editor__panel"
    }, createElement(PanelBody, {
      title: __('Menu locations')
    }, createElement("p", null, __('There are no available menu locations'))));
  }

  if (menus.length === 0) {
    return createElement(Panel, {
      className: "edit-navigation-menu-editor__panel"
    }, createElement(PanelBody, {
      title: __('Menu locations')
    }, createElement("p", null, __('There are no available menus'))));
  }

  return createElement(Panel, {
    className: "edit-navigation-menu-editor__panel"
  }, createElement(PanelBody, {
    title: __('Menu locations')
  }, createElement("form", {
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      saveMenuLocations();
    }
  }, createElement("table", null, createElement("thead", null, createElement("tr", null, createElement("th", {
    scope: "col"
  }, __('Theme Location')), createElement("th", {
    scope: "col"
  }, __('Assigned Menu')))), createElement("tbody", null, menuLocations.map(function (location) {
    return createElement("tr", {
      key: location.name
    }, createElement("td", null, location.description), createElement("td", null, createElement(SelectControl, {
      options: menuSelectControlOptions,
      value: location.menu,
      onChange: function onChange(newMenuId) {
        assignMenuToLocation(location.name, parseInt(newMenuId));
      }
    })));
  }))), createElement(Button, {
    type: "submit",
    isPrimary: true
  }, __('Save')))));
}
//# sourceMappingURL=index.js.map