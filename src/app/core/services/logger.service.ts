import { Injectable } from '@angular/core';
import { environment } from '@environments';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private readonly enabled = !environment.production;

  log(...args: any[]): void {
    if (this.enabled) console.log(...args);
  }

  debug(...args: any[]): void {
    if (this.enabled) console.debug(...args);
  }

  info(...args: any[]): void {
    if (this.enabled) console.info(...args);
  }

  group(...args: any[]): void {
    if (this.enabled) console.group(...args);
  }

  groupEnd(): void {
    if (this.enabled) console.groupEnd();
  }

  warn(...args: any[]): void {
    console.warn(...args);
  }

  error(...args: any[]): void {
    console.error(...args);
  }
}
