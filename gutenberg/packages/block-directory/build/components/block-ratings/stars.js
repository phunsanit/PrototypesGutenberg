"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function Stars(_ref) {
  var rating = _ref.rating;
  var stars = Math.round(rating / 0.5) * 0.5;
  var fullStarCount = Math.floor(rating);
  var halfStarCount = Math.ceil(rating - fullStarCount);
  var emptyStarCount = 5 - (fullStarCount + halfStarCount);
  return (0, _element.createElement)("div", {
    "aria-label": (0, _i18n.sprintf)(
    /* translators: %s: number of stars. */
    (0, _i18n.__)('%s out of 5 stars'), stars)
  }, (0, _lodash.times)(fullStarCount, function (i) {
    return (0, _element.createElement)(_icons.Icon, {
      key: "full_stars_".concat(i),
      icon: _icons.starFilled,
      size: 16
    });
  }), (0, _lodash.times)(halfStarCount, function (i) {
    return (0, _element.createElement)(_icons.Icon, {
      key: "half_stars_".concat(i),
      icon: _icons.starHalf,
      size: 16
    });
  }), (0, _lodash.times)(emptyStarCount, function (i) {
    return (0, _element.createElement)(_icons.Icon, {
      key: "empty_stars_".concat(i),
      icon: _icons.starEmpty,
      size: 16
    });
  }));
}

var _default = Stars;
exports.default = _default;
//# sourceMappingURL=stars.js.map