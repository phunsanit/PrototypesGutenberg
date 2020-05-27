import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { some } from 'lodash';
/**
 * WordPress dependencies
 */

import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { useEditorContext } from '../editor';
export default function SaveButton(_ref) {
  var openEntitiesSavedStates = _ref.openEntitiesSavedStates;

  var _useEditorContext = useEditorContext(),
      settings = _useEditorContext.settings;

  var _useEntityProp = useEntityProp('postType', settings.templateType, 'status'),
      _useEntityProp2 = _slicedToArray(_useEntityProp, 2),
      setStatus = _useEntityProp2[1];

  var _useEntityProp3 = useEntityProp('postType', settings.templateType, 'title'),
      _useEntityProp4 = _slicedToArray(_useEntityProp3, 2),
      setTitle = _useEntityProp4[1];

  var _useEntityProp5 = useEntityProp('postType', settings.templateType, 'slug'),
      _useEntityProp6 = _slicedToArray(_useEntityProp5, 1),
      slug = _useEntityProp6[0]; // Publish template if not done yet.


  useEffect(function () {
    setStatus('publish');
    setTitle(slug);
  }, [slug]);

  var _useSelect = useSelect(function (select) {
    var _select = select('core'),
        __experimentalGetDirtyEntityRecords = _select.__experimentalGetDirtyEntityRecords,
        isSavingEntityRecord = _select.isSavingEntityRecord;

    var dirtyEntityRecords = __experimentalGetDirtyEntityRecords();

    return {
      isDirty: dirtyEntityRecords.length > 0,
      isSaving: some(dirtyEntityRecords, function (record) {
        return isSavingEntityRecord(record.kind, record.name, record.key);
      })
    };
  }),
      isDirty = _useSelect.isDirty,
      isSaving = _useSelect.isSaving;

  var disabled = !isDirty || isSaving;
  return createElement(Fragment, null, createElement(Button, {
    isPrimary: true,
    className: "edit-site-save-button__button",
    "aria-disabled": disabled,
    disabled: disabled,
    isBusy: isSaving,
    onClick: disabled ? undefined : openEntitiesSavedStates
  }, __('Update Design')));
}
//# sourceMappingURL=index.js.map