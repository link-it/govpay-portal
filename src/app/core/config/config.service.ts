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

import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import {
  AppConfig,
  AppInfo,
  BrandingConfig,
  ApiConfig,
  AuthConfig,
  FeatureFlags,
  UiConfig,
  RoutingConfig,
  SortingConfig,
  DominiConfig,
  Creditore,
  Lingua,
  ThemeConfig,
  PagoPAConfig
} from './app-config.model';

const CONFIG_URL = './assets/config/app-config.json';
const THEME_URL = './assets/config/theme.json';
const DOMINI_URL = './assets/config/domini.json';

/**
 * Configurazione di default usata come fallback
 */
const DEFAULT_THEME: ThemeConfig = {
  topBar: {
    background: '#ffffff',
    text: '#17324d',
    border: 'rgba(0,0,0,0.08)',
  },
  header: {
    background: '#e3f2fd',
    text: '#17324d',
    border: 'rgba(0,0,0,0.08)',
    tabActive: '#0066cc',
    tabInactive: '#5c6f82',
    tabHover: '#004d99',
    cartBadgeBackground: '#dc3545',
    cartBadgeText: '#ffffff',
  },
  sidebar: {
    background: '#ffffff',
    border: '#e5e7eb',
    headerBackground: '#e3f2fd',
    headerText: '#17324d',
    headerBorder: '#e5e7eb',
    menuBackground: '#ffffff',
    menuText: '#5c6f82',
    menuHover: '#f3f4f6',
    menuActive: '#0066cc',
    menuActiveBackground: '#e3f2fd',
    footerBackground: '#f5f7fa',
    footerBorder: '#e5e7eb',
    footerText: '#5c6f82',
  },
  content: {
    background: '#f5f7fa',
    cardBackground: '#ffffff',
    cardBorder: '#e5e7eb',
    cardHover: '#f9fafb',
  },
  buttons: {
    primaryBackground: '#0066cc',
    primaryText: '#ffffff',
    primaryHover: '#004d99',
    secondaryBackground: '#ffffff',
    secondaryText: '#17324d',
    secondaryBorder: '#d1d5db',
    secondaryHover: '#f3f4f6',
  },
  cards: {
    colors: ['#ffc107', '#dc3545', '#0066cc', '#28a745', '#6f42c1', '#17a2b8', '#fd7e14', '#20c997'],
  },
  boxes: {
    background: '#ffffff',
    border: 'rgba(33,33,33,.2)',
    itemDivider: '#f3f4f6',
    hoverType: 'border',
    hoverBorderColor: '#2962ff',
    hoverShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    itemBackground: '#ffffff',
    itemBorderRadius: '0.5rem',
    itemGap: '0.5rem',
    itemsPadding: '0.75rem',
    cardBorderRadius: '0.75rem',
    cardTitleBackground: '#f3f4f6',
    groupBorderRadius: '0.75rem',
    groupBackground: '#f3f4f6',
  },
  fonts: {
    primary: {
      family: 'Titillium Web',
      files: [
        { weight: '300', src: './assets/fonts/titillium-web-300.woff2' },
        { weight: '400', src: './assets/fonts/titillium-web-400.woff2' },
        { weight: '600', src: './assets/fonts/titillium-web-600.woff2' },
        { weight: '700', src: './assets/fonts/titillium-web-700.woff2' },
      ],
    },
  },
  scrollToTop: {
    enabled: true,
    background: '#0066cc',
    text: '#ffffff',
    hover: '#004d99',
    size: '3rem',
    borderRadius: '50%',
    bottom: '1.5rem',
    right: '1.5rem',
    scrollThreshold: 300,
  },
};

const DEFAULT_CONFIG: AppConfig = {
  app: {
    name: 'Pagamenti online',
    title: 'Gestione pagamenti',
    subtitle: '',
    description: '',
    version: '2.0.0',
  },
  branding: {
    logo: {
      full: '',
      compact: '',
      showTitle: true,
      fallbackText: 'PP',
      fallbackGradient: { from: '#0066cc', to: '#004d99' },
    },
    primaryColor: '#0066cc',
    secondaryColor: '#17324d',
    theme: DEFAULT_THEME,
  },
  api: {
    baseUrl: '',
    portalUrl: '',
    timeout: 30000,
    retryAttempts: 3,
    useMockApi: false,
    useSpidDevHeaders: false,
  },
  auth: {
    spid: {
      enabled: false,
      serviceTarget: '',
      testProvider: '',
      actionFormUrl: '',
      authnContextClassRef: '',
    },
    iam: {
      enabled: false,
      loginUrl: '',
    },
    logoutUrl: '',
    logoutUrls: [],
    logoutLandingPage: '/',
    logoutLandingPageTarget: '_self',
  },
  features: {
    recaptcha: { enabled: false, siteKey: '' },
    qrScanner: true,
    uuidCheck: false,
    darkMode: false,
  },
  ui: {
    pollingInterval: 3000,
    pollingTimeout: 5,
    mobileBreakpoint: 768,
    languages: [
      { language: 'Italiano', alpha2Code: 'it', alpha3Code: 'ita' },
    ],
    layout: {
      flatView: true,
      flatViewGrid: true,
      showCounter: false,
      showToggleLayout: false,
    },
    collapsibleSections: {
      informazioniDettaglioServizio: true,
    },
  },
  routing: {
    publicAccess: 'pagamento-servizio',
    publicExit: 'pagamento-servizio',
  },
  sorting: {
    groups: { properties: ['group_rank', 'group'], ascending: true },
    subgroups: { properties: ['subgroup'], ascending: true },
    items: { properties: ['name'], ascending: true },
  },
  filters: ['title'],
};

const DEFAULT_DOMINI: DominiConfig = {
  domini: [],
};

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly _config = signal<AppConfig>(DEFAULT_CONFIG);
  private readonly _domini = signal<DominiConfig>(DEFAULT_DOMINI);
  private readonly _loaded = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _tenant = signal<string | null>(null);
  private readonly _activeDominioId = signal<string | null>(null);

  // Selettori pubblici readonly
  readonly config = this._config.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();
  readonly tenant = this._tenant.asReadonly();

  // Selettori computed per sezioni config
  readonly app = computed<AppInfo>(() => this._config().app);
  readonly branding = computed<BrandingConfig>(() => this._config().branding);
  readonly api = computed<ApiConfig>(() => this._config().api);
  readonly auth = computed<AuthConfig>(() => this._config().auth);
  readonly features = computed<FeatureFlags>(() => this._config().features);
  readonly ui = computed<UiConfig>(() => this._config().ui);
  readonly routing = computed<RoutingConfig>(() => this._config().routing);
  readonly sorting = computed<SortingConfig>(() => this._config().sorting);
  readonly filters = computed<string[]>(() => this._config().filters);
  readonly pagopa = computed<PagoPAConfig | undefined>(() => this._config().pagopa);

  // Selettori computed per domini
  readonly domini = computed<Creditore[]>(() => this._domini().domini);
  readonly lingue = computed<Lingua[]>(() => this._config().ui.languages || []);
  readonly isSingleDomain = computed(() => this._domini().domini.length === 1);
  readonly activeDominioId = this._activeDominioId.asReadonly();
  readonly activeDominio = computed<Creditore | undefined>(() => {
    const id = this._activeDominioId();
    if (!id) {
      // Se è un singolo dominio, ritorna quello
      const domini = this._domini().domini;
      return domini.length === 1 ? domini[0] : undefined;
    }
    return this._domini().domini.find(d => d.value === id);
  });

  // Computed per domain selector
  readonly needsDomainSelection = computed(() => {
    const domainSelector = this._config().ui.domainSelector;
    const enabled = domainSelector?.enabled !== false;
    return enabled && !this.isSingleDomain() && !this._activeDominioId();
  });

  // Manutenzione
  readonly maintenance = computed(() => this._config().maintenance);
  readonly isMaintenanceMode = computed(() => this._config().maintenance?.enabled === true);

  // Shortcut comuni
  readonly appName = computed(() => this._config().app.name);
  readonly appTitle = computed(() => this._config().app.title);
  readonly appSubtitle = computed(() => this._config().app.subtitle || '');
  readonly appVersion = computed(() => this._config().app.version);
  readonly logo = computed(() => this._config().branding.logo);
  readonly theme = computed<ThemeConfig>(() => this._config().branding.theme || DEFAULT_THEME);
  readonly cardColors = computed(() => this.theme().cards.colors);
  readonly isSpidEnabled = computed(() => this._config().auth.spid.enabled);
  readonly isIamEnabled = computed(() => this._config().auth.iam.enabled);
  readonly hasAuthentication = computed(() =>
    this._config().auth.spid.enabled || this._config().auth.iam.enabled
  );

  /**
   * URL base del portale per redirect (esito pagamento, ecc.).
   * Usa api.portalUrl se configurato, altrimenti fallback su document.baseURI.
   * Garantisce URL assoluto (con origin) che termina sempre con '/'.
   */
  readonly portalBaseUrl = computed(() => {
    const configured = this._config().api.portalUrl;
    if (configured) {
      const withSlash = configured.endsWith('/') ? configured : configured + '/';
      // Se è un path relativo (es. /site/), lo rende assoluto con l'origin corrente
      if (withSlash.startsWith('/')) {
        return globalThis.location.origin + withSlash;
      }
      return withSlash;
    }
    return document.baseURI;
  });

  private readonly logger = inject(LoggerService);
  private readonly http = inject(HttpClient);

  constructor() {}

  private static readonly SESSION_KEY = 'govpay_id_ec';

  /**
   * Carica la configurazione dai file JSON.
   * Deve essere chiamato via APP_INITIALIZER.
   *
   * Flusso di caricamento:
   * 1. Carica sempre i file base (app-config.json, theme.json, domini.json)
   * 2. Se id_ec è presente, tenta il caricamento degli override parziali
   * 3. Applica deep merge: override → base → defaults hardcoded
   * 4. Se id_ec corrisponde a un dominio nella lista, lo auto-seleziona
   */
  async load(): Promise<void> {
    try {
      const tenant = this.detectTenant();
      this._tenant.set(tenant);

      // 1. Carica sempre i file di configurazione base
      const [baseConfig, baseTheme, baseDomini] = await firstValueFrom(
        forkJoin([
          this.http.get<Partial<AppConfig>>(CONFIG_URL),
          this.http.get<Partial<BrandingConfig>>(THEME_URL),
          this.http.get<Partial<DominiConfig>>(DOMINI_URL),
        ])
      );

      // 2. Se c'è un tenant, carica gli override (i file mancanti restituiscono null)
      let overrideConfig: Partial<AppConfig> | null = null;
      let overrideTheme: Partial<BrandingConfig> | null = null;
      let overrideDomini: Partial<DominiConfig> | null = null;

      if (tenant) {
        const overrideBase = `./assets/config/overrides/${tenant}`;
        [overrideConfig, overrideTheme, overrideDomini] = await firstValueFrom(
          forkJoin([
            this.loadOptionalJson<Partial<AppConfig>>(`${overrideBase}/app-config.json`),
            this.loadOptionalJson<Partial<BrandingConfig>>(`${overrideBase}/theme.json`),
            this.loadOptionalJson<Partial<DominiConfig>>(`${overrideBase}/domini.json`),
          ])
        );
      }

      // 3. Merge: override parziale → config base (il merge con defaults avviene in mergeWithDefaults)
      const mergedConfig = overrideConfig
        ? this.deepMerge(baseConfig, overrideConfig) as Partial<AppConfig>
        : baseConfig;
      const mergedTheme = overrideTheme
        ? this.deepMerge(baseTheme, overrideTheme) as Partial<BrandingConfig>
        : baseTheme;
      const mergedDomini = overrideDomini
        ? this.deepMerge(baseDomini, overrideDomini) as Partial<DominiConfig>
        : baseDomini;

      this._config.set(this.mergeWithDefaults(mergedConfig, mergedTheme));
      this._domini.set(this.mergeDominiWithDefaults(mergedDomini));
      this._loaded.set(true);
      this._error.set(null);

      this.logger.log(
        `[ConfigService] Configurazione caricata: ${this._config().app.name} v${this._config().app.version}`
      );

      if (tenant) {
        const loaded = [
          overrideConfig ? 'app-config' : null,
          overrideTheme ? 'theme' : null,
          overrideDomini ? 'domini' : null,
        ].filter(Boolean);

        if (loaded.length > 0) {
          this.logger.log(`[ConfigService] Override ${tenant}: ${loaded.join(', ')}`);
        } else {
          this.logger.warn(`[ConfigService] Override ${tenant}: nessun file trovato, uso config base`);
        }

        // Debug: mostra il risultato del merge
        this.logger.log('[ConfigService] Logo dopo merge:', this._config().branding.logo.full);
        this.logger.log('[ConfigService] Header background dopo merge:', this._config().branding.theme?.header?.background);
        this.logger.log('[ConfigService] Domini dopo merge:', this._domini().domini.map(d => d.label));
      }

      // 4. Auto-selezione dominio e branding da dominio
      if (tenant) {
        this.autoSelectDomainFromTenant(tenant);
        this.applyDomainBranding(overrideTheme);
      }
    } catch (err) {
      console.warn('[ConfigService] Errore caricamento config, uso defaults:', err);
      this._config.set(DEFAULT_CONFIG);
      this._domini.set(DEFAULT_DOMINI);
      this._loaded.set(true);
      this._error.set('Errore caricamento configurazione');
    }
  }

  /**
   * Carica un file JSON opzionale. Restituisce null se il file non esiste (404).
   */
  private loadOptionalJson<T>(url: string) {
    return this.http.get<T>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404 || err.status === 0) {
          return of(null);
        }
        throw err;
      })
    );
  }

  /**
   * Se id_ec corrisponde al value di un dominio nella lista, lo imposta come dominio attivo.
   */
  private autoSelectDomainFromTenant(tenant: string): void {
    const dominio = this._domini().domini.find(d => d.value === tenant);
    if (dominio && !this._activeDominioId()) {
      this._activeDominioId.set(tenant);
      this.logger.log(`[ConfigService] Auto-selezione dominio da id_ec: ${dominio.label}`);
    }
  }

  /**
   * Quando un override è attivo e risulta in un singolo dominio, usa il logo e il label
   * del dominio per il branding della topbar, a meno che l'override non abbia fornito
   * esplicitamente un theme.json con logo personalizzato.
   */
  private applyDomainBranding(overrideTheme: Partial<BrandingConfig> | null): void {
    const domini = this._domini().domini;
    if (domini.length !== 1) return;

    const dominio = domini[0];

    // Se l'override ha fornito un logo esplicito nel theme, non sovrascrivere
    if (overrideTheme?.logo?.full) return;

    const config = this._config();
    const logoPath = dominio.logo
      ? `assets/images/domini/${dominio.logo}`
      : '';

    this._config.set({
      ...config,
      app: {
        ...config.app,
        subtitle: dominio.label,
      },
      branding: {
        ...config.branding,
        logo: {
          ...config.branding.logo,
          full: logoPath,
          compact: logoPath,
          // Se il dominio non ha logo, rimuovi anche il fallback per non mostrare nulla
          ...(!logoPath ? { fallbackText: '' } : {}),
        },
      },
    });

    this.logger.log(`[ConfigService] Branding dominio applicato: ${dominio.label}`);
  }

  /**
   * Rileva il tenant dal query param id_ec con persistenza in sessionStorage.
   * Priorità: URL param → sessionStorage → null
   */
  private detectTenant(): string | null {
    const urlParams = new URLSearchParams(globalThis.location.search);
    const fromUrl = urlParams.get('id_ec');

    if (fromUrl) {
      try {
        sessionStorage.setItem(ConfigService.SESSION_KEY, fromUrl);
      } catch { /* sessionStorage non disponibile */ }
      return fromUrl;
    }

    try {
      return sessionStorage.getItem(ConfigService.SESSION_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Deep merge ricorsivo di due oggetti.
   * - Oggetti: merge ricorsivo (le proprietà del source sovrascrivono quelle del target)
   * - Array: sostituzione completa (l'array del source rimpiazza quello del target)
   * - Scalari: sostituzione semplice
   * - null/undefined nel source: non sovrascrivono (proprietà target mantenuta)
   */
  private deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
    const result = { ...target };

    for (const key of Object.keys(source) as Array<keyof T>) {
      const sourceVal = source[key];
      const targetVal = target[key];

      // null/undefined nel source non sovrascrivono
      if (sourceVal === null || sourceVal === undefined) {
        continue;
      }

      // Array: sostituzione completa
      if (Array.isArray(sourceVal)) {
        (result as Record<string, unknown>)[key as string] = sourceVal;
        continue;
      }

      // Oggetti: merge ricorsivo
      if (
        typeof sourceVal === 'object' &&
        typeof targetVal === 'object' &&
        targetVal !== null &&
        !Array.isArray(targetVal)
      ) {
        (result as Record<string, unknown>)[key as string] = this.deepMerge(
          targetVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>
        );
        continue;
      }

      // Scalari: sostituzione
      (result as Record<string, unknown>)[key as string] = sourceVal;
    }

    return result;
  }

  /**
   * Merge config con defaults per assicurare che tutti i campi esistano
   * @param config Configurazione funzionale da app-config.json
   * @param theme Configurazione visuale da theme.json (opzionale per retrocompatibilità)
   */
  private mergeWithDefaults(config: Partial<AppConfig>, theme?: Partial<BrandingConfig>): AppConfig {
    // Il branding può venire dal file theme.json separato o dal vecchio config.branding (retrocompatibilità)
    const brandingSource = theme || config.branding;

    return {
      app: { ...DEFAULT_CONFIG.app, ...config.app },
      branding: {
        ...DEFAULT_CONFIG.branding,
        ...brandingSource,
        logo: { ...DEFAULT_CONFIG.branding.logo, ...brandingSource?.logo },
        theme: {
          topBar: { ...DEFAULT_THEME.topBar, ...brandingSource?.theme?.topBar },
          header: { ...DEFAULT_THEME.header, ...brandingSource?.theme?.header },
          sidebar: { ...DEFAULT_THEME.sidebar, ...brandingSource?.theme?.sidebar },
          content: { ...DEFAULT_THEME.content, ...brandingSource?.theme?.content },
          buttons: { ...DEFAULT_THEME.buttons, ...brandingSource?.theme?.buttons },
          cards: { ...DEFAULT_THEME.cards, ...brandingSource?.theme?.cards },
          boxes: { ...DEFAULT_THEME.boxes, ...brandingSource?.theme?.boxes },
          fonts: brandingSource?.theme?.fonts ? {
            primary: { ...DEFAULT_THEME.fonts!.primary, ...brandingSource?.theme?.fonts?.primary },
            heading: brandingSource?.theme?.fonts?.heading,
            mono: brandingSource?.theme?.fonts?.mono,
          } : DEFAULT_THEME.fonts,
          scrollToTop: { ...DEFAULT_THEME.scrollToTop!, ...brandingSource?.theme?.scrollToTop },
        },
      },
      api: { ...DEFAULT_CONFIG.api, ...config.api },
      auth: {
        ...DEFAULT_CONFIG.auth,
        ...config.auth,
        spid: { ...DEFAULT_CONFIG.auth.spid, ...config.auth?.spid },
        iam: { ...DEFAULT_CONFIG.auth.iam, ...config.auth?.iam },
      },
      features: {
        ...DEFAULT_CONFIG.features,
        ...config.features,
        recaptcha: { ...DEFAULT_CONFIG.features.recaptcha, ...config.features?.recaptcha },
      },
      ui: {
        ...DEFAULT_CONFIG.ui,
        ...config.ui,
        layout: { ...DEFAULT_CONFIG.ui.layout, ...config.ui?.layout },
        collapsibleSections: {
          ...DEFAULT_CONFIG.ui.collapsibleSections,
          ...config.ui?.collapsibleSections,
        },
      },
      routing: { ...DEFAULT_CONFIG.routing, ...config.routing },
      sorting: {
        groups: { ...DEFAULT_CONFIG.sorting.groups, ...config.sorting?.groups },
        subgroups: { ...DEFAULT_CONFIG.sorting.subgroups, ...config.sorting?.subgroups },
        items: { ...DEFAULT_CONFIG.sorting.items, ...config.sorting?.items },
      },
      filters: config.filters ?? DEFAULT_CONFIG.filters,
      pagopa: config.pagopa,
      maintenance: config.maintenance,
    };
  }

  /**
   * Merge domini config con defaults
   */
  private mergeDominiWithDefaults(domini: Partial<DominiConfig>): DominiConfig {
    return {
      domini: domini.domini ?? DEFAULT_DOMINI.domini,
    };
  }

  /**
   * Verifica se una feature è abilitata
   */
  isFeatureEnabled(feature: keyof FeatureFlags): boolean {
    const value = this._config().features[feature];
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'object' && 'enabled' in value) {
      return value.enabled;
    }
    return false;
  }

  /**
   * Ottiene un valore di config per path (es. 'api.timeout')
   */
  get<T>(path: string): T | undefined {
    const parts = path.split('.');
    let value: unknown = this._config();

    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }

    return value as T;
  }

  /**
   * Trova un creditore per valore (idDominio)
   */
  getCreditore(idDominio: string): Creditore | undefined {
    return this._domini().domini.find(d => d.value === idDominio);
  }

  /**
   * Trova una lingua per codice alpha2
   */
  getLingua(alpha2Code: string): Lingua | undefined {
    return this.lingue().find(l => l.alpha2Code === alpha2Code);
  }

  /**
   * Imposta il dominio attivo
   */
  setActiveDominio(idDominio: string | null): void {
    this._activeDominioId.set(idDominio);
  }
}
