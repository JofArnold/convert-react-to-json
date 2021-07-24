import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { Bar } from './Bar';

const JSONComponent = (props: { children: ReactNode }): ReactElement => {
  return (
    <div>
      <span>JSONComponent</span>
      {props.children}
    </div>
  );
};

const App = (props: { array: string[] }): ReactElement => {
  return (
    <JSONComponent>
      {props.array.map((str, i) => (
        <div key={i}>{str}</div>
      ))}
      <Bar text={'Bar'} />
    </JSONComponent>
  );
};

export default App;
