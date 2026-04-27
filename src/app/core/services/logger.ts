import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(info: any) {
    console.log('[LOG]:', info);
  }

  warn(msg: string) {
    console.warn('[WARN]:', msg);
  }
}
