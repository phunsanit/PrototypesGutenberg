import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { times } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { Icon, starEmpty, starFilled, starHalf } from '@wordpress/icons';

function Stars(_ref) {
  var rating = _ref.rating;
  var stars = Math.round(rating / 0.5) * 0.5;
  var fullStarCount = Math.floor(rating);
  var halfStarCount = Math.ceil(rating - fullStarCount);
  var emptyStarCount = 5 - (fullStarCount + halfStarCount);
  return createElement("div", {
    "aria-label": sprintf(
    /* translators: %s: number of stars. */
    __('%s out of 5 stars'), stars)
  }, times(fullStarCount, function (i) {
    return createElement(Icon, {
      key: "full_stars_".concat(i),
      icon: starFilled,
      size: 16
    });
  }), times(halfStarCount, function (i) {
    return createElement(Icon, {
      key: "half_stars_".concat(i),
      icon: starHalf,
      size: 16
    });
  }), times(emptyStarCount, function (i) {
    return createElement(Icon, {
      key: "empty_stars_".concat(i),
      icon: starEmpty,
      size: 16
    });
  }));
}

export default Stars;
//# sourceMappingURL=stars.js.map