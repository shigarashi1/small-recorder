import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../store';
import AppRouter from './AppRouter';

import SampleAtomsPageContainer from '../containers/pages/samples/SampleAtomsPage';
import SampleAtomsPage from '../components/pages/SampleAtomsPage/SampleAtomsPage';
import { EPath } from '../types';

const store = configureStore({});

describe('Routes', () => {
  test('Sample Container', () => {
    const appWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[EPath.SampleAtoms]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );
    expect(appWrapper.find(SampleAtomsPageContainer)).toHaveLength(1);
  });

  test('Sample Page', () => {
    const appWrapper = mount(
      <MemoryRouter initialEntries={[EPath.SampleAtoms]}>
        <AppRouter />
      </MemoryRouter>,
    );
    expect(appWrapper.find(SampleAtomsPage)).toHaveLength(1);
  });
});
