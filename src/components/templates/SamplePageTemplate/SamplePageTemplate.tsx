import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './SamplePageTemplate.module.scss';

import SampleAtomsPage from '../../../containers/SampleAtomsPage/SampleAtomsPage';
import SampleMoleculesPage from '../../../containers/SampleMoleculesPage/SampleMoleculesPage';
import SampleOrganismsPage from '../../../containers/SampleOrganismsPage/SampleOrganismsPage';
import SampleDraggablePage from '../../../containers/SampleDraggablePage/SampleDraggablePage';
import PageTitle from '../../atoms/PageTitle/PageTitle';
// import SampleRouter from '../../../sub-routers/SampleRouter';
// import { EPath } from '../../../types';

interface IState {
  tabIndex: number;
}

const LABELS = ['Atoms', 'Molecules', 'Organisms', 'Draggable'];

class SamplePageTemplate extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <div id={styles.root}>
        <div className={styles.title}>
          <PageTitle title="SamplePage" />
        </div>
        <div className={styles.tab}>
          <AppBar position="static">
            <Tabs value={tabIndex} onChange={this.handleChange}>
              {LABELS.map((v, i) => (
                <Tab key={i} label={v} />
              ))}
            </Tabs>
          </AppBar>
        </div>
        <div className={styles.contents}>
          {/* <SampleRouter /> */}
          {this.renderContainer()}
        </div>
      </div>
    );
  }

  renderContainer() {
    const { tabIndex } = this.state;
    switch (tabIndex) {
      case 0:
        return <SampleAtomsPage />;

      case 1:
        return <SampleMoleculesPage />;

      case 2:
        return <SampleOrganismsPage />;

      case 3:
        return <SampleDraggablePage />;

      default:
        return <SampleAtomsPage />;
    }
  }

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ tabIndex: newValue });
  };
}

export default SamplePageTemplate;
