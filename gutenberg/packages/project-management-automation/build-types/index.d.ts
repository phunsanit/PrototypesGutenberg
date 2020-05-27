export type GitHub = import("@actions/github").GitHub;
/**
 * Automation task function.
 */
export type WPAutomationTask = (payload: any, octokit: import("@actions/github").GitHub) => void;
/**
 * Full list of automations, matched by given properties against the incoming
 * payload object.
 */
export type WPAutomation = {
    /**
     * Webhook event name to match.
     */
    event: string;
    /**
     * Action to match, if applicable.
     */
    action?: string;
    /**
     * Task to run.
     */
    task: (payload: any, octokit: import("@actions/github").GitHub) => void;
};
//# sourceMappingURL=index.d.ts.map