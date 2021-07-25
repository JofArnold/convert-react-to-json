# convert-react-to-json

## Outline

Converts simple stateless React components to a JSON representation.

A typical use case might be where you need to define some tree in a CMS in JSON which is then rendered on a client using some pre-defined components

![](./docs/example.png)


## Installation

```
yarn add "react-to-json"
# or
npm i "react-to-json"
```

## How to use

reactToJSON has two modes, switched with the option `expandDeep`:

1. Simply renders your JSX to a JSON string almost verbatim without expanding all the components
2. Imports all components and expands them to their DOM primitives

So if you wish to deep render your App.tsx as JSON you might do something like

```typescript
const json = await reactToJSON("App.tsx", {expandDeep: true})
```

## Detailed Example

Say you want to convert the classic Create React App `App.tsx` (minus a few bits for clarity) to JSON:

```typescript
// App.tsx

import * as React from "react"

function App({ path }) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>{path}</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App; // <--- Note: you MUST have a default export
```

To do this call `reactToJSON` with the path to your file along with any props you wish to send to the default-export'd component and any compile options you may require:

```typescript
// compile.js

const { reactToJSON } = require("react-to-json")
const path = require("path")

const convert = async () => {
  const src = path.resolve(__dirname, './src/App.tsx');
  const output = await reactToJSON(
    src, // Location of file to convert
    { path: "src/App.js"}, // Optional react props sent to the default export },
    { prettyPrint: true } // Options
  );
  return output;
}

```

Either call this function in your code or, for use in the terminal, add `(async () => await convert())();` then run like to:

```
NODE_ENV=development node compile.js 
```

This would give the output

```json
{
  "type": "header",
  "props": {
    "className": "App-header"
  },
  "children": [
    {
      "type": "p",
      "props": null,
      "children": [
        "Edit ",
        {
          "type": "code",
          "props": null,
          "children": [
            "src/App.js"
          ]
        },
        " and save to reload."
      ]
    }
  ]
}
```

## Paramters

```typescript
reactToJSON(pathToSource: string, eactComponentProps?: any, options: ReactToJSONOptions)
```

### ReactToJSONOptions

- `prettyPrint: Boolean`
  - Default `false`
  - Set to `true` if you want to pretty print the JSON output (i.e. with new lines and indenting with 2 spaces). Defaults to `false`.
- `babelConfig: TransformOptions`
  - The configuration object for the transform. If not set it uses the default version which is a fairly typical default for most React projects.
- `expandDeep: Boolean`
  - Default `false`  
  - If set to `true`, the React tree is fully-expanded to primitives as far as it can go.
- `logBuildOutput: Boolean`
  - Outputs a log of the Rollup build.

## Limitations

- Must define the path with a string as opposed to using, for instance, `require`.
- You must import React in that file (even though in React 17.0 you don't need that).
- At least one of the files you are consuming needs to be TypeScript due to an issue with Rollup's TypeScript plugin I haven't figured out yet.
- Only works with `export default` for now; no named exports.
- Only works with DOM currently and therefore not React Native (probably - not checked).
- No error handling.
- No cache optimisations (although for most expected use cases it's fast)
