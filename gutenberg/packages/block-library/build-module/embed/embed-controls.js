import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, PanelBody, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { pencil } from '@wordpress/icons';

var EmbedControls = function EmbedControls(props) {
  var blockSupportsResponsive = props.blockSupportsResponsive,
      showEditButton = props.showEditButton,
      themeSupportsResponsive = props.themeSupportsResponsive,
      allowResponsive = props.allowResponsive,
      getResponsiveHelp = props.getResponsiveHelp,
      toggleResponsive = props.toggleResponsive,
      switchBackToURLInput = props.switchBackToURLInput;
  return createElement(Fragment, null, createElement(BlockControls, null, createElement(ToolbarGroup, null, showEditButton && createElement(Button, {
    className: "components-toolbar__control",
    label: __('Edit URL'),
    icon: pencil,
    onClick: switchBackToURLInput
  }))), themeSupportsResponsive && blockSupportsResponsive && createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Media settings'),
    className: "blocks-responsive"
  }, createElement(ToggleControl, {
    label: __('Resize for smaller devices'),
    checked: allowResponsive,
    help: getResponsiveHelp,
    onChange: toggleResponsive
  }))));
};

export default EmbedControls;
//# sourceMappingURL=embed-controls.js.map