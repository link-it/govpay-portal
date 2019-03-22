import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessoComponent } from './elements/accesso/accesso.component';
import { PosizioneDebitoriaComponent } from './elements/posizione-debitoria/posizione-debitoria.component';
import { ArchivioComponent } from './elements/archivio/archivio.component';
import { AvvisoComponent } from './elements/avviso/avviso.component';
import { AuthGuardService } from './elements/services/auth-gard.service';
import { ProfiloComponent } from './elements/profilo/profilo.component';

const routes: Routes = [
  { path: '', redirectTo: '/accesso', pathMatch: 'full' },
  { path: 'accesso', component: AccessoComponent },
  { path: 'riepilogo', component: PosizioneDebitoriaComponent, canActivate: [ AuthGuardService ] },
  { path: 'archivio', component: ArchivioComponent, canActivate: [ AuthGuardService ] },
  { path: 'pagamento', component: AvvisoComponent },
  { path: 'profilo', component: ProfiloComponent, canActivate: [ AuthGuardService ] },
  { path: '**', redirectTo: '/accesso' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
