import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Internal dependencies
 */
import { common as commonEmbeds, others as otherEmbeds } from './core-embeds';
import { embedContentIcon } from './icons';
import { getEmbedBlockSettings } from './settings';
import transforms from './transforms';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
export var name = 'core/embed';
export var settings = getEmbedBlockSettings({
  title: _x('Embed', 'block title'),
  description: __('Embed videos, images, tweets, audio, and other content from external sources.'),
  icon: embedContentIcon,
  // Unknown embeds should not be responsive by default.
  responsive: false,
  transforms: transforms
});
export var common = commonEmbeds.map(function (embedDefinition) {
  var embedSettings = getEmbedBlockSettings(embedDefinition.settings);
  return _objectSpread({}, embedDefinition, {
    settings: _objectSpread({}, embedSettings, {
      transforms: transforms
    })
  });
});
export var others = otherEmbeds.map(function (embedDefinition) {
  var embedSettings = getEmbedBlockSettings(embedDefinition.settings);
  return _objectSpread({}, embedDefinition, {
    settings: _objectSpread({}, embedSettings, {
      transforms: transforms
    })
  });
});
//# sourceMappingURL=index.js.map