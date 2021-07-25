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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactToJSON = void 0;
const build_1 = require("./build");
const fs = __importStar(require("fs"));
const createElement_1 = require("./createElement");
const vm = require('vm');
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
async function reactToJSON(fullFilePath, reactProps, options) {
    let compiled = await build_1.build({
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
      
react.exports.createElement = ${options?.expandDeep
                ? createElement_1.createElementDeep.toString()
                : createElement_1.createElementShallow.toString()}
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
    const stringifyParams = [evaluated];
    if (options?.prettyPrint) {
        stringifyParams.push(...[null, 2]);
    }
    return JSON.stringify(...stringifyParams);
}
exports.reactToJSON = reactToJSON;
//# sourceMappingURL=reactToJSON.js.map