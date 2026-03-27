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

import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LoggerService } from '@core/services/logger.service';
import {
  JsonSchemaFormComponent,
  JsonSchemaFormDefinition
} from '@shared/components/json-schema-form';

@Component({
  selector: 'app-test-jsonform',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon, JsonSchemaFormComponent],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Test JSON Schema Form</h1>
          <p class="text-gray-600 mt-1">Pagina di test per le form dinamiche ng-formworks Material</p>
        </div>
        <a
          routerLink="/pagamento-servizio"
          class="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600"
        >
          <ng-icon name="bootstrapArrowLeft"></ng-icon>
          <span>Torna ai pagamenti</span>
        </a>
      </div>

      <!-- Lingua corrente -->
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <div class="text-sm text-gray-700">
          <span class="font-medium">Lingua corrente:</span>
          <span class="ml-2 px-2 py-0.5 bg-primary-100 text-primary-800 rounded text-xs font-mono">
            {{ currentLocale() }}
          </span>
          <span class="ml-2 text-gray-400">
            (cambia lingua dall'header per testare i datepicker)
          </span>
        </div>
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
        } @else if (formDefinition()) {
          <app-json-schema-form
            [definition]="formDefinition()!"
            [locale]="currentLocale()"
            (formChange)="onFormChange($event)"
            (formSubmit)="onFormSubmit($event)"
            (validChange)="onValidChange($event)"
          ></app-json-schema-form>
        }
      </div>

      <!-- Stato validazione -->
      <div
        class="border rounded-lg p-4"
        [class.bg-green-50]="isValid()"
        [class.border-green-200]="isValid()"
        [class.bg-red-50]="!isValid()"
        [class.border-red-200]="!isValid()"
      >
        <div class="flex items-center gap-2">
          @if (isValid()) {
            <ng-icon name="bootstrapCheckCircle" class="text-green-600"></ng-icon>
            <span class="text-green-800 font-medium">Form valida</span>
          } @else {
            <ng-icon name="bootstrapExclamationCircle" class="text-red-600"></ng-icon>
            <span class="text-red-800 font-medium">Form non valida</span>
          }
        </div>
      </div>

      <!-- Dati form in tempo reale -->
      @if (formData()) {
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Dati form (tempo reale)
          </h3>
          <pre class="bg-white rounded p-4 overflow-auto text-sm text-gray-900 border border-gray-100">{{ formData() | json }}</pre>
        </div>
      }

      <!-- Dati submit -->
      @if (submittedData()) {
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-green-800 mb-4">
            <ng-icon name="bootstrapCheckCircle" class="text-green-600 mr-2"></ng-icon>
            Form inviata!
          </h3>
          <pre class="bg-green-100 rounded p-4 overflow-auto text-sm text-green-900">{{ submittedData() | json }}</pre>
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
              <code class="bg-blue-100 px-1 rounded">assets/config/jsonform-example.json</code>
            </p>
            <p class="mt-1">
              La form include: campi testo, date (datepicker Material), date-time, email, numeri, select, textarea e checkbox.
            </p>
            <p class="mt-1">
              I datepicker dovrebbero mostrare il formato GG/MM/AAAA in italiano e DD/MM/YYYY in inglese.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TestJsonFormComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly logger = inject(LoggerService);
  private readonly translate = inject(TranslateService);

  private langSub?: Subscription;

  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly formDefinition = signal<JsonSchemaFormDefinition | null>(null);
  protected readonly formData = signal<Record<string, unknown> | null>(null);
  protected readonly submittedData = signal<Record<string, unknown> | null>(null);
  protected readonly isValid = signal(false);
  protected readonly currentLocale = signal('it');

  ngOnInit(): void {
    this.currentLocale.set(this.translate.getCurrentLang() || 'it');
    this.langSub = this.translate.onLangChange.subscribe(event => {
      this.currentLocale.set(event.lang);
    });
    this.loadFormDefinition();
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private loadFormDefinition(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.get<JsonSchemaFormDefinition>('./assets/config/jsonform-example.json')
      .subscribe({
        next: (definition) => {
          this.formDefinition.set(definition);
          this.isLoading.set(false);
          this.logger.log('[TestJsonForm] Definizione caricata:', definition);
        },
        error: (error) => {
          console.error('Errore caricamento definizione:', error);
          this.errorMessage.set('Impossibile caricare la definizione del form');
          this.isLoading.set(false);
        }
      });
  }

  protected onFormChange(data: Record<string, unknown>): void {
    this.formData.set(data);
  }

  protected onFormSubmit(data: Record<string, unknown>): void {
    this.logger.log('[TestJsonForm] Form inviata:', data);
    this.submittedData.set(data);
  }

  protected onValidChange(valid: boolean): void {
    this.isValid.set(valid);
  }
}
