export = firstTimeContributor;
/**
 * Adds the 'First Time Contributor' label to PRs merged on behalf of
 * contributors that have not yet made a commit, and prompts the user to link
 * their GitHub account to their WordPress.org profile if neccessary for props
 * credit.
 *
 * @param {WebhookPayloadPush} payload Push event payload.
 * @param {GitHub}             octokit Initialized Octokit REST client.
 */
declare function firstTimeContributor(payload: import("@octokit/webhooks").WebhookPayloadPush, octokit: import("@actions/github").GitHub): Promise<void>;
declare namespace firstTimeContributor {
    export { GitHub, WebhookPayloadPush, WebhookPayloadPushCommit };
}
type GitHub = import("@actions/github").GitHub;
type WebhookPayloadPush = {
    ref: string;
    before: string;
    after: string;
    created: boolean;
    deleted: boolean;
    forced: boolean;
    base_ref: null;
    compare: string;
    commits: any[];
    head_commit: null;
    repository: import("@octokit/webhooks").PayloadRepository;
    pusher: import("@octokit/webhooks").WebhookPayloadPushPusher;
    sender: import("@octokit/webhooks").WebhookPayloadPushSender;
};
type WebhookPayloadPushCommit = {
    [x: string]: any;
};
//# sourceMappingURL=index.d.ts.map