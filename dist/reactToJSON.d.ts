import { TransformOptions } from '@babel/core';
/**
 * Builds a JSON representation of a React JSX file.
 *
 * @param fullFilePath {string} - full path to the file you wish to transform
 * @param reactProps {object} - the props you wish to pass to you default export'd React component
 * @param options
 * @param options.prettyPrint {boolean} - pretty prints the JSON output with line breaks and 2 spaces indentation
 * @param options.babelConfig {boolean} - a custom babel config. Falls back to using the inbuilt one otherwise
 * @param options.expandDeep {boolean} - recursively walks through all imported components until it gets to the JSDOM primitives
 * @param options.logBuildOutput {boolean} - logs the built code to react-to-json.log.js
 *
 * @returns {string} - the stringified result
 */
export declare function reactToJSON(fullFilePath: string, reactProps: unknown, options?: {
    prettyPrint?: boolean;
    babelConfig?: TransformOptions;
    expandDeep?: boolean;
    logBuildOutput?: boolean;
}): Promise<string>;
