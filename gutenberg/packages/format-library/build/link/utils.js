"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidHref = isValidHref;
exports.createLinkFormat = createLinkFormat;

var _lodash = require("lodash");

var _url = require("@wordpress/url");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Check for issues with the provided href.
 *
 * @param {string} href The href.
 *
 * @return {boolean} Is the href invalid?
 */
function isValidHref(href) {
  if (!href) {
    return false;
  }

  var trimmedHref = href.trim();

  if (!trimmedHref) {
    return false;
  } // Does the href start with something that looks like a URL protocol?


  if (/^\S+:/.test(trimmedHref)) {
    var protocol = (0, _url.getProtocol)(trimmedHref);

    if (!(0, _url.isValidProtocol)(protocol)) {
      return false;
    } // Add some extra checks for http(s) URIs, since these are the most common use-case.
    // This ensures URIs with an http protocol have exactly two forward slashes following the protocol.


    if ((0, _lodash.startsWith)(protocol, 'http') && !/^https?:\/\/[^\/\s]/i.test(trimmedHref)) {
      return false;
    }

    var authority = (0, _url.getAuthority)(trimmedHref);

    if (!(0, _url.isValidAuthority)(authority)) {
      return false;
    }

    var path = (0, _url.getPath)(trimmedHref);

    if (path && !(0, _url.isValidPath)(path)) {
      return false;
    }

    var queryString = (0, _url.getQueryString)(trimmedHref);

    if (queryString && !(0, _url.isValidQueryString)(queryString)) {
      return false;
    }

    var fragment = (0, _url.getFragment)(trimmedHref);

    if (fragment && !(0, _url.isValidFragment)(fragment)) {
      return false;
    }
  } // Validate anchor links.


  if ((0, _lodash.startsWith)(trimmedHref, '#') && !(0, _url.isValidFragment)(trimmedHref)) {
    return false;
  }

  return true;
}
/**
 * Generates the format object that will be applied to the link text.
 *
 * @param {Object}  options
 * @param {string}  options.url              The href of the link.
 * @param {string}  options.type             The type of the link.
 * @param {string}  options.id               The ID of the link.
 * @param {boolean} options.opensInNewWindow Whether this link will open in a new window.
 * @param {Object}  options.text             The text that is being hyperlinked.
 *
 * @return {Object} The final format object.
 */


function createLinkFormat(_ref) {
  var url = _ref.url,
      type = _ref.type,
      id = _ref.id,
      opensInNewWindow = _ref.opensInNewWindow;
  var format = {
    type: 'core/link',
    attributes: {
      url: url
    }
  };
  if (type) format.attributes.type = type;
  if (id) format.attributes.type = id;

  if (opensInNewWindow) {
    format.attributes.target = '_blank';
    format.attributes.rel = 'noreferrer noopener';
  }

  return format;
}
//# sourceMappingURL=utils.js.map