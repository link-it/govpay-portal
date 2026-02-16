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

import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { LoggerService } from '@core/services/logger.service';
import { SurveyFormComponent, SurveyDefinition } from '@shared/components/survey-form';

@Component({
  selector: 'app-test-survey',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon, SurveyFormComponent],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Test SurveyJS</h1>
          <p class="text-gray-600 mt-1">Pagina di test per le form dinamiche SurveyJS</p>
        </div>
        <a
          routerLink="/pagamento-servizio"
          class="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600"
        >
          <ng-icon name="bootstrapArrowLeft"></ng-icon>
          <span>Torna ai pagamenti</span>
        </a>
      </div>

      <!-- Form container -->
      <div class="bg-white rounded-lg shadow p-6">
        @if (isLoading()) {
          <div class="flex items-center justify-center p-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span class="ml-3 text-gray-600">Caricamento form...</span>
          </div>
        } @else if (errorMessage()) {
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p class="font-medium">Errore</p>
            <p class="mt-1">{{ errorMessage() }}</p>
          </div>
        } @else if (surveyDefinition()) {
          <app-survey-form
            [definition]="surveyDefinition()!"
            [locale]="'it'"
            (surveyComplete)="onComplete($event)"
            (valueChanged)="onValueChanged($event)"
          ></app-survey-form>
        }
      </div>

      <!-- Dati raccolti -->
      @if (submittedData()) {
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-green-800 mb-4">
            <ng-icon name="bootstrapCheckCircle" class="text-green-600 mr-2"></ng-icon>
            Form completata con successo!
          </h3>
          <p class="text-green-700 mb-4">Dati raccolti:</p>
          <pre class="bg-green-100 rounded p-4 overflow-auto text-sm text-green-900">{{ submittedData() | json }}</pre>
        </div>
      }

      <!-- Log modifiche in tempo reale -->
      @if (changeLog().length > 0) {
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Log modifiche (ultime 10)
          </h3>
          <div class="space-y-2 max-h-60 overflow-auto">
            @for (log of changeLog().slice(-10).reverse(); track $index) {
              <div class="text-sm font-mono bg-white rounded p-2 border border-gray-100">
                <span class="text-primary-600">{{ log.name }}</span>
                <span class="text-gray-400"> = </span>
                <span class="text-gray-700">{{ log.value | json }}</span>
              </div>
            }
          </div>
        </div>
      }

      <!-- Info -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex gap-3">
          <ng-icon name="bootstrapInfoCircle" class="text-blue-500 text-xl shrink-0"></ng-icon>
          <div class="text-sm text-blue-700">
            <p class="font-medium">Informazioni sul test</p>
            <p class="mt-1">
              Questa pagina carica la definizione da
              <code class="bg-blue-100 px-1 rounded">assets/config/surveyjs-example.json</code>
            </p>
            <p class="mt-1">
              La form include: campi testo, dropdown, radio, checkbox, date, file upload, boolean toggle e validazioni.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TestSurveyComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly logger = inject(LoggerService);

  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly surveyDefinition = signal<SurveyDefinition | null>(null);
  protected readonly submittedData = signal<any>(null);
  protected readonly changeLog = signal<{ name: string; value: any }[]>([]);

  ngOnInit(): void {
    this.loadSurveyDefinition();
  }

  private loadSurveyDefinition(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.get<SurveyDefinition>('./assets/config/surveyjs-example.json')
      .subscribe({
        next: (definition) => {
          this.surveyDefinition.set(definition);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Errore caricamento definizione:', error);
          this.errorMessage.set('Impossibile caricare la definizione del form');
          this.isLoading.set(false);
        }
      });
  }

  onComplete(data: any): void {
    this.logger.log('Form completata:', data);
    this.submittedData.set(data);
  }

  onValueChanged(event: { name: string; value: any }): void {
    const log = this.changeLog();
    this.changeLog.set([...log, event]);
  }
}
