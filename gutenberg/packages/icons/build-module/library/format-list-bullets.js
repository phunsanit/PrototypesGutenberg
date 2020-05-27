import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { SVG, Path } from '@wordpress/primitives';
var formatListBullets = createElement(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, createElement(Path, {
  d: "M4 7.2v1.5h16V7.2H4zm7.1 8.6H20v-1.5h-8.9v1.5zM6 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}));
export default formatListBullets;
//# sourceMappingURL=format-list-bullets.js.map