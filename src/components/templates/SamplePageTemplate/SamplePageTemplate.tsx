import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './SamplePageTemplate.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import SampleRouter from '../../../routers/sub/SampleRouter';
import { EPath } from '../../../types';

interface IState {
  tabIndex: number;
}

const LABELS = ['Atoms', 'Molecules', 'Organisms', 'Draggable'];

type TProps = RouteComponentProps;

class SamplePageTemplate extends Component<TProps, IState> {
  constructor(props: TProps) {
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
          <SampleRouter />
          {/* {this.renderContainer()} */}
        </div>
      </div>
    );
  }

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const { tabIndex } = this.state;
    const { history } = this.props;
    if (tabIndex === newValue) {
      return;
    }

    switch (newValue) {
      case 0:
        history.push(EPath.SampleAtoms);
        break;
      case 1:
        history.push(EPath.SampleMolecules);
        break;
      case 2:
        history.push(EPath.SampleOrganisms);
        break;
      case 3:
        history.push(EPath.SampleDraggable);
        break;
      default:
        history.push(EPath.SampleAtoms);
        break;
    }
    this.setState({ tabIndex: newValue });
  };
}

export default withRouter(SamplePageTemplate);
