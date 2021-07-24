import { TransformOptions } from '@babel/core';
import { build } from './build';
import * as fs from 'fs';
import { createElementDeep, createElementShallow } from './createElement';

const vm = require('vm');

type ArgsType<T> = T extends (...args: infer U) => any ? U : never;

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
export async function reactToJSON(
  fullFilePath: string,
  reactProps: unknown,
  options?: {
    prettyPrint?: boolean;
    babelConfig?: TransformOptions;
    expandDeep?: boolean;
    logBuildOutput?: boolean;
  }
): Promise<string> {
  let compiled = await build({
    input: fullFilePath,
  });

  const sandbox = {
    require: {},
    exports: {},
    module: {},
  };
  // @TODO - insert this code with Babel or Rollup instead
  compiled =
    compiled +
    `
      
react.exports.createElement = ${
      options?.expandDeep
        ? createElementDeep.toString()
        : createElementShallow.toString()
    }      
var __root = exports.default    
__root; // this is required to be the last statement for vm.runInNewContext
`;
  if (options?.logBuildOutput) {
    fs.writeFileSync('react-to-json.log.js', compiled);
  }
  // Execute the code
  const result = vm.runInNewContext(compiled, sandbox);
  // Execute the returned function - a React component normally
  const evaluated = result(reactProps);

  const stringifyParams: ArgsType<typeof JSON.stringify> = [evaluated];
  if (options?.prettyPrint) {
    stringifyParams.push(...[null, 2]);
  }
  return JSON.stringify(...stringifyParams);
}
