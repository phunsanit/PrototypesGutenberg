"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _keycodes = require("@wordpress/keycodes");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _url = require("@wordpress/url");

var _dom = require("@wordpress/dom");

var _icons = require("@wordpress/icons");

var _icons2 = require("./icons");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function NavigationLinkEdit(_ref) {
  var _classnames;

  var attributes = _ref.attributes,
      hasDescendants = _ref.hasDescendants,
      isSelected = _ref.isSelected,
      isImmediateParentOfSelectedBlock = _ref.isImmediateParentOfSelectedBlock,
      isParentOfSelectedBlock = _ref.isParentOfSelectedBlock,
      setAttributes = _ref.setAttributes,
      showSubmenuIcon = _ref.showSubmenuIcon,
      insertLinkBlock = _ref.insertLinkBlock,
      textColor = _ref.textColor,
      backgroundColor = _ref.backgroundColor,
      rgbTextColor = _ref.rgbTextColor,
      rgbBackgroundColor = _ref.rgbBackgroundColor,
      saveEntityRecord = _ref.saveEntityRecord,
      selectedBlockHasDescendants = _ref.selectedBlockHasDescendants,
      _ref$userCanCreatePag = _ref.userCanCreatePages,
      userCanCreatePages = _ref$userCanCreatePag === void 0 ? false : _ref$userCanCreatePag,
      insertBlocksAfter = _ref.insertBlocksAfter,
      mergeBlocks = _ref.mergeBlocks,
      onReplace = _ref.onReplace;
  var label = attributes.label,
      opensInNewTab = attributes.opensInNewTab,
      url = attributes.url,
      nofollow = attributes.nofollow,
      description = attributes.description;
  var link = {
    url: url,
    opensInNewTab: opensInNewTab
  };

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isLinkOpen = _useState2[0],
      setIsLinkOpen = _useState2[1];

  var itemLabelPlaceholder = (0, _i18n.__)('Add link…');
  var ref = (0, _element.useRef)(); // Show the LinkControl on mount if the URL is empty
  // ( When adding a new menu item)
  // This can't be done in the useState call because it cconflicts
  // with the autofocus behavior of the BlockListBlock component.

  (0, _element.useEffect)(function () {
    if (!url) {
      setIsLinkOpen(true);
    }
  }, []);
  /**
   * The hook shouldn't be necessary but due to a focus loss happening
   * when selecting a suggestion in the link popover, we force close on block unselection.
   */

  (0, _element.useEffect)(function () {
    if (!isSelected) {
      setIsLinkOpen(false);
    }
  }, [isSelected]); // If the LinkControl popover is open and the URL has changed, close the LinkControl and focus the label text.

  (0, _element.useEffect)(function () {
    if (isLinkOpen && url) {
      // Does this look like a URL and have something TLD-ish?
      if ((0, _url.isURL)((0, _url.prependHTTP)(label)) && /^.+\.[a-z]+/.test(label)) {
        // Focus and select the label text.
        selectLabelText();
      } else {
        // Focus it (but do not select).
        (0, _dom.placeCaretAtHorizontalEdge)(ref.current, true);
      }
    }
  }, [url]);
  /**
   * Focus the navigation link label text and select it.
   */

  function selectLabelText() {
    ref.current.focus();
    var selection = window.getSelection();
    var range = document.createRange(); // Get the range of the current ref contents so we can add this range to the selection.

    range.selectNodeContents(ref.current);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function handleCreatePage(_x) {
    return _handleCreatePage.apply(this, arguments);
  }

  function _handleCreatePage() {
    _handleCreatePage = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(pageTitle) {
      var type, page;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = 'page';
              _context.next = 3;
              return saveEntityRecord('postType', type, {
                title: pageTitle,
                status: 'publish'
              });

            case 3:
              page = _context.sent;
              return _context.abrupt("return", {
                id: page.id,
                type: type,
                title: page.title.rendered,
                url: page.link
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleCreatePage.apply(this, arguments);
  }

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.ToolbarGroup, null, (0, _element.createElement)(_components.KeyboardShortcuts, {
    bindGlobal: true,
    shortcuts: (0, _defineProperty2.default)({}, _keycodes.rawShortcut.primary('k'), function () {
      return setIsLinkOpen(true);
    })
  }), (0, _element.createElement)(_components.ToolbarButton, {
    name: "link",
    icon: _icons.link,
    title: (0, _i18n.__)('Link'),
    shortcut: _keycodes.displayShortcut.primary('k'),
    onClick: function onClick() {
      return setIsLinkOpen(true);
    }
  }), (0, _element.createElement)(_components.ToolbarButton, {
    name: "submenu",
    icon: (0, _element.createElement)(_icons2.ToolbarSubmenuIcon, null),
    title: (0, _i18n.__)('Add submenu'),
    onClick: insertLinkBlock
  }))), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('SEO settings')
  }, (0, _element.createElement)(_components.ToggleControl, {
    checked: nofollow,
    onChange: function onChange(nofollowValue) {
      setAttributes({
        nofollow: nofollowValue
      });
    },
    label: (0, _i18n.__)('Add nofollow to link'),
    help: (0, _element.createElement)(_element.Fragment, null, (0, _i18n.__)("Don't let search engines follow this link."), (0, _element.createElement)(_components.ExternalLink, {
      className: "wp-block-navigation-link__nofollow-external-link",
      href: (0, _i18n.__)('https://codex.wordpress.org/Nofollow')
    }, (0, _i18n.__)("What's this?")))
  })), (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Link settings')
  }, (0, _element.createElement)(_components.TextareaControl, {
    value: description || '',
    onChange: function onChange(descriptionValue) {
      setAttributes({
        description: descriptionValue
      });
    },
    label: (0, _i18n.__)('Description'),
    help: (0, _i18n.__)('The description will be displayed in the menu if the current theme supports it.')
  }))), (0, _element.createElement)(_blockEditor.__experimentalBlock.li, {
    className: (0, _classnames2.default)((_classnames = {
      'is-editing': isSelected || isParentOfSelectedBlock,
      'is-selected': isSelected,
      'has-link': !!url,
      'has-child': hasDescendants,
      'has-text-color': rgbTextColor
    }, (0, _defineProperty2.default)(_classnames, "has-".concat(textColor, "-color"), !!textColor), (0, _defineProperty2.default)(_classnames, 'has-background', rgbBackgroundColor), (0, _defineProperty2.default)(_classnames, "has-".concat(backgroundColor, "-background-color"), !!backgroundColor), _classnames)),
    style: {
      color: rgbTextColor,
      backgroundColor: rgbBackgroundColor
    }
  }, (0, _element.createElement)("div", {
    className: "wp-block-navigation-link__content"
  }, (0, _element.createElement)(_blockEditor.RichText, {
    ref: ref,
    identifier: "label",
    className: "wp-block-navigation-link__label",
    value: label,
    onChange: function onChange(labelValue) {
      return setAttributes({
        label: labelValue
      });
    },
    onMerge: mergeBlocks,
    onReplace: onReplace,
    __unstableOnSplitAtEnd: function __unstableOnSplitAtEnd() {
      return insertBlocksAfter((0, _blocks.createBlock)('core/navigation-link'));
    },
    placeholder: itemLabelPlaceholder,
    keepPlaceholderOnFocus: true,
    withoutInteractiveFormatting: true,
    allowedFormats: ['core/bold', 'core/italic', 'core/image', 'core/strikethrough']
  }), isLinkOpen && (0, _element.createElement)(_components.Popover, {
    position: "bottom center",
    onClose: function onClose() {
      return setIsLinkOpen(false);
    }
  }, (0, _element.createElement)(_blockEditor.__experimentalLinkControl, {
    className: "wp-block-navigation-link__inline-link-input",
    value: link,
    showInitialSuggestions: true,
    createSuggestion: userCanCreatePages ? handleCreatePage : undefined,
    onChange: function onChange() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$title = _ref3.title,
          newTitle = _ref3$title === void 0 ? '' : _ref3$title,
          _ref3$url = _ref3.url,
          newURL = _ref3$url === void 0 ? '' : _ref3$url,
          newOpensInNewTab = _ref3.opensInNewTab,
          id = _ref3.id;

      return setAttributes({
        url: encodeURI(newURL),
        label: function () {
          var normalizedTitle = newTitle.replace(/http(s?):\/\//gi, '');
          var normalizedURL = newURL.replace(/http(s?):\/\//gi, '');

          if (newTitle !== '' && normalizedTitle !== normalizedURL && label !== newTitle) {
            return (0, _lodash.escape)(newTitle);
          } else if (label) {
            return label;
          } // If there's no label, add the URL.


          return (0, _lodash.escape)(normalizedURL);
        }(),
        opensInNewTab: newOpensInNewTab,
        id: id
      });
    }
  }))), showSubmenuIcon && (0, _element.createElement)("span", {
    className: "wp-block-navigation-link__submenu-icon"
  }, (0, _element.createElement)(_icons2.ItemSubmenuIcon, null)), (0, _element.createElement)(_blockEditor.InnerBlocks, {
    allowedBlocks: ['core/navigation-link'],
    renderAppender: isSelected && hasDescendants || isImmediateParentOfSelectedBlock && !selectedBlockHasDescendants ? _blockEditor.InnerBlocks.DefaultAppender : false,
    __experimentalTagName: "ul",
    __experimentalAppenderTagName: "li",
    __experimentalPassedProps: {
      className: (0, _classnames2.default)('wp-block-navigation__container', {
        'is-parent-of-selected-block': isParentOfSelectedBlock
      })
    }
  })));
}
/**
 * Returns the color object matching the slug, or undefined.
 *
 * @param {Array}  colors      The editor settings colors array.
 * @param {string} colorSlug   A string containing the color slug.
 * @param {string} customColor A string containing the custom color value.
 *
 * @return {Object} Color object included in the editor settings colors, or Undefined.
 */


var getColorObjectByColorSlug = function getColorObjectByColorSlug(colors, colorSlug, customColor) {
  if (customColor) {
    return customColor;
  }

  if (!colors || !colors.length) {
    return;
  }

  return (0, _lodash.get)((0, _lodash.find)(colors, {
    slug: colorSlug
  }), 'color');
};

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, ownProps) {
  var _getClientIdsOfDescen;

  var _select = select('core/block-editor'),
      getBlockAttributes = _select.getBlockAttributes,
      getClientIdsOfDescendants = _select.getClientIdsOfDescendants,
      hasSelectedInnerBlock = _select.hasSelectedInnerBlock,
      getBlockParentsByBlockName = _select.getBlockParentsByBlockName,
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      getSettings = _select.getSettings;

  var clientId = ownProps.clientId;
  var rootBlock = (0, _lodash.head)(getBlockParentsByBlockName(clientId, 'core/navigation'));
  var navigationBlockAttributes = getBlockAttributes(rootBlock);
  var colors = (0, _lodash.get)(getSettings(), 'colors', []);
  var hasDescendants = !!getClientIdsOfDescendants([clientId]).length;
  var showSubmenuIcon = !!navigationBlockAttributes.showSubmenuIcon && hasDescendants;
  var isParentOfSelectedBlock = hasSelectedInnerBlock(clientId, true);
  var isImmediateParentOfSelectedBlock = hasSelectedInnerBlock(clientId, false);
  var selectedBlockId = getSelectedBlockClientId();
  var selectedBlockHasDescendants = !!((_getClientIdsOfDescen = getClientIdsOfDescendants([selectedBlockId])) === null || _getClientIdsOfDescen === void 0 ? void 0 : _getClientIdsOfDescen.length);
  var userCanCreatePages = select('core').canUser('create', 'pages');
  return {
    isParentOfSelectedBlock: isParentOfSelectedBlock,
    isImmediateParentOfSelectedBlock: isImmediateParentOfSelectedBlock,
    hasDescendants: hasDescendants,
    selectedBlockHasDescendants: selectedBlockHasDescendants,
    showSubmenuIcon: showSubmenuIcon,
    textColor: navigationBlockAttributes.textColor,
    backgroundColor: navigationBlockAttributes.backgroundColor,
    userCanCreatePages: userCanCreatePages,
    rgbTextColor: getColorObjectByColorSlug(colors, navigationBlockAttributes.textColor, navigationBlockAttributes.customTextColor),
    rgbBackgroundColor: getColorObjectByColorSlug(colors, navigationBlockAttributes.backgroundColor, navigationBlockAttributes.customBackgroundColor)
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps, registry) {
  var _dispatch = dispatch('core'),
      saveEntityRecord = _dispatch.saveEntityRecord;

  return {
    saveEntityRecord: saveEntityRecord,
    insertLinkBlock: function insertLinkBlock() {
      var clientId = ownProps.clientId;

      var _dispatch2 = dispatch('core/block-editor'),
          insertBlock = _dispatch2.insertBlock;

      var _registry$select = registry.select('core/block-editor'),
          getClientIdsOfDescendants = _registry$select.getClientIdsOfDescendants;

      var navItems = getClientIdsOfDescendants([clientId]);
      var insertionPoint = navItems.length ? navItems.length : 0;
      var blockToInsert = (0, _blocks.createBlock)('core/navigation-link');
      insertBlock(blockToInsert, insertionPoint, clientId);
    }
  };
})])(NavigationLinkEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map