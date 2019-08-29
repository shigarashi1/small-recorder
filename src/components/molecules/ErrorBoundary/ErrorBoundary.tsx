import React, { ErrorInfo } from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './ErrorBoundary.module.scss';
import { sendStackTraceToServer } from '../../../helpers/generals/error-handler';
import config from '../../../configuration/config';
import { Button } from '@material-ui/core';

interface IProps {
  error?: Error;
}

interface IState {
  hasError: boolean;
  errorInfo: string;
}

const initialState: IState = {
  hasError: false,
  errorInfo: '',
};

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    sendStackTraceToServer(info.componentStack);
    this.setState({
      hasError: true,
      errorInfo: info.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }

  renderErrorMessage() {
    const { errorInfo } = this.state;
    const details = config.isDev ? errorInfo : '';
    return (
      <div is={styles.container}>
        <Typography variant="h5" gutterBottom={true}>
          Component something went wrong.
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          {details}
        </Typography>
        <Button variant="contained" onClick={this.onClear}>
          Close
        </Button>
      </div>
    );
  }

  onClear = () => {
    this.setState({ ...initialState });
  };
}

export default ErrorBoundary;
