import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import styles from './LoginPage.module.scss';

import { TPageProps } from '../../../containers/pages/LoginPage';
import { BREAK_POINT } from '../../../lookups/page-layout';
import { TSignUp } from '../../../store-observable/auth/action-reducers';

type TProps = TPageProps;

type TPageState = TSignUp & {
  isSignIn: boolean;
};

const initialState: TPageState = {
  isSignIn: true,
  username: '',
  email: '',
  password: '',
  confirmation: '',
};

const LABEL = {
  signIn: 'sign in',
  signUp: 'sign up',
};

const LoginPage: React.FC<TProps> = props => {
  const [pageState, setPageState] = useState(initialState);

  const onCancel = () => {
    setPageState({ ...initialState });
  };

  // tab
  const tabIndex = pageState.isSignIn ? 0 : 1;
  const onChangeTab = () => {
    setPageState({ ...pageState, isSignIn: !pageState.isSignIn });
  };

  // button
  const onSignInUp = () => {
    const { isSignIn, username, email, password, confirmation } = pageState;
    if (isSignIn) {
      props.onSignIn({ email, password });
    } else {
      props.onSignUp({ email, password, username, confirmation });
    }
  };

  // form
  const onChangeValue = (key: keyof TSignUp) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setPageState({ ...pageState, [key]: value });
  };

  return (
    <div id={styles.container} style={{ height: window.innerHeight }}>
      <Grid container={true} spacing={2} alignContent="space-around" justify="center">
        <Grid item={true} xs={11} sm={8} md={BREAK_POINT.sm} lg={BREAK_POINT.sm} xl={BREAK_POINT.md}>
          <Card className={styles.card}>
            <CardHeader className={styles.header} title="Small Recorder" />
            <CardContent className={styles.card}>
              <div className={styles.tab}>
                <AppBar position="static">
                  <Tabs value={tabIndex} onChange={onChangeTab} variant="fullWidth">
                    {[LABEL.signIn, LABEL.signUp].map((v, i) => (
                      <Tab key={i} label={v} />
                    ))}
                  </Tabs>
                </AppBar>
              </div>
              <div className={styles.form}>
                {Object.keys(pageState)
                  .filter(v => v !== 'isSignIn')
                  .map(k => k as keyof TSignUp)
                  .map((key, i) =>
                    pageState.isSignIn && ['username', 'confirmation'].includes(key) ? null : (
                      <TextField
                        className={styles.text}
                        key={i}
                        label={key}
                        value={pageState[key]}
                        onChange={onChangeValue(key)}
                        type={['password', 'confirmation'].includes(key) ? 'password' : undefined}
                      />
                    ),
                  )}
              </div>
            </CardContent>
            <CardActions className={styles.action}>
              <Button onClick={onCancel} variant="contained">
                clear
              </Button>
              <Button onClick={onSignInUp} variant="contained" color="primary">
                {pageState.isSignIn ? LABEL.signIn : LABEL.signUp}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
