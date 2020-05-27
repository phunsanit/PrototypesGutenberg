import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __experimentalUnitControl as BaseUnitControl } from '@wordpress/components';
/**
 * Internal dependencies
 */

import useEditorFeature from '../use-editor-feature';
var __defaultUnits = BaseUnitControl.__defaultUnits;
export default function UnitControl(_ref) {
  var unitsProp = _ref.units,
      props = _objectWithoutProperties(_ref, ["units"]);

  var settings = useEditorFeature('__experimentalDisableCustomUnits');
  var isDisabled = !!settings; // Adjust units based on add_theme_support( 'experimental-custom-units' );

  var units;
  /**
   * Handle extra arguments for add_theme_support
   *
   * Example: add_theme_support( 'experimental-custom-units', 'rem' );
   * Or: add_theme_support( 'experimental-custom-units', 'px, 'rem', 'em' );
   *
   * Note: If there are unit argument (e.g. 'em'), these units are enabled
   * within the control.
   */

  if (Array.isArray(settings)) {
    units = filterUnitsWithSettings(settings, unitsProp);
  } else {
    units = isDisabled ? false : unitsProp;
  }

  return createElement(BaseUnitControl, _extends({
    units: units
  }, props));
} // Hoisting statics from the BaseUnitControl

UnitControl.__defaultUnits = __defaultUnits;
/**
 * Filters available units based on values defined by settings.
 *
 * @param {Array} settings Collection of preferred units.
 * @param {Array} units Collection of available units.
 *
 * @return {Array} Filtered units based on settings.
 */

function filterUnitsWithSettings() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var units = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return units.filter(function (unit) {
    return settings.includes(unit.value);
  });
}
//# sourceMappingURL=index.js.map