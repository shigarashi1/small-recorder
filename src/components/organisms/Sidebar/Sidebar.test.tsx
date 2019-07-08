import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

const testfunc = () => {
  console.log('a');
};

test('renders without crashing', () => {
  mount(
    <MemoryRouter initialEntries={['/']}>
      <Sidebar hasOpen={true} onOpenClose={testfunc} />
    </MemoryRouter>,
  );
});
