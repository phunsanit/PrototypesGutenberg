import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import Layout from '../layout';

function EditWidgetsInitializer(_ref) {
  var settings = _ref.settings;
  return createElement(Layout, {
    blockEditorSettings: settings
  });
}

export default EditWidgetsInitializer;
//# sourceMappingURL=index.js.map