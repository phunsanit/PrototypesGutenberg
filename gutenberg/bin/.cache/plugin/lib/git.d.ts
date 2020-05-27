/**
 * Clones a Github repository.
 *
 * @param {string} repositoryUrl
 *
 * @return {Promise<string>} Repository local Path
 */
export function clone(repositoryUrl: string): Promise<string>;
/**
 * Commits changes to the repository.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 * @param {string} message Commit message.
 * @param {string[]} filesToAdd Files to add.
 *
 * @return {Promise<string>} Commit Hash
 */
export function commit(gitWorkingDirectoryPath: string, message: string, filesToAdd?: string[]): Promise<string>;
/**
 * Checkout a local branch.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 * @param {string} branchName Branch Name
 */
export function checkoutRemoteBranch(gitWorkingDirectoryPath: string, branchName: string): Promise<void>;
/**
 * Creates a local branch.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 * @param {string} branchName Branch Name
 */
export function createLocalBranch(gitWorkingDirectoryPath: string, branchName: string): Promise<void>;
/**
 * Creates a local tag.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 * @param {string} tagName Tag Name
 */
export function createLocalTag(gitWorkingDirectoryPath: string, tagName: string): Promise<void>;
/**
 * Pushes a local branch to the origin.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 * @param {string} branchName Branch Name
 */
export function pushBranchToOrigin(gitWorkingDirectoryPath: string, branchName: string): Promise<void>;
/**
 * Pushes tags to the origin.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 */
export function pushTagsToOrigin(gitWorkingDirectoryPath: string): Promise<void>;
/**
 * Discard local changes.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 */
export function discardLocalChanges(gitWorkingDirectoryPath: string): Promise<void>;
/**
 * Reset local branch against the origin.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 * @param {string} branchName Branch Name
 */
export function resetLocalBranchAgainstOrigin(gitWorkingDirectoryPath: string, branchName: string): Promise<void>;
/**
 * Cherry-picks a commit into master
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 * @param {string} commitHash Branch Name
 */
export function cherrypickCommitIntoBranch(gitWorkingDirectoryPath: string, commitHash: string): Promise<void>;
/**
 * Replaces the local branch's content with the content from another branch.
 *
 * @param {string} gitWorkingDirectoryPath Local repository path.
 * @param {string} sourceBranchName Branch Name
 */
export function replaceContentFromRemoteBranch(gitWorkingDirectoryPath: string, sourceBranchName: string): Promise<void>;
