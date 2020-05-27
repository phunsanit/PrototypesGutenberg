import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import createSelector from 'rememo';
import { get, flatMap } from 'lodash';
/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation, as in a connected or
 * other pure component which performs `shouldComponentUpdate` check on props.
 * This should be used as a last resort, since the normalized data should be
 * maintained by the reducer result in state.
 *
 * @type {Array}
 */

var EMPTY_ARRAY = [];
/**
 * Returns the annotations for a specific client ID.
 *
 * @param {Object} state Editor state.
 * @param {string} clientId The ID of the block to get the annotations for.
 *
 * @return {Array} The annotations applicable to this block.
 */

export var __experimentalGetAnnotationsForBlock = createSelector(function (state, blockClientId) {
  return get(state, blockClientId, []).filter(function (annotation) {
    return annotation.selector === 'block';
  });
}, function (state, blockClientId) {
  return [get(state, blockClientId, EMPTY_ARRAY)];
});
export var __experimentalGetAllAnnotationsForBlock = function __experimentalGetAllAnnotationsForBlock(state, blockClientId) {
  return get(state, blockClientId, EMPTY_ARRAY);
};
/**
 * Returns the annotations that apply to the given RichText instance.
 *
 * Both a blockClientId and a richTextIdentifier are required. This is because
 * a block might have multiple `RichText` components. This does mean that every
 * block needs to implement annotations itself.
 *
 * @param {Object} state              Editor state.
 * @param {string} blockClientId      The client ID for the block.
 * @param {string} richTextIdentifier Unique identifier that identifies the given RichText.
 * @return {Array} All the annotations relevant for the `RichText`.
 */

export var __experimentalGetAnnotationsForRichText = createSelector(function (state, blockClientId, richTextIdentifier) {
  return get(state, blockClientId, []).filter(function (annotation) {
    return annotation.selector === 'range' && richTextIdentifier === annotation.richTextIdentifier;
  }).map(function (annotation) {
    var range = annotation.range,
        other = _objectWithoutProperties(annotation, ["range"]);

    return _objectSpread({}, range, {}, other);
  });
}, function (state, blockClientId) {
  return [get(state, blockClientId, EMPTY_ARRAY)];
});
/**
 * Returns all annotations in the editor state.
 *
 * @param {Object} state Editor state.
 * @return {Array} All annotations currently applied.
 */

export function __experimentalGetAnnotations(state) {
  return flatMap(state, function (annotations) {
    return annotations;
  });
}
//# sourceMappingURL=selectors.js.map