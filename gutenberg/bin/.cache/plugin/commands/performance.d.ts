export type WPRawPerformanceResults = {
    /**
     * Load Time.
     */
    load: number[];
    /**
     * DOM Contentloaded time.
     */
    domcontentloaded: number[];
    /**
     * Average type time.
     */
    type: number[];
    /**
     * Average block selection time.
     */
    focus: number[];
};
export type WPPerformanceResults = {
    /**
     * Load Time.
     */
    load: number;
    /**
     * DOM Contentloaded time.
     */
    domcontentloaded: number;
    /**
     * Average type time.
     */
    type: number;
    /**
     * Minium type time.
     */
    minType: number;
    /**
     * Maximum type time.
     */
    maxType: number;
    /**
     * Average block selection time.
     */
    focus: number;
    /**
     * Min block selection time.
     */
    minFocus: number;
    /**
     * Max block selection time.
     */
    maxFocus: number;
};
export type WPFormattedPerformanceResults = {
    /**
     * Load Time.
     */
    load: string;
    /**
     * DOM Contentloaded time.
     */
    domcontentloaded: string;
    /**
     * Average type time.
     */
    type: string;
    /**
     * Minium type time.
     */
    minType: string;
    /**
     * Maximum type time.
     */
    maxType: string;
    /**
     * Average block selection time.
     */
    focus: string;
    /**
     * Min block selection time.
     */
    minFocus: string;
    /**
     * Max block selection time.
     */
    maxFocus: string;
};
/**
 * Runs the performances tests on an array of branches and output the result.
 *
 * @param {string[]} branches Branches to compare
 */
export function runPerformanceTests(branches: string[]): Promise<void>;
