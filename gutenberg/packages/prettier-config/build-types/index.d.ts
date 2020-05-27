export = config;
/** @typedef {import('prettier').Options} PrettierOptions */
/**
 * @typedef WPPrettierOptions
 *
 * @property {boolean} [parenSpacing=true] Insert spaces inside parentheses.
 */
/** @type {PrettierOptions & WPPrettierOptions} */
declare const config: PrettierOptions & WPPrettierOptions;
declare namespace config {
    export { PrettierOptions, WPPrettierOptions };
}
type PrettierOptions = import("prettier").Options;
type WPPrettierOptions = {
    /**
     * Insert spaces inside parentheses.
     */
    parenSpacing?: boolean;
};
//# sourceMappingURL=index.d.ts.map