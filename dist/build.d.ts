/**
 * Compiles a React JSX module to a single commonjs file and returns it as a string
 * @param options {object} - Rollup
 * @param options.input {string} - the path to the file you wish to transform
 *
 * @returns {string} - code string
 */
export declare function build(options: {
    input: string;
}): Promise<string>;
