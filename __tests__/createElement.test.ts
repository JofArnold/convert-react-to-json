import { createElementDeep, createElementShallow } from '../src/createElement';

const react = {
  exports: { createElement: createElementShallow },
};

const Foo = function (props: any) {
  return react.exports.createElement(
    'p',
    null,
    react.exports.createElement('span', null, 'FooComponent'),
    react.exports.createElement('span', null, props.children)
  );
};

const Bar = function (props: any) {
  return react.exports.createElement(
    'p',
    null,
    react.exports.createElement('span', null, 'BarComponent'),
    react.exports.createElement(
      Foo,
      null,
      react.exports.createElement('span', null, props.text)
    )
  );
};

const JSONComponent = function (props: any) {
  return react.exports.createElement(
    'div',
    null,
    react.exports.createElement('span', null, 'JSONComponent'),
    props.children
  );
};

const Root = function (props: any) {
  return react.exports.createElement(
    JSONComponent,
    null,
    props.array.map((str: string, i: number) => {
      return react.exports.createElement(
        'div',
        {
          key: i,
        },
        str
      );
    }),
    react.exports.createElement(Bar, {
      text: 'Bar',
    })
  );
};

test('createElement shallow works', () => {
  react.exports.createElement = createElementShallow;
  expect(
    Root({
      array: ['first', 'second'],
    })
  ).toMatchInlineSnapshot(`
    Object {
      "children": Array [
        Array [
          Object {
            "children": Array [
              "first",
            ],
            "props": Object {
              "key": 0,
            },
            "type": "div",
          },
          Object {
            "children": Array [
              "second",
            ],
            "props": Object {
              "key": 1,
            },
            "type": "div",
          },
        ],
        Object {
          "children": Array [],
          "text": "Bar",
          "type": "Bar",
        },
      ],
      "type": "JSONComponent",
    }
  `);
});

test('createElement deep works', () => {
  react.exports.createElement = createElementDeep;
  expect(
    Root({
      array: ['first', 'second'],
    })
  ).toMatchInlineSnapshot(`
    Object {
      "children": Array [
        Object {
          "children": Array [
            "JSONComponent",
          ],
          "props": null,
          "type": "span",
        },
        Array [
          Array [
            Object {
              "children": Array [
                "first",
              ],
              "props": Object {
                "key": 0,
              },
              "type": "div",
            },
            Object {
              "children": Array [
                "second",
              ],
              "props": Object {
                "key": 1,
              },
              "type": "div",
            },
          ],
          Object {
            "children": Array [
              Object {
                "children": Array [
                  "BarComponent",
                ],
                "props": null,
                "type": "span",
              },
              Object {
                "children": Array [
                  Object {
                    "children": Array [
                      "FooComponent",
                    ],
                    "props": null,
                    "type": "span",
                  },
                  Object {
                    "children": Array [
                      Array [
                        Object {
                          "children": Array [
                            "Bar",
                          ],
                          "props": null,
                          "type": "span",
                        },
                      ],
                    ],
                    "props": null,
                    "type": "span",
                  },
                ],
                "props": null,
                "type": "p",
              },
            ],
            "props": null,
            "type": "p",
          },
        ],
      ],
      "props": null,
      "type": "div",
    }
  `);
});
