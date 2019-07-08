import React from 'react';
import ReactDOM from 'react-dom';

import HeaderTitle from './HeaderTitle';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderTitle title={'a'} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
