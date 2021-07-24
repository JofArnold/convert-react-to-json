import path from 'path';
import { build } from '../src/build';
const src = path.resolve(__dirname, '../__fixtures__/simpleTSImport.ts');

test('rollup', async () => {
  const code = await build({
    input: src,
  });

  expect(code).toMatchInlineSnapshot(`
    "\\"use strict\\";

    Object.defineProperty(exports, \\"__esModule\\", {
      value: true
    });
    exports.simpleTSImport = void 0;

    var simpleTSExport = function () {
      return 'asdasd';
    };

    var simpleTSImport = simpleTSExport();
    exports.simpleTSImport = simpleTSImport;"
  `);
});
