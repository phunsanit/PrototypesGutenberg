"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AddTemplate;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _editor = require("@wordpress/editor");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
function AddTemplate(_ref) {
  var ids = _ref.ids,
      onAddTemplateId = _ref.onAddTemplateId,
      onRequestClose = _ref.onRequestClose,
      isOpen = _ref.isOpen;
  var slugs = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        getEntityRecord = _select.getEntityRecord;

    return ids.reduce(function (acc, id) {
      var template = getEntityRecord('postType', 'wp_template', id);
      acc[template ? template.slug : 'loading'] = true;
      return acc;
    }, {});
  }, [ids]);

  var _useDispatch = (0, _data.useDispatch)('core'),
      saveEntityRecord = _useDispatch.saveEntityRecord;

  var _useState = (0, _element.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      slug = _useState2[0],
      _setSlug = _useState2[1];

  var _useState3 = (0, _element.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      help = _useState4[0],
      setHelp = _useState4[1];

  var setSlug = (0, _element.useCallback)(function (nextSlug) {
    _setSlug(nextSlug);

    var cleanSlug = (0, _editor.cleanForSlug)(nextSlug);
    setHelp(slugs[cleanSlug] ? (0, _i18n.__)('Template already exists, edit it instead.') : cleanSlug);
  }, [slugs]);
  var add = (0, _element.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var cleanSlug, template;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _setSlug('');

            cleanSlug = (0, _editor.cleanForSlug)(slug);
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
            setHelp((0, _i18n.__)('Error adding template.'));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  })), [slug, onRequestClose]);
  return !slugs.loading && isOpen && (0, _element.createElement)(_components.Modal, {
    title: (0, _i18n.__)('Add Template'),
    onRequestClose: onRequestClose
  }, (0, _element.createElement)(_components.TextControl, {
    label: (0, _i18n.__)('Add Template'),
    placeholder: (0, _i18n.__)('template-slug'),
    value: slug,
    onChange: setSlug,
    help: help
  }), (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    disabled: !slug || slugs[(0, _editor.cleanForSlug)(slug)],
    onClick: add
  }, (0, _i18n.__)('Add')));
}
//# sourceMappingURL=index.js.map