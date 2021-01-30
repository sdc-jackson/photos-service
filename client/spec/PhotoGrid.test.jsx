import React from 'react';
import ReactDOM from 'react-dom';
import PhotoGrid from '../src/component/PhotoGrid.jsx';

test('Renders the -Show All Photos- button', () => {
  const root = document.createElement('div');
  ReactDOM.render(<PhotoGrid />, root);

  expect(root.querySelector('button').textContent).toBe('Show All Photos');
});
