"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NavigateToLink;

var _element = require("@wordpress/element");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _url = require("@wordpress/url");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */

/**
 * Browser dependencies
 */
var _window = window,
    fetch = _window.fetch;

function getPathFromLink(link) {
  // TODO: Explore abstracting this into `@wordpress/url`.
  var path = (0, _url.getPath)(link);
  var queryString = (0, _url.getQueryString)(link);
  var value = '/';
  if (path) value += path;
  if (queryString) value += "?".concat(queryString);
  return value;
}

function NavigateToLink(_ref) {
  var url = _ref.url,
      type = _ref.type,
      id = _ref.id,
      activePage = _ref.activePage,
      onActivePageAndTemplateIdChange = _ref.onActivePageAndTemplateIdChange;

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      templateId = _useState2[0],
      setTemplateId = _useState2[1];

  (0, _element.useEffect)(function () {
    var effect = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _yield$fetch$then, success, data, newTemplateId;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fetch((0, _url.addQueryArgs)(url, {
                  '_wp-find-template': true
                })).then(function (res) {
                  return res.json();
                });

              case 3:
                _yield$fetch$then = _context.sent;
                success = _yield$fetch$then.success;
                data = _yield$fetch$then.data;

                if (!success) {
                  _context.next = 15;
                  break;
                }

                newTemplateId = data.ID;

                if (!(newTemplateId === null)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 11;
                return (0, _data.__experimentalResolveSelect)('core').getEntityRecords('postType', 'wp_template', {
                  resolved: true,
                  slug: data.post_name
                });

              case 11:
                newTemplateId = _context.sent[0].id;

              case 12:
                setTemplateId(newTemplateId);
                _context.next = 16;
                break;

              case 15:
                throw new Error();

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                setTemplateId(null);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 18]]);
      }));

      return function effect() {
        return _ref2.apply(this, arguments);
      };
    }();

    effect();
  }, [url]);
  var onClick = (0, _element.useMemo)(function () {
    if (!templateId || !type || !id || type === 'URL') return null;
    var path = getPathFromLink(url);
    if (path === activePage.path) return null;
    return function () {
      return onActivePageAndTemplateIdChange({
        page: {
          path: path,
          context: {
            postType: type,
            postId: id
          }
        },
        templateId: templateId
      });
    };
  }, [templateId, type, id, getPathFromLink, url, onActivePageAndTemplateIdChange]);
  return onClick && (0, _element.createElement)(_components.Button, {
    icon: "welcome-write-blog",
    label: (0, _i18n.__)('Edit Page Template'),
    onClick: onClick
  });
}
//# sourceMappingURL=index.js.map