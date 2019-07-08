import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../store';
import AppRouter from './AppRouter';

import SamplePageContainer from '../containers/SamplePage/SamplePage';
import SamplePage from './pages/SamplePage/SamplePage';
import { EPath } from '../types';

const store = configureStore({});

describe('Routes', () => {
  test('Sample Container', () => {
    const appWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[EPath.Sample]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );
    expect(appWrapper.find(SamplePageContainer)).toHaveLength(1);
  });

  test('Sample Page', () => {
    const appWrapper = mount(
      <MemoryRouter initialEntries={[EPath.Sample]}>
        <AppRouter />
      </MemoryRouter>,
    );
    expect(appWrapper.find(SamplePage)).toHaveLength(1);
  });
});
