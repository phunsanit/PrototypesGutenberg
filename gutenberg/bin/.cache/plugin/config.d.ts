export = config;
/**
 * @typedef WPPluginCLIConfig
 *
 * @property {string} slug Slug.
 * @property {string} name Name.
 * @property {string} team Github Team Name.
 * @property {string} githubRepositoryOwner Github Repository Owner.
 * @property {string} githubRepositoryName Github Repository Name.
 * @property {string} pluginEntryPoint Plugin Entry Point File.
 * @property {string} buildZipCommand Build Plugin ZIP command.
 * @property {string} wpRepositoryReleasesURL WordPress Repository Tags URL.
 * @property {string} gitRepositoryURL Git Repository URL.
 * @property {string} svnRepositoryURL SVN Repository URL.
 */
/**
 * @type {WPPluginCLIConfig}
 */
declare const config: WPPluginCLIConfig;
declare namespace config {
    export { WPPluginCLIConfig };
}
type WPPluginCLIConfig = {
    /**
     * Slug.
     */
    slug: string;
    /**
     * Name.
     */
    name: string;
    /**
     * Github Team Name.
     */
    team: string;
    /**
     * Github Repository Owner.
     */
    githubRepositoryOwner: string;
    /**
     * Github Repository Name.
     */
    githubRepositoryName: string;
    /**
     * Plugin Entry Point File.
     */
    pluginEntryPoint: string;
    /**
     * Build Plugin ZIP command.
     */
    buildZipCommand: string;
    /**
     * WordPress Repository Tags URL.
     */
    wpRepositoryReleasesURL: string;
    /**
     * Git Repository URL.
     */
    gitRepositoryURL: string;
    /**
     * SVN Repository URL.
     */
    svnRepositoryURL: string;
};
