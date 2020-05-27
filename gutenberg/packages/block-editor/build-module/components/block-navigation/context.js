/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@wordpress/element';
export var BlockNavigationContext = createContext({
  __experimentalWithBlockNavigationSlots: false,
  __experimentalWithBlockNavigationBlockSettings: false,
  __experimentalWithBlockNavigationBlockSettingsMinLevel: 0
});
export var useBlockNavigationContext = function useBlockNavigationContext() {
  return useContext(BlockNavigationContext);
};
//# sourceMappingURL=context.js.map