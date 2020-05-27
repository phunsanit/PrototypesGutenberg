"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyAnnotations = applyAnnotations;
exports.removeAnnotations = removeAnnotations;
exports.annotation = void 0;

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

/**
 * WordPress dependencies
 */
var FORMAT_NAME = 'core/annotation';
var ANNOTATION_ATTRIBUTE_PREFIX = 'annotation-text-';
var STORE_KEY = 'core/annotations';
/**
 * Applies given annotations to the given record.
 *
 * @param {Object} record The record to apply annotations to.
 * @param {Array} annotations The annotation to apply.
 * @return {Object} A record with the annotations applied.
 */

function applyAnnotations(record) {
  var annotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  annotations.forEach(function (annotation) {
    var start = annotation.start,
        end = annotation.end;

    if (start > record.text.length) {
      start = record.text.length;
    }

    if (end > record.text.length) {
      end = record.text.length;
    }

    var className = ANNOTATION_ATTRIBUTE_PREFIX + annotation.source;
    var id = ANNOTATION_ATTRIBUTE_PREFIX + annotation.id;
    record = (0, _richText.applyFormat)(record, {
      type: FORMAT_NAME,
      attributes: {
        className: className,
        id: id
      }
    }, start, end);
  });
  return record;
}
/**
 * Removes annotations from the given record.
 *
 * @param {Object} record Record to remove annotations from.
 * @return {Object} The cleaned record.
 */


function removeAnnotations(record) {
  return (0, _richText.removeFormat)(record, 'core/annotation', 0, record.text.length);
}
/**
 * Retrieves the positions of annotations inside an array of formats.
 *
 * @param {Array} formats Formats with annotations in there.
 * @return {Object} ID keyed positions of annotations.
 */


function retrieveAnnotationPositions(formats) {
  var positions = {};
  formats.forEach(function (characterFormats, i) {
    characterFormats = characterFormats || [];
    characterFormats = characterFormats.filter(function (format) {
      return format.type === FORMAT_NAME;
    });
    characterFormats.forEach(function (format) {
      var id = format.attributes.id;
      id = id.replace(ANNOTATION_ATTRIBUTE_PREFIX, '');

      if (!positions.hasOwnProperty(id)) {
        positions[id] = {
          start: i
        };
      } // Annotations refer to positions between characters.
      // Formats refer to the character themselves.
      // So we need to adjust for that here.


      positions[id].end = i + 1;
    });
  });
  return positions;
}
/**
 * Updates annotations in the state based on positions retrieved from RichText.
 *
 * @param {Array}    annotations                   The annotations that are currently applied.
 * @param {Array}    positions                     The current positions of the given annotations.
 * @param {Object}   actions
 * @param {Function} actions.removeAnnotation      Function to remove an annotation from the state.
 * @param {Function} actions.updateAnnotationRange Function to update an annotation range in the state.
 */


function updateAnnotationsWithPositions(annotations, positions, _ref) {
  var removeAnnotation = _ref.removeAnnotation,
      updateAnnotationRange = _ref.updateAnnotationRange;
  annotations.forEach(function (currentAnnotation) {
    var position = positions[currentAnnotation.id]; // If we cannot find an annotation, delete it.

    if (!position) {
      // Apparently the annotation has been removed, so remove it from the state:
      // Remove...
      removeAnnotation(currentAnnotation.id);
      return;
    }

    var start = currentAnnotation.start,
        end = currentAnnotation.end;

    if (start !== position.start || end !== position.end) {
      updateAnnotationRange(currentAnnotation.id, position.start, position.end);
    }
  });
}

var annotation = {
  name: FORMAT_NAME,
  title: (0, _i18n.__)('Annotation'),
  tagName: 'mark',
  className: 'annotation-text',
  attributes: {
    className: 'class',
    id: 'id'
  },
  edit: function edit() {
    return null;
  },
  __experimentalGetPropsForEditableTreePreparation: function __experimentalGetPropsForEditableTreePreparation(select, _ref2) {
    var richTextIdentifier = _ref2.richTextIdentifier,
        blockClientId = _ref2.blockClientId;
    return {
      annotations: select(STORE_KEY).__experimentalGetAnnotationsForRichText(blockClientId, richTextIdentifier)
    };
  },
  __experimentalCreatePrepareEditableTree: function __experimentalCreatePrepareEditableTree(_ref3) {
    var annotations = _ref3.annotations;
    return function (formats, text) {
      if (annotations.length === 0) {
        return formats;
      }

      var record = {
        formats: formats,
        text: text
      };
      record = applyAnnotations(record, annotations);
      return record.formats;
    };
  },
  __experimentalGetPropsForEditableTreeChangeHandler: function __experimentalGetPropsForEditableTreeChangeHandler(dispatch) {
    return {
      removeAnnotation: dispatch(STORE_KEY).__experimentalRemoveAnnotation,
      updateAnnotationRange: dispatch(STORE_KEY).__experimentalUpdateAnnotationRange
    };
  },
  __experimentalCreateOnChangeEditableValue: function __experimentalCreateOnChangeEditableValue(props) {
    return function (formats) {
      var positions = retrieveAnnotationPositions(formats);
      var removeAnnotation = props.removeAnnotation,
          updateAnnotationRange = props.updateAnnotationRange,
          annotations = props.annotations;
      updateAnnotationsWithPositions(annotations, positions, {
        removeAnnotation: removeAnnotation,
        updateAnnotationRange: updateAnnotationRange
      });
    };
  }
};
exports.annotation = annotation;
//# sourceMappingURL=annotation.js.map