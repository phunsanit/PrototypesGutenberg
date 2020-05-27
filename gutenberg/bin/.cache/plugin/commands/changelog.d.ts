export type GitHub = import("@octokit/rest");
export type IssuesListForRepoResponseItem = {
    id: number;
    node_id: string;
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    number: number;
    state: string;
    title: string;
    body: string;
    user: import("@octokit/rest").IssuesListForRepoResponseItemUser;
    labels: import("@octokit/rest").IssuesListForRepoResponseItemLabelsItem[];
    assignee: import("@octokit/rest").IssuesListForRepoResponseItemAssignee;
    assignees: import("@octokit/rest").IssuesListForRepoResponseItemAssigneesItem[];
    milestone: import("@octokit/rest").IssuesListForRepoResponseItemMilestone;
    locked: boolean;
    active_lock_reason: string;
    comments: number;
    pull_request: import("@octokit/rest").IssuesListForRepoResponseItemPullRequest;
    closed_at: null;
    created_at: string;
    updated_at: string;
};
export type OktokitIssuesListMilestonesForRepoResponseItem = {
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
export type WPChangelogCommandOptions = {
    /**
     * Optional Milestone title.
     */
    milestone?: string | undefined;
    /**
     * Optional personal access token.
     */
    token?: string | undefined;
};
export type WPChangelogSettings = {
    /**
     * Repository owner.
     */
    owner: string;
    /**
     * Repository name.
     */
    repo: string;
    /**
     * Optional personal access token.
     */
    token?: string | undefined;
    /**
     * Milestone title.
     */
    milestone: string;
};
/**
 * Changelog normalization function, returning a string to use as title, or
 * undefined if entry should be omitted.
 */
export type WPChangelogNormalization = (text: string, issue: import("@octokit/rest").IssuesListForRepoResponseItem) => string | undefined;
