import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './elements/services/auth-gard.service';
import { PagamentiComponent } from './elements/pagamenti/pagamenti.component';
import { DettaglioServizioComponent } from './elements/dettaglio-servizio/dettaglio-servizio.component';
import { CartComponent } from './elements/cart/cart.component';
import { RicevutaPagamentoComponent } from './elements/ricevuta-pagamento/ricevuta-pagamento.component';
import { PosizioneDebitoriaComponent } from './elements/posizione-debitoria/posizione-debitoria.component';
import { ArchivioComponent } from './elements/archivio/archivio.component';
import { EsitoComponent } from './elements/esito/esito.component';
import { AppComponent } from './app.component';
// import { ProfiloComponent } from './elements/profilo/profilo.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'pagamenti', component: PagamentiComponent, canActivate: [ AuthGuardService ] },
  { path: 'dettaglio-servizio', component: DettaglioServizioComponent, canActivate: [ AuthGuardService ] },
  { path: 'carrello', component: CartComponent, canActivate: [ AuthGuardService ] },
  { path: 'ricevuta', component: RicevutaPagamentoComponent, canActivate: [ AuthGuardService ] },
  { path: 'riepilogo', component: PosizioneDebitoriaComponent, canActivate: [ AuthGuardService ] },
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
