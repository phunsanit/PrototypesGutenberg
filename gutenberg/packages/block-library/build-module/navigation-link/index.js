import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { mapMarker as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/navigation-link",
  category: "layout",
  parent: ["core/navigation"],
  attributes: {
    label: {
      type: "string"
    },
    nofollow: {
      type: "boolean",
      "default": false
    },
    type: {
      type: "string"
    },
    description: {
      type: "string"
    },
    id: {
      type: "number"
    },
    opensInNewTab: {
      type: "boolean",
      "default": false
    },
    url: {
      type: "string"
    }
  },
  supports: {
    reusable: false,
    html: false,
    lightBlockWrapper: true
  }
};
import edit from './edit';
import save from './save';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Navigation Link'),
  icon: icon,
  description: __('Add a page, link, or another item to your navigation.'),
  __experimentalLabel: function __experimentalLabel(_ref) {
    var label = _ref.label;
    return label;
  },
  merge: function merge(leftAttributes, _ref2) {
    var _ref2$label = _ref2.label,
        rightLabel = _ref2$label === void 0 ? '' : _ref2$label;
    return _objectSpread({}, leftAttributes, {
      label: leftAttributes.label + rightLabel
    });
  },
  edit: edit,
  save: save
};
//# sourceMappingURL=index.js.map