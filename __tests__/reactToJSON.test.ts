import { reactToJSON } from '../src';
const path = require('path');

const src = path.resolve(__dirname, 'JSONComponent.tsx');

test('reactToJSON correctly generates JSON', async () => {
  const output = await reactToJSON(src, {
    array: ['one', 'two'],
  });

  expect(output).toMatchInlineSnapshot(
    `"{\\"key\\":null,\\"props\\":{\\"children\\":[[{\\"type\\":\\"div\\",\\"key\\":\\"0\\",\\"props\\":{\\"children\\":\\"one\\"}},{\\"type\\":\\"div\\",\\"key\\":\\"1\\",\\"props\\":{\\"children\\":\\"two\\"}}],{\\"key\\":null,\\"props\\":{\\"text\\":\\"Bar\\"}}]}}"`
  );
});

test('reactToJSON correctly generates JSON with pretty print', async () => {
  const output = await reactToJSON(
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
          [
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
          ],
          {
            \\"key\\": null,
            \\"ref\\": null,
            \\"props\\": {
              \\"text\\": \\"Bar\\"
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

test('reactToJSON correctly generates JSON with pretty print, deep', async () => {
  const output = await reactToJSON(
    src,
    {
      array: ['one', 'two'],
    },
    {
      prettyPrint: true,
      expandDeep: true,
    }
  );

  expect(output).toMatchInlineSnapshot();
});
