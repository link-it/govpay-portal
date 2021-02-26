import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JsonSchemaFormComponent, MaterialDesignFrameworkModule } from 'angular7-json-schema-form';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, AuthGuardPipe } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { PayService } from './elements/services/pay.service';
import { AuthGuardService } from './elements/services/auth-gard.service';


import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TranslateLoaderExt } from './elements/classes/translate-loader-ext';
import { MatBadgeModule, MatButtonModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatSidenavModule } from '@angular/material';
import { HeaderBarComponent } from './elements/header-bar/header-bar.component';
import { LanguageBarComponent } from './elements/language-bar/language-bar.component';
import { SpidLoginComponent } from './elements/spid-login/spid-login.component';
import { ExternalLoginComponent } from './elements/external-login/external-login.component';
import { PagamentiComponent } from './elements/pagamenti/pagamenti.component';
import { TitleDecoComponent } from './elements/title-deco/title-deco.component';
import { IconButtonComponent } from './elements/icon-button/icon-button.component';
import { QuadroServizioComponent } from './elements/quadro-servizio/quadro-servizio.component';
import { DettaglioServizioComponent } from './elements/dettaglio-servizio/dettaglio-servizio.component';
import { PayCardComponent } from './elements/pay-card/pay-card.component';
import { CartComponent } from './elements/cart/cart.component';
import { PayItemComponent } from './elements/pay-item/pay-item.component';
import { RicevutaPagamentoComponent } from './elements/ricevuta-pagamento/ricevuta-pagamento.component';
import { PosizioneDebitoriaComponent } from './elements/posizione-debitoria/posizione-debitoria.component';
import { ArchivioComponent } from './elements/archivio/archivio.component';
import { YesnoDialogComponent } from './elements/yesno-dialog/yesno-dialog.component';
import { EsitoComponent } from './elements/esito/esito.component';
import { ChoiceDialogComponent } from './elements/choice-dialog/choice-dialog.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateLoaderExt(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthGuardPipe,
    PagamentiComponent,
    RicevutaPagamentoComponent,
    DettaglioServizioComponent,
    PosizioneDebitoriaComponent,
    ArchivioComponent,
    HeaderBarComponent,
    LanguageBarComponent,
    SpidLoginComponent,
    ExternalLoginComponent,
    TitleDecoComponent,
    IconButtonComponent,
    QuadroServizioComponent,
    PayCardComponent,
    CartComponent,
    PayItemComponent,
    YesnoDialogComponent,
    EsitoComponent,
    ChoiceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MaterialDesignFrameworkModule,
    ZXingScannerModule
  ],
  providers: [ PayService, AuthGuardService ],
  entryComponents: [ YesnoDialogComponent, JsonSchemaFormComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
