"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TemplateSwitcher;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _addTemplate = _interopRequireDefault(require("../add-template"));

var _templatePreview = _interopRequireDefault(require("./template-preview"));

var _themePreview = _interopRequireDefault(require("./theme-preview"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function TemplateLabel(_ref) {
  var template = _ref.template,
      homeId = _ref.homeId;
  return (0, _element.createElement)(_element.Fragment, null, template.slug, ' ', template.id === homeId && (0, _element.createElement)(_components.Tooltip, {
    text: (0, _i18n.__)('Home')
  }, (0, _element.createElement)("div", {
    className: "edit-site-template-switcher__label-home-icon"
  }, (0, _element.createElement)(_icons.Icon, {
    icon: _icons.home
  }))), template.status !== 'auto-draft' && (0, _element.createElement)(_components.Tooltip, {
    text: (0, _i18n.__)('Customized')
  }, (0, _element.createElement)("span", {
    className: "edit-site-template-switcher__label-customized-dot"
  })));
}

function TemplateSwitcher(_ref2) {
  var ids = _ref2.ids,
      templatePartIds = _ref2.templatePartIds,
      activeId = _ref2.activeId,
      homeId = _ref2.homeId,
      isTemplatePart = _ref2.isTemplatePart,
      onActiveIdChange = _ref2.onActiveIdChange,
      onActiveTemplatePartIdChange = _ref2.onActiveTemplatePartIdChange,
      onAddTemplateId = _ref2.onAddTemplateId;

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hoveredTemplate = _useState2[0],
      setHoveredTemplate = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      themePreviewVisible = _useState4[0],
      setThemePreviewVisible = _useState4[1];

  var onHoverTemplate = function onHoverTemplate(id) {
    setHoveredTemplate({
      id: id,
      type: 'template'
    });
  };

  var onHoverTemplatePart = function onHoverTemplatePart(id) {
    setHoveredTemplate({
      id: id,
      type: 'template-part'
    });
  };

  var onMouseEnterTheme = function onMouseEnterTheme() {
    setThemePreviewVisible(function () {
      return true;
    });
  };

  var onMouseLeaveTheme = function onMouseLeaveTheme() {
    setThemePreviewVisible(function () {
      return false;
    });
  };

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        getCurrentTheme = _select.getCurrentTheme,
        getEntityRecord = _select.getEntityRecord;

    return {
      currentTheme: getCurrentTheme(),
      templates: ids.map(function (id) {
        var template = getEntityRecord('postType', 'wp_template', id);
        return {
          label: template ? (0, _element.createElement)(TemplateLabel, {
            template: template,
            homeId: homeId
          }) : (0, _i18n.__)('Loading…'),
          value: id,
          slug: template ? template.slug : (0, _i18n.__)('Loading…')
        };
      }),
      templateParts: templatePartIds.map(function (id) {
        var template = getEntityRecord('postType', 'wp_template_part', id);
        return {
          label: template ? (0, _element.createElement)(TemplateLabel, {
            template: template
          }) : (0, _i18n.__)('Loading…'),
          value: id,
          slug: template ? template.slug : (0, _i18n.__)('Loading…')
        };
      })
    };
  }, [ids, templatePartIds, homeId]),
      currentTheme = _useSelect.currentTheme,
      templates = _useSelect.templates,
      templateParts = _useSelect.templateParts;

  var _useState5 = (0, _element.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isAddTemplateOpen = _useState6[0],
      setIsAddTemplateOpen = _useState6[1];

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.DropdownMenu, {
    popoverProps: {
      className: 'edit-site-template-switcher__popover',
      position: 'bottom right'
    },
    icon: null,
    label: (0, _i18n.__)('Switch Template'),
    toggleProps: {
      children: (isTemplatePart ? templateParts : templates).find(function (choice) {
        return choice.value === activeId;
      }).slug
    }
  }, function (_ref3) {
    var onClose = _ref3.onClose;
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Templates')
    }, (0, _element.createElement)(_components.MenuItemsChoice, {
      choices: templates,
      value: !isTemplatePart ? activeId : undefined,
      onSelect: onActiveIdChange,
      onHover: onHoverTemplate
    }), (0, _element.createElement)(_components.MenuItem, {
      icon: _icons.plus,
      onClick: function onClick() {
        onClose();
        setIsAddTemplateOpen(true);
      }
    }, (0, _i18n.__)('New'))), (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Template Parts')
    }, (0, _element.createElement)(_components.MenuItemsChoice, {
      choices: templateParts,
      value: isTemplatePart ? activeId : undefined,
      onSelect: onActiveTemplatePartIdChange,
      onHover: onHoverTemplatePart
    })), (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Current theme')
    }, (0, _element.createElement)(_components.MenuItem, {
      onMouseEnter: onMouseEnterTheme,
      onMouseLeave: onMouseLeaveTheme
    }, currentTheme.name)), !!(hoveredTemplate === null || hoveredTemplate === void 0 ? void 0 : hoveredTemplate.id) && (0, _element.createElement)(_templatePreview.default, {
      item: hoveredTemplate
    }), themePreviewVisible && (0, _element.createElement)(_themePreview.default, {
      theme: currentTheme
    }), (0, _element.createElement)("div", {
      className: "edit-site-template-switcher__footer"
    }));
  }), (0, _element.createElement)(_addTemplate.default, {
    ids: ids,
    onAddTemplateId: onAddTemplateId,
    onRequestClose: (0, _element.useCallback)(function () {
      return setIsAddTemplateOpen(false);
    }, []),
    isOpen: isAddTemplateOpen
  }));
}
//# sourceMappingURL=index.js.map