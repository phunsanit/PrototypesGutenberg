import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
export default function WelcomeGuideMenuItem() {
  var _useDispatch = useDispatch('core/edit-post'),
      toggleFeature = _useDispatch.toggleFeature;

  return createElement(MenuItem, {
    onClick: function onClick() {
      return toggleFeature('welcomeGuide');
    }
  }, __('Welcome Guide'));
}
//# sourceMappingURL=index.js.map