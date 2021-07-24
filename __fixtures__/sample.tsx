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
