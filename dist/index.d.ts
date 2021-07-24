import { TransformOptions } from '@babel/core';
/**
 *
 * @param fullFilePath - full path to the file you wish to transform
 * @param reactProps - the props you wish to pass to you default export'd React component
 * @param options - a configuration object. See docs
 */
export declare const reactToJSON: (fullFilePath: string, reactProps: unknown, options?: {
    prettyPrint?: boolean | undefined;
    babelConfig?: TransformOptions | undefined;
} | undefined) => string;
