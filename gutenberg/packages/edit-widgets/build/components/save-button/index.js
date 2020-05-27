"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function SaveButton() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        hasEditsForEntityRecord = _select.hasEditsForEntityRecord,
        isSavingEntityRecord = _select.isSavingEntityRecord,
        getEntityRecords = _select.getEntityRecords;

    var widgetAreas = getEntityRecords('root', 'widgetArea');
    var widgetAreaIds = (0, _lodash.map)(widgetAreas, function (_ref) {
      var id = _ref.id;
      return id;
    });
    return {
      editedWidgetAreaIds: (0, _lodash.filter)(widgetAreaIds, function (id) {
        return hasEditsForEntityRecord('root', 'widgetArea', id);
      }),
      isSaving: (0, _lodash.some)(widgetAreaIds, function (id) {
        return isSavingEntityRecord('root', 'widgetArea', id);
      })
    };
  }, []),
      editedWidgetAreaIds = _useSelect.editedWidgetAreaIds,
      isSaving = _useSelect.isSaving;

  var _useDispatch = (0, _data.useDispatch)('core'),
      saveEditedEntityRecord = _useDispatch.saveEditedEntityRecord;

  var onClick = (0, _element.useCallback)(function () {
    (0, _lodash.forEach)(editedWidgetAreaIds, function (id) {
      saveEditedEntityRecord('root', 'widgetArea', id);
    });
  }, [editedWidgetAreaIds]);
  return (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    isBusy: isSaving,
    "aria-disabled": isSaving,
    onClick: isSaving ? undefined : onClick,
    disabled: editedWidgetAreaIds.length === 0
  }, (0, _i18n.__)('Update'));
}

var _default = SaveButton;
exports.default = _default;
//# sourceMappingURL=index.js.map