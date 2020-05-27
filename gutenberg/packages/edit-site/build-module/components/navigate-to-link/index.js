import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { getPath, getQueryString, addQueryArgs } from '@wordpress/url';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { __experimentalResolveSelect as resolveSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Browser dependencies
 */

var _window = window,
    fetch = _window.fetch;

function getPathFromLink(link) {
  // TODO: Explore abstracting this into `@wordpress/url`.
  var path = getPath(link);
  var queryString = getQueryString(link);
  var value = '/';
  if (path) value += path;
  if (queryString) value += "?".concat(queryString);
  return value;
}

export default function NavigateToLink(_ref) {
  var url = _ref.url,
      type = _ref.type,
      id = _ref.id,
      activePage = _ref.activePage,
      onActivePageAndTemplateIdChange = _ref.onActivePageAndTemplateIdChange;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      templateId = _useState2[0],
      setTemplateId = _useState2[1];

  useEffect(function () {
    var effect = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _yield$fetch$then, success, data, newTemplateId;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fetch(addQueryArgs(url, {
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
                return resolveSelect('core').getEntityRecords('postType', 'wp_template', {
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
  var onClick = useMemo(function () {
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
  return onClick && createElement(Button, {
    icon: "welcome-write-blog",
    label: __('Edit Page Template'),
    onClick: onClick
  });
}
//# sourceMappingURL=index.js.map