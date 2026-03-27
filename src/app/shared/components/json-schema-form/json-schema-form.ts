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
  SimpleChanges,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { MaterialDesignFrameworkModule } from '@ng-formworks/material';
import { JsonValidators, isNumber, hasValue, isEmpty, xor } from '@ng-formworks/core';

/**
 * Patch: fix floating point per validatore multipleOf di ng-formworks.
 * Il validatore originale usa `currentValue % multipleOfValue === 0`
 * che fallisce con decimali (es. 29.40 % 0.01 !== 0 per floating point).
 * Questa versione usa un confronto con epsilon.
 */
(JsonValidators as any).multipleOf = (multipleOfValue: number) => {
  if (!hasValue(multipleOfValue)) {
    return JsonValidators.nullValidator;
  }
  return (control: any, invert = false) => {
    if (isEmpty(control.value)) {
      return null;
    }
    const currentValue = control.value;
    const remainder = Math.abs(currentValue % multipleOfValue);
    const isValid = isNumber(currentValue) &&
      (remainder < 1e-10 || Math.abs(remainder - Math.abs(multipleOfValue)) < 1e-10);
    return xor(isValid, invert) ?
      null : { 'multipleOf': { multipleOfValue, currentValue } };
  };
};

const V = 'Language.Validation';

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
  private readonly dateAdapter = inject(DateAdapter);
  private readonly translate = inject(TranslateService);
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
  currentOptions: Record<string, unknown> = { addSubmit: false };

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
    // Aggiorna locale Material DatePicker
    this.dateAdapter.setLocale(this.locale);

    // Costruisce i messaggi di validazione dalla lingua corrente via i18n
    const t = (key: string) => this.translate.instant(`${V}.${key}`);
    this.currentOptions = {
      addSubmit: false,
      defaultWidgetOptions: {
        validationMessages: {
          required: t('Required'),
          minLength: t('MinLength'),
          maxLength: t('MaxLength'),
          pattern: t('Pattern'),
          format: t('Format'),
          minimum: t('Minimum'),
          exclusiveMinimum: t('ExclusiveMinimum'),
          maximum: t('Maximum'),
          exclusiveMaximum: t('ExclusiveMaximum'),
          multipleOf: (error: any) => {
            if ((1 / error.multipleOfValue) % 10 === 0) {
              const decimals = Math.log10(1 / error.multipleOfValue);
              return this.translate.instant(`${V}.MultipleOfDecimals`, { decimals });
            }
            return this.translate.instant(`${V}.MultipleOf`, { multipleOfValue: error.multipleOfValue });
          },
          minProperties: t('MinProperties'),
          maxProperties: t('MaxProperties'),
          minItems: t('MinItems'),
          maxItems: t('MaxItems'),
          uniqueItems: t('UniqueItems'),
          type: t('Type'),
          const: t('Const'),
          enum: t('Enum'),
          email: t('Email'),
          url: t('Url'),
          date: t('Date'),
          'date-time': t('DateTime'),
          time: t('Time'),
          ipv4: t('Ipv4'),
          ipv6: t('Ipv6'),
        }
      }
    };

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
