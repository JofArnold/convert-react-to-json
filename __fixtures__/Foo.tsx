import * as React from 'react';
import { ReactElement, ReactNode } from 'react';

export const Foo = (props: { children: ReactNode }): ReactElement => (
  <p>
    <span>FooComponent</span>
    <span>{props.children}</span>
  </p>
);
