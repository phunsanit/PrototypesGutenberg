import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import { wordpress } from '@wordpress/icons';

function FullscreenModeClose() {
  var _useSelect = useSelect(function (select) {
    var _select = select('core/editor'),
        getCurrentPostType = _select.getCurrentPostType;

    var _select2 = select('core/edit-post'),
        isFeatureActive = _select2.isFeatureActive;

    var _select3 = select('core'),
        getPostType = _select3.getPostType;

    return {
      isActive: isFeatureActive('fullscreenMode'),
      postType: getPostType(getCurrentPostType())
    };
  }, []),
      isActive = _useSelect.isActive,
      postType = _useSelect.postType;

  if (!isActive || !postType) {
    return null;
  }

  return createElement(Button, {
    className: "edit-post-fullscreen-mode-close",
    icon: wordpress,
    iconSize: 36,
    href: addQueryArgs('edit.php', {
      post_type: postType.slug
    }),
    label: get(postType, ['labels', 'view_items'], __('Back'))
  });
}

export default FullscreenModeClose;
//# sourceMappingURL=index.js.map