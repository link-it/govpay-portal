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

import { Component, inject, signal, computed, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIcon } from '@ng-icons/core';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil, firstValueFrom, catchError, of } from 'rxjs';
import { ConfigService } from '@core/config';
import { PayService, TipoPendenza, Pendenza } from '@core/pay';
import { GovPayApiProxyService } from '@core/services/api';
import { RecaptchaService } from '@core/services/recaptcha.service';
import {
  Pendenza as ApiPendenza,
  TipoPendenza as ApiTipoPendenza,
  TipoPendenzaLocalizedDetail
} from '@core/models';
import { HeaderStateService } from '@core/services/header-state.service';
import { SurveyFormComponent, SurveyDefinition } from '@shared/components/survey-form';
import {
  TitleDecoComponent,
  SkeletonComponent,
  JsonSchemaFormComponent,
  JsonSchemaFormDefinition
} from '@shared/components';

/**
 * Oggetto vuoto condiviso per evitare ricreazione ad ogni change detection
 */
const EMPTY_OBJECT: Record<string, unknown> = Object.freeze({});

const ASSESSORATI_URL = '/assets/config/assessorati.json';
const TIPOLOGIE_URL = '/assets/config/tipologie.json';

interface AssessoratoConfig {
  id: string;
  nome: string;
  icona: string;
  immagine?: string;
  backgroundColor: string;
  color?: string;
  numeroServizi?: number;
}

interface TipologiaConfig {
  id: string;
  nome: string;
  icona: string;
  immagine?: string;
  backgroundColor: string;
  color?: string;
  numeroServizi?: number;
}

interface ServiceDetail {
  name: string;
  code?: string;
  short_description?: string;
  long_description?: string;
  metadata?: string;
  immagine?: string;
  properties?: { label: string; text: string; url?: string; icon?: string }[];
}

// Interfaccia locale per i dati servizio (passati via router state)
interface ServizioState {
  id: string;
  nome: string;
  descrizione: string;
  dipartimento?: string;
  tipologiaId: string;
  assessoratoId: string;
  idDominio: string;
  idTipoPendenza: string;
  importoMinimo?: number;
  importoMassimo?: number;
  importoFisso?: number;
  attivo: boolean;
  immagine?: string;
  linkWeb?: { label: string; url: string };
  linkDocumentazione?: { label: string; url: string };
  telefono?: string;
  hasForm?: boolean;
}

@Component({
  selector: 'app-dettaglio-servizio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgIcon,
    FormlyModule,
    SurveyFormComponent,
    TitleDecoComponent,
    SkeletonComponent,
    JsonSchemaFormComponent
  ],
  template: `
    <div class="space-y-6">
      @if (isLoadingService()) {
        <!-- Loading state -->
        <app-skeleton
          type="form"
          gridClass="grid grid-cols-1 lg:grid-cols-2 gap-8"
        ></app-skeleton>
      } @else if (hasService()) {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Colonna sinistra: Informazioni sul servizio -->
          <div class="space-y-6">
            <pay-title-deco variant="line" class="mb-6!">
              {{ 'Language.Servizio.Informazioni' | translate }}
            </pay-title-deco>

            <!-- Immagine servizio (configurabile via cardDisplay) -->
            @if (shouldShowServiceImage()) {
              <div class="rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <img
                  [src]="detail()!.immagine"
                  [alt]="detail()!.name"
                  class="w-full h-48 object-cover"
                  (error)="onImageError($event)"
                />
              </div>
            }

            <!-- Assessorato/Dipartimento con tipologia -->
            @if (assessoratoInfo()) {
              <div class="flex items-center gap-4 mb-12">
                @if (shouldShowAssessoratoImage()) {
                  <!-- Immagine assessorato -->
                  <div
                    class="w-16 h-16 rounded-full shrink-0 bg-cover bg-center"
                    [style.background-image]="'url(' + assessoratoInfo()!.immagine + ')'"
                    [style.background-color]="assessoratoInfo()!.backgroundColor"
                  ></div>
                } @else {
                  <!-- Icona assessorato -->
                  <div
                    class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                    [style.background-color]="assessoratoInfo()!.backgroundColor"
                    [style.color]="assessoratoInfo()!.color || '#ffffff'"
                  >
                    <ng-icon [name]="assessoratoInfo()!.icona" class="text-3xl"></ng-icon>
                  </div>
                }
                <div class="flex-1 min-w-0">
                  <p class="text-gray-900 text-lg">{{ assessoratoInfo()!.nome }}</p>
                  @if (servizio()?.dipartimento) {
                    <p class="text-sm text-gray-600">{{ servizio()!.dipartimento }}</p>
                  }
                  @if (tipologiaInfo()) {
                    <p class="text-sm text-gray-500 mt-1">{{ tipologiaInfo()!.nome }}</p>
                  }
                </div>
              </div>
            }

            <!-- Descrizione servizio -->
            @if (detail()?.short_description || detail()?.long_description) {
              <div class="prose prose-sm max-w-none text-gray-600">
                @if (detail()?.short_description) {
                  <p>{{ detail()!.short_description }}</p>
                }
                @if (detail()?.long_description) {
                  <div [innerHTML]="detail()!.long_description"></div>
                }
              </div>
            }

            <!-- Link e Informazioni aggiuntive -->
            @if (detail()?.properties && detail()!.properties!.length > 0) {
              <div class="space-y-3 pt-4 border-t border-gray-100">
                @for (prop of detail()!.properties; track $index) {
                  <div class="flex items-center gap-3">
                    @if (prop.icon) {
                      <ng-icon [name]="prop.icon" class="text-gray-400 text-lg shrink-0"></ng-icon>
                    }
                    <span class="text-sm text-gray-500 w-28 shrink-0">{{ prop.label }}</span>
                    @if (prop.url) {
                      <a
                        [href]="prop.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
                      >
                        {{ prop.text }}
                        <ng-icon name="bootstrapBoxArrowUpRight" class="text-xs"></ng-icon>
                      </a>
                    } @else {
                      <span class="text-sm text-gray-900">{{ prop.text }}</span>
                    }
                  </div>
                }
              </div>
            }
          </div>

          <!-- Colonna destra: Dati necessari al pagamento -->
          <div class="space-y-6">
            <pay-title-deco variant="line" class="mb-6!">
              {{ 'Language.Servizio.DatiPagamento' | translate }}
            </pay-title-deco>

            @if (hasForm()) {
              @if (formType() === 'formly' && formlyFields()) {
                <form [formGroup]="formlyForm" (ngSubmit)="onSubmit()">
                  <formly-form
                    [form]="formlyForm"
                    [fields]="formlyFields()!"
                    [model]="formlyModel"
                  ></formly-form>

                  <div class="mt-8">
                    <button
                      type="submit"
                      [disabled]="!formlyForm.valid || isSubmitting()"
                      class="btn-primary px-6 py-2.5 font-medium rounded"
                    >
                      @if (isSubmitting()) {
                        <ng-icon name="bootstrapArrowRepeat" class="animate-spin mr-2"></ng-icon>
                      }
                      {{ 'Language.Servizio.Verifica' | translate }}
                    </button>
                  </div>
                </form>
              } @else if (formType() === 'json-schema' && jsonSchemaDefinition()) {
                <app-json-schema-form
                  [definition]="jsonSchemaDefinition()!"
                  [data]="jsonSchemaInitialData()"
                  [locale]="currentLocale()"
                  (formSubmit)="onJsonSchemaSubmit($event)"
                  (formChange)="onJsonSchemaChange($event)"
                  (validChange)="onJsonSchemaValidChange($event)"
                ></app-json-schema-form>

                <div class="mt-8">
                  <button
                    type="button"
                    [disabled]="!isJsonSchemaValid() || isSubmitting()"
                    class="btn-primary px-6 py-2.5 font-medium rounded"
                    (click)="onJsonSchemaFormSubmit()"
                  >
                    @if (isSubmitting()) {
                      <ng-icon name="bootstrapArrowRepeat" class="animate-spin mr-2"></ng-icon>
                    }
                    {{ 'Language.Servizio.Verifica' | translate }}
                  </button>
                </div>
              } @else if (formType() === 'surveyjs' && surveyDefinition()) {
                <app-survey-form
                  #surveyForm
                  [definition]="surveyDefinition()!"
                  [data]="surveyInitialData()"
                  [locale]="currentLocale()"
                  [submitting]="isSubmitting()"
                  (surveyComplete)="onSurveyComplete($event)"
                  (valueChanged)="onSurveyValueChanged($event)"
                ></app-survey-form>

                <div class="mt-8">
                  <button
                    type="button"
                    [disabled]="isSubmitting()"
                    class="btn-primary px-6 py-2.5 font-medium rounded"
                    (click)="onSurveySubmit(requiresConfirmation())"
                  >
                    @if (isSubmitting()) {
                      <ng-icon name="bootstrapArrowRepeat" class="animate-spin mr-2"></ng-icon>
                    }
                    {{ 'Language.Servizio.Verifica' | translate }}
                  </button>
                </div>
              }
            } @else {
              <!-- Pagamento diretto senza form -->
              <div class="py-4">
                <p class="text-gray-600 mb-6">
                  {{ 'Language.Servizio.PagamentoDirettoDesc' | translate }}
                </p>
                <button
                  type="button"
                  [disabled]="isSubmitting()"
                  class="btn-primary px-6 py-2.5 font-medium rounded"
                  (click)="onDirectPayment()"
                >
                  @if (isSubmitting()) {
                    <ng-icon name="bootstrapArrowRepeat" class="animate-spin mr-2"></ng-icon>
                  }
                  {{ 'Language.Servizio.AggiungiCarrello' | translate }}
                </button>
              </div>
            }

            <!-- Error message -->
            @if (errorMessage()) {
              <div class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex gap-3">
                  <ng-icon name="bootstrapExclamationCircle" class="text-red-500 text-xl shrink-0"></ng-icon>
                  <div class="text-sm text-red-700">
                    <p class="font-medium">{{ 'Language.Common.Errore' | translate }}</p>
                    <p class="mt-1">{{ errorMessage() }}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      } @else {
        <!-- Servizio non trovato -->
        <div class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ng-icon name="bootstrapExclamationTriangle" class="text-3xl text-gray-400"></ng-icon>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ 'Language.Servizio.NonTrovato' | translate }}
          </h3>
          <p class="text-gray-500 mb-4">
            {{ 'Language.Servizio.NonTrovatoDesc' | translate }}
          </p>
          <button
            type="button"
            class="btn-primary px-6 py-2.5 font-medium rounded"
            (click)="goBack()"
          >
            {{ 'Language.Servizio.TornaPagamenti' | translate }}
          </button>
        </div>
      }

      <!-- Confirmation dialog -->
      @if (showConfirmDialog()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" (click)="cancelConfirmation()">
          <div class="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden" (click)="$event.stopPropagation()">
            <!-- Header -->
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ 'Language.Servizio.ConfermaOperazione' | translate }}
              </h3>
            </div>

            @if (pendenzaPreview()) {
              <div class="p-6 space-y-4">
                <!-- Causale -->
                <div>
                  <span class="text-sm text-gray-500">{{ 'Language.Common.Causale' | translate }}</span>
                  <p class="font-medium text-gray-900 mt-1">{{ pendenzaPreview()!.causale }}</p>
                </div>

                <!-- Breakdown voci -->
                @if (pendenzaPreview()!.voci && pendenzaPreview()!.voci.length > 0) {
                  <div class="border rounded-lg overflow-hidden">
                    <div class="bg-gray-50 px-4 py-2 border-b">
                      <span class="text-sm font-medium text-gray-700">{{ 'Language.Servizio.DettaglioImporti' | translate }}</span>
                    </div>
                    <div class="divide-y divide-gray-100">
                      @for (voce of pendenzaPreview()!.voci; track $index) {
                        <div class="px-4 py-3 flex justify-between items-center">
                          <span class="text-sm text-gray-600">{{ voce.descrizione }}</span>
                          <span class="text-sm font-medium text-gray-900">{{ voce.importo | currency:'EUR' }}</span>
                        </div>
                      }
                    </div>
                  </div>
                }

                <!-- Totale -->
                <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span class="text-base font-medium text-gray-700">{{ 'Language.Cart.Totale' | translate }}</span>
                  <span class="text-xl font-bold text-primary-600">{{ pendenzaPreview()!.importo | currency:'EUR' }}</span>
                </div>

                <!-- Info scadenza -->
                @if (pendenzaPreview()!.dataScadenza) {
                  <div class="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-3">
                    <ng-icon name="bootstrapCalendar3" class="text-gray-400"></ng-icon>
                    <span>{{ 'Language.Common.Scadenza' | translate }}: {{ pendenzaPreview()!.dataScadenza | date:'dd/MM/yyyy' }}</span>
                  </div>
                }
              </div>
            }

            <!-- Actions -->
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                class="btn-secondary flex-1 px-4 py-2.5 font-medium rounded-lg"
                (click)="cancelConfirmation()"
              >
                {{ 'Language.Common.Annulla' | translate }}
              </button>
              <button
                type="button"
                class="btn-primary flex-1 px-4 py-2.5 font-medium rounded-lg flex items-center justify-center gap-2"
                (click)="confirmAndAddToCart()"
              >
                <ng-icon name="bootstrapCart3" class="text-lg"></ng-icon>
                {{ 'Language.Servizio.AggiungiCarrello' | translate }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class DettaglioServizioComponent implements OnInit, OnDestroy {
  protected readonly config = inject(ConfigService);
  protected readonly pay = inject(PayService);
  private readonly api = inject(GovPayApiProxyService);
  private readonly headerState = inject(HeaderStateService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly translate = inject(TranslateService);
  private readonly recaptcha = inject(RecaptchaService);
  private readonly http = inject(HttpClient);

  private readonly destroy$ = new Subject<void>();

  // ViewChild per SurveyJS
  @ViewChild('surveyForm') surveyFormRef?: SurveyFormComponent;

  // State
  protected readonly service = signal<TipoPendenza | null>(null);
  protected readonly servizio = signal<ServizioState | null>(null);
  protected readonly apiTipoPendenza = signal<ApiTipoPendenza | null>(null);
  protected readonly assessoratiConfig = signal<AssessoratoConfig[]>([]);
  protected readonly tipologieConfig = signal<TipologiaConfig[]>([]);
  protected readonly isLoadingService = signal(false);
  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly showConfirmDialog = signal(false);
  protected readonly pendenzaPreview = signal<Pendenza | null>(null);
  protected readonly surveyData = signal<any>({});

  // JSON Schema Form state
  protected readonly jsonSchemaData = signal<Record<string, unknown>>({});
  protected readonly isJsonSchemaValid = signal(false);

  // Formly
  formlyForm = new FormGroup({});
  formlyModel: any = {};

  // Computed - controlla se abbiamo un servizio (da mock o da API)
  protected readonly hasService = computed(() => {
    return !!this.service() || !!this.servizio();
  });

  // Computed
  protected readonly detail = computed<ServiceDetail | null>(() => {
    const langCode = this.translate.getCurrentLang() === 'en' ? 'eng' : 'ita';

    // Prima controlla se abbiamo dati decodificati dall'API (apiTipoPendenza)
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.detail) {
      const localizedDetail = (apiTp.detail[langCode] || apiTp.detail['ita']) as TipoPendenzaLocalizedDetail;

      if (localizedDetail) {
        return {
          name: localizedDetail.name || apiTp.descrizione,
          code: localizedDetail.code || apiTp.idTipoPendenza,
          short_description: localizedDetail.short_description,
          long_description: localizedDetail.long_description,
          metadata: localizedDetail.metadata,
          immagine: apiTp.detail.img || apiTp.detail.thumbnail || apiTp.immagine,
          properties: localizedDetail.properties
        };
      }

      // Se non ci sono dati localizzati, usa almeno l'immagine
      return {
        name: apiTp.descrizione,
        code: apiTp.idTipoPendenza,
        immagine: apiTp.detail.img || apiTp.detail.thumbnail || apiTp.immagine
      };
    }

    // Poi controlla se abbiamo un servizio dal mock (servizio state)
    const servizioMock = this.servizio();
    if (servizioMock) {
      const properties: ServiceDetail['properties'] = [];

      // Importo
      if (servizioMock.importoFisso) {
        properties.push({ label: 'Importo', text: `€ ${servizioMock.importoFisso.toFixed(2)}`, icon: 'bootstrapCurrencyEuro' });
      } else if (servizioMock.importoMinimo && servizioMock.importoMassimo) {
        properties.push({ label: 'Importo', text: `da € ${servizioMock.importoMinimo.toFixed(2)} a € ${servizioMock.importoMassimo.toFixed(2)}`, icon: 'bootstrapCurrencyEuro' });
      }

      // Link web
      if (servizioMock.linkWeb) {
        properties.push({ label: 'Web', text: servizioMock.linkWeb.label, url: servizioMock.linkWeb.url, icon: 'bootstrapGlobe' });
      }

      // Documentazione
      if (servizioMock.linkDocumentazione) {
        properties.push({ label: 'Documentazione', text: servizioMock.linkDocumentazione.label, url: servizioMock.linkDocumentazione.url, icon: 'bootstrapFileText' });
      }

      // Telefono
      if (servizioMock.telefono) {
        properties.push({ label: 'Telefono', text: servizioMock.telefono, icon: 'bootstrapTelephone' });
      }

      return {
        name: servizioMock.nome,
        code: servizioMock.id,
        short_description: servizioMock.descrizione,
        long_description: servizioMock.dipartimento ? `<p>${servizioMock.dipartimento}</p>` : undefined,
        immagine: servizioMock.immagine,
        properties
      };
    }

    // Infine prova service da PayService (vecchio flusso)
    const svc = this.service();
    if (!svc?.detail) return null;

    return svc.detail[langCode] || svc.detail['ita'] || null;
  });

  protected readonly formType = computed<'formly' | 'json-schema' | 'surveyjs' | null>(() => {
    // Prima controlla PayService (vecchio flusso)
    const svc = this.service();
    if (svc?.form?.tipo) {
      switch (svc.form.tipo) {
        case 'formly':
          return 'formly';
        case 'angular2-json-schema-form':
          return 'json-schema';
        case 'surveyjs':
          return 'surveyjs';
      }
    }

    // Poi controlla API TipoPendenza
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.form?.tipo) {
      switch (apiTp.form.tipo) {
        case 'formly':
          return 'formly';
        case 'angular2-json-schema-form':
          return 'json-schema';
        case 'surveyjs':
          return 'surveyjs';
        default:
          // Se c'è un form ma non è uno dei tipi noti, assume surveyjs
          return 'surveyjs';
      }
    }

    return null;
  });

  protected readonly hasForm = computed(() => {
    // Controlla jsfDef decodificato da API TipoPendenza
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.jsfDef) return true;

    // Controlla form da PayService (vecchio flusso)
    const svc = this.service();
    if (svc?.jsfDef) return true;

    // Controlla form non decodificato (fallback)
    if (apiTp?.form) return true;

    // Controlla flag hasForm nel servizio
    const servizioState = this.servizio();
    if (servizioState?.hasForm) return true;

    return false;
  });

  // Computed per informazioni assessorato (caricato da JSON)
  protected readonly assessoratoInfo = computed(() => {
    const servizioMock = this.servizio();
    if (!servizioMock?.assessoratoId) return null;

    // Cerca l'assessorato nella configurazione caricata
    const assessorati = this.assessoratiConfig();
    return assessorati.find(a => a.id === servizioMock.assessoratoId) || null;
  });

  /**
   * Determina se mostrare l'immagine dell'assessorato basandosi sulla configurazione cardDisplay
   */
  protected readonly shouldShowAssessoratoImage = computed(() => {
    const mode = this.config.ui()?.layout?.cardDisplay || 'auto';
    if (mode === 'icon') return false;
    // Per 'auto' e 'image', mostra immagine solo se presente
    return !!this.assessoratoInfo()?.immagine;
  });

  /**
   * Determina se mostrare l'immagine del servizio basandosi sulla configurazione showDetailImage
   */
  protected readonly shouldShowServiceImage = computed(() => {
    // Default: true (mostra immagine se presente)
    const showDetailImage = this.config.ui()?.layout?.showDetailImage !== false;
    return showDetailImage && !!this.detail()?.immagine;
  });

  // Computed per informazioni tipologia (caricato da JSON)
  protected readonly tipologiaInfo = computed(() => {
    const servizioMock = this.servizio();
    if (!servizioMock?.tipologiaId) return null;

    // Cerca la tipologia nella configurazione caricata
    const tipologie = this.tipologieConfig();
    return tipologie.find(t => t.id === servizioMock.tipologiaId) || null;
  });

  protected readonly formlyFields = computed<FormlyFieldConfig[] | null>(() => {
    if (this.formType() !== 'formly') return null;

    const langCode = this.translate.getCurrentLang() === 'en' ? 'eng' : 'ita';

    // Prima prova API TipoPendenza con jsfDef decodificato
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.jsfDef) {
      return (apiTp.jsfDef['layout_' + langCode] || apiTp.jsfDef.layout || null) as FormlyFieldConfig[] | null;
    }

    // Poi prova PayService (vecchio flusso)
    const svc = this.service();
    if (!svc?.jsfDef) return null;

    return svc.jsfDef['layout_' + langCode] || svc.jsfDef.layout || null;
  });

  protected readonly requiresConfirmation = computed(() => {
    // Prima controlla apiTipoPendenza (API reale con decodifica Base64)
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.detail?.requireUserConfirm === true) {
      return true;
    }

    // Poi controlla PayService (vecchio flusso)
    const svc = this.service();
    return svc?.detail?.requireUserConfirm === true;
  });

  // SurveyJS computed
  protected readonly surveyDefinition = computed<SurveyDefinition | null>(() => {
    if (this.formType() !== 'surveyjs') return null;

    const langCode = this.translate.getCurrentLang() === 'en' ? 'eng' : 'ita';

    // Prima prova API TipoPendenza con jsfDef decodificato
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.jsfDef) {
      // jsfDef è già decodificato dal servizio API
      let definition = apiTp.jsfDef['definition_' + langCode] ||
                       apiTp.jsfDef['survey_' + langCode] ||
                       apiTp.jsfDef['definition'] ||
                       apiTp.jsfDef['survey'] ||
                       apiTp.jsfDef;

      if (typeof definition === 'string') {
        try {
          definition = JSON.parse(definition);
        } catch {
          console.error('Errore parsing definizione SurveyJS da API jsfDef');
          return null;
        }
      }
      return definition as SurveyDefinition;
    }

    // Poi prova PayService (vecchio flusso)
    const svc = this.service();
    if (svc?.jsfDef) {
      let definition = svc.jsfDef['definition_' + langCode] ||
                       svc.jsfDef['survey_' + langCode] ||
                       svc.jsfDef.definition ||
                       svc.jsfDef.survey ||
                       svc.jsfDef;

      if (typeof definition === 'string') {
        try {
          definition = JSON.parse(definition);
        } catch {
          console.error('Errore parsing definizione SurveyJS da PayService');
          return null;
        }
      }
      return definition as SurveyDefinition;
    }

    return null;
  });

  protected readonly surveyInitialData = computed(() => {
    // Prima prova API TipoPendenza con jsfDef decodificato
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.jsfDef) {
      return apiTp.jsfDef.data || apiTp.jsfDef.initialData || EMPTY_OBJECT;
    }

    // Poi prova PayService (vecchio flusso)
    const svc = this.service();
    if (!svc?.jsfDef) return EMPTY_OBJECT;

    // Cerca dati iniziali nella definizione
    return svc.jsfDef.data || svc.jsfDef.initialData || EMPTY_OBJECT;
  });

  protected readonly surveyHasNavigation = computed(() => {
    const def = this.surveyDefinition();
    if (!def) return true;

    // Se ha più pagine o showNavigationButtons è true, ha navigazione interna
    const hasPages = def.pages && def.pages.length > 1;
    const showNav = def.showNavigationButtons !== false && def.showNavigationButtons !== 'none';

    return hasPages || showNav;
  });

  // JSON Schema Form computed
  protected readonly jsonSchemaDefinition = computed<JsonSchemaFormDefinition | null>(() => {
    if (this.formType() !== 'json-schema') return null;

    // Prima prova API TipoPendenza con jsfDef decodificato
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.jsfDef) {
      // jsfDef contiene già schema, layout, ecc. decodificati
      return apiTp.jsfDef as JsonSchemaFormDefinition;
    }

    // Poi prova PayService (vecchio flusso)
    const svc = this.service();
    if (svc?.jsfDef) {
      return svc.jsfDef as unknown as JsonSchemaFormDefinition;
    }

    return null;
  });

  protected readonly jsonSchemaInitialData = computed(() => {
    // Prima prova API TipoPendenza con jsfDef decodificato
    const apiTp = this.apiTipoPendenza();
    if (apiTp?.jsfDef) {
      return apiTp.jsfDef.data || apiTp.jsfDef.initialData || EMPTY_OBJECT;
    }

    // Poi prova PayService (vecchio flusso)
    const svc = this.service();
    if (!svc?.jsfDef) return EMPTY_OBJECT;

    return svc.jsfDef.data || svc.jsfDef.initialData || EMPTY_OBJECT;
  });

  protected readonly currentLocale = computed(() => {
    return this.translate.getCurrentLang() === 'en' ? 'en' : 'it';
  });

  ngOnInit(): void {
    // Carica configurazione assessorati
    this.http.get<AssessoratoConfig[]>(ASSESSORATI_URL).pipe(
      catchError(err => {
        console.warn('[DettaglioServizio] Errore caricamento assessorati:', err);
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(assessorati => {
      this.assessoratiConfig.set(assessorati);
    });

    // Carica configurazione tipologie
    this.http.get<TipologiaConfig[]>(TIPOLOGIE_URL).pipe(
      catchError(err => {
        console.warn('[DettaglioServizio] Errore caricamento tipologie:', err);
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(tipologie => {
      this.tipologieConfig.set(tipologie);
    });

    // Get ID from route params
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadServizio(id);
      }
    });
  }

  private loadServizio(id: string): void {
    // Prima prova a recuperare dallo state (navigazione interna)
    const historyState = history.state as {
      servizio?: ServizioState;
      service?: TipoPendenza;
      idDominio?: string;
    } | undefined;

    if (historyState?.servizio) {
      this.servizio.set(historyState.servizio);
      this.updateHeaderTitle(historyState.servizio.id, historyState.servizio.nome);

      // Carica anche il TipoPendenza dall'API per avere il form
      const idDominio = historyState.idDominio ||
        historyState.servizio.idDominio ||
        this.config.activeDominioId() ||
        this.config.domini()[0]?.value;

      if (idDominio) {
        this.loadTipoPendenzaFromApi(idDominio, historyState.servizio.idTipoPendenza);
      }
      return;
    }

    if (historyState?.service) {
      this.service.set(historyState.service);
      const detail = historyState.service.detail?.['ita'] || historyState.service.detail?.['eng'];
      if (detail) {
        this.updateHeaderTitle(detail.code, detail.name);
      }
      return;
    }

    // Altrimenti carica dall'API
    const idDominio = this.config.activeDominioId() ||
      this.config.domini()[0]?.value ||
      '80012000826';

    this.loadTipoPendenzaFromApi(idDominio, id);
  }

  private loadTipoPendenzaFromApi(idDominio: string, idTipoPendenza: string): void {
    this.isLoadingService.set(true);

    this.api.getTipoPendenza(idDominio, idTipoPendenza).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (tipoPendenza) => {
        this.isLoadingService.set(false);

        if (tipoPendenza) {
          this.apiTipoPendenza.set(tipoPendenza);

          // Se non abbiamo già un servizio dallo state, creane uno dai dati API
          if (!this.servizio()) {
            this.servizio.set({
              id: tipoPendenza.idTipoPendenza,
              nome: tipoPendenza.descrizione,
              descrizione: tipoPendenza.descrizione,
              tipologiaId: tipoPendenza.gruppo || 'altro',
              assessoratoId: tipoPendenza.sottogruppo || 'altro',
              idDominio: idDominio,
              idTipoPendenza: tipoPendenza.idTipoPendenza,
              attivo: true,
              hasForm: !!tipoPendenza.form,
              immagine: tipoPendenza.immagine,
            });
            this.updateHeaderTitle(tipoPendenza.idTipoPendenza, tipoPendenza.descrizione);
          }
        } else {
          this.errorMessage.set(this.translate.instant('Language.Servizio.NonTrovato'));
        }
      },
      error: (error) => {
        this.isLoadingService.set(false);
        console.error('[DettaglioServizio] Errore caricamento tipo pendenza:', error);
        this.errorMessage.set(this.translate.instant('Language.Servizio.ErroreCaricamento'));
      }
    });
  }

  private updateHeaderTitle(code: string | undefined, name: string): void {
    const title = code ? `${code} - ${name}` : name;
    this.headerState.setDetailMode(title);
  }

  ngOnDestroy(): void {
    this.headerState.clearDetailMode();
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack(): void {
    this.headerState.clearDetailMode();
    this.location.back();
  }

  onImageError(event: Event): void {
    // Nasconde l'immagine se non può essere caricata
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  onSubmit(): void {
    if (!this.formlyForm.valid || this.isSubmitting()) return;

    this.errorMessage.set(null);
    this.createPendenza(this.formlyModel, this.requiresConfirmation());
  }

  onDirectPayment(): void {
    if (this.isSubmitting()) return;

    this.errorMessage.set(null);
    this.createPendenza({}, false);
  }

  private async createPendenza(formData: any, verify: boolean): Promise<void> {
    // Determina idTipoPendenza e idDominio da varie fonti
    const servizioState = this.servizio();
    const apiTp = this.apiTipoPendenza();
    const svc = this.service();

    const idTipoPendenza = servizioState?.idTipoPendenza ||
      apiTp?.idTipoPendenza ||
      svc?.idTipoPendenza;

    const idDominio = servizioState?.idDominio ||
      this.config.activeDominioId() ||
      this.config.domini()[0]?.value;

    if (!idTipoPendenza || !idDominio) {
      this.errorMessage.set(this.translate.instant('Language.Servizio.ConfigurazioneNonValida'));
      return;
    }

    this.isSubmitting.set(true);

    // Ottieni token reCAPTCHA se abilitato
    let recaptchaToken = '';
    if (this.recaptcha.isEnabled()) {
      try {
        recaptchaToken = await firstValueFrom(this.recaptcha.executeForPendenza());
      } catch (error) {
        console.warn('reCAPTCHA non disponibile, continuo senza token:', error);
      }
    }

    this.api.creaPendenza(
      idDominio,
      idTipoPendenza,
      formData,
      recaptchaToken ? { gRecaptchaResponse: recaptchaToken } : undefined
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (apiPendenza) => {
        this.isSubmitting.set(false);

        const pendenza = this.mapApiPendenzaToPendenza(apiPendenza);

        if (verify) {
          // Show confirmation dialog
          this.pendenzaPreview.set(pendenza);
          this.showConfirmDialog.set(true);
        } else {
          // Add directly to cart
          this.addToCart(pendenza);
        }
      },
      error: (error) => {
        this.isSubmitting.set(false);
        console.error('Errore creazione pendenza:', error);

        const errorBody = error.error;
        if (errorBody?.descrizione) {
          this.errorMessage.set(errorBody.descrizione);
        } else if (errorBody?.dettaglio) {
          this.errorMessage.set(errorBody.dettaglio);
        } else {
          this.errorMessage.set(this.translate.instant('Language.Servizio.ErroreCreazionePagamento'));
        }
      }
    });
  }

  cancelConfirmation(): void {
    this.showConfirmDialog.set(false);
    this.pendenzaPreview.set(null);
  }

  confirmAndAddToCart(): void {
    const pendenza = this.pendenzaPreview();
    if (pendenza) {
      this.addToCart(pendenza);
    }
    this.showConfirmDialog.set(false);
    this.pendenzaPreview.set(null);
  }

  private addToCart(pendenza: Pendenza): void {
    // Determina il creditore dal dominio attivo o dai dati del servizio
    const servizioState = this.servizio();
    const activeDominio = this.config.activeDominio();

    let creditore = activeDominio?.label || '';
    if (!creditore && servizioState?.idDominio) {
      const dominio = this.config.getCreditore(servizioState.idDominio);
      creditore = dominio?.label || servizioState.idDominio;
    }

    const cartItem = this.pay.pendenzaToCartItem(pendenza, creditore);
    this.pay.addToCart(cartItem);

    // Navigate to cart
    this.router.navigate(['/carrello']);
  }

  // SurveyJS handlers
  onSurveyComplete(data: any): void {
    // Quando l'utente completa il survey (navigazione interna)
    this.errorMessage.set(null);
    this.surveyData.set(data);
    this.createPendenza(data, this.requiresConfirmation());
  }

  onSurveyValueChanged(event: { name: string; value: any }): void {
    // Aggiorna i dati del survey in tempo reale
    const currentData = this.surveyData();
    this.surveyData.set({ ...currentData, [event.name]: event.value });
  }

  onSurveySubmit(verify: boolean): void {
    // Chiamato dal pulsante esterno quando il form non ha navigazione interna
    this.errorMessage.set(null);
    if (!this.surveyFormRef) return;

    // Valida il form
    if (!this.surveyFormRef.validate()) {
      this.errorMessage.set(this.translate.instant('Language.Servizio.FormNonValido'));
      return;
    }

    // Ottieni i dati e crea la pendenza
    const data = this.surveyFormRef.getData();
    this.surveyData.set(data);
    this.createPendenza(data, verify);
  }

  // JSON Schema Form handlers
  onJsonSchemaSubmit(data: Record<string, unknown>): void {
    // Chiamato quando il form viene sottomesso internamente
    this.errorMessage.set(null);
    this.jsonSchemaData.set(data);
    this.createPendenza(data, this.requiresConfirmation());
  }

  onJsonSchemaChange(data: Record<string, unknown>): void {
    // Aggiorna i dati del form in tempo reale
    this.jsonSchemaData.set(data);
  }

  onJsonSchemaValidChange(isValid: boolean): void {
    // Aggiorna lo stato di validità
    this.isJsonSchemaValid.set(isValid);
  }

  onJsonSchemaFormSubmit(): void {
    // Chiamato dal pulsante esterno
    this.errorMessage.set(null);
    if (!this.isJsonSchemaValid()) {
      this.errorMessage.set(this.translate.instant('Language.Servizio.FormNonValido'));
      return;
    }

    const data = this.jsonSchemaData();
    this.createPendenza(data, this.requiresConfirmation());
  }

  /**
   * Converte una Pendenza dal modello API al formato interno usato dal componente
   */
  private mapApiPendenzaToPendenza(apiPendenza: ApiPendenza): Pendenza {
    return {
      idPendenza: apiPendenza.idPendenza,
      idTipoPendenza: apiPendenza.idTipoPendenza || '',
      idDominio: apiPendenza.dominio?.idDominio || '',
      causale: apiPendenza.causale,
      soggettoPagatore: {
        tipo: apiPendenza.soggettoPagatore?.tipo || 'F',
        identificativo: apiPendenza.soggettoPagatore?.identificativo || '',
        anagrafica: apiPendenza.soggettoPagatore?.anagrafica
      },
      importo: apiPendenza.importo,
      numeroAvviso: apiPendenza.numeroAvviso,
      dataCaricamento: apiPendenza.dataCaricamento,
      dataValidita: apiPendenza.dataValidita,
      dataScadenza: apiPendenza.dataScadenza,
      annoRiferimento: apiPendenza.annoRiferimento,
      stato: apiPendenza.stato?.toLowerCase() as any,
      voci: apiPendenza.voci?.map(voce => ({
        idVocePendenza: voce.idVocePendenza,
        importo: voce.importo,
        descrizione: voce.descrizione,
        indice: voce.indice
      })) || [],
      dominio: apiPendenza.dominio ? {
        idDominio: apiPendenza.dominio.idDominio,
        ragioneSociale: apiPendenza.dominio.ragioneSociale
      } : undefined
    };
  }
}
