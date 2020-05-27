"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _classnames2 = _interopRequireDefault(require("classnames"));

var _blockEditor = require("@wordpress/block-editor");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _useBlockNavigator2 = _interopRequireDefault(require("./use-block-navigator"));

var _blockNavigationList = _interopRequireDefault(require("./block-navigation-list"));

var _blockColorsSelector = _interopRequireDefault(require("./block-colors-selector"));

var navIcons = _interopRequireWildcard(require("./icons"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
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
  var ref = (0, _element.useRef)();

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      selectBlock = _useDispatch.selectBlock;

  var _experimentalUseColo = (0, _blockEditor.__experimentalUseColors)([{
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

  var _useBlockNavigator = (0, _useBlockNavigator2.default)(clientId, true),
      navigatorToolbarButton = _useBlockNavigator.navigatorToolbarButton,
      navigatorModal = _useBlockNavigator.navigatorModal; // Builds navigation links from default Pages.


  var defaultPagesNavigationItems = (0, _element.useMemo)(function () {
    if (!pages) {
      return null;
    }

    return pages.map(function (_ref2) {
      var title = _ref2.title,
          type = _ref2.type,
          url = _ref2.link,
          id = _ref2.id;
      return (0, _blocks.createBlock)('core/navigation-link', {
        type: type,
        id: id,
        url: url,
        label: !title.rendered ? (0, _i18n.__)('(no title)') : (0, _lodash.escape)(title.rendered),
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
    var emptyNavLinkBlock = (0, _blocks.createBlock)('core/navigation-link');
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
    return (0, _element.createElement)(_blockEditor.__experimentalBlock.div, null, (0, _element.createElement)(_components.Placeholder, {
      className: "wp-block-navigation-placeholder",
      icon: _icons.navigation,
      label: (0, _i18n.__)('Navigation'),
      instructions: (0, _i18n.__)('Create a Navigation from all existing pages, or create an empty one.')
    }, (0, _element.createElement)("div", {
      ref: ref,
      className: "wp-block-navigation-placeholder__buttons"
    }, (0, _element.createElement)(_components.Button, {
      isPrimary: true,
      className: "wp-block-navigation-placeholder__button",
      onClick: handleCreateFromExistingPages,
      disabled: !hasPages
    }, (0, _i18n.__)('Create from all top-level pages')), (0, _element.createElement)(_components.Button, {
      isLink: true,
      className: "wp-block-navigation-placeholder__button",
      onClick: handleCreateEmpty
    }, (0, _i18n.__)('Create empty')))));
  }

  var blockClassNames = (0, _classnames2.default)(className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "items-justified-".concat(attributes.itemsJustification), attributes.itemsJustification), (0, _defineProperty2.default)(_classnames, fontSize.class, fontSize.class), (0, _defineProperty2.default)(_classnames, 'is-vertical', attributes.orientation === 'vertical'), _classnames)); // UI State: rendered Block UI

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.Toolbar, {
    icon: attributes.itemsJustification ? navIcons["justify".concat((0, _lodash.upperFirst)(attributes.itemsJustification), "Icon")] : navIcons.justifyLeftIcon,
    label: (0, _i18n.__)('Change items justification'),
    isCollapsed: true,
    controls: [{
      icon: navIcons.justifyLeftIcon,
      title: (0, _i18n.__)('Justify items left'),
      isActive: 'left' === attributes.itemsJustification,
      onClick: handleItemsAlignment('left')
    }, {
      icon: navIcons.justifyCenterIcon,
      title: (0, _i18n.__)('Justify items center'),
      isActive: 'center' === attributes.itemsJustification,
      onClick: handleItemsAlignment('center')
    }, {
      icon: navIcons.justifyRightIcon,
      title: (0, _i18n.__)('Justify items right'),
      isActive: 'right' === attributes.itemsJustification,
      onClick: handleItemsAlignment('right')
    }]
  }), (0, _element.createElement)(_components.ToolbarGroup, null, navigatorToolbarButton), (0, _element.createElement)(_blockColorsSelector.default, {
    TextColor: TextColor,
    BackgroundColor: BackgroundColor
  }, ColorPanel)), navigatorModal, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Navigation Structure')
  }, (0, _element.createElement)(_blockNavigationList.default, {
    clientId: clientId,
    __experimentalWithBlockNavigationSlots: true
  })), (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Text settings')
  }, (0, _element.createElement)(_blockEditor.FontSizePicker, {
    value: fontSize.size,
    onChange: setFontSize
  }))), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Display settings')
  }, (0, _element.createElement)(_components.ToggleControl, {
    checked: attributes.showSubmenuIcon,
    onChange: function onChange(value) {
      setAttributes({
        showSubmenuIcon: value
      });
    },
    label: (0, _i18n.__)('Show submenu indicator icons')
  }))), (0, _element.createElement)(TextColor, null, (0, _element.createElement)(BackgroundColor, null, (0, _element.createElement)(_blockEditor.__experimentalBlock.nav, {
    className: blockClassNames,
    style: blockInlineStyles
  }, !hasExistingNavItems && isRequestingPages && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Spinner, null), " ", (0, _i18n.__)('Loading Navigation…'), ' '), (0, _element.createElement)(_blockEditor.InnerBlocks, {
    ref: ref,
    allowedBlocks: ['core/navigation-link'],
    renderAppender: isImmediateParentOfSelectedBlock && !selectedBlockHasDescendants || isSelected ? _blockEditor.InnerBlocks.DefaultAppender : false,
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

var _default = (0, _compose.compose)([(0, _blockEditor.withFontSizes)('fontSize'), (0, _data.withSelect)(function (select, _ref3) {
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
}), (0, _data.withDispatch)(function (dispatch, _ref4) {
  var clientId = _ref4.clientId;
  return {
    updateNavItemBlocks: function updateNavItemBlocks(blocks) {
      dispatch('core/block-editor').replaceInnerBlocks(clientId, blocks);
    }
  };
})])(Navigation);

exports.default = _default;
//# sourceMappingURL=edit.js.map