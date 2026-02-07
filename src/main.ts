import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { VERSION, getFullVersion } from '@environments';

// Log versione al bootstrap
console.log(
  `%c GovPay Portal %c ${getFullVersion()} %c`,
  'background:#0066cc;color:#fff;padding:4px 8px;border-radius:4px 0 0 4px;',
  'background:#17324d;color:#fff;padding:4px 8px;border-radius:0 4px 4px 0;',
  ''
);
console.log(`Branch: ${VERSION.gitBranch} | Commit: ${VERSION.gitHashFull}`);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
