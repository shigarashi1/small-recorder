import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './HomePage.module.scss';

import { TPageProps } from '../../../containers/pages/HomePage';

interface IState {
  state?: boolean;
}

type TProps = TPageProps;

class HomePage extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    const { onSignOut } = this;
    return (
      <div className="sample-page">
        <Typography variant="h4" color="inherit">
          HomePage
        </Typography>
        <button onClick={onSignOut}>Signout</button>
      </div>
    );
  }

  onSignOut = () => {
    this.props.onSignOut();
  };
}

export default HomePage;
