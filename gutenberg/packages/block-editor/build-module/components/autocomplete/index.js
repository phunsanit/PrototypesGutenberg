import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { clone } from 'lodash';
/**
 * WordPress dependencies
 */

import { applyFilters, hasFilter } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { Autocomplete as OriginalAutocomplete } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { getDefaultBlockName } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { withBlockEditContext } from '../block-edit/context';
import blockAutocompleter from '../../autocompleters/block';
/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation.
 *
 * @type {Array}
 */

var EMPTY_ARRAY = [];
/**
 * Wrap the default Autocomplete component with one that
 * supports a filter hook for customizing its list of autocompleters.
 *
 * This function is exported for unit test.
 *
 * @param  {Function} Autocomplete Original component.
 * @return {Function}              Wrapped component
 */

export function withFilteredAutocompleters(Autocomplete) {
  return function (props) {
    var _props$completers = props.completers,
        completers = _props$completers === void 0 ? EMPTY_ARRAY : _props$completers,
        blockName = props.blockName;
    completers = useMemo(function () {
      if (blockName === getDefaultBlockName()) {
        return completers.concat([blockAutocompleter]);
      }

      return completers;
    }, [completers, blockName]);

    if (hasFilter('editor.Autocomplete.completers')) {
      completers = applyFilters('editor.Autocomplete.completers', // Provide copies so filters may directly modify them.
      completers.map(clone), props.blockName);
    }

    return createElement(Autocomplete, _extends({}, props, {
      completers: completers
    }));
  };
}
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/autocomplete/README.md
 */

export default compose([withBlockEditContext(function (_ref) {
  var name = _ref.name;
  return {
    blockName: name
  };
}), withFilteredAutocompleters])(OriginalAutocomplete);
//# sourceMappingURL=index.js.map