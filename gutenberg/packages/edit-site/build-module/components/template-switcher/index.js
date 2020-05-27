import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useState, useCallback } from '@wordpress/element';
import { Tooltip, DropdownMenu, MenuGroup, MenuItemsChoice, MenuItem } from '@wordpress/components';
import { Icon, home, plus } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import AddTemplate from '../add-template';
import TemplatePreview from './template-preview';
import ThemePreview from './theme-preview';

function TemplateLabel(_ref) {
  var template = _ref.template,
      homeId = _ref.homeId;
  return createElement(Fragment, null, template.slug, ' ', template.id === homeId && createElement(Tooltip, {
    text: __('Home')
  }, createElement("div", {
    className: "edit-site-template-switcher__label-home-icon"
  }, createElement(Icon, {
    icon: home
  }))), template.status !== 'auto-draft' && createElement(Tooltip, {
    text: __('Customized')
  }, createElement("span", {
    className: "edit-site-template-switcher__label-customized-dot"
  })));
}

export default function TemplateSwitcher(_ref2) {
  var ids = _ref2.ids,
      templatePartIds = _ref2.templatePartIds,
      activeId = _ref2.activeId,
      homeId = _ref2.homeId,
      isTemplatePart = _ref2.isTemplatePart,
      onActiveIdChange = _ref2.onActiveIdChange,
      onActiveTemplatePartIdChange = _ref2.onActiveTemplatePartIdChange,
      onAddTemplateId = _ref2.onAddTemplateId;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      hoveredTemplate = _useState2[0],
      setHoveredTemplate = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
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

  var _useSelect = useSelect(function (select) {
    var _select = select('core'),
        getCurrentTheme = _select.getCurrentTheme,
        getEntityRecord = _select.getEntityRecord;

    return {
      currentTheme: getCurrentTheme(),
      templates: ids.map(function (id) {
        var template = getEntityRecord('postType', 'wp_template', id);
        return {
          label: template ? createElement(TemplateLabel, {
            template: template,
            homeId: homeId
          }) : __('Loading…'),
          value: id,
          slug: template ? template.slug : __('Loading…')
        };
      }),
      templateParts: templatePartIds.map(function (id) {
        var template = getEntityRecord('postType', 'wp_template_part', id);
        return {
          label: template ? createElement(TemplateLabel, {
            template: template
          }) : __('Loading…'),
          value: id,
          slug: template ? template.slug : __('Loading…')
        };
      })
    };
  }, [ids, templatePartIds, homeId]),
      currentTheme = _useSelect.currentTheme,
      templates = _useSelect.templates,
      templateParts = _useSelect.templateParts;

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isAddTemplateOpen = _useState6[0],
      setIsAddTemplateOpen = _useState6[1];

  return createElement(Fragment, null, createElement(DropdownMenu, {
    popoverProps: {
      className: 'edit-site-template-switcher__popover',
      position: 'bottom right'
    },
    icon: null,
    label: __('Switch Template'),
    toggleProps: {
      children: (isTemplatePart ? templateParts : templates).find(function (choice) {
        return choice.value === activeId;
      }).slug
    }
  }, function (_ref3) {
    var onClose = _ref3.onClose;
    return createElement(Fragment, null, createElement(MenuGroup, {
      label: __('Templates')
    }, createElement(MenuItemsChoice, {
      choices: templates,
      value: !isTemplatePart ? activeId : undefined,
      onSelect: onActiveIdChange,
      onHover: onHoverTemplate
    }), createElement(MenuItem, {
      icon: plus,
      onClick: function onClick() {
        onClose();
        setIsAddTemplateOpen(true);
      }
    }, __('New'))), createElement(MenuGroup, {
      label: __('Template Parts')
    }, createElement(MenuItemsChoice, {
      choices: templateParts,
      value: isTemplatePart ? activeId : undefined,
      onSelect: onActiveTemplatePartIdChange,
      onHover: onHoverTemplatePart
    })), createElement(MenuGroup, {
      label: __('Current theme')
    }, createElement(MenuItem, {
      onMouseEnter: onMouseEnterTheme,
      onMouseLeave: onMouseLeaveTheme
    }, currentTheme.name)), !!(hoveredTemplate === null || hoveredTemplate === void 0 ? void 0 : hoveredTemplate.id) && createElement(TemplatePreview, {
      item: hoveredTemplate
    }), themePreviewVisible && createElement(ThemePreview, {
      theme: currentTheme
    }), createElement("div", {
      className: "edit-site-template-switcher__footer"
    }));
  }), createElement(AddTemplate, {
    ids: ids,
    onAddTemplateId: onAddTemplateId,
    onRequestClose: useCallback(function () {
      return setIsAddTemplateOpen(false);
    }, []),
    isOpen: isAddTemplateOpen
  }));
}
//# sourceMappingURL=index.js.map