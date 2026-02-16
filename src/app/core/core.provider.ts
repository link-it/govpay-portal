/*
 * GovPay Portal - Portale di pagamento pagoPA
 * https://github.com/link-it/govpay-portal
 *
 * Copyright (c) 2026 Link.it srl (https://link.it).
 *
 * Licensed under the EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom, of, catchError } from 'rxjs';
import { ConfigService } from './config';
import { LoggerService } from './services/logger.service';
import { FontLoaderService } from './services/font-loader.service';
import { ThemeLoaderService } from './services/theme-loader.service';
import { RecaptchaService } from './services/recaptcha.service';
import { MockGovPayApiService, RealGovPayApiService } from './services/api';
import { spidHeadersInterceptor } from './interceptors';

/**
 * Provider per il modulo Core.
 * Include:
 * - HttpClient
 * - ConfigService con provideAppInitializer
 * - GovPayApiService (mock e reale, selezione via GovPayApiProxyService)
 * - Interceptors
 */
export function provideCore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(
      withInterceptors([
        spidHeadersInterceptor,
      ])
    ),
    // Servizi API - entrambi disponibili, la selezione avviene runtime via GovPayApiProxyService
    MockGovPayApiService,
    RealGovPayApiService,
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      const fontLoader = inject(FontLoaderService);
      const themeLoader = inject(ThemeLoaderService);
      const realApiService = inject(RealGovPayApiService);
      const recaptchaService = inject(RecaptchaService);
      const http = inject(HttpClient);
      const logger = inject(LoggerService);

      await configService.load();
      // Applica il tema e carica i font dopo il caricamento della config
      themeLoader.applyTheme(configService.theme());
      fontLoader.loadFonts(configService.theme().fonts);

      // Configura il servizio API reale con i parametri da config
      const apiConfig = configService.api();
      realApiService.configure({
        baseUrl: apiConfig.baseUrl || 'https://lab.link.it/govpay-api-portal/v1',
        useSpidDevHeaders: apiConfig.useSpidDevHeaders || false
      });

      // Preflight per ottenere il cookie XSRF-TOKEN dal backend.
      // Il backend imposta il cookie alla prima richiesta; senza questo
      // warm-up la prima chiamata API dei componenti riceve 403.
      if (!apiConfig.useMockApi && apiConfig.baseUrl) {
        await firstValueFrom(
          http.get(apiConfig.baseUrl, { observe: 'response' }).pipe(
            catchError(() => of(null))
          )
        );
        logger.log('[Core] XSRF-TOKEN cookie ottenuto dal backend');
      }

      // Pre-carica lo script reCAPTCHA se abilitato (mostra il badge durante la navigazione)
      recaptchaService.preload();
    }),
  ]);
}
