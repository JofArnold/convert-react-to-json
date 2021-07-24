# react-to-json

## Outline

Converts simple stateless React components to a JSON representation.

A typical use case might be where you need to define some components in a CMS which are then rendered on a client.


## Installation

```
yarn add "react-to-json"
```

## How to use

Create your React component and make it the default export (technically this can handle exports that aren't default but it can be confusing when it goes wrong so stick to defaults)


```typescript
// Foo.tsx

import * as React from 'react';
import { ReactElement, ReactNode } from 'react';

const Component = (props: { children: ReactNode }): ReactElement => {
  return <div>{props.children}</div>;
};

const Foo = (props: { array: string[] }): ReactElement => {
  return (
    <Component>
      {props.array.map((str, i) => (
        <div key={i}>{str}</div>
      ))}
    </Component>
  );
};

export default Foo;
```

Then call `reactToJSON` with the path to your file along with the props you wish to send to the default-export'd component and any compile options you may require:

```
// compile.js
const { reactToJSON } = require(;react-to-json');
const path = require('path');

const src = path.resolve(__dirname, './Foo.tsx');
const output = reactToJSON(
  src,
  {
    array: ['one', 'two'],
  },
  {
    prettyPrint: true,
  }
);
```

Then run in the cli like so

```
NODE_ENV=development node compile.js 
```

Gives:

```json
{
  "key": null,
  "ref": null,
  "props": {
    "children": [
      {
        "type": "div",
        "key": "0",
        "ref": null,
        "props": {
          "children": "one"
        },
        "_owner": null,
        "_store": {}
      },
      {
        "type": "div",
        "key": "1",
        "ref": null,
        "props": {
          "children": "two"
        },
        "_owner": null,
        "_store": {}
      }
    ]
  },
  "_owner": null,
  "_store": {}
}
```

## Options

- `prettyPrint: Boolean`
  - Set to `true` if you want to pretty print the JSON output (i.e. with new lines and indenting. Defaults to `false`
- `babelConfig: TransformOptions`
  - The configuration object for the transform. If not set it uses the default version which is a fairly typical default for most React projects


## Limitations


- No named exports allowed
- No error handling
- Must define the path with a string as opposed to using, for instance, `require`
- You must important React in that file (even though 