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
