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

import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout';
import { authGuard } from '@core/auth/guards';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'pagamento-servizio',
        pathMatch: 'full'
      },
      {
        path: 'pagamento-servizio',
        loadComponent: () =>
          import('@feature/pagamento/servizio/servizio').then(
            m => m.PagamentoServizioComponent
          )
      },
      {
        path: 'bollettino',
        loadComponent: () =>
          import('@feature/pagamento/bollettino/bollettino').then(
            m => m.PagamentoBollettinoComponent
          )
      },
      {
        path: 'carrello',
        loadComponent: () =>
          import('@feature/carrello/carrello').then(
            m => m.CarrelloComponent
          )
      },
      {
        path: 'dettaglio-servizio/:id',
        loadComponent: () =>
          import('@feature/pagamento/dettaglio-servizio/dettaglio-servizio').then(
            m => m.DettaglioServizioComponent
          )
      },
      {
        path: 'esito-pagamento',
        loadComponent: () =>
          import('@feature/pagamento/esito/esito').then(
            m => m.EsitoPagamentoComponent
          )
      },
      // Route protette (richiedono autenticazione)
      {
        path: 'riepilogo',
        loadComponent: () =>
          import('@feature/posizione-debitoria/posizione-debitoria').then(
            m => m.PosizioneDebitoriaComponent
          ),
        canActivate: [authGuard]
      },
      {
        path: 'archivio',
        loadComponent: () =>
          import('@feature/archivio/archivio').then(
            m => m.ArchivioComponent
          ),
        canActivate: [authGuard]
      },
      // Route di test (solo sviluppo)
      {
        path: 'test-survey',
        loadComponent: () =>
          import('@feature/test-survey/test-survey').then(
            m => m.TestSurveyComponent
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
