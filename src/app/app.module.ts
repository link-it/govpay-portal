import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { JsonSchemaFormComponent, MaterialDesignFrameworkModule } from 'angular7-json-schema-form';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

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
import {
  MatBadgeModule, MatButtonModule, MatButtonToggleModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatSidenavModule, MatTabsModule
} from '@angular/material';
import { HeaderBarComponent } from './elements/header-bar/header-bar.component';
import { LanguageBarComponent } from './elements/language-bar/language-bar.component';
import { SpidLoginComponent } from './elements/spid-login/spid-login.component';
import { ExternalLoginComponent } from './elements/external-login/external-login.component';
import { PagamentoServizioComponent } from './elements/pagamento-servizio/pagamento-servizio.component';
import { PagamentoBollettinoComponent } from './elements/pagamento-bollettino/pagamento-bollettino.component';
import { TitleDecoComponent } from './elements/title-deco/title-deco.component';
import { IconButtonComponent } from './elements/icon-button/icon-button.component';
import { QuadroComponent } from './elements/quadro/quadro.component';
import { QuadroFlatComponent } from './elements/quadro-flat/quadro-flat.component';
import { DettaglioServizioComponent } from './elements/dettaglio-servizio/dettaglio-servizio.component';
import { ServiziAssessoratoComponent } from './elements/servizi-assessorato/servizi-assessorato.component';
import { GroupComponent } from './elements/components/group.component';
import { SimpleItemComponent } from './elements/components/simple-item.component';
import { PayCardComponent } from './elements/pay-card/pay-card.component';
import { CartComponent } from './elements/cart/cart.component';
import { PayItemComponent } from './elements/pay-item/pay-item.component';
import { PayItemExtComponent } from './elements/pay-item-ext/pay-item-ext.component';
import { FieldGroupComponent } from './elements/field-group/field-group.component';
import { RicevutaPagamentoComponent } from './elements/ricevuta-pagamento/ricevuta-pagamento.component';
import { PosizioneDebitoriaComponent } from './elements/posizione-debitoria/posizione-debitoria.component';
import { DettaglioPosizioneComponent } from './elements/dettaglio-posizione/dettaglio-posizione.component';
import { ArchivioComponent } from './elements/archivio/archivio.component';
import { YesnoDialogComponent } from './elements/yesno-dialog/yesno-dialog.component';
import { EsitoComponent } from './elements/esito/esito.component';
import { ChoiceDialogComponent } from './elements/choice-dialog/choice-dialog.component';
import { NavBarComponent } from './elements/nav-bar/nav-bar.component';
import { ReuseStrategy } from './elements/services/reuse-strategy';
import { SanitizeHTMLPipe, ServiceFilterPipe, ServiceGroupFilterPipe, RawHtmlPipe, InjectHTMLDirective } from './elements/services/service-filters';
import { MarkedDirective } from './elements/services/markdown';
import { GroupItemAttributeComponent } from './elements/group-item-attribute/group-item-attribute.component';
import { ItemAttributeComponent } from './elements/item-attribute/item-attribute.component';

import { ArrayTypeComponent } from './elements/formly_types/array.type';
import { ObjectTypeComponent } from './elements/formly_types/object.type';
import { MultiSchemaTypeComponent } from './elements/formly_types/multischema.type';
import { NullTypeComponent } from './elements/formly_types/null.type';
import { FormlyFieldFile } from './elements/formly_types/file.type';
import { FileValueAccessor } from './elements/formly_types/file-value-accessor';

import { SurveyComponent } from './elements/survey/survey.component';

export function minItemsValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT have fewer than ${field.templateOptions.minItems} items`;
}

export function maxItemsValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT have more than ${field.templateOptions.maxItems} items`;
}

export function minlengthValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT be shorter than ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT be longer than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field: FormlyFieldConfig) {
  return `should be >= ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field: FormlyFieldConfig) {
  return `should be <= ${field.templateOptions.max}`;
}

export function multipleOfValidationMessage(err, field: FormlyFieldConfig) {
  return `should be multiple of ${field.templateOptions.step}`;
}

export function exclusiveMinimumValidationMessage(err, field: FormlyFieldConfig) {
  return `should be > ${field.templateOptions.step}`;
}

export function exclusiveMaximumValidationMessage(err, field: FormlyFieldConfig) {
  return `should be < ${field.templateOptions.step}`;
}

export function constValidationMessage(err, field: FormlyFieldConfig) {
  return `should be equal to constant "${field.templateOptions.const}"`;
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateLoaderExt(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthGuardPipe,
    PagamentoServizioComponent,
    PagamentoBollettinoComponent,
    RicevutaPagamentoComponent,
    DettaglioServizioComponent,
    PosizioneDebitoriaComponent,
    DettaglioPosizioneComponent,
    ArchivioComponent,
    HeaderBarComponent,
    LanguageBarComponent,
    SpidLoginComponent,
    ExternalLoginComponent,
    TitleDecoComponent,
    IconButtonComponent,
    QuadroComponent,
    QuadroFlatComponent,
    PayCardComponent,
    CartComponent,
    PayItemComponent,
    PayItemExtComponent,
    FieldGroupComponent,
    YesnoDialogComponent,
    EsitoComponent,
    ChoiceDialogComponent,
    NavBarComponent,
    ServiziAssessoratoComponent,
    GroupComponent,
    SimpleItemComponent,
    GroupItemAttributeComponent,
    ItemAttributeComponent,
    MarkedDirective,
    ServiceGroupFilterPipe, ServiceFilterPipe, SanitizeHTMLPipe, RawHtmlPipe,
    InjectHTMLDirective,
    ArrayTypeComponent,
    ObjectTypeComponent,
    MultiSchemaTypeComponent,
    NullTypeComponent,
    FormlyFieldFile,
    FileValueAccessor,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    FlexLayoutModule,
    FormlyModule.forRoot({
      extras: { resetFieldOnHide: true },
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'null', message: 'should be null' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
        { name: 'multipleOf', message: multipleOfValidationMessage },
        { name: 'exclusiveMinimum', message: exclusiveMinimumValidationMessage },
        { name: 'exclusiveMaximum', message: exclusiveMaximumValidationMessage },
        { name: 'minItems', message: minItemsValidationMessage },
        { name: 'maxItems', message: maxItemsValidationMessage },
        { name: 'uniqueItems', message: 'should NOT have duplicate items' },
        { name: 'const', message: constValidationMessage },
      ],
      types: [
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'enum', extends: 'select' },
        { name: 'null', component: NullTypeComponent, wrappers: ['form-field'] },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
        { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
      ],
    }),
    FormlyMaterialModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
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
    MatButtonToggleModule,
    MatIconModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatTabsModule,
    MaterialDesignFrameworkModule,
    ZXingScannerModule
  ],
  providers: [ PayService, AuthGuardService,
    { provide: RouteReuseStrategy, useClass: ReuseStrategy },
  ],
  entryComponents: [ YesnoDialogComponent, JsonSchemaFormComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
