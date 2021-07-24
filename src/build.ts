import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import typescriptPlugin from '@rollup/plugin-typescript';
import * as babel from '@babel/core';
const rollup = require('rollup');

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
  const { output } = await bundle.generate(options);
  const esnext = output[0].code;
  // Since we're working with CommonJS in node but Rollup required ESNext we transpile again
  const commonjs = babel.transformSync(esnext, {
    filename: 'virtual-file.ts', //
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    plugins: ['transform-node-env-inline'], // Set process.env
  });
  return commonjs?.code as string;
}
