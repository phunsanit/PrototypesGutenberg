/**
 * Asks the user for a confirmation to continue or abort otherwise.
 *
 * @param {string} message      Confirmation message.
 * @param {boolean} isDefault   Default reply.
 * @param {string} abortMessage Abort message.
 */
export function askForConfirmation(message: string, isDefault?: boolean, abortMessage?: string): Promise<void>;
/**
 * Common logic wrapping a step in the process.
 *
 * @param {string} name         Step name.
 * @param {string} abortMessage Abort message.
 * @param {Function} handler    Step logic.
 */
export function runStep(name: string, abortMessage: string, handler: Function): Promise<void>;
/**
 * Small utility used to read an uncached version of a JSON file
 *
 * @param {string} fileName
 */
export function readJSONFile(fileName: string): any;
/**
 * Utility to run a child script
 *
 * @param {string} script Script to run.
 * @param {string=} cwd   Working directory.
 */
export function runShellScript(script: string, cwd?: string | undefined): void;
/**
 * Generates a random temporary path in the OS's tmp dir.
 *
 * @return {string} Temporary Path.
 */
export function getRandomTemporaryPath(): string;
