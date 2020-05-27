export = ifNotFork;
/** @typedef {import('.').WPAutomationTask} WPAutomationTask */
/**
 * Higher-order function which executes and returns the result of the given
 * handler only if the enhanced function is called with a payload indicating a
 * pull request event which did not originate from a forked repository.
 *
 * @param {WPAutomationTask} handler Original task.
 *
 * @return {WPAutomationTask} Enhanced task.
 */
declare function ifNotFork(handler: (payload: any, octokit: import("@actions/github").GitHub) => void): (payload: any, octokit: import("@actions/github").GitHub) => void;
declare namespace ifNotFork {
    export { WPAutomationTask };
}
type WPAutomationTask = (payload: any, octokit: import("@actions/github").GitHub) => void;
//# sourceMappingURL=if-not-fork.d.ts.map