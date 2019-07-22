import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from '../containers/pages/HomePage/HomePage';
import ManualPage from '../containers/pages/ManualPage/ManualPage';
import RecordPage from '../containers/pages/RecordPage/RecordPage';
import ReportPage from '../containers/pages/ReportPage/ReportPage';
import SearchPage from '../containers/pages/SearchPage/SearchPage';
import SettingPage from '../containers/pages/SettingPage/SettingPage';
import SamplePageTemplate from './templates/SamplePageTemplate/SamplePageTemplate';
import { EPath } from '../types/index';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path={EPath.Home} component={HomePage} />
        <Route exact={true} path={EPath.Manual} component={ManualPage} />
        <Route exact={true} path={EPath.Record} component={RecordPage} />
        <Route exact={true} path={EPath.Report} component={ReportPage} />
        <Route exact={true} path={EPath.Search} component={SearchPage} />
        <Route exact={true} path={EPath.Setting} component={SettingPage} />
        <Route exact={true} path={EPath.Sample} component={SamplePageTemplate} />
        <Redirect from="/" to={EPath.Home} />
      </Switch>
    );
  }
}

export default AppRouter;
