"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MenuLocationsEditor;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _useMenuLocations3 = _interopRequireDefault(require("./use-menu-locations"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function MenuLocationsEditor() {
  var menus = (0, _data.useSelect)(function (select) {
    return select('core').getMenus();
  });

  var _useMenuLocations = (0, _useMenuLocations3.default)(),
      _useMenuLocations2 = (0, _slicedToArray2.default)(_useMenuLocations, 3),
      menuLocations = _useMenuLocations2[0],
      saveMenuLocations = _useMenuLocations2[1],
      assignMenuToLocation = _useMenuLocations2[2];

  if (!menus || !menuLocations) {
    return (0, _element.createElement)(_components.Spinner, null);
  }

  var menuSelectControlOptions = [{
    value: 0,
    label: (0, _i18n.__)('— Select a Menu —')
  }].concat((0, _toConsumableArray2.default)(menus.map(function (_ref) {
    var id = _ref.id,
        name = _ref.name;
    return {
      value: id,
      label: name
    };
  })));

  if (menuLocations.length === 0) {
    return (0, _element.createElement)(_components.Panel, {
      className: "edit-navigation-menu-editor__panel"
    }, (0, _element.createElement)(_components.PanelBody, {
      title: (0, _i18n.__)('Menu locations')
    }, (0, _element.createElement)("p", null, (0, _i18n.__)('There are no available menu locations'))));
  }

  if (menus.length === 0) {
    return (0, _element.createElement)(_components.Panel, {
      className: "edit-navigation-menu-editor__panel"
    }, (0, _element.createElement)(_components.PanelBody, {
      title: (0, _i18n.__)('Menu locations')
    }, (0, _element.createElement)("p", null, (0, _i18n.__)('There are no available menus'))));
  }

  return (0, _element.createElement)(_components.Panel, {
    className: "edit-navigation-menu-editor__panel"
  }, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Menu locations')
  }, (0, _element.createElement)("form", {
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      saveMenuLocations();
    }
  }, (0, _element.createElement)("table", null, (0, _element.createElement)("thead", null, (0, _element.createElement)("tr", null, (0, _element.createElement)("th", {
    scope: "col"
  }, (0, _i18n.__)('Theme Location')), (0, _element.createElement)("th", {
    scope: "col"
  }, (0, _i18n.__)('Assigned Menu')))), (0, _element.createElement)("tbody", null, menuLocations.map(function (location) {
    return (0, _element.createElement)("tr", {
      key: location.name
    }, (0, _element.createElement)("td", null, location.description), (0, _element.createElement)("td", null, (0, _element.createElement)(_components.SelectControl, {
      options: menuSelectControlOptions,
      value: location.menu,
      onChange: function onChange(newMenuId) {
        assignMenuToLocation(location.name, parseInt(newMenuId));
      }
    })));
  }))), (0, _element.createElement)(_components.Button, {
    type: "submit",
    isPrimary: true
  }, (0, _i18n.__)('Save')))));
}
//# sourceMappingURL=index.js.map