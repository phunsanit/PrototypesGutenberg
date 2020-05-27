import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Icon, MenuGroup } from '@wordpress/components';
import { PostPreviewButton } from '@wordpress/editor';
import { external } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { __experimentalPreviewOptions as PreviewOptions } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
export default function DevicePreview() {
  var _useSelect = useSelect(function (select) {
    return {
      hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
      isSaving: select('core/edit-post').isSavingMetaBoxes(),
      isPostSaveable: select('core/editor').isEditedPostSaveable(),
      deviceType: select('core/edit-post').__experimentalGetPreviewDeviceType()
    };
  }, []),
      hasActiveMetaboxes = _useSelect.hasActiveMetaboxes,
      isPostSaveable = _useSelect.isPostSaveable,
      isSaving = _useSelect.isSaving,
      deviceType = _useSelect.deviceType;

  var _useDispatch = useDispatch('core/edit-post'),
      setPreviewDeviceType = _useDispatch.__experimentalSetPreviewDeviceType;

  return createElement(PreviewOptions, {
    isEnabled: isPostSaveable,
    className: "edit-post-post-preview-dropdown",
    deviceType: deviceType,
    setDeviceType: setPreviewDeviceType
  }, createElement(MenuGroup, null, createElement("div", {
    className: "edit-post-header-preview__grouping-external"
  }, createElement(PostPreviewButton, {
    className: 'edit-post-header-preview__button-external',
    forceIsAutosaveable: hasActiveMetaboxes,
    forcePreviewLink: isSaving ? null : undefined,
    textContent: createElement(Fragment, null, createElement(Icon, {
      icon: external
    }), __('Preview in new tab'))
  }))));
}
//# sourceMappingURL=index.js.map