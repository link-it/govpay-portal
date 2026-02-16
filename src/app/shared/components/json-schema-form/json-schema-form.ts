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

/**
 * JSON Schema Form Component
 *
 * Wrapper per ng-formworks che renderizza form dinamici
 * basati su JSON Schema (formato angular2-json-schema-form).
 *
 * Usato per i tipi pendenza con form.tipo = 'angular2-json-schema-form'
 */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignFrameworkModule } from '@ng-formworks/material';

/**
 * Messaggi di validazione in italiano
 */
const VALIDATION_MESSAGES_IT: Record<string, string | ((error: any) => string)> = {
  required: 'Campo obbligatorio.',
  minLength: 'Deve contenere almeno {{minimumLength}} caratteri.',
  maxLength: 'Deve contenere al massimo {{maximumLength}} caratteri.',
  pattern: 'Formato non valido.',
  format: 'Formato non valido. Richiesto: {{requiredFormat}}.',
  minimum: 'Il valore deve essere almeno {{minimumValue}}.',
  exclusiveMinimum: 'Il valore deve essere maggiore di {{exclusiveMinimumValue}}.',
  maximum: 'Il valore deve essere al massimo {{maximumValue}}.',
  exclusiveMaximum: 'Il valore deve essere minore di {{exclusiveMaximumValue}}.',
  multipleOf: (error: any) => {
    if ((1 / error.multipleOfValue) % 10 === 0) {
      const decimals = Math.log10(1 / error.multipleOfValue);
      return `Deve avere al massimo ${decimals} decimali.`;
    }
    return `Deve essere un multiplo di ${error.multipleOfValue}.`;
  },
  minProperties: 'Deve avere almeno {{minimumProperties}} proprietà.',
  maxProperties: 'Deve avere al massimo {{maximumProperties}} proprietà.',
  minItems: 'Deve contenere almeno {{minimumItems}} elementi.',
  maxItems: 'Deve contenere al massimo {{maximumItems}} elementi.',
  uniqueItems: 'Gli elementi devono essere unici.',
  type: 'Tipo non valido. Richiesto: {{requiredType}}.',
  const: 'Il valore deve essere {{requiredValue}}.',
  enum: 'Deve essere uno dei valori consentiti.',
  email: 'Inserire un indirizzo email valido.',
  url: 'Inserire un URL valido.',
  date: 'Inserire una data valida.',
  'date-time': 'Inserire una data e ora valide.',
  time: 'Inserire un\'ora valida.',
  ipv4: 'Inserire un indirizzo IPv4 valido.',
  ipv6: 'Inserire un indirizzo IPv6 valido.',
};

/**
 * Messaggi di validazione in inglese
 */
const VALIDATION_MESSAGES_EN: Record<string, string | ((error: any) => string)> = {
  required: 'This field is required.',
  minLength: 'Must be at least {{minimumLength}} characters long.',
  maxLength: 'Must be at most {{maximumLength}} characters long.',
  pattern: 'Invalid format.',
  format: 'Invalid format. Required: {{requiredFormat}}.',
  minimum: 'Value must be at least {{minimumValue}}.',
  exclusiveMinimum: 'Value must be greater than {{exclusiveMinimumValue}}.',
  maximum: 'Value must be at most {{maximumValue}}.',
  exclusiveMaximum: 'Value must be less than {{exclusiveMaximumValue}}.',
  multipleOf: (error: any) => {
    if ((1 / error.multipleOfValue) % 10 === 0) {
      const decimals = Math.log10(1 / error.multipleOfValue);
      return `Must have ${decimals} or fewer decimal places.`;
    }
    return `Must be a multiple of ${error.multipleOfValue}.`;
  },
  minProperties: 'Must have at least {{minimumProperties}} properties.',
  maxProperties: 'Must have at most {{maximumProperties}} properties.',
  minItems: 'Must contain at least {{minimumItems}} items.',
  maxItems: 'Must contain at most {{maximumItems}} items.',
  uniqueItems: 'Items must be unique.',
  type: 'Invalid type. Required: {{requiredType}}.',
  const: 'Value must be {{requiredValue}}.',
  enum: 'Must be one of the allowed values.',
  email: 'Please enter a valid email address.',
  url: 'Please enter a valid URL.',
  date: 'Please enter a valid date.',
  'date-time': 'Please enter a valid date and time.',
  time: 'Please enter a valid time.',
  ipv4: 'Please enter a valid IPv4 address.',
  ipv6: 'Please enter a valid IPv6 address.',
};

/**
 * Opzioni pre-costruite per evitare ricreazione ad ogni change detection
 */
const FORM_OPTIONS_IT: Record<string, unknown> = {
  addSubmit: false,
  defaultWidgetOptions: {
    validationMessages: VALIDATION_MESSAGES_IT
  }
};

const FORM_OPTIONS_EN: Record<string, unknown> = {
  addSubmit: false,
  defaultWidgetOptions: {
    validationMessages: VALIDATION_MESSAGES_EN
  }
};

/**
 * Array vuoto condiviso per evitare ricreazione
 */
const EMPTY_LAYOUT: unknown[] = [];

/**
 * Struttura dello schema JSON Schema per il form
 */
export interface JsonSchemaFormSchema {
  type?: string;
  required?: string[];
  properties?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Struttura del layout per il form
 */
export type JsonSchemaFormLayout = unknown[];

/**
 * Struttura completa della definizione form (da jsfDef decodificato)
 */
export interface JsonSchemaFormDefinition {
  schema?: JsonSchemaFormSchema;
  uiSchema?: Record<string, unknown>;
  layout?: JsonSchemaFormLayout;
  layout_ita?: JsonSchemaFormLayout;
  layout_eng?: JsonSchemaFormLayout;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

@Component({
  selector: 'app-json-schema-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialDesignFrameworkModule
  ],
  template: `
    @if (schema) {
      <json-schema-form
        [schema]="schema"
        [layout]="currentLayout"
        [data]="data"
        [options]="currentOptions"
        framework="material-design"
        [theme]="theme"
        (onSubmit)="onFormSubmit($event)"
        (onChanges)="onFormChange($any($event))"
        (isValid)="onValidChange($event)"
      ></json-schema-form>
    } @else {
      <div class="text-center py-8 text-gray-500">
        <p>Schema del form non disponibile</p>
      </div>
    }
  `
})
export class JsonSchemaFormComponent implements OnChanges {
  /**
   * Definizione completa del form (contiene schema, layout, data)
   */
  @Input() definition?: JsonSchemaFormDefinition;

  /**
   * Schema JSON Schema (alternativo a definition)
   */
  @Input() schema?: JsonSchemaFormSchema;

  /**
   * Layout del form (alternativo a definition)
   */
  @Input() layout?: JsonSchemaFormLayout;

  /**
   * Dati iniziali del form
   */
  @Input() data?: Record<string, unknown>;

  /**
   * Locale corrente ('it' o 'en')
   */
  @Input() locale: string = 'it';

  /**
   * Tema Material Design
   */
  @Input() theme: string = 'indigo-pink';

  /**
   * Emesso quando il form viene sottomesso
   */
  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();

  /**
   * Emesso quando i valori del form cambiano
   */
  @Output() formChange = new EventEmitter<Record<string, unknown>>();

  /**
   * Emesso quando cambia la validità del form
   */
  @Output() validChange = new EventEmitter<boolean>();

  /**
   * Layout corrente (memorizzato per evitare ricreazione)
   */
  currentLayout: unknown[] = EMPTY_LAYOUT;

  /**
   * Opzioni correnti (memorizzate per evitare ricreazione)
   */
  currentOptions: Record<string, unknown> = FORM_OPTIONS_IT;

  ngOnChanges(changes: SimpleChanges): void {
    // Se viene passata una definition, estrai schema, layout e data
    if (changes['definition'] && this.definition) {
      this.extractFromDefinition();
    }

    // Se cambia il locale, aggiorna layout e opzioni
    if (changes['locale']) {
      this.updateForLocale();
    }

    // Se cambia il layout direttamente
    if (changes['layout']) {
      this.currentLayout = this.layout || EMPTY_LAYOUT;
    }
  }

  /**
   * Estrae schema, layout e data dalla definizione
   */
  private extractFromDefinition(): void {
    if (!this.definition) return;

    // Estrai schema
    if (this.definition.schema) {
      this.schema = this.definition.schema;
    }

    // Estrai dati iniziali
    if (this.definition.data && !this.data) {
      this.data = this.definition.data;
    }

    // Estrai layout per locale
    this.updateForLocale();
  }

  /**
   * Aggiorna layout e opzioni in base al locale corrente
   */
  private updateForLocale(): void {
    // Aggiorna opzioni
    this.currentOptions = this.locale === 'en' ? FORM_OPTIONS_EN : FORM_OPTIONS_IT;

    // Aggiorna layout se abbiamo una definition
    if (this.definition) {
      const langCode = this.locale === 'en' ? 'eng' : 'ita';
      this.currentLayout =
        this.definition['layout_' + langCode] as JsonSchemaFormLayout ||
        this.definition.layout ||
        EMPTY_LAYOUT;
    } else {
      this.currentLayout = this.layout || EMPTY_LAYOUT;
    }
  }

  /**
   * Handler per submit del form
   */
  onFormSubmit(data: Record<string, unknown>): void {
    this.formSubmit.emit(data);
  }

  /**
   * Handler per cambio valori
   */
  onFormChange(data: Record<string, unknown>): void {
    this.formChange.emit(data);
  }

  /**
   * Handler per cambio validità
   */
  onValidChange(isValid: boolean): void {
    this.validChange.emit(isValid);
  }
}
