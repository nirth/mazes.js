import React from 'react';
import {render} from 'react-dom';

import {Button} from './button';
import {Styleguide, SimpleItem} from './styleguide';

import './resets.styl';

const createStyleguide = () => (
  <Styleguide title="Sparky">
    <SimpleItem title="Button">
      <example title="Simple Button">
        <description>Simple button example using default skin</description>
        <code>{'<Button title="Click me!" />'}</code>
        <content>
          <Button title="Click Me!" />
        </content>
      </example>
      <example title="Simple Icon Button">
        <description>Simple button example using default skin with icon</description>
        <code>{'<Button title="Click me (I don‘t have an icon btw)!" />'}</code>
        <content>
          <Button title="Click me (I don‘t have an icon btw)!" />
        </content>
      </example>
    </SimpleItem>
  </Styleguide>
);

const startApp = (element) => {
  const container = document.getElementById(element);

  if (container) {
    render(createStyleguide(), container);
  } else {
    /* eslint-disable no-console */
    console.warn('main.js is unable to find application container.');
    console.warn('If you are running production or development app then worry');
    console.warn('If this is components, styleguide or storybook this behavior is expected');
    /* eslint-enable no-console */
  }
};

startApp('style-guide');
