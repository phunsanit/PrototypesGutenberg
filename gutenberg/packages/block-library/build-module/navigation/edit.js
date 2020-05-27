import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { escape, upperFirst } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useMemo, Fragment, useRef } from '@wordpress/element';
import { InnerBlocks, InspectorControls, BlockControls, FontSizePicker, withFontSizes, __experimentalUseColors, __experimentalBlock as Block } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, withSelect, withDispatch } from '@wordpress/data';
import { Button, PanelBody, Placeholder, Spinner, ToggleControl, Toolbar, ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { navigation as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import useBlockNavigator from './use-block-navigator';
import BlockNavigationList from './block-navigation-list';
import BlockColorsStyleSelector from './block-colors-selector';
import * as navIcons from './icons';

function Navigation(_ref) {
  var _classnames;

  var selectedBlockHasDescendants = _ref.selectedBlockHasDescendants,
      attributes = _ref.attributes,
      clientId = _ref.clientId,
      fontSize = _ref.fontSize,
      hasExistingNavItems = _ref.hasExistingNavItems,
      hasResolvedPages = _ref.hasResolvedPages,
      isImmediateParentOfSelectedBlock = _ref.isImmediateParentOfSelectedBlock,
      isRequestingPages = _ref.isRequestingPages,
      isSelected = _ref.isSelected,
      pages = _ref.pages,
      setAttributes = _ref.setAttributes,
      setFontSize = _ref.setFontSize,
      updateNavItemBlocks = _ref.updateNavItemBlocks,
      className = _ref.className;
  //
  // HOOKS
  //
  var ref = useRef();

  var _useDispatch = useDispatch('core/block-editor'),
      selectBlock = _useDispatch.selectBlock;

  var _experimentalUseColo = __experimentalUseColors([{
    name: 'textColor',
    property: 'color'
  }, {
    name: 'backgroundColor',
    className: 'has-background'
  }], {
    contrastCheckers: [{
      backgroundColor: true,
      textColor: true,
      fontSize: fontSize.size
    }],
    colorDetector: {
      targetRef: ref
    },
    colorPanelProps: {
      initialOpen: true
    }
  }, [fontSize.size]),
      TextColor = _experimentalUseColo.TextColor,
      BackgroundColor = _experimentalUseColo.BackgroundColor,
      ColorPanel = _experimentalUseColo.ColorPanel;

  var _useBlockNavigator = useBlockNavigator(clientId, true),
      navigatorToolbarButton = _useBlockNavigator.navigatorToolbarButton,
      navigatorModal = _useBlockNavigator.navigatorModal; // Builds navigation links from default Pages.


  var defaultPagesNavigationItems = useMemo(function () {
    if (!pages) {
      return null;
    }

    return pages.map(function (_ref2) {
      var title = _ref2.title,
          type = _ref2.type,
          url = _ref2.link,
          id = _ref2.id;
      return createBlock('core/navigation-link', {
        type: type,
        id: id,
        url: url,
        label: !title.rendered ? __('(no title)') : escape(title.rendered),
        opensInNewTab: false
      });
    });
  }, [pages]); //
  // HANDLERS
  //

  function handleItemsAlignment(align) {
    return function () {
      var itemsJustification = attributes.itemsJustification === align ? undefined : align;
      setAttributes({
        itemsJustification: itemsJustification
      });
    };
  }

  function handleCreateEmpty() {
    var emptyNavLinkBlock = createBlock('core/navigation-link');
    updateNavItemBlocks([emptyNavLinkBlock]);
  }

  function handleCreateFromExistingPages() {
    updateNavItemBlocks(defaultPagesNavigationItems);
    selectBlock(clientId);
  }

  var hasPages = hasResolvedPages && pages && pages.length;
  var blockInlineStyles = {
    fontSize: fontSize.size ? fontSize.size + 'px' : undefined
  }; // If we don't have existing items or the User hasn't
  // indicated they want to automatically add top level Pages
  // then show the Placeholder

  if (!hasExistingNavItems) {
    return createElement(Block.div, null, createElement(Placeholder, {
      className: "wp-block-navigation-placeholder",
      icon: icon,
      label: __('Navigation'),
      instructions: __('Create a Navigation from all existing pages, or create an empty one.')
    }, createElement("div", {
      ref: ref,
      className: "wp-block-navigation-placeholder__buttons"
    }, createElement(Button, {
      isPrimary: true,
      className: "wp-block-navigation-placeholder__button",
      onClick: handleCreateFromExistingPages,
      disabled: !hasPages
    }, __('Create from all top-level pages')), createElement(Button, {
      isLink: true,
      className: "wp-block-navigation-placeholder__button",
      onClick: handleCreateEmpty
    }, __('Create empty')))));
  }

  var blockClassNames = classnames(className, (_classnames = {}, _defineProperty(_classnames, "items-justified-".concat(attributes.itemsJustification), attributes.itemsJustification), _defineProperty(_classnames, fontSize.class, fontSize.class), _defineProperty(_classnames, 'is-vertical', attributes.orientation === 'vertical'), _classnames)); // UI State: rendered Block UI

  return createElement(Fragment, null, createElement(BlockControls, null, createElement(Toolbar, {
    icon: attributes.itemsJustification ? navIcons["justify".concat(upperFirst(attributes.itemsJustification), "Icon")] : navIcons.justifyLeftIcon,
    label: __('Change items justification'),
    isCollapsed: true,
    controls: [{
      icon: navIcons.justifyLeftIcon,
      title: __('Justify items left'),
      isActive: 'left' === attributes.itemsJustification,
      onClick: handleItemsAlignment('left')
    }, {
      icon: navIcons.justifyCenterIcon,
      title: __('Justify items center'),
      isActive: 'center' === attributes.itemsJustification,
      onClick: handleItemsAlignment('center')
    }, {
      icon: navIcons.justifyRightIcon,
      title: __('Justify items right'),
      isActive: 'right' === attributes.itemsJustification,
      onClick: handleItemsAlignment('right')
    }]
  }), createElement(ToolbarGroup, null, navigatorToolbarButton), createElement(BlockColorsStyleSelector, {
    TextColor: TextColor,
    BackgroundColor: BackgroundColor
  }, ColorPanel)), navigatorModal, createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Navigation Structure')
  }, createElement(BlockNavigationList, {
    clientId: clientId,
    __experimentalWithBlockNavigationSlots: true
  })), createElement(PanelBody, {
    title: __('Text settings')
  }, createElement(FontSizePicker, {
    value: fontSize.size,
    onChange: setFontSize
  }))), createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Display settings')
  }, createElement(ToggleControl, {
    checked: attributes.showSubmenuIcon,
    onChange: function onChange(value) {
      setAttributes({
        showSubmenuIcon: value
      });
    },
    label: __('Show submenu indicator icons')
  }))), createElement(TextColor, null, createElement(BackgroundColor, null, createElement(Block.nav, {
    className: blockClassNames,
    style: blockInlineStyles
  }, !hasExistingNavItems && isRequestingPages && createElement(Fragment, null, createElement(Spinner, null), " ", __('Loading Navigation…'), ' '), createElement(InnerBlocks, {
    ref: ref,
    allowedBlocks: ['core/navigation-link'],
    renderAppender: isImmediateParentOfSelectedBlock && !selectedBlockHasDescendants || isSelected ? InnerBlocks.DefaultAppender : false,
    templateInsertUpdatesSelection: false,
    __experimentalMoverDirection: attributes.orientation || 'horizontal',
    __experimentalTagName: "ul",
    __experimentalAppenderTagName: "li",
    __experimentalPassedProps: {
      className: 'wp-block-navigation__container'
    },
    __experimentalCaptureToolbars: true // Template lock set to false here so that the Nav
    // Block on the experimental menus screen does not
    // inherit templateLock={ 'all' }.
    ,
    templateLock: false
  })))));
}

export default compose([withFontSizes('fontSize'), withSelect(function (select, _ref3) {
  var _getClientIdsOfDescen, _select2, _select3;

  var clientId = _ref3.clientId;
  var innerBlocks = select('core/block-editor').getBlocks(clientId);

  var _select = select('core/block-editor'),
      getClientIdsOfDescendants = _select.getClientIdsOfDescendants,
      hasSelectedInnerBlock = _select.hasSelectedInnerBlock,
      getSelectedBlockClientId = _select.getSelectedBlockClientId;

  var filterDefaultPages = {
    parent: 0,
    order: 'asc',
    orderby: 'id'
  };
  var pagesSelect = ['core', 'getEntityRecords', ['postType', 'page', filterDefaultPages]];
  var isImmediateParentOfSelectedBlock = hasSelectedInnerBlock(clientId, false);
  var selectedBlockId = getSelectedBlockClientId();
  var selectedBlockHasDescendants = !!((_getClientIdsOfDescen = getClientIdsOfDescendants([selectedBlockId])) === null || _getClientIdsOfDescen === void 0 ? void 0 : _getClientIdsOfDescen.length);
  return {
    isImmediateParentOfSelectedBlock: isImmediateParentOfSelectedBlock,
    selectedBlockHasDescendants: selectedBlockHasDescendants,
    hasExistingNavItems: !!innerBlocks.length,
    pages: select('core').getEntityRecords('postType', 'page', filterDefaultPages),
    isRequestingPages: (_select2 = select('core/data')).isResolving.apply(_select2, pagesSelect),
    hasResolvedPages: (_select3 = select('core/data')).hasFinishedResolution.apply(_select3, pagesSelect)
  };
}), withDispatch(function (dispatch, _ref4) {
  var clientId = _ref4.clientId;
  return {
    updateNavItemBlocks: function updateNavItemBlocks(blocks) {
      dispatch('core/block-editor').replaceInnerBlocks(clientId, blocks);
    }
  };
})])(Navigation);
//# sourceMappingURL=edit.js.map