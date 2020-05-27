import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEntityBlockEditor, EntityProvider } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { BlockPreview } from '@wordpress/block-editor';
import { useState, useCallback } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { cleanForSlug } from '@wordpress/url';
import { Placeholder, TextControl, Button } from '@wordpress/components';
import { layout } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import useTemplatePartPost from './use-template-part-post';

function TemplatePartPreview() {
  var _useEntityBlockEditor = useEntityBlockEditor('postType', 'wp_template_part'),
      _useEntityBlockEditor2 = _slicedToArray(_useEntityBlockEditor, 1),
      blocks = _useEntityBlockEditor2[0];

  return createElement("div", {
    className: "wp-block-template-part__placeholder-preview"
  }, createElement("div", {
    className: "wp-block-template-part__placeholder-preview-title"
  }, __('Preview')), createElement(BlockPreview, {
    blocks: blocks,
    viewportWidth: 1200
  }));
}

export default function TemplatePartPlaceholder(_ref) {
  var setAttributes = _ref.setAttributes;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      slug = _useState2[0],
      _setSlug = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      theme = _useState4[0],
      setTheme = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      help = _useState6[0],
      setHelp = _useState6[1]; // Try to find an existing template part.


  var postId = useTemplatePartPost(null, slug, theme); // If found, get its preview.

  var preview = useSelect(function (select) {
    if (!postId) {
      return;
    }

    var templatePart = select('core').getEntityRecord('postType', 'wp_template_part', postId);

    if (templatePart) {
      return createElement(EntityProvider, {
        kind: "postType",
        type: "wp_template_part",
        id: postId
      }, createElement(TemplatePartPreview, null));
    }
  }, [postId]);
  var setSlug = useCallback(function (nextSlug) {
    _setSlug(nextSlug);

    setHelp(cleanForSlug(nextSlug));
  }, []);

  var _useDispatch = useDispatch('core'),
      saveEntityRecord = _useDispatch.saveEntityRecord;

  var onChooseOrCreate = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var nextAttributes, cleanSlug, templatePart;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
            cleanSlug = cleanForSlug(slug);
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
            setHelp(__('Error adding template.'));

          case 16:
            setAttributes(nextAttributes);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 13]]);
  })), [postId, slug, theme]);
  return createElement(Placeholder, {
    icon: layout,
    label: __('Template Part'),
    instructions: __('Choose a template part by slug and theme, or create a new one.')
  }, createElement("div", {
    className: "wp-block-template-part__placeholder-input-container"
  }, createElement(TextControl, {
    label: __('Slug'),
    placeholder: __('header'),
    value: slug,
    onChange: setSlug,
    help: help,
    className: "wp-block-template-part__placeholder-input"
  }), createElement(TextControl, {
    label: __('Theme'),
    placeholder: __('twentytwenty'),
    value: theme,
    onChange: setTheme,
    className: "wp-block-template-part__placeholder-input"
  })), preview, createElement(Button, {
    isPrimary: true,
    disabled: !slug || !theme,
    onClick: onChooseOrCreate
  }, postId ? __('Choose') : __('Create')));
}
//# sourceMappingURL=placeholder.js.map