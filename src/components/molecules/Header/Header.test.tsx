import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';

const func = () => {
  console.log('a');
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header onOpen={func} isLoggedIn={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
