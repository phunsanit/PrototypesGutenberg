export = assignFixedIssues;
/** @typedef {import('@actions/github').GitHub} GitHub */
/** @typedef {import('@octokit/webhooks').WebhookPayloadPullRequest} WebhookPayloadPullRequest */
/**
 * Assigns any issues 'fixed' by a newly opened PR to the author of that PR.
 *
 * @param {WebhookPayloadPullRequest} payload Pull request event payload.
 * @param {GitHub}                    octokit Initialized Octokit REST client.
 */
declare function assignFixedIssues(payload: import("@octokit/webhooks").WebhookPayloadPullRequest, octokit: import("@actions/github").GitHub): Promise<void>;
declare namespace assignFixedIssues {
    export { GitHub, WebhookPayloadPullRequest };
}
type GitHub = import("@actions/github").GitHub;
type WebhookPayloadPullRequest = {
    action: string;
    number: number;
    pull_request: import("@octokit/webhooks").WebhookPayloadPullRequestPullRequest;
    repository: import("@octokit/webhooks").PayloadRepository;
    sender: import("@octokit/webhooks").WebhookPayloadPullRequestSender;
};
//# sourceMappingURL=index.d.ts.map