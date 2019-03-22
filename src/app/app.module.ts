import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LinkMaterialModule } from 'link-material';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AccessoComponent } from './elements/accesso/accesso.component';
import { PosizioneDebitoriaComponent } from './elements/posizione-debitoria/posizione-debitoria.component';
import { ArchivioComponent } from './elements/archivio/archivio.component';
import { AvvisoComponent } from './elements/avviso/avviso.component';
import { PayService } from './elements/services/pay.service';
import { AuthGuardService } from './elements/services/auth-gard.service';
import { ProfiloComponent } from './elements/profilo/profilo.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AccessoComponent,
    PosizioneDebitoriaComponent,
    ArchivioComponent,
    AvvisoComponent,
    ProfiloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    LinkMaterialModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ PayService, AuthGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
