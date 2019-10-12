import config from '../../configuration/config';

const canLog = (config.isDev && !config.isTest) || config.isTest;
export const Logger = () => (canLog ? console : new MockConsole());

class MockConsole {
  log(...v: any[]): void {
    //
  }
  info(...v: any[]): void {
    //
  }
  warn(...v: any[]): void {
    //
  }
  error(...v: any[]): void {
    //
  }
  debug(...v: any[]): void {
    //
  }
  group(...v: any[]): void {
    //
  }
  groupEnd(...v: any[]): void {
    //
  }
  table(...v: any[]): void {
    //
  }
  dir(...v: any[]): void {
    //
  }
  time(...v: any[]): void {
    //
  }
  timeEnd(...v: any[]): void {
    //
  }
  assert(...v: any[]): void {
    //
  }
  trace(...v: any[]): void {
    //
  }
}

export default Logger;
