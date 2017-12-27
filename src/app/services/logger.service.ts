import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

export abstract class Logger {

  debug: any;
  info: any;
  warn: any;
  error: any;
}

export let isDebugMode = true;
const noop = (): any => undefined;

@Injectable()
export class LoggerService extends Logger {

  get debug() {
    if (isDebugMode) {
      return console.debug.bind(console);
    } else {
      return noop;
    }
  }

  get info() {
    if (isDebugMode) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (isDebugMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error() {
    if (isDebugMode) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

  invokeConsoleMethod(type: string, args?: any): void {
    const logFn: Function = (console)[type] || console.log || noop;
    logFn.apply(console, [args]);
  }

}
