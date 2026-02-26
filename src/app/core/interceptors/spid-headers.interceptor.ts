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

/**
 * SPID Headers Interceptor
 *
 * Aggiunge gli header SPID per l'autenticazione in ambiente di sviluppo.
 * Attivato quando api.useSpidDevHeaders = true nella configurazione.
 *
 * Header aggiunti:
 * - X-SPID-FISCALNUMBER (obbligatorio)
 * - X-SPID-NAME (obbligatorio)
 * - X-SPID-FAMILYNAME (obbligatorio)
 * - X-SPID-EMAIL (opzionale)
 * - X-SPID-MOBILEPHONE (opzionale)
 * - X-SPID-ADDRESS (opzionale)
 */
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../config';
import { LoggerService } from '../services/logger.service';
import { SPID_TEST_HEADERS, SpidHeaders } from '../models/api.models';

/**
 * Interceptor funzionale per aggiungere header SPID alle richieste API
 */
export const spidHeadersInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const config = inject(ConfigService);
  const logger = inject(LoggerService);
  const apiConfig = config.api();

  // Verifica se l'interceptor è abilitato
  if (!apiConfig.useSpidDevHeaders) {
    return next(req);
  }

  // Verifica se la richiesta è verso l'API GovPay
  const baseUrl = apiConfig.baseUrl || '';
  const isApiRequest = req.url.includes('govpay') ||
                       req.url.includes(baseUrl) ||
                       req.url.startsWith('/govpay') ||
                       req.url.includes('/pendenze') ||
                       req.url.includes('/domini') ||
                       req.url.includes('/profilo');

  if (!isApiRequest) {
    return next(req);
  }

  // Usa gli header di test o quelli configurati
  const spidHeaders: SpidHeaders = SPID_TEST_HEADERS;

  // Clona la richiesta aggiungendo gli header SPID
  const modifiedReq = req.clone({
    setHeaders: {
      'X-SPID-FISCALNUMBER': spidHeaders['X-SPID-FISCALNUMBER'],
      'X-SPID-NAME': spidHeaders['X-SPID-NAME'],
      'X-SPID-FAMILYNAME': spidHeaders['X-SPID-FAMILYNAME'],
      ...(spidHeaders['X-SPID-EMAIL'] && { 'X-SPID-EMAIL': spidHeaders['X-SPID-EMAIL'] }),
      ...(spidHeaders['X-SPID-MOBILEPHONE'] && { 'X-SPID-MOBILEPHONE': spidHeaders['X-SPID-MOBILEPHONE'] }),
      ...(spidHeaders['X-SPID-ADDRESS'] && { 'X-SPID-ADDRESS': spidHeaders['X-SPID-ADDRESS'] })
    }
  });

  logger.log('[SpidHeadersInterceptor] Header SPID aggiunti a:', req.url);

  return next(modifiedReq);
};
