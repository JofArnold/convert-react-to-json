import { reactToJSON } from '../src';
const path = require('path');

const src = path.resolve(__dirname, '../__fixtures__/JSONComponent.tsx');

test('reactToJSON correctly generates JSON', async () => {
  const output = await reactToJSON(src, {
    array: ['one', 'two'],
  });

  expect(output).toMatchInlineSnapshot(
    `"{\\"type\\":\\"JSONComponent\\",\\"children\\":[[{\\"type\\":\\"div\\",\\"props\\":{\\"key\\":0},\\"children\\":[\\"one\\"]},{\\"type\\":\\"div\\",\\"props\\":{\\"key\\":1},\\"children\\":[\\"two\\"]}],{\\"type\\":\\"Bar\\",\\"text\\":\\"Bar\\",\\"children\\":[]}]}"`
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
      \\"type\\": \\"JSONComponent\\",
      \\"children\\": [
        [
          {
            \\"type\\": \\"div\\",
            \\"props\\": {
              \\"key\\": 0
            },
            \\"children\\": [
              \\"one\\"
            ]
          },
          {
            \\"type\\": \\"div\\",
            \\"props\\": {
              \\"key\\": 1
            },
            \\"children\\": [
              \\"two\\"
            ]
          }
        ],
        {
          \\"type\\": \\"Bar\\",
          \\"text\\": \\"Bar\\",
          \\"children\\": []
        }
      ]
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

  expect(output).toMatchInlineSnapshot(`
    "{
      \\"type\\": \\"div\\",
      \\"props\\": null,
      \\"children\\": [
        {
          \\"type\\": \\"span\\",
          \\"props\\": null,
          \\"children\\": [
            \\"JSONComponent\\"
          ]
        },
        [
          [
            {
              \\"type\\": \\"div\\",
              \\"props\\": {
                \\"key\\": 0
              },
              \\"children\\": [
                \\"one\\"
              ]
            },
            {
              \\"type\\": \\"div\\",
              \\"props\\": {
                \\"key\\": 1
              },
              \\"children\\": [
                \\"two\\"
              ]
            }
          ],
          {
            \\"type\\": \\"p\\",
            \\"props\\": null,
            \\"children\\": [
              {
                \\"type\\": \\"span\\",
                \\"props\\": null,
                \\"children\\": [
                  \\"BarComponent\\"
                ]
              },
              {
                \\"type\\": \\"p\\",
                \\"props\\": null,
                \\"children\\": [
                  {
                    \\"type\\": \\"span\\",
                    \\"props\\": null,
                    \\"children\\": [
                      \\"FooComponent\\"
                    ]
                  },
                  {
                    \\"type\\": \\"span\\",
                    \\"props\\": null,
                    \\"children\\": [
                      [
                        {
                          \\"type\\": \\"span\\",
                          \\"props\\": null,
                          \\"children\\": [
                            \\"Bar\\"
                          ]
                        }
                      ]
                    ]
                  }
                ]
              }
            ]
          }
        ]
      ]
    }"
  `);
});
