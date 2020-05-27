import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { flow } from 'lodash';
/**
 * WordPress dependencies
 */

import { useSelect, useDispatch } from '@wordpress/data';
import { MenuItem, withSpokenMessages } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { check } from '@wordpress/icons';

function FeatureToggle(_ref) {
  var feature = _ref.feature,
      label = _ref.label,
      info = _ref.info,
      messageActivated = _ref.messageActivated,
      messageDeactivated = _ref.messageDeactivated,
      speak = _ref.speak;

  var speakMessage = function speakMessage() {
    if (isActive) {
      speak(messageDeactivated || __('Feature deactivated'));
    } else {
      speak(messageActivated || __('Feature activated'));
    }
  };

  var isActive = useSelect(function (select) {
    return select('core/edit-site').isFeatureActive(feature);
  }, []);

  var _useDispatch = useDispatch('core/edit-site'),
      toggleFeature = _useDispatch.toggleFeature;

  return createElement(MenuItem, {
    icon: isActive && check,
    isSelected: isActive,
    onClick: flow(toggleFeature.bind(null, feature), speakMessage),
    role: "menuitemcheckbox",
    info: info
  }, label);
}

export default withSpokenMessages(FeatureToggle);
//# sourceMappingURL=index.js.map