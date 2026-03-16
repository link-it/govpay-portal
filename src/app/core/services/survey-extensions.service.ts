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

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FunctionFactory } from 'survey-core';
import { LoggerService } from './logger.service';

interface ExtensionsManifest {
  scripts: string[];
}

interface SurveyCustomFunction {
  name: string;
  method: (params: any[], originalParams?: any[]) => any;
  isAsync: boolean;
}

declare global {
  interface Window {
    SurveyCustomFunctions?: SurveyCustomFunction[];
  }
}

@Injectable({ providedIn: 'root' })
export class SurveyExtensionsService {
  private readonly http = inject(HttpClient);
  private readonly logger = inject(LoggerService);

  private readonly EXTENSIONS_PATH = 'assets/extensions/';
  private loaded = false;
  private loadingPromise: Promise<void> | null = null;

  async loadExtensions(): Promise<void> {
    if (this.loaded) return;
    if (this.loadingPromise) return this.loadingPromise;

    this.loadingPromise = this.doLoad();
    return this.loadingPromise;
  }

  private async doLoad(): Promise<void> {
    try {
      const manifest = await firstValueFrom(
        this.http.get<ExtensionsManifest>(this.EXTENSIONS_PATH + 'extensions.json')
      );

      if (!manifest?.scripts?.length) {
        this.logger.debug('[SurveyExtensions] Nessun script da caricare');
        this.loaded = true;
        return;
      }

      // Carica gli script in sequenza (ordine garantito)
      for (const script of manifest.scripts) {
        await this.loadScript(this.EXTENSIONS_PATH + script);
        this.logger.debug(`[SurveyExtensions] Caricato: ${script}`);
      }

      // Registra le custom functions con SurveyJS
      this.registerCustomFunctions();
      this.loaded = true;
    } catch (error) {
      this.logger.error('[SurveyExtensions] Errore caricamento estensioni:', error);
      this.loaded = true;
    }
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Controlla se lo script è già presente nel DOM
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Errore caricamento script: ${src}`));
      document.head.appendChild(script);
    });
  }

  private registerCustomFunctions(): void {
    const customFunctions = window.SurveyCustomFunctions;
    if (!customFunctions?.length) {
      this.logger.debug('[SurveyExtensions] Nessuna custom function da registrare');
      return;
    }

    for (const fn of customFunctions) {
      if (FunctionFactory.Instance.hasFunction(fn.name)) {
        this.logger.debug(`[SurveyExtensions] Funzione già registrata: ${fn.name}`);
        continue;
      }

      FunctionFactory.Instance.register(fn.name, fn.method, fn.isAsync);
      this.logger.info(`[SurveyExtensions] Registrata funzione: ${fn.name}`);
    }
  }
}
