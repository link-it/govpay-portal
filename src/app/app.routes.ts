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
      },
      {
        path: 'test-jsonform',
        loadComponent: () =>
          import('@feature/test-jsonform/test-jsonform').then(
            m => m.TestJsonFormComponent
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
