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
 * Modelli di configurazione dell'applicazione
 */

export interface AppInfo {
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  version: string;
}

export interface LogoConfig {
  full: string;
  compact: string;
  showTitle: boolean;
  fallbackText: string;
  fallbackGradient: {
    from: string;
    to: string;
  };
}

export interface ThemeTopBarConfig {
  background: string;
  text: string;
  border: string;
  /** Padding orizzontale del container (es. '1rem'). Default: '1rem' */
  padding?: string;
  /** Altezza della top bar (es. '4rem'). Default: '4rem' */
  height?: string;
  /** Altezza del logo (es. '2.5rem'). Default: '2.5rem' */
  logoHeight?: string;
}

export interface ThemeHeaderConfig {
  background: string;
  text: string;
  border: string;
  tabActive: string;
  tabInactive: string;
  tabHover: string;
  /** Colore di sfondo del badge carrello (default: #dc3545 rosso) */
  cartBadgeBackground?: string;
  /** Colore del testo del badge carrello (default: #ffffff bianco) */
  cartBadgeText?: string;
  /** Mostra ombra sotto l'header (default: true) */
  showShadow?: boolean;
}

export interface ThemeSidebarConfig {
  background: string;
  border: string;
  headerBackground: string;
  headerText: string;
  headerBorder: string;
  /** Logo da mostrare nell'header sidebar al posto di quello dell'ente (utile per multidominio) */
  headerLogo?: string;
  /** Immagine watermark decorativo nell'header (opzionale, default: logo ente) */
  headerWatermark?: string;
  /** Opacità del watermark (0-1, default: 0.08 per fallback logo, 1 se headerWatermark configurato) */
  headerWatermarkOpacity?: number;
  menuBackground: string;
  menuText: string;
  menuHover: string;
  menuActive: string;
  menuActiveBackground: string;
  footerBackground: string;
  footerBorder: string;
  footerText: string;
}

export interface ThemeContentConfig {
  background: string;
  /** Colore testo principale nell'area contenuto (default: topBar.text) */
  text?: string;
  cardBackground: string;
  cardBorder: string;
  cardHover: string;
}

export interface ThemeButtonsConfig {
  primaryBackground: string;
  primaryText: string;
  primaryHover: string;
  secondaryBackground: string;
  secondaryText: string;
  secondaryBorder: string;
  secondaryHover: string;
}

export interface ThemeCardsConfig {
  colors: string[];
}

export interface ThemeBoxesConfig {
  background: string;
  border: string;
  itemDivider: string;
  hoverType: 'border' | 'shadow';
  hoverBorderColor: string;
  hoverShadow: string;
  /** Sfondo degli item nella lista */
  itemBackground: string;
  /** Border radius degli item */
  itemBorderRadius: string;
  /** Spaziatura tra gli item (es. '0.5rem') */
  itemGap: string;
  /** Padding del contenitore degli item (es. '0.75rem') */
  itemsPadding: string;

  // Configurazione specifica per pay-quadro (card)
  /** Border radius della card pay-quadro */
  cardBorderRadius: string;
  /** Sfondo del titolo nella card pay-quadro */
  cardTitleBackground: string;

  // Configurazione specifica per lista gruppi
  /** Border radius del contenitore gruppo nella lista */
  groupBorderRadius: string;
  /** Sfondo del contenitore gruppo nella lista */
  groupBackground: string;
}

export interface ThemeFontWeight {
  weight: string;
  style?: 'normal' | 'italic';
  src: string;
}

export interface ThemeFontConfig {
  family: string;
  files?: ThemeFontWeight[];
  url?: string;
}

export interface ThemeFontsConfig {
  primary: ThemeFontConfig;
  heading?: ThemeFontConfig;
  mono?: ThemeFontConfig;
}

export interface ThemeScrollToTopConfig {
  /** Mostra/nascondi il pulsante (default: true) */
  enabled?: boolean;
  /** Colore di sfondo */
  background: string;
  /** Colore dell'icona */
  text: string;
  /** Colore di sfondo al hover */
  hover: string;
  /** Dimensione del pulsante (es. '3rem') */
  size: string;
  /** Border radius (es. '50%' per cerchio, '0.5rem' per quadrato arrotondato) */
  borderRadius: string;
  /** Distanza dal bordo inferiore (es. '1.5rem') */
  bottom: string;
  /** Distanza dal bordo destro (es. '1.5rem') */
  right: string;
  /** Soglia scroll in pixel per mostrare il pulsante */
  scrollThreshold?: number;
}

export interface ThemeConfig {
  topBar: ThemeTopBarConfig;
  header: ThemeHeaderConfig;
  sidebar: ThemeSidebarConfig;
  content: ThemeContentConfig;
  buttons: ThemeButtonsConfig;
  cards: ThemeCardsConfig;
  boxes: ThemeBoxesConfig;
  fonts?: ThemeFontsConfig;
  scrollToTop?: ThemeScrollToTopConfig;
}

/** Configurazione singolo partner nel footer */
export interface FooterPartner {
  /** Nome file logo in assets/images/partners/ */
  logo: string;
  /** Testo alternativo per accessibilità */
  alt: string;
  /** URL di destinazione al click (opzionale) */
  url?: string;
}

/** Configurazione logo GovPay nel footer */
export interface FooterGovPayConfig {
  /** Mostra/nascondi logo GovPay */
  show: boolean;
  /** Nome file logo in assets/images/logo/ */
  logo?: string;
  /** URL di destinazione (default: GitHub GovPay) */
  url?: string;
  /** Testo alternativo */
  alt?: string;
}

/** Configurazione footer sidebar */
export interface FooterConfig {
  /** Lista loghi partner */
  partners?: FooterPartner[];
  /** Altezza loghi partner in pixel (default: 30) */
  partnerLogoHeight?: number;
  /** Configurazione logo GovPay */
  govpay?: FooterGovPayConfig;
  /** Mostra versione applicazione */
  showVersion?: boolean;
  /** Righe di testo aggiuntive nel footer (es. indirizzo, P.IVA) */
  lines?: string[];
}

/** Configurazione header (loghi partner a destra) */
export interface HeaderBrandingConfig {
  /** Lista loghi partner da mostrare a destra nell'header */
  partners?: FooterPartner[];
  /** Altezza loghi partner in pixel (default: 32) */
  partnerLogoHeight?: number;
}

export interface BrandingConfig {
  logo: LogoConfig;
  primaryColor: string;
  secondaryColor: string;
  theme?: ThemeConfig;
  /** Configurazione header (loghi partner) */
  header?: HeaderBrandingConfig;
  /** Configurazione footer sidebar */
  footer?: FooterConfig;
}

export interface ApiConfig {
  /** URL base unificato per le API (es: /govpay-api-portal) */
  baseUrl?: string;
  /** URL base del portale per redirect esito pagamento (es: https://host/site/).
   *  Se non configurato, fallback su document.baseURI */
  portalUrl?: string;
  timeout: number;
  retryAttempts: number;
  /** Se true, usa il servizio mock invece del backend reale */
  useMockApi?: boolean;
  /** Se true, aggiunge header SPID per autenticazione in sviluppo */
  useSpidDevHeaders?: boolean;
}

export interface SpidConfig {
  enabled: boolean;
  serviceTarget: string;
  testProvider: string;
  actionFormUrl: string;
  authnContextClassRef: string;
}

export interface IamConfig {
  enabled: boolean;
  loginUrl: string;
}

export interface AuthConfig {
  spid: SpidConfig;
  iam: IamConfig;
  logoutUrl: string;
  logoutUrls: string[];
  logoutLandingPage: string;
  logoutLandingPageTarget: string;
}

export interface RecaptchaActions {
  createPendenza?: string;
  payment?: string;
}

export interface RecaptchaConfig {
  enabled: boolean;
  siteKey: string;
  actions?: RecaptchaActions;
  /** Posizione del badge: 'bottomright' (default), 'bottomleft', 'hidden' */
  badgePosition?: 'bottomright' | 'bottomleft' | 'hidden';
}

export interface FeatureFlags {
  recaptcha: RecaptchaConfig;
  qrScanner: boolean;
  uuidCheck: boolean;
  darkMode: boolean;
}

export interface PagoPACheckoutConfig {
  enabled: boolean;
  baseUrl: string;
  directMode: boolean;
}

export interface PagoPAConfig {
  checkout: PagoPACheckoutConfig;
}

/**
 * Modalità di visualizzazione delle card (assessorati/tipologie)
 * - 'auto': usa immagine se presente, altrimenti icona (default)
 * - 'image': forza sempre l'uso dell'immagine
 * - 'icon': forza sempre l'uso dell'icona con backgroundColor
 */
export type CardDisplayMode = 'auto' | 'image' | 'icon';

export interface LayoutConfig {
  flatView: boolean;
  flatViewGrid: boolean;
  showCounter: boolean;
  showToggleLayout: boolean;
  /** Modalità visualizzazione card: 'auto' | 'image' | 'icon' */
  cardDisplay?: CardDisplayMode;
  /** Mostra immagine nella pagina dettaglio servizio (default: true) */
  showDetailImage?: boolean;
  /** Altezza immagine nel dettaglio servizio (es. '12rem', '200px'). Default: '12rem' */
  detailImageHeight?: string;
}

export interface CollapsibleSections {
  informazioniDettaglioServizio: boolean;
}

export interface BollettinoConfig {
  showQrCode: boolean;
  showBarcode: boolean;
}

export interface DomainSelectorFooterConfig {
  /** Righe di testo a sinistra (es. indirizzo, P.IVA, telefono) */
  lines?: string[];
  /** Logo a destra nel footer */
  logo?: string;
  /** Alt text del logo */
  logoAlt?: string;
  /** Altezza logo in pixel (default: 40) */
  logoHeight?: number;
  /** Dimensione font delle righe (es. '0.75rem', '12px'). Default: '0.75rem' */
  fontSize?: string;
  /** Colore sfondo footer */
  background?: string;
  /** Colore testo footer */
  textColor?: string;
}

export interface DomainSelectorConfig {
  /** Mostra la pagina di selezione dominio all'avvio (default: true se multidominio) */
  enabled?: boolean;
  /** Immagine di sfondo nella pagina di selezione */
  headerImage?: string;
  /** Altezza header in pixel (default: 280) */
  headerHeight?: number;
  /** Overlay scuro sull'immagine (0-1, default: 0.4) */
  headerOverlay?: number;
  /** Mostra il dropdown cambio ente nell'header (default: true) */
  showInHeader?: boolean;
  /** Titolo mostrato nella pagina (default: da i18n Language.Domain.GestionePagamenti) */
  title?: string;
  /** Sottotitolo opzionale sotto il titolo */
  subtitle?: string;
  /** Colore di sfondo della pagina (default: theme.content.background) */
  background?: string;
  /** Footer con dati ente e logo */
  footer?: DomainSelectorFooterConfig;
}

export interface UiConfig {
  pollingInterval: number;
  pollingTimeout: number;
  mobileBreakpoint: number;
  layout: LayoutConfig;
  collapsibleSections: CollapsibleSections;
  bollettino?: BollettinoConfig;
  /** Mostra il titolo app nella top bar dell'header (default: false) */
  showHeaderTitle?: boolean;
  /** Mostra il selettore lingua nell'header (default: true) */
  showLanguageSelector?: boolean;
  /** Lingue disponibili per l'applicazione */
  languages?: Lingua[];
  /** Configurazione selettore dominio multidominio */
  domainSelector?: DomainSelectorConfig;
}

export interface RoutingConfig {
  publicAccess: string;
  publicExit: string;
}

export interface SortingProperty {
  properties: string[];
  ascending: boolean;
}

export interface SortingConfig {
  groups: SortingProperty;
  subgroups: SortingProperty;
  items: SortingProperty;
}

export interface MaintenanceConfig {
  /** Abilita la pagina di manutenzione (default: false) */
  enabled: boolean;
  /** Titolo (default: "Servizio in manutenzione") */
  title?: string;
  /** Messaggio (default: testo di cortesia) */
  message?: string;
  /** Icona Bootstrap Icons (default: bootstrapGear) */
  icon?: string;
  /** Immagine opzionale al posto dell'icona */
  image?: string;
  /** Data/ora prevista fine manutenzione (formato libero, es. "26 marzo 2026 ore 18:00") */
  estimatedEnd?: string;
  /** Colore di sfondo della pagina (default: theme.content.background) */
  background?: string;
  /** Colore testo (default: content.text o topBar.text) */
  textColor?: string;
  /** Colore sfondo icona (default: theme.header.background) */
  iconBackground?: string;
  /** Colore icona (default: theme.header.text) */
  iconColor?: string;
}

export interface AppConfig {
  app: AppInfo;
  branding: BrandingConfig;
  api: ApiConfig;
  auth: AuthConfig;
  features: FeatureFlags;
  ui: UiConfig;
  routing: RoutingConfig;
  sorting: SortingConfig;
  filters: string[];
  pagopa?: PagoPAConfig;
  /** Configurazione pagina di manutenzione */
  maintenance?: MaintenanceConfig;
}

/**
 * Modelli per domini e lingue
 */

export interface Creditore {
  label: string;
  value: string;
  logo: string;
  altText: string;
  href: string;
  agreementCode?: string;
}

export interface Lingua {
  language: string;
  alpha2Code: string;
  alpha3Code: string;
}

export interface DominiConfig {
  domini: Creditore[];
}
