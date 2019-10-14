import config from '../../configuration/config';

const canLog = (): boolean => config.isDev || config.isTest;

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

export const Logger = canLog() ? console : new MockConsole();

export default Logger;
