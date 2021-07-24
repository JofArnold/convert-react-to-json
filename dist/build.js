"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const plugin_typescript_1 = __importDefault(require("@rollup/plugin-typescript"));
const babel = __importStar(require("@babel/core"));
const path = __importStar(require("path"));
const rollup = require('rollup');
/**
 * A resolver that ensures wherever this build function is ran it'll work when the target
 * files have relative imports
 * @param input {string} - file path
 */
const resolveRelative = (input) => ({
    resolveId: async (code, id) => {
        const sourceDir = path.dirname(input);
        if (code.match(/^\.\//) &&
            !code.match(/node_modules/) &&
            typeof id === 'string') {
            const unresolvedPath = path.resolve(sourceDir, code);
            // If our file is importing like so `import Foo from "./Foo"` then the value
            // of `code` here is "./Foo" which doesn't have the required file extension.
            // So we use require.resolve to fix this
            const resolvedPath = require.resolve(unresolvedPath);
            return resolvedPath;
        }
        return null;
    },
});
/**
 * Compiles a React JSX module to a single commonjs file and returns it as a string
 * @param options {object} - Rollup
 * @param options.input {string} - the path to the file you wish to transform
 *
 * @returns {string} - code string
 */
async function build(options) {
    const bundle = await rollup.rollup({
        input: options.input,
        cache: false,
        plugins: [
            plugin_node_resolve_1.default({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            }),
            resolveRelative(options.input),
            plugin_commonjs_1.default(),
            plugin_typescript_1.default({
                tsconfig: false,
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
        filename: 'virtual-file.ts',
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        plugins: ['transform-node-env-inline'], // Set process.env
    });
    return commonjs?.code;
}
exports.build = build;
//# sourceMappingURL=build.js.map