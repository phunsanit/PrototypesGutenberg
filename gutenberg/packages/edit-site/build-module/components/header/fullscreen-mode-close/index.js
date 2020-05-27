import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { wordpress } from '@wordpress/icons';

function FullscreenModeClose(_ref) {
  var icon = _ref.icon;
  var isActive = useSelect(function (select) {
    return select('core/edit-site').isFeatureActive('fullscreenMode');
  }, []);

  if (!isActive) {
    return null;
  }

  var buttonIcon = icon || wordpress;
  return createElement(Button, {
    className: "edit-site-fullscreen-mode-close",
    icon: buttonIcon,
    iconSize: 36,
    href: "index.php",
    label: __('Back')
  });
}

export default FullscreenModeClose;
//# sourceMappingURL=index.js.map