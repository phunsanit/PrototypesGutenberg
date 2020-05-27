"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TemplatePartPlaceholder;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _coreData = require("@wordpress/core-data");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _url = require("@wordpress/url");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _useTemplatePartPost = _interopRequireDefault(require("./use-template-part-post"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function TemplatePartPreview() {
  var _useEntityBlockEditor = (0, _coreData.useEntityBlockEditor)('postType', 'wp_template_part'),
      _useEntityBlockEditor2 = (0, _slicedToArray2.default)(_useEntityBlockEditor, 1),
      blocks = _useEntityBlockEditor2[0];

  return (0, _element.createElement)("div", {
    className: "wp-block-template-part__placeholder-preview"
  }, (0, _element.createElement)("div", {
    className: "wp-block-template-part__placeholder-preview-title"
  }, (0, _i18n.__)('Preview')), (0, _element.createElement)(_blockEditor.BlockPreview, {
    blocks: blocks,
    viewportWidth: 1200
  }));
}

function TemplatePartPlaceholder(_ref) {
  var setAttributes = _ref.setAttributes;

  var _useState = (0, _element.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      slug = _useState2[0],
      _setSlug = _useState2[1];

  var _useState3 = (0, _element.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      theme = _useState4[0],
      setTheme = _useState4[1];

  var _useState5 = (0, _element.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      help = _useState6[0],
      setHelp = _useState6[1]; // Try to find an existing template part.


  var postId = (0, _useTemplatePartPost.default)(null, slug, theme); // If found, get its preview.

  var preview = (0, _data.useSelect)(function (select) {
    if (!postId) {
      return;
    }

    var templatePart = select('core').getEntityRecord('postType', 'wp_template_part', postId);

    if (templatePart) {
      return (0, _element.createElement)(_coreData.EntityProvider, {
        kind: "postType",
        type: "wp_template_part",
        id: postId
      }, (0, _element.createElement)(TemplatePartPreview, null));
    }
  }, [postId]);
  var setSlug = (0, _element.useCallback)(function (nextSlug) {
    _setSlug(nextSlug);

    setHelp((0, _url.cleanForSlug)(nextSlug));
  }, []);

  var _useDispatch = (0, _data.useDispatch)('core'),
      saveEntityRecord = _useDispatch.saveEntityRecord;

  var onChooseOrCreate = (0, _element.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var nextAttributes, cleanSlug, templatePart;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nextAttributes = {
              slug: slug,
              theme: theme
            };

            if (!(postId !== undefined && postId !== null)) {
              _context.next = 5;
              break;
            }

            // Existing template part found.
            nextAttributes.postId = postId;
            _context.next = 16;
            break;

          case 5:
            _context.prev = 5;
            cleanSlug = (0, _url.cleanForSlug)(slug);
            _context.next = 9;
            return saveEntityRecord('postType', 'wp_template_part', {
              title: cleanSlug,
              status: 'publish',
              slug: cleanSlug,
              meta: {
                theme: theme
              }
            });

          case 9:
            templatePart = _context.sent;
            nextAttributes.postId = templatePart.id;
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](5);
            setHelp((0, _i18n.__)('Error adding template.'));

          case 16:
            setAttributes(nextAttributes);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 13]]);
  })), [postId, slug, theme]);
  return (0, _element.createElement)(_components.Placeholder, {
    icon: _icons.layout,
    label: (0, _i18n.__)('Template Part'),
    instructions: (0, _i18n.__)('Choose a template part by slug and theme, or create a new one.')
  }, (0, _element.createElement)("div", {
    className: "wp-block-template-part__placeholder-input-container"
  }, (0, _element.createElement)(_components.TextControl, {
    label: (0, _i18n.__)('Slug'),
    placeholder: (0, _i18n.__)('header'),
    value: slug,
    onChange: setSlug,
    help: help,
    className: "wp-block-template-part__placeholder-input"
  }), (0, _element.createElement)(_components.TextControl, {
    label: (0, _i18n.__)('Theme'),
    placeholder: (0, _i18n.__)('twentytwenty'),
    value: theme,
    onChange: setTheme,
    className: "wp-block-template-part__placeholder-input"
  })), preview, (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    disabled: !slug || !theme,
    onClick: onChooseOrCreate
  }, postId ? (0, _i18n.__)('Choose') : (0, _i18n.__)('Create')));
}
//# sourceMappingURL=placeholder.js.map