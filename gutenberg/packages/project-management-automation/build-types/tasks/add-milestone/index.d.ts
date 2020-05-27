export = addMilestone;
/**
 * Assigns the correct milestone to PRs once merged.
 *
 * @param {WebhookPayloadPush} payload Push event payload.
 * @param {GitHub}             octokit Initialized Octokit REST client.
 */
declare function addMilestone(payload: import("@octokit/webhooks").WebhookPayloadPush, octokit: import("@actions/github").GitHub): Promise<void>;
declare namespace addMilestone {
    export { HookError, GitHub, WebhookPayloadPush, OktokitIssuesListMilestonesForRepoResponseItem };
}
type HookError = Error & {
    status: number;
    headers: {
        [header: string]: string;
    };
    documentation_url?: string | undefined;
    errors?: [{
        resource: string;
        field: string;
        code: string;
    }] | undefined;
};
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
type OktokitIssuesListMilestonesForRepoResponseItem = {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    state: string;
    title: string;
    description: string;
    creator: import("@octokit/rest").IssuesListMilestonesForRepoResponseItemCreator;
    open_issues: number;
    closed_issues: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    due_on: string;
};
//# sourceMappingURL=index.d.ts.map