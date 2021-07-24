import * as React from 'react';
import { ReactElement } from 'react';
import { Foo } from './Foo';

export const Bar = (props: { text: string }): ReactElement => (
  <p>
    <span>BarComponent</span>
    <Foo>
      <span>{props.text}</span>
    </Foo>
  </p>
);
