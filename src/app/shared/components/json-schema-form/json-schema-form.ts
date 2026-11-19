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
 * Wrapper per @ajsf (Angular JSON Schema Form) che renderizza form dinamici
 * basati su JSON Schema (formato angular2-json-schema-form, di cui @ajsf è il
 * proseguimento: le definizioni dei tipi pendenza esistenti restano valide).
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
  inject,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { MaterialDesignFrameworkModule } from '@ajsf/material';
import {
  JsonSchemaFormComponent as AjsfFormComponent,
  JsonValidators,
  isNumber,
  hasValue,
  isEmpty,
  xor
} from '@ajsf/core';

/**
 * Patch: fix floating point per validatore multipleOf di @ajsf.
 * Il validatore originale verifica che `currentValue / multipleOfValue` sia
 * intero, e fallisce con i decimali (es. 29.40 / 0.01 = 2939.9999999999995).
 * Questa versione usa un confronto con epsilon. @ajsf risolve i validatori
 * per nome al momento dell'uso, quindi la sostituzione vale per tutti i form.
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
 * Condizioni di visibilità del layout ({ "condition": { "functionBody": "..." } }).
 *
 * Le definizioni dei tipi pendenza contengono corpi di funzione JavaScript, per
 * esempio `try { return model.tipo && model.tipo === 'Annuale' } catch(e){ return false; }`.
 * angular2-json-schema-form e ng-formworks li eseguivano con
 * `new Function('model', 'arrayIndices', functionBody)`. @ajsf 22 non lo fa più:
 * accetta solo un confronto semplice (`return model.x === "valore"`) e per ogni altra
 * espressione mostra sempre il campo. Accetta però una condizione già compilata come
 * funzione: qui si converte ogni functionBody in una funzione che si comporta come
 * in ng-formworks, così le definizioni esistenti restano valide senza modifiche.
 *
 * Come ng-formworks:
 * - "functionBody" viene riscritto con l'accesso sicuro (`model.a.b` -> `model?.a?.b`),
 *   perché un dato non ancora valorizzato non faccia fallire la condizione;
 *   "functionBodyRaw" si esegue com'è;
 * - se la condizione va in errore il campo resta visibile.
 * Limite: @ajsf passa alla funzione solo il modello, quindi `arrayIndices` è
 * undefined (nessuna definizione nota usa condizioni dentro gli array).
 */
const conditionCache = new Map<string, (model: unknown) => boolean>();

export function compileCondition(functionBody: string, raw = false): (model: unknown) => boolean {
  const body = raw ? functionBody : functionBody
    .replace(/\[/g, '.[').split('.').join('?.')
    .replace(/\?\?\./g, '?')
    .replace(/(\?)(\.\[)/g, '[');
  const key = (raw ? 'raw:' : '') + functionBody;
  let fn = conditionCache.get(key);
  if (!fn) {
    let compiled: ((model: unknown, arrayIndices: unknown) => unknown) | null = null;
    try {
      compiled = new Function('model', 'arrayIndices', body) as (model: unknown, arrayIndices: unknown) => unknown;
    } catch (e) {
      console.error('condition functionBody non valida: ' + functionBody, e);
    }
    fn = (model: unknown) => {
      if (!compiled) return true;
      try {
        return !!compiled(model, undefined);
      } catch (e) {
        console.error('condition functionBody errored out on evaluation: ' + functionBody, e);
        return true;
      }
    };
    conditionCache.set(key, fn);
  }
  return fn;
}

/**
 * Restituisce una copia del layout con le condizioni functionBody/functionBodyRaw
 * convertite in funzioni (vedi compileCondition). Il layout originale non cambia.
 */
export function compileLayoutConditions<T>(node: T): T {
  if (Array.isArray(node)) {
    return node.map(item => compileLayoutConditions(item)) as T;
  }
  if (node === null || typeof node !== 'object') {
    return node;
  }
  const copy: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key === 'condition' && value && typeof value === 'object' && !Array.isArray(value)) {
      const c = value as { functionBody?: unknown; functionBodyRaw?: unknown };
      if (typeof c.functionBodyRaw === 'string') {
        copy[key] = compileCondition(c.functionBodyRaw, true);
        continue;
      }
      if (typeof c.functionBody === 'string') {
        copy[key] = compileCondition(c.functionBody);
        continue;
      }
    }
    copy[key] = compileLayoutConditions(value);
  }
  return copy as T;
}

/**
 * Campi del layout con una condizione di visibilità già compilata in funzione:
 * la chiave del dato ("key") e la condizione.
 */
export function collectConditionalFields(node: unknown): { key: string; condition: (model: unknown) => boolean }[] {
  const result: { key: string; condition: (model: unknown) => boolean }[] = [];
  const visit = (n: unknown) => {
    if (Array.isArray(n)) {
      n.forEach(visit);
      return;
    }
    if (n === null || typeof n !== 'object') return;
    const obj = n as Record<string, unknown>;
    if (typeof obj['key'] === 'string' && typeof obj['condition'] === 'function') {
      result.push({ key: obj['key'], condition: obj['condition'] as (model: unknown) => boolean });
    }
    Object.values(obj).forEach(visit);
  };
  visit(node);
  return result;
}

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
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    @if (schema) {
      <!-- Il tema Material si applica con una classe (src/json-schema-form-theme.scss) -->
      <div [class]="theme">
        <json-schema-form
          [schema]="schema"
          [layout]="currentLayout"
          [data]="data"
          [options]="currentOptions"
          framework="material-design"
          (onSubmit)="onFormSubmit($event)"
          (onChanges)="onFormChange($any($event))"
          (isValid)="onValidChange($event)"
        ></json-schema-form>
      </div>
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

  /**
   * Form interno di @ajsf, per svuotare i campi nascosti da una condizione
   */
  @ViewChild(AjsfFormComponent) private ajsfForm?: AjsfFormComponent;

  /**
   * Campi con condizione di visibilità e ultima visibilità calcolata
   */
  private conditionalFields: { key: string; condition: (model: unknown) => boolean }[] = [];
  private visibility = new Map<string, boolean>();

  /**
   * Imposta il layout corrente, con le condizioni compilate in funzioni
   */
  private setLayout(layout: JsonSchemaFormLayout | undefined): void {
    this.currentLayout = layout ? compileLayoutConditions(layout) : EMPTY_LAYOUT;
    this.conditionalFields = collectConditionalFields(this.currentLayout);
    this.visibility = new Map();
  }

  /**
   * Svuota i campi che una condizione ha appena nascosto (visibili prima, nascosti
   * ora), come faceva ng-formworks: il loro valore non resta nei dati inviati e, se
   * il campo ricompare, è vuoto. Un campo nascosto fin dall'inizio conserva il suo
   * eventuale default, come in ng-formworks. @ajsf da solo conserverebbe il valore.
   *
   * Restituisce true se ha svuotato qualcosa: il cambio di valore genera un nuovo
   * evento di modifica, con i dati già puliti.
   */
  private clearHiddenFields(data: Record<string, unknown>): boolean {
    const formGroup = this.ajsfForm?.jsf?.formGroup;
    let cleared = false;
    for (const { key, condition } of this.conditionalFields) {
      const visible = condition(data);
      const before = this.visibility.get(key);
      this.visibility.set(key, visible);
      if (before === true && !visible) {
        const control = formGroup?.get(key);
        if (control && hasValue(control.value)) {
          control.setValue(null);
          cleared = true;
        }
      }
    }
    return cleared;
  }

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
      this.setLayout(this.layout);
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
    // In @ajsf le opzioni predefinite dei widget si passano come "defaultOptions"
    // (ng-formworks usava "defaultWidgetOptions", che @ajsf ignorerebbe)
    this.currentOptions = {
      addSubmit: false,
      // Valori "default": come ng-formworks, usato finora dal portale v2, si applicano
      // quelli dello schema e non quelli del layout. Applicare anche questi
      // cambierebbe i dati inviati rispetto a oggi.
      setLayoutDefaults: false,
      defaultOptions: {
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
      const layout =
        this.definition['layout_' + langCode] as JsonSchemaFormLayout ||
        this.definition.layout;
      this.setLayout(layout);
    } else {
      this.setLayout(this.layout);
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
    if (this.clearHiddenFields(data)) return;
    this.formChange.emit(data);
  }

  /**
   * Handler per cambio validità
   */
  onValidChange(isValid: boolean): void {
    this.validChange.emit(isValid);
  }
}
