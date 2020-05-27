import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useCallback } from '@wordpress/element';
import { cleanForSlug } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { Modal, TextControl, Button } from '@wordpress/components';
export default function AddTemplate(_ref) {
  var ids = _ref.ids,
      onAddTemplateId = _ref.onAddTemplateId,
      onRequestClose = _ref.onRequestClose,
      isOpen = _ref.isOpen;
  var slugs = useSelect(function (select) {
    var _select = select('core'),
        getEntityRecord = _select.getEntityRecord;

    return ids.reduce(function (acc, id) {
      var template = getEntityRecord('postType', 'wp_template', id);
      acc[template ? template.slug : 'loading'] = true;
      return acc;
    }, {});
  }, [ids]);

  var _useDispatch = useDispatch('core'),
      saveEntityRecord = _useDispatch.saveEntityRecord;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      slug = _useState2[0],
      _setSlug = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      help = _useState4[0],
      setHelp = _useState4[1];

  var setSlug = useCallback(function (nextSlug) {
    _setSlug(nextSlug);

    var cleanSlug = cleanForSlug(nextSlug);
    setHelp(slugs[cleanSlug] ? __('Template already exists, edit it instead.') : cleanSlug);
  }, [slugs]);
  var add = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var cleanSlug, template;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _setSlug('');

            cleanSlug = cleanForSlug(slug);
            _context.prev = 2;
            _context.next = 5;
            return saveEntityRecord('postType', 'wp_template', {
              title: cleanSlug,
              status: 'publish',
              slug: cleanSlug
            });

          case 5:
            template = _context.sent;
            onAddTemplateId(template.id);
            onRequestClose();
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            setHelp(__('Error adding template.'));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  })), [slug, onRequestClose]);
  return !slugs.loading && isOpen && createElement(Modal, {
    title: __('Add Template'),
    onRequestClose: onRequestClose
  }, createElement(TextControl, {
    label: __('Add Template'),
    placeholder: __('template-slug'),
    value: slug,
    onChange: setSlug,
    help: help
  }), createElement(Button, {
    isPrimary: true,
    disabled: !slug || slugs[cleanForSlug(slug)],
    onClick: add
  }, __('Add')));
}
//# sourceMappingURL=index.js.map