import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './elements/services/auth-gard.service';
import { PagamentoServizioComponent } from './elements/pagamento-servizio/pagamento-servizio.component';
import { PagamentoBollettinoComponent } from './elements/pagamento-bollettino/pagamento-bollettino.component';
import { DettaglioServizioComponent } from './elements/dettaglio-servizio/dettaglio-servizio.component';
import { CartComponent } from './elements/cart/cart.component';
import { RicevutaPagamentoComponent } from './elements/ricevuta-pagamento/ricevuta-pagamento.component';
import { PosizioneDebitoriaComponent } from './elements/posizione-debitoria/posizione-debitoria.component';
import { DettaglioPosizioneComponent } from './elements/dettaglio-posizione/dettaglio-posizione.component';
import { ArchivioComponent } from './elements/archivio/archivio.component';
import { EsitoComponent } from './elements/esito/esito.component';
import { AppComponent } from './app.component';
// import { ProfiloComponent } from './elements/profilo/profilo.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'pagamento-servizio', component: PagamentoServizioComponent, canActivate: [ AuthGuardService ], data: { shouldReuse: true } },
  { path: 'bollettino', component: PagamentoBollettinoComponent, canActivate: [ AuthGuardService ], data: { shouldReuse: true } },
  { path: 'dettaglio-servizio', component: DettaglioServizioComponent, canActivate: [ AuthGuardService ] },
  { path: 'carrello', component: CartComponent, canActivate: [ AuthGuardService ] },
  { path: 'ricevuta', component: RicevutaPagamentoComponent, canActivate: [ AuthGuardService ] },
  { path: 'riepilogo', component: PosizioneDebitoriaComponent, canActivate: [ AuthGuardService ] },
  { path: 'dettaglio-posizione', component: DettaglioPosizioneComponent, canActivate: [ AuthGuardService ] },
  { path: 'archivio', component: ArchivioComponent, canActivate: [ AuthGuardService ] },
  { path: 'esito-pagamento', component: EsitoComponent, canActivate: [ AuthGuardService ] },
  // { path: 'profilo', component: ProfiloComponent, canActivate: [ AuthGuardService ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
