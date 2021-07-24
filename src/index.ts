import { TransformOptions } from '@babel/core';

const babel = require('@babel/core');
const defaultConfig = require('../babel.config');
const vm = require('vm');

type ArgsType<T> = T extends (...args: infer U) => any ? U : never;

/**
 *
 * @param fullFilePath - full path to the file you wish to transform
 * @param reactProps - the props you wish to pass to you default export'd React component
 * @param options - a configuration object. See docs
 */
export const reactToJSON = (
  fullFilePath: string,
  reactProps: unknown,
  options?: { prettyPrint?: boolean; babelConfig?: TransformOptions }
): string => {
  const transformed = babel.transformFileSync(
    fullFilePath,
    options?.babelConfig ?? defaultConfig
  ).code;
  const exportsContext = new Object({});
  const result = vm.runInNewContext(transformed, {
    require: require,
    exports: exportsContext,
  });
  const evaluated = result(reactProps);
  const stringifyParams: ArgsType<typeof JSON.stringify> = [evaluated];
  if (options?.prettyPrint) {
    stringifyParams.push(...[null, 2]);
  }
  return JSON.stringify(...stringifyParams);
};
