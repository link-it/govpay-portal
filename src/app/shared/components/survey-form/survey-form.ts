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

import {
  Component,
  input,
  output,
  effect,
  signal,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Model, SurveyModel, surveyLocalization } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
// Importa locale italiano (side effect - registra automaticamente il locale)
import 'survey-core/i18n/italian';
// Importa i temi SurveyJS
import * as SurveyThemes from 'survey-core/themes';
import { SurveyExtensionsService } from '@core/services';

// Interfaccia per definizione form SurveyJS
export interface SurveyDefinition {
  title?: string;
  description?: string;
  logoPosition?: string;
  pages?: any[];
  elements?: any[];
  showQuestionNumbers?: string | boolean;
  showProgressBar?: string;
  progressBarType?: string;
  goNextPageAutomatic?: boolean;
  showNavigationButtons?: boolean | string;
  questionsOnPageMode?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule, SurveyModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './survey-form.html'
})
export class SurveyFormComponent implements OnDestroy {
  private readonly translate = inject(TranslateService);
  private readonly surveyExtensions = inject(SurveyExtensionsService);

  // Inputs
  readonly definition = input.required<SurveyDefinition>();
  readonly data = input<any>({});
  readonly readOnly = input(false);
  readonly locale = input<string>('it');
  readonly submitting = input(false);

  // Outputs
  readonly surveyComplete = output<any>();
  readonly valueChanged = output<{ name: string; value: any }>();
  readonly currentPageChanged = output<{ oldPage: any; newPage: any }>();

  // State
  protected readonly surveyModel = signal<SurveyModel | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    // Configurazione globale SurveyJS
    this.configureSurveyJS();

    // Effect per creare/aggiornare il modello quando cambia la definizione
    // Carica le estensioni prima di creare il modello
    effect(() => {
      const def = this.definition();
      const data = this.data();
      const readOnly = this.readOnly();
      const locale = this.locale();

      this.surveyExtensions.loadExtensions().then(() => {
        this.createSurveyModel(def, data, readOnly, locale);
      });
    });

    // Effect per gestire lo stato di submitting
    effect(() => {
      const isSubmitting = this.submitting();
      const model = this.surveyModel();
      if (model) {
        if (isSubmitting) {
          // Disabilita il form durante il submit mantenendo i pulsanti visibili
          model.completeText = 'Verifica in corso...';
          // Disabilita tutti i campi
          model.getAllQuestions().forEach(q => q.readOnly = true);
        } else {
          // Ripristina lo stato normale
          model.completeText = surveyLocalization.locales[model.locale]?.completeText || 'Verifica';
          // Riabilita tutti i campi
          model.getAllQuestions().forEach(q => q.readOnly = false);
        }
      }
    });
  }

  ngOnDestroy(): void {
    const model = this.surveyModel();
    if (model) {
      model.dispose();
    }
  }

  private configureSurveyJS(): void {
    // Il locale italiano è già importato da 'survey-core/i18n/italian'
    // Qui aggiungiamo/sovrascriviamo eventuali traduzioni personalizzate
    const itLocale = surveyLocalization.locales['it'];
    if (itLocale) {
      // Personalizzazioni aggiuntive
      itLocale.pagePrevText = 'Indietro';
      itLocale.pageNextText = 'Avanti';
      itLocale.completeText = 'Verifica';
      itLocale.requiredError = 'Campo obbligatorio';
      itLocale.numericError = 'Inserisci un valore numerico';
      itLocale.textMinLength = 'Inserisci almeno {0} caratteri';
      itLocale.textMaxLength = 'Inserisci massimo {0} caratteri';
      itLocale.minError = 'Il valore deve essere maggiore o uguale a {0}';
      itLocale.maxError = 'Il valore deve essere minore o uguale a {0}';
      itLocale.invalidEmail = 'Inserisci un indirizzo email valido';
      itLocale.selectAllItemText = 'Seleziona tutto';
      itLocale.otherItemText = 'Altro';
      itLocale.noneItemText = 'Nessuno';
      itLocale.emptyMessage = 'Nessun dato disponibile';
      itLocale.loadingFile = 'Caricamento...';
      itLocale.chooseFile = 'Scegli file...';
      itLocale.noFileChosen = 'Nessun file selezionato';
      itLocale.clearCaption = 'Cancella';
      itLocale.removeFileCaption = 'Rimuovi file';
      itLocale.booleanCheckedLabel = 'Sì';
      itLocale.booleanUncheckedLabel = 'No';
      itLocale.confirmDelete = 'Confermi l\'eliminazione?';
      itLocale.addRow = 'Aggiungi riga';
      itLocale.removeRow = 'Rimuovi';
      itLocale.addPanel = 'Aggiungi';
      itLocale.removePanel = 'Rimuovi';
      itLocale.progressText = 'Pagina {0} di {1}';
      // Messaggi di validazione aggiuntivi
      itLocale.urlRequestError = 'Errore durante la richiesta: {0}';
      itLocale.urlGetChoicesError = 'Nessun dato disponibile o percorso non valido';
      itLocale.exceedMaxSize = 'Il file non deve superare {0}';
      itLocale.otherRequiredError = 'Inserisci il valore per "Altro"';
      itLocale.uploadingFile = 'Caricamento in corso...';
      itLocale.savingData = 'Salvataggio in corso...';
      itLocale.savingDataError = 'Errore durante il salvataggio';
      itLocale.savingDataSuccess = 'Dati salvati correttamente';
    }

    // Imposta italiano come locale di default
    surveyLocalization.defaultLocale = 'it';
  }

  private createSurveyModel(
    definition: SurveyDefinition,
    data: any,
    readOnly: boolean,
    locale: string
  ): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      // Crea il modello SurveyJS
      const survey = new Model(definition);

      // Applica tema Flat Light
      survey.applyTheme(SurveyThemes.FlatLight);

      // Configura la lingua
      survey.locale = locale;

      // Non mostrare la pagina di completamento (il controllo viene gestito esternamente)
      survey.showCompletedPage = false;

      // Nascondi i pulsanti di navigazione interni (usiamo pulsante esterno per coerenza)
      survey.showNavigationButtons = 'none';

      // Mostra errori sotto i campi
      survey.questionErrorLocation = 'bottom';

      // Valida i campi al cambio valore (necessario per expression validators)
      survey.checkErrorsMode = 'onValueChanged';

      // Imposta i dati iniziali
      if (data && Object.keys(data).length > 0) {
        survey.data = data;
      }

      // Configura lo stato di sola lettura
      if (readOnly) {
        survey.mode = 'display';
      }

      // Nascondi titolo se non presente nella definizione
      if (!definition.title) {
        survey.showTitle = false;
      }

      // Event handlers
      // Intercetta il completing per prevenire che il form venga nascosto
      survey.onCompleting.add((sender, options) => {
        // Emetti i dati prima di prevenire il complete
        this.surveyComplete.emit(sender.data);
        // Previeni il comportamento di default (nascondere il form)
        options.allow = false;
      });

      survey.onValueChanged.add((sender, options) => {
        this.valueChanged.emit({
          name: options.name,
          value: options.value
        });
      });

      survey.onCurrentPageChanged.add((sender, options) => {
        this.currentPageChanged.emit({
          oldPage: options.oldCurrentPage,
          newPage: options.newCurrentPage
        });
      });

      // Imposta il modello
      this.surveyModel.set(survey);
    } catch (error) {
      console.error('Errore creazione SurveyJS model:', error);
      this.errorMessage.set('Errore durante il caricamento del form');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Metodi pubblici per controllo esterno
  getData(): any {
    return this.surveyModel()?.data || {};
  }

  setData(data: any): void {
    const model = this.surveyModel();
    if (model) {
      model.data = data;
    }
  }

  validate(): boolean {
    const model = this.surveyModel();
    if (!model) return false;

    return model.validate(true, true);
  }

  doComplete(): void {
    const model = this.surveyModel();
    if (model) {
      model.doComplete();
    }
  }

  goToPage(pageNumber: number): void {
    const model = this.surveyModel();
    if (model && pageNumber >= 0 && pageNumber < model.visiblePageCount) {
      model.currentPageNo = pageNumber;
    }
  }

  nextPage(): void {
    const model = this.surveyModel();
    if (model && !model.isLastPage) {
      model.nextPage();
    }
  }

  prevPage(): void {
    const model = this.surveyModel();
    if (model && !model.isFirstPage) {
      model.prevPage();
    }
  }
}
