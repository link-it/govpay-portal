/*
 * GovPay - Porta di Accesso al Nodo dei Pagamenti SPC
 * http://www.gov4j.it/govpay
 *
 * Copyright (c) 2014-2026 Link.it srl (http://www.link.it).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3, as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
        baseUrl: apiConfig.baseUrl || 'https://lab.link.it/govpay-api-portal',
        useSpidDevHeaders: apiConfig.useSpidDevHeaders || false
      });

      // Preflight per ottenere il cookie XSRF-TOKEN dal backend.
      // Il backend imposta il cookie alla prima richiesta; senza questo
      // warm-up la prima chiamata API dei componenti riceve 403.
      if (!apiConfig.useMockApi && apiConfig.baseUrl) {
        await firstValueFrom(
          http.get(`${apiConfig.baseUrl}/domini`, { observe: 'response' }).pipe(
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
