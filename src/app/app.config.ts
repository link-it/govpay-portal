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

import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormlyModule } from '@ngx-formly/core';
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import {
  bootstrapHouseDoor,
  bootstrapHouse,
  bootstrapCart3,
  bootstrapCartPlus,
  bootstrapReceipt,
  bootstrapArchive,
  bootstrapBank,
  bootstrapBoxArrowRight,
  bootstrapBoxArrowInRight,
  bootstrapPerson,
  bootstrapPersonLock,
  bootstrapGear,
  bootstrapList,
  bootstrapListUl,
  bootstrapX,
  bootstrapXLg,
  bootstrapCheck2,
  bootstrapExclamationTriangle,
  bootstrapExclamationCircle,
  bootstrapInfoCircle,
  bootstrapCheckCircle,
  bootstrapCheckCircleFill,
  bootstrapXCircle,
  bootstrapXCircleFill,
  bootstrapExclamationCircleFill,
  bootstrapDashCircleFill,
  bootstrapQuestionCircle,
  bootstrapClockHistory,
  bootstrapThreeDotsVertical,
  bootstrapFlower1,
  bootstrapCurrencyEuro,
  bootstrapBoxArrowUpRight,
  bootstrapPlus,
  bootstrapTrash,
  bootstrapSearch,
  bootstrapQrCodeScan,
  bootstrapDownload,
  bootstrapChevronDown,
  bootstrapChevronUp,
  bootstrapChevronRight,
  bootstrapChevronLeft,
  bootstrapArrowLeft,
  bootstrapArrowRepeat,
  bootstrapCreditCard2Front,
  bootstrapFileEarmarkPdf,
  bootstrapFileEarmarkText,
  bootstrapFileText,
  bootstrapTelephone,
  bootstrapGlobe,
  bootstrapClock,
  bootstrapEye,
  bootstrapEyeSlash,
  bootstrapCalendar3,
  bootstrapShieldCheck,
  bootstrapGrid3x3Gap,
  bootstrapCollection,
  bootstrapFolder,
  bootstrapLightbulb,
  bootstrapBuilding,
  bootstrapPrinter,
} from '@ng-icons/bootstrap-icons';

import { routes } from './app.routes';
import { provideCore } from '@core/core.provider';

// Registra i locale per pipe Angular (date, currency, ecc.)
registerLocaleData(localeIt);
registerLocaleData(localeEn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideCore(),
    // Locale italiano come default per Angular e Material DatePicker
    { provide: LOCALE_ID, useValue: 'it' },
    { provide: MAT_DATE_LOCALE, useValue: 'it' },
    provideNativeDateAdapter(),
    // Formly per form dinamiche
    importProvidersFrom(FormlyModule.forRoot({})),
    provideIcons({
      // Navigazione
      bootstrapHouseDoor,
      bootstrapHouse,
      bootstrapCart3,
      bootstrapCartPlus,
      bootstrapReceipt,
      bootstrapArchive,
      bootstrapBank,
      bootstrapBoxArrowRight,
      bootstrapBoxArrowInRight,
      bootstrapPerson,
      bootstrapPersonLock,
      bootstrapGear,
      // UI
      bootstrapList,
      bootstrapListUl,
      bootstrapX,
      bootstrapXLg,
      bootstrapCheck2,
      bootstrapChevronDown,
      bootstrapChevronUp,
      bootstrapChevronRight,
      bootstrapChevronLeft,
      bootstrapArrowLeft,
      bootstrapArrowRepeat,
      bootstrapClock,
      bootstrapEye,
      bootstrapEyeSlash,
      bootstrapCalendar3,
      bootstrapGrid3x3Gap,
      bootstrapCollection,
      bootstrapFolder,
      // Notifiche
      bootstrapExclamationTriangle,
      bootstrapExclamationCircle,
      bootstrapExclamationCircleFill,
      bootstrapInfoCircle,
      bootstrapCheckCircle,
      bootstrapCheckCircleFill,
      bootstrapXCircle,
      bootstrapXCircleFill,
      bootstrapDashCircleFill,
      bootstrapQuestionCircle,
      bootstrapClockHistory,
      bootstrapShieldCheck,
      // Azioni
      bootstrapThreeDotsVertical,
      bootstrapFlower1,
      bootstrapCurrencyEuro,
      bootstrapBoxArrowUpRight,
      bootstrapPlus,
      bootstrapTrash,
      bootstrapSearch,
      bootstrapDownload,
      // Pagamenti
      bootstrapCreditCard2Front,
      bootstrapQrCodeScan,
      bootstrapFileEarmarkPdf,
      bootstrapFileEarmarkText,
      bootstrapFileText,
      bootstrapTelephone,
      // Lingua
      bootstrapGlobe,
      // Categorie/Servizi
      bootstrapLightbulb,
      bootstrapBuilding,
      // Stampa
      bootstrapPrinter,
    }),
    provideTranslateService({
      fallbackLang: 'it',
      loader: {
        provide: TranslateLoader,
        useFactory: () => {
          const http = inject(HttpClient);
          return {
            getTranslation: (lang: string) => http.get(`./assets/i18n/${lang}.json`),
          };
        },
      },
    }),
  ],
};
