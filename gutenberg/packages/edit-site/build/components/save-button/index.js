"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SaveButton;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _coreData = require("@wordpress/core-data");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _editor = require("../editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function SaveButton(_ref) {
  var openEntitiesSavedStates = _ref.openEntitiesSavedStates;

  var _useEditorContext = (0, _editor.useEditorContext)(),
      settings = _useEditorContext.settings;

  var _useEntityProp = (0, _coreData.useEntityProp)('postType', settings.templateType, 'status'),
      _useEntityProp2 = (0, _slicedToArray2.default)(_useEntityProp, 2),
      setStatus = _useEntityProp2[1];

  var _useEntityProp3 = (0, _coreData.useEntityProp)('postType', settings.templateType, 'title'),
      _useEntityProp4 = (0, _slicedToArray2.default)(_useEntityProp3, 2),
      setTitle = _useEntityProp4[1];

  var _useEntityProp5 = (0, _coreData.useEntityProp)('postType', settings.templateType, 'slug'),
      _useEntityProp6 = (0, _slicedToArray2.default)(_useEntityProp5, 1),
      slug = _useEntityProp6[0]; // Publish template if not done yet.


  (0, _element.useEffect)(function () {
    setStatus('publish');
    setTitle(slug);
  }, [slug]);

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        __experimentalGetDirtyEntityRecords = _select.__experimentalGetDirtyEntityRecords,
        isSavingEntityRecord = _select.isSavingEntityRecord;

    var dirtyEntityRecords = __experimentalGetDirtyEntityRecords();

    return {
      isDirty: dirtyEntityRecords.length > 0,
      isSaving: (0, _lodash.some)(dirtyEntityRecords, function (record) {
        return isSavingEntityRecord(record.kind, record.name, record.key);
      })
    };
  }),
      isDirty = _useSelect.isDirty,
      isSaving = _useSelect.isSaving;

  var disabled = !isDirty || isSaving;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    className: "edit-site-save-button__button",
    "aria-disabled": disabled,
    disabled: disabled,
    isBusy: isSaving,
    onClick: disabled ? undefined : openEntitiesSavedStates
  }, (0, _i18n.__)('Update Design')));
}
//# sourceMappingURL=index.js.map