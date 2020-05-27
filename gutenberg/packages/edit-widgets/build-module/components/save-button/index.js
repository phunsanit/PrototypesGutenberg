import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { filter, map, some, forEach } from 'lodash';
/**
 * WordPress dependencies
 */

import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

function SaveButton() {
  var _useSelect = useSelect(function (select) {
    var _select = select('core'),
        hasEditsForEntityRecord = _select.hasEditsForEntityRecord,
        isSavingEntityRecord = _select.isSavingEntityRecord,
        getEntityRecords = _select.getEntityRecords;

    var widgetAreas = getEntityRecords('root', 'widgetArea');
    var widgetAreaIds = map(widgetAreas, function (_ref) {
      var id = _ref.id;
      return id;
    });
    return {
      editedWidgetAreaIds: filter(widgetAreaIds, function (id) {
        return hasEditsForEntityRecord('root', 'widgetArea', id);
      }),
      isSaving: some(widgetAreaIds, function (id) {
        return isSavingEntityRecord('root', 'widgetArea', id);
      })
    };
  }, []),
      editedWidgetAreaIds = _useSelect.editedWidgetAreaIds,
      isSaving = _useSelect.isSaving;

  var _useDispatch = useDispatch('core'),
      saveEditedEntityRecord = _useDispatch.saveEditedEntityRecord;

  var onClick = useCallback(function () {
    forEach(editedWidgetAreaIds, function (id) {
      saveEditedEntityRecord('root', 'widgetArea', id);
    });
  }, [editedWidgetAreaIds]);
  return createElement(Button, {
    isPrimary: true,
    isBusy: isSaving,
    "aria-disabled": isSaving,
    onClick: isSaving ? undefined : onClick,
    disabled: editedWidgetAreaIds.length === 0
  }, __('Update'));
}

export default SaveButton;
//# sourceMappingURL=index.js.map