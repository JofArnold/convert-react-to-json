import { reactToJSON } from '../src';
const path = require('path');

const src = path.resolve(__dirname, '../__fixtures__/sample.tsx');

test('runner correctly generates JSON', () => {
  const output = reactToJSON(src, {
    array: ['one', 'two'],
  });

  expect(output).toMatchInlineSnapshot(
    `"{\\"key\\":null,\\"ref\\":null,\\"props\\":{\\"children\\":[{\\"type\\":\\"div\\",\\"key\\":\\"0\\",\\"ref\\":null,\\"props\\":{\\"children\\":\\"one\\"},\\"_owner\\":null,\\"_store\\":{}},{\\"type\\":\\"div\\",\\"key\\":\\"1\\",\\"ref\\":null,\\"props\\":{\\"children\\":\\"two\\"},\\"_owner\\":null,\\"_store\\":{}}]},\\"_owner\\":null,\\"_store\\":{}}"`
  );
});

test('runner correctly generates JSON with pretty print', () => {
  const output = reactToJSON(
    src,
    {
      array: ['one', 'two'],
    },
    {
      prettyPrint: true,
    }
  );

  expect(output).toMatchInlineSnapshot(`
    "{
      \\"key\\": null,
      \\"ref\\": null,
      \\"props\\": {
        \\"children\\": [
          {
            \\"type\\": \\"div\\",
            \\"key\\": \\"0\\",
            \\"ref\\": null,
            \\"props\\": {
              \\"children\\": \\"one\\"
            },
            \\"_owner\\": null,
            \\"_store\\": {}
          },
          {
            \\"type\\": \\"div\\",
            \\"key\\": \\"1\\",
            \\"ref\\": null,
            \\"props\\": {
              \\"children\\": \\"two\\"
            },
            \\"_owner\\": null,
            \\"_store\\": {}
          }
        ]
      },
      \\"_owner\\": null,
      \\"_store\\": {}
    }"
  `);
});
