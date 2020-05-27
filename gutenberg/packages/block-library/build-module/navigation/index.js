/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { navigation as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/navigation",
  category: "layout",
  attributes: {
    orientation: {
      type: "string"
    },
    className: {
      type: "string"
    },
    textColor: {
      type: "string"
    },
    customTextColor: {
      type: "string"
    },
    rgbTextColor: {
      type: "string"
    },
    backgroundColor: {
      type: "string"
    },
    customBackgroundColor: {
      type: "string"
    },
    rgbBackgroundColor: {
      type: "string"
    },
    fontSize: {
      type: "string"
    },
    customFontSize: {
      type: "number"
    },
    itemsJustification: {
      type: "string"
    },
    showSubmenuIcon: {
      type: "boolean",
      "default": true
    }
  },
  supports: {
    align: ["wide", "full"],
    anchor: true,
    html: false,
    inserter: true,
    lightBlockWrapper: true
  }
};
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Navigation'),
  icon: icon,
  description: __('Add a navigation block to your site.'),
  keywords: [__('menu'), __('navigation'), __('links')],
  variations: [{
    name: 'horizontal',
    isDefault: true,
    title: __('Navigation (horizontal)'),
    description: __('Links shown in a row.'),
    attributes: {
      orientation: 'horizontal'
    }
  }, {
    name: 'vertical',
    title: __('Navigation (vertical)'),
    description: __('Links shown in a column.'),
    attributes: {
      orientation: 'vertical'
    }
  }],
  example: {
    innerBlocks: [{
      name: 'core/navigation-link',
      attributes: {
        // translators: 'Home' as in a website's home page.
        label: __('Home'),
        url: 'https://make.wordpress.org/'
      }
    }, {
      name: 'core/navigation-link',
      attributes: {
        // translators: 'About' as in a website's about page.
        label: __('About'),
        url: 'https://make.wordpress.org/'
      }
    }, {
      name: 'core/navigation-link',
      attributes: {
        // translators: 'Contact' as in a website's contact page.
        label: __('Contact'),
        url: 'https://make.wordpress.org/'
      }
    }]
  },
  styles: [{
    name: 'light',
    label: __('Light'),
    isDefault: true
  }, {
    name: 'dark',
    label: __('Dark')
  }],
  edit: edit,
  save: save,
  deprecated: deprecated
};
//# sourceMappingURL=index.js.map