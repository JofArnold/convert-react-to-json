"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactToJSON = void 0;
const babel = require('@babel/core');
const defaultConfig = require('../babel.config');
const vm = require('vm');
/**
 *
 * @param fullFilePath - full path to the file you wish to transform
 * @param reactProps - the props you wish to pass to you default export'd React component
 * @param options - a configuration object. See docs
 */
const reactToJSON = (fullFilePath, reactProps, options) => {
    var _a;
    const transformed = babel.transformFileSync(fullFilePath, (_a = options === null || options === void 0 ? void 0 : options.babelConfig) !== null && _a !== void 0 ? _a : defaultConfig).code;
    const exportsContext = new Object({});
    const result = vm.runInNewContext(transformed, {
        require: require,
        exports: exportsContext,
    });
    const evaluated = result(reactProps);
    const stringifyParams = [evaluated];
    if (options === null || options === void 0 ? void 0 : options.prettyPrint) {
        stringifyParams.push(...[null, 2]);
    }
    return JSON.stringify(...stringifyParams);
};
exports.reactToJSON = reactToJSON;
//# sourceMappingURL=index.js.map