import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import typescriptPlugin from '@rollup/plugin-typescript';
import * as babel from '@babel/core';
import * as path from 'path';
import * as rollup from 'rollup';
import { Plugin } from 'rollup';

/**
 * A resolver that ensures wherever this build function is ran it'll work when the target
 * files have relative imports
 * @param input {string} - file path
 */
function resolveRelative(input: string): Plugin {
  return {
    async resolveId(code: string, id: string | undefined) {
      const sourceDir = path.dirname(input);
      if (
        code.match(/^\.\//) &&
        !code.match(/node_modules/) &&
        typeof id === 'string'
      ) {
        const unresolvedPath = path.resolve(sourceDir, code);
        // If our file is importing like so `import Foo from "./Foo"` then the value
        // of `code` here is "./Foo" which doesn't have the required file extension.
        // So we use require.resolve to fix this
        const resolvedPath = require.resolve(unresolvedPath);
        return resolvedPath;
      }
      return null;
    },
    name: 'resolveRelative',
  };
}

/**
 * Compiles a React JSX module to a single commonjs file and returns it as a string
 * @param options {object} - Rollup
 * @param options.input {string} - the path to the file you wish to transform
 *
 * @returns {string} - code string
 */
export async function build(options: { input: string }): Promise<string> {
  const bundle = await rollup.rollup({
    input: options.input,
    cache: false,
    plugins: [
      resolvePlugin({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      resolveRelative(options.input),
      commonjsPlugin(),
      typescriptPlugin({
        tsconfig: false, // This plugin can be quite temperamental with tsconfigs so we override here
        jsx: 'react',
        esModuleInterop: true,
        module: 'esnext',
      }),
    ],
    output: {},
  });
  const { output } = await bundle.generate({});
  const esnext = output[0].code;
  // Since we're working with CommonJS in node but Rollup required ESNext we transpile again
  const commonjs = babel.transformSync(esnext, {
    filename: 'virtual-file.ts', // Don't need this but helps with debugging
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    plugins: ['transform-node-env-inline'], // Set process.env such that `process.env.FOO` etc doesn't fail in babel
  });
  return commonjs?.code as string;
}
