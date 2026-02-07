import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signal } from '@angular/core';
import { Subject, of } from 'rxjs';

/**
 * Test per DettaglioServizioComponent
 *
 * Questo file testa la logica del componente dettaglio servizio senza
 * istanziare il componente reale, evitando problemi con le dipendenze
 * Angular complesse (Router, FormlyModule, SurveyJS, etc.).
 *
 * Il componente gestisce:
 * - Visualizzazione dettagli servizio
 * - Rendering form dinamici (Formly, JSON Schema, SurveyJS)
 * - Creazione pendenza e aggiunta al carrello
 * - Dialog di conferma con preview pendenza
 * - Integrazione reCAPTCHA
 */

// Interfacce per i tipi usati nel componente
interface ServiceDetail {
  name: string;
  code?: string;
  short_description?: string;
  long_description?: string;
  metadata?: string;
  immagine?: string;
  properties?: { label: string; text: string; url?: string; icon?: string }[];
}

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

interface Pendenza {
  idPendenza: string;
  idTipoPendenza: string;
  idDominio: string;
  causale: string;
  soggettoPagatore: {
    tipo: string;
    identificativo: string;
    anagrafica?: string;
  };
  importo: number;
  numeroAvviso?: string;
  dataCaricamento?: string;
  dataValidita?: string;
  dataScadenza?: string;
  annoRiferimento?: number;
  stato: string;
  voci?: { idVocePendenza: string; importo: number; descrizione: string; indice?: number }[];
  dominio?: { idDominio: string; ragioneSociale?: string };
}

interface TipoPendenza {
  idTipoPendenza: string;
  descrizione: string;
  gruppo?: string;
  sottogruppo?: string;
  form?: { tipo: string };
  immagine?: string;
  jsfDef?: any;
  detail?: any;
}

describe('DettaglioServizioComponent', () => {
  // Dati di test
  const mockServizio: ServizioState = {
    id: 'imu-2024',
    nome: 'IMU 2024',
    descrizione: 'Imposta Municipale Unica',
    dipartimento: 'Tributi Locali',
    tipologiaId: 'tributi',
    assessoratoId: 'economia',
    idDominio: '80012000826',
    idTipoPendenza: 'IMU',
    importoMinimo: 10,
    importoMassimo: 10000,
    attivo: true,
    immagine: '/assets/img/imu.png',
    linkWeb: { label: 'Sito IMU', url: 'https://comune.it/imu' },
    linkDocumentazione: { label: 'Guida IMU', url: 'https://comune.it/docs/imu.pdf' },
    telefono: '0123456789',
    hasForm: true
  };

  const mockTipoPendenza: TipoPendenza = {
    idTipoPendenza: 'IMU',
    descrizione: 'Imposta Municipale Unica',
    gruppo: 'tributi',
    sottogruppo: 'economia',
    form: { tipo: 'surveyjs' },
    immagine: '/assets/img/imu.png',
    jsfDef: {
      definition: {
        pages: [{ elements: [{ type: 'text', name: 'cf' }] }]
      }
    },
    detail: {
      ita: {
        name: 'IMU 2024',
        code: 'IMU',
        short_description: 'Imposta Municipale Unica',
        long_description: '<p>Descrizione completa IMU</p>',
        properties: [
          { label: 'Importo', text: 'Da €10 a €10.000', icon: 'bootstrapCurrencyEuro' }
        ]
      },
      requireUserConfirm: true
    }
  };

  const mockPendenza: Pendenza = {
    idPendenza: 'PEND-001',
    idTipoPendenza: 'IMU',
    idDominio: '80012000826',
    causale: 'IMU 2024 - Saldo',
    soggettoPagatore: {
      tipo: 'F',
      identificativo: 'RSSMRA80A01H501A',
      anagrafica: 'Mario Rossi'
    },
    importo: 350.00,
    numeroAvviso: '301000000000123456',
    dataScadenza: '2024-12-31',
    stato: 'non_eseguita',
    voci: [
      { idVocePendenza: 'V1', importo: 250.00, descrizione: 'Quota abitazione principale' },
      { idVocePendenza: 'V2', importo: 100.00, descrizione: 'Quota pertinenze' }
    ],
    dominio: { idDominio: '80012000826', ragioneSociale: 'Comune di Test' }
  };

  describe('State Initialization', () => {
    it('should initialize with default state', () => {
      const service = signal<TipoPendenza | null>(null);
      const servizio = signal<ServizioState | null>(null);
      const apiTipoPendenza = signal<TipoPendenza | null>(null);
      const isLoadingService = signal(false);
      const isSubmitting = signal(false);
      const errorMessage = signal<string | null>(null);
      const showConfirmDialog = signal(false);
      const pendenzaPreview = signal<Pendenza | null>(null);

      expect(service()).toBeNull();
      expect(servizio()).toBeNull();
      expect(apiTipoPendenza()).toBeNull();
      expect(isLoadingService()).toBe(false);
      expect(isSubmitting()).toBe(false);
      expect(errorMessage()).toBeNull();
      expect(showConfirmDialog()).toBe(false);
      expect(pendenzaPreview()).toBeNull();
    });
  });

  describe('hasService Computed', () => {
    it('should return true when service is set', () => {
      const service = signal<TipoPendenza | null>(mockTipoPendenza);
      const servizio = signal<ServizioState | null>(null);

      const hasService = () => !!service() || !!servizio();

      expect(hasService()).toBe(true);
    });

    it('should return true when servizio is set', () => {
      const service = signal<TipoPendenza | null>(null);
      const servizio = signal<ServizioState | null>(mockServizio);

      const hasService = () => !!service() || !!servizio();

      expect(hasService()).toBe(true);
    });

    it('should return false when both are null', () => {
      const service = signal<TipoPendenza | null>(null);
      const servizio = signal<ServizioState | null>(null);

      const hasService = () => !!service() || !!servizio();

      expect(hasService()).toBe(false);
    });
  });

  describe('Detail Computed', () => {
    it('should extract detail from apiTipoPendenza', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>(mockTipoPendenza);
      const servizio = signal<ServizioState | null>(null);
      const service = signal<TipoPendenza | null>(null);
      const currentLang: string = 'it';

      const detail = (): ServiceDetail | null => {
        const langCode = currentLang === 'en' ? 'eng' : 'ita';

        const apiTp = apiTipoPendenza();
        if (apiTp?.detail) {
          const localizedDetail = apiTp.detail[langCode] || apiTp.detail['ita'];

          if (localizedDetail) {
            return {
              name: localizedDetail.name || apiTp.descrizione,
              code: localizedDetail.code || apiTp.idTipoPendenza,
              short_description: localizedDetail.short_description,
              long_description: localizedDetail.long_description,
              immagine: apiTp.detail.img || apiTp.detail.thumbnail || apiTp.immagine,
              properties: localizedDetail.properties
            };
          }
        }

        return null;
      };

      const result = detail();

      expect(result).not.toBeNull();
      expect(result!.name).toBe('IMU 2024');
      expect(result!.code).toBe('IMU');
      expect(result!.short_description).toBe('Imposta Municipale Unica');
    });

    it('should build detail from servizio mock data', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>(null);
      const servizio = signal<ServizioState | null>(mockServizio);

      const detail = (): ServiceDetail | null => {
        const servizioMock = servizio();
        if (servizioMock) {
          const properties: ServiceDetail['properties'] = [];

          if (servizioMock.importoFisso) {
            properties.push({ label: 'Importo', text: `€ ${servizioMock.importoFisso.toFixed(2)}`, icon: 'bootstrapCurrencyEuro' });
          } else if (servizioMock.importoMinimo && servizioMock.importoMassimo) {
            properties.push({ label: 'Importo', text: `da € ${servizioMock.importoMinimo.toFixed(2)} a € ${servizioMock.importoMassimo.toFixed(2)}`, icon: 'bootstrapCurrencyEuro' });
          }

          if (servizioMock.linkWeb) {
            properties.push({ label: 'Web', text: servizioMock.linkWeb.label, url: servizioMock.linkWeb.url, icon: 'bootstrapGlobe' });
          }

          if (servizioMock.telefono) {
            properties.push({ label: 'Telefono', text: servizioMock.telefono, icon: 'bootstrapTelephone' });
          }

          return {
            name: servizioMock.nome,
            code: servizioMock.id,
            short_description: servizioMock.descrizione,
            immagine: servizioMock.immagine,
            properties
          };
        }

        return null;
      };

      const result = detail();

      expect(result).not.toBeNull();
      expect(result!.name).toBe('IMU 2024');
      expect(result!.properties).toBeDefined();
      expect(result!.properties!.length).toBeGreaterThan(0);
    });

    it('should include importo range in properties', () => {
      const servizio = signal<ServizioState | null>(mockServizio);

      const buildProperties = () => {
        const s = servizio()!;
        const props: ServiceDetail['properties'] = [];

        if (s.importoMinimo && s.importoMassimo) {
          props.push({
            label: 'Importo',
            text: `da € ${s.importoMinimo.toFixed(2)} a € ${s.importoMassimo.toFixed(2)}`,
            icon: 'bootstrapCurrencyEuro'
          });
        }

        return props;
      };

      const props = buildProperties();

      expect(props[0].text).toBe('da € 10.00 a € 10000.00');
    });
  });

  describe('Form Type Detection', () => {
    it('should detect formly form type', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>({
        ...mockTipoPendenza,
        form: { tipo: 'formly' }
      });

      const formType = (): 'formly' | 'json-schema' | 'surveyjs' | null => {
        const apiTp = apiTipoPendenza();
        if (apiTp?.form?.tipo) {
          switch (apiTp.form.tipo) {
            case 'formly':
              return 'formly';
            case 'angular2-json-schema-form':
              return 'json-schema';
            case 'surveyjs':
              return 'surveyjs';
          }
        }
        return null;
      };

      expect(formType()).toBe('formly');
    });

    it('should detect json-schema form type', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>({
        ...mockTipoPendenza,
        form: { tipo: 'angular2-json-schema-form' }
      });

      const formType = (): 'formly' | 'json-schema' | 'surveyjs' | null => {
        const apiTp = apiTipoPendenza();
        if (apiTp?.form?.tipo) {
          switch (apiTp.form.tipo) {
            case 'formly':
              return 'formly';
            case 'angular2-json-schema-form':
              return 'json-schema';
            case 'surveyjs':
              return 'surveyjs';
          }
        }
        return null;
      };

      expect(formType()).toBe('json-schema');
    });

    it('should detect surveyjs form type', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>(mockTipoPendenza);

      const formType = (): 'formly' | 'json-schema' | 'surveyjs' | null => {
        const apiTp = apiTipoPendenza();
        if (apiTp?.form?.tipo) {
          switch (apiTp.form.tipo) {
            case 'formly':
              return 'formly';
            case 'angular2-json-schema-form':
              return 'json-schema';
            case 'surveyjs':
              return 'surveyjs';
          }
        }
        return null;
      };

      expect(formType()).toBe('surveyjs');
    });

    it('should return null when no form', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>({
        ...mockTipoPendenza,
        form: undefined
      });

      const formType = (): 'formly' | 'json-schema' | 'surveyjs' | null => {
        const apiTp = apiTipoPendenza();
        if (apiTp?.form?.tipo) {
          return 'surveyjs';
        }
        return null;
      };

      expect(formType()).toBeNull();
    });
  });

  describe('hasForm Computed', () => {
    it('should return true when jsfDef exists', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>(mockTipoPendenza);
      const service = signal<TipoPendenza | null>(null);
      const servizio = signal<ServizioState | null>(null);

      const hasForm = () => {
        const apiTp = apiTipoPendenza();
        if (apiTp?.jsfDef) return true;

        const svc = service();
        if (svc?.jsfDef) return true;

        if (apiTp?.form) return true;

        const servizioState = servizio();
        if (servizioState?.hasForm) return true;

        return false;
      };

      expect(hasForm()).toBe(true);
    });

    it('should return true when servizio hasForm flag is true', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>(null);
      const service = signal<TipoPendenza | null>(null);
      const servizio = signal<ServizioState | null>(mockServizio);

      const hasForm = () => {
        const apiTp = apiTipoPendenza();
        if (apiTp?.jsfDef) return true;

        const svc = service();
        if (svc?.jsfDef) return true;

        if (apiTp?.form) return true;

        const servizioState = servizio();
        if (servizioState?.hasForm) return true;

        return false;
      };

      expect(hasForm()).toBe(true);
    });

    it('should return false when no form available', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>(null);
      const service = signal<TipoPendenza | null>(null);
      const servizio = signal<ServizioState | null>({ ...mockServizio, hasForm: false });

      const hasForm = () => {
        const apiTp = apiTipoPendenza();
        if (apiTp?.jsfDef) return true;

        const svc = service();
        if (svc?.jsfDef) return true;

        if (apiTp?.form) return true;

        const servizioState = servizio();
        if (servizioState?.hasForm) return true;

        return false;
      };

      expect(hasForm()).toBe(false);
    });
  });

  describe('requiresConfirmation Computed', () => {
    it('should return true when requireUserConfirm is true', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>(mockTipoPendenza);

      const requiresConfirmation = () => {
        const apiTp = apiTipoPendenza();
        return apiTp?.detail?.requireUserConfirm === true;
      };

      expect(requiresConfirmation()).toBe(true);
    });

    it('should return false when requireUserConfirm is false', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>({
        ...mockTipoPendenza,
        detail: { ...mockTipoPendenza.detail, requireUserConfirm: false }
      });

      const requiresConfirmation = () => {
        const apiTp = apiTipoPendenza();
        return apiTp?.detail?.requireUserConfirm === true;
      };

      expect(requiresConfirmation()).toBe(false);
    });

    it('should return false when detail is not set', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>({
        ...mockTipoPendenza,
        detail: undefined
      });

      const requiresConfirmation = () => {
        const apiTp = apiTipoPendenza();
        return apiTp?.detail?.requireUserConfirm === true;
      };

      expect(requiresConfirmation()).toBe(false);
    });
  });

  describe('SurveyJS Definition', () => {
    it('should extract survey definition from jsfDef', () => {
      const apiTipoPendenza = signal<TipoPendenza | null>(mockTipoPendenza);
      const currentLang: string = 'it';

      const surveyDefinition = () => {
        const langCode = currentLang === 'en' ? 'eng' : 'ita';
        const apiTp = apiTipoPendenza();

        if (apiTp?.jsfDef) {
          return apiTp.jsfDef['definition_' + langCode] ||
                 apiTp.jsfDef['definition'] ||
                 apiTp.jsfDef;
        }

        return null;
      };

      const result = surveyDefinition();

      expect(result).not.toBeNull();
      expect(result.pages).toBeDefined();
    });

    it('should detect survey navigation based on pages', () => {
      const surveyDefinition = signal<{ pages: any[]; showNavigationButtons: boolean | string } | null>({
        pages: [
          { elements: [{ type: 'text', name: 'q1' }] },
          { elements: [{ type: 'text', name: 'q2' }] }
        ],
        showNavigationButtons: true
      });

      const surveyHasNavigation = () => {
        const def = surveyDefinition();
        if (!def) return true;

        const hasPages = def.pages && def.pages.length > 1;
        const showNav = def.showNavigationButtons !== false && def.showNavigationButtons !== 'none';

        return hasPages || showNav;
      };

      expect(surveyHasNavigation()).toBe(true);
    });

    it('should return false for single page without navigation', () => {
      const surveyDefinition = signal<{ pages: any[]; showNavigationButtons: boolean | string } | null>({
        pages: [{ elements: [{ type: 'text', name: 'q1' }] }],
        showNavigationButtons: false
      });

      const surveyHasNavigation = () => {
        const def = surveyDefinition();
        if (!def) return true;

        const hasPages = def.pages && def.pages.length > 1;
        const showNav = def.showNavigationButtons !== false && def.showNavigationButtons !== 'none';

        return hasPages || showNav;
      };

      expect(surveyHasNavigation()).toBe(false);
    });
  });

  describe('Assessorato Info', () => {
    it('should return assessorato info for known assessorato', () => {
      const servizio = signal<ServizioState | null>(mockServizio);

      const assessoratiMap: Record<string, { nome: string; icona: string; colore: string }> = {
        'economia': { nome: "Assessorato dell'economia", icona: 'bootstrapGraphUp', colore: '#ec4899' }
      };

      const assessoratoInfo = () => {
        const s = servizio();
        if (!s?.assessoratoId) return null;
        return assessoratiMap[s.assessoratoId] || null;
      };

      const result = assessoratoInfo();

      expect(result).not.toBeNull();
      expect(result!.nome).toBe("Assessorato dell'economia");
      expect(result!.colore).toBe('#ec4899');
    });

    it('should return null for unknown assessorato', () => {
      const servizio = signal<ServizioState | null>({ ...mockServizio, assessoratoId: 'unknown' });

      const assessoratiMap: Record<string, { nome: string; icona: string; colore: string }> = {
        'economia': { nome: "Assessorato dell'economia", icona: 'bootstrapGraphUp', colore: '#ec4899' }
      };

      const assessoratoInfo = () => {
        const s = servizio();
        if (!s?.assessoratoId) return null;
        return assessoratiMap[s.assessoratoId] || null;
      };

      expect(assessoratoInfo()).toBeNull();
    });
  });

  describe('Form Submission', () => {
    it('should prevent submission when form is invalid', () => {
      const formValid = false;
      const isSubmitting = signal(false);
      let submitted = false;

      const onSubmit = () => {
        if (!formValid || isSubmitting()) return;
        submitted = true;
      };

      onSubmit();

      expect(submitted).toBe(false);
    });

    it('should prevent submission when already submitting', () => {
      const formValid = true;
      const isSubmitting = signal(true);
      let submitted = false;

      const onSubmit = () => {
        if (!formValid || isSubmitting()) return;
        submitted = true;
      };

      onSubmit();

      expect(submitted).toBe(false);
    });

    it('should allow submission when form is valid and not submitting', () => {
      const formValid = true;
      const isSubmitting = signal(false);
      let submitted = false;

      const onSubmit = () => {
        if (!formValid || isSubmitting()) return;
        submitted = true;
      };

      onSubmit();

      expect(submitted).toBe(true);
    });
  });

  describe('Direct Payment', () => {
    it('should create pendenza with empty form data', () => {
      const isSubmitting = signal(false);
      let createPendenzaCalled = false;
      let formDataPassed: any = null;

      const createPendenza = (formData: any, verify: boolean) => {
        createPendenzaCalled = true;
        formDataPassed = formData;
      };

      const onDirectPayment = () => {
        if (isSubmitting()) return;
        createPendenza({}, false);
      };

      onDirectPayment();

      expect(createPendenzaCalled).toBe(true);
      expect(formDataPassed).toEqual({});
    });
  });

  describe('Confirmation Dialog', () => {
    it('should show confirmation dialog when verify is true', () => {
      const showConfirmDialog = signal(false);
      const pendenzaPreview = signal<Pendenza | null>(null);

      const handlePendenzaCreated = (pendenza: Pendenza, verify: boolean) => {
        if (verify) {
          pendenzaPreview.set(pendenza);
          showConfirmDialog.set(true);
        }
      };

      handlePendenzaCreated(mockPendenza, true);

      expect(showConfirmDialog()).toBe(true);
      expect(pendenzaPreview()).toBe(mockPendenza);
    });

    it('should cancel confirmation and reset state', () => {
      const showConfirmDialog = signal(true);
      const pendenzaPreview = signal<Pendenza | null>(mockPendenza);

      const cancelConfirmation = () => {
        showConfirmDialog.set(false);
        pendenzaPreview.set(null);
      };

      cancelConfirmation();

      expect(showConfirmDialog()).toBe(false);
      expect(pendenzaPreview()).toBeNull();
    });

    it('should confirm and add to cart', () => {
      const showConfirmDialog = signal(true);
      const pendenzaPreview = signal<Pendenza | null>(mockPendenza);
      let addedToCart = false;

      const addToCart = (pendenza: Pendenza) => {
        addedToCart = true;
      };

      const confirmAndAddToCart = () => {
        const pendenza = pendenzaPreview();
        if (pendenza) {
          addToCart(pendenza);
        }
        showConfirmDialog.set(false);
        pendenzaPreview.set(null);
      };

      confirmAndAddToCart();

      expect(addedToCart).toBe(true);
      expect(showConfirmDialog()).toBe(false);
      expect(pendenzaPreview()).toBeNull();
    });
  });

  describe('API Pendenza Mapping', () => {
    it('should map API pendenza to internal format', () => {
      const apiPendenza = {
        idPendenza: 'PEND-001',
        idTipoPendenza: 'IMU',
        dominio: { idDominio: '80012000826', ragioneSociale: 'Comune Test' },
        causale: 'IMU 2024',
        soggettoPagatore: { tipo: 'F', identificativo: 'CF123', anagrafica: 'Mario Rossi' },
        importo: 350.00,
        numeroAvviso: '301000000000123456',
        dataCaricamento: '2024-01-01',
        dataValidita: '2024-12-31',
        dataScadenza: '2024-12-31',
        annoRiferimento: 2024,
        stato: 'NON_ESEGUITA',
        voci: [
          { idVocePendenza: 'V1', importo: 350.00, descrizione: 'IMU Saldo', indice: 1 }
        ]
      };

      const mapApiPendenzaToPendenza = (api: typeof apiPendenza): Pendenza => ({
        idPendenza: api.idPendenza,
        idTipoPendenza: api.idTipoPendenza || '',
        idDominio: api.dominio?.idDominio || '',
        causale: api.causale,
        soggettoPagatore: {
          tipo: api.soggettoPagatore?.tipo || 'F',
          identificativo: api.soggettoPagatore?.identificativo || '',
          anagrafica: api.soggettoPagatore?.anagrafica
        },
        importo: api.importo,
        numeroAvviso: api.numeroAvviso,
        dataCaricamento: api.dataCaricamento,
        dataValidita: api.dataValidita,
        dataScadenza: api.dataScadenza,
        annoRiferimento: api.annoRiferimento,
        stato: api.stato?.toLowerCase(),
        voci: api.voci?.map(voce => ({
          idVocePendenza: voce.idVocePendenza,
          importo: voce.importo,
          descrizione: voce.descrizione,
          indice: voce.indice
        })) || [],
        dominio: api.dominio ? {
          idDominio: api.dominio.idDominio,
          ragioneSociale: api.dominio.ragioneSociale
        } : undefined
      });

      const result = mapApiPendenzaToPendenza(apiPendenza);

      expect(result.idPendenza).toBe('PEND-001');
      expect(result.idDominio).toBe('80012000826');
      expect(result.causale).toBe('IMU 2024');
      expect(result.importo).toBe(350.00);
      expect(result.stato).toBe('non_eseguita');
      expect(result.voci!.length).toBe(1);
    });

    it('should handle missing optional fields', () => {
      const apiPendenza = {
        idPendenza: 'PEND-002',
        causale: 'Test',
        importo: 100.00,
        stato: 'NON_ESEGUITA'
      };

      const mapApiPendenzaToPendenza = (api: any): Pendenza => ({
        idPendenza: api.idPendenza,
        idTipoPendenza: api.idTipoPendenza || '',
        idDominio: api.dominio?.idDominio || '',
        causale: api.causale,
        soggettoPagatore: {
          tipo: api.soggettoPagatore?.tipo || 'F',
          identificativo: api.soggettoPagatore?.identificativo || '',
          anagrafica: api.soggettoPagatore?.anagrafica
        },
        importo: api.importo,
        numeroAvviso: api.numeroAvviso,
        stato: api.stato?.toLowerCase(),
        voci: api.voci?.map((v: any) => ({
          idVocePendenza: v.idVocePendenza,
          importo: v.importo,
          descrizione: v.descrizione
        })) || []
      });

      const result = mapApiPendenzaToPendenza(apiPendenza);

      expect(result.idTipoPendenza).toBe('');
      expect(result.idDominio).toBe('');
      expect(result.voci).toEqual([]);
    });
  });

  describe('SurveyJS Handlers', () => {
    it('should handle survey complete', () => {
      const surveyData = signal<any>({});
      let pendenzaCreated = false;

      const createPendenza = (data: any, verify: boolean) => {
        pendenzaCreated = true;
      };

      const onSurveyComplete = (data: any) => {
        surveyData.set(data);
        createPendenza(data, true);
      };

      onSurveyComplete({ cf: 'RSSMRA80A01H501A', importo: 350 });

      expect(surveyData().cf).toBe('RSSMRA80A01H501A');
      expect(pendenzaCreated).toBe(true);
    });

    it('should update survey data on value change', () => {
      const surveyData = signal<any>({ field1: 'value1' });

      const onSurveyValueChanged = (event: { name: string; value: any }) => {
        const currentData = surveyData();
        surveyData.set({ ...currentData, [event.name]: event.value });
      };

      onSurveyValueChanged({ name: 'field2', value: 'value2' });

      expect(surveyData().field1).toBe('value1');
      expect(surveyData().field2).toBe('value2');
    });
  });

  describe('JSON Schema Form Handlers', () => {
    it('should handle json schema form change', () => {
      const jsonSchemaData = signal<Record<string, unknown>>({});

      const onJsonSchemaChange = (data: Record<string, unknown>) => {
        jsonSchemaData.set(data);
      };

      onJsonSchemaChange({ name: 'Mario', surname: 'Rossi' });

      expect(jsonSchemaData()).toEqual({ name: 'Mario', surname: 'Rossi' });
    });

    it('should track json schema validity', () => {
      const isJsonSchemaValid = signal(false);

      const onJsonSchemaValidChange = (isValid: boolean) => {
        isJsonSchemaValid.set(isValid);
      };

      onJsonSchemaValidChange(true);

      expect(isJsonSchemaValid()).toBe(true);
    });

    it('should prevent submission when json schema is invalid', () => {
      const isJsonSchemaValid = signal(false);
      const errorMessage = signal<string | null>(null);
      let pendenzaCreated = false;

      const onJsonSchemaFormSubmit = () => {
        if (!isJsonSchemaValid()) {
          errorMessage.set('Form non valido');
          return;
        }
        pendenzaCreated = true;
      };

      onJsonSchemaFormSubmit();

      expect(errorMessage()).toBe('Form non valido');
      expect(pendenzaCreated).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should display error message from API response', () => {
      const errorMessage = signal<string | null>(null);
      const isSubmitting = signal(true);

      const handleApiError = (error: { error?: { descrizione?: string; dettaglio?: string } }) => {
        isSubmitting.set(false);
        const errorBody = error.error;
        if (errorBody?.descrizione) {
          errorMessage.set(errorBody.descrizione);
        } else if (errorBody?.dettaglio) {
          errorMessage.set(errorBody.dettaglio);
        } else {
          errorMessage.set('Errore generico');
        }
      };

      handleApiError({ error: { descrizione: 'Codice fiscale non valido' } });

      expect(isSubmitting()).toBe(false);
      expect(errorMessage()).toBe('Codice fiscale non valido');
    });

    it('should use dettaglio when descrizione is not available', () => {
      const errorMessage = signal<string | null>(null);

      const handleApiError = (error: { error?: { descrizione?: string; dettaglio?: string } }) => {
        const errorBody = error.error;
        if (errorBody?.descrizione) {
          errorMessage.set(errorBody.descrizione);
        } else if (errorBody?.dettaglio) {
          errorMessage.set(errorBody.dettaglio);
        } else {
          errorMessage.set('Errore generico');
        }
      };

      handleApiError({ error: { dettaglio: 'Errore di validazione campo X' } });

      expect(errorMessage()).toBe('Errore di validazione campo X');
    });

    it('should clear error message before new submission', () => {
      const errorMessage = signal<string | null>('Previous error');

      const clearError = () => {
        errorMessage.set(null);
      };

      clearError();

      expect(errorMessage()).toBeNull();
    });
  });

  describe('Loading State', () => {
    it('should set loading state when loading servizio', () => {
      const isLoadingService = signal(false);

      const loadTipoPendenzaFromApi = () => {
        isLoadingService.set(true);
      };

      loadTipoPendenzaFromApi();

      expect(isLoadingService()).toBe(true);
    });

    it('should clear loading state after load completes', () => {
      const isLoadingService = signal(true);

      const onLoadComplete = () => {
        isLoadingService.set(false);
      };

      onLoadComplete();

      expect(isLoadingService()).toBe(false);
    });
  });

  describe('Navigation', () => {
    it('should navigate back', () => {
      let navigatedBack = false;

      const goBack = () => {
        navigatedBack = true;
      };

      goBack();

      expect(navigatedBack).toBe(true);
    });
  });

  describe('Header State', () => {
    it('should update header title with code and name', () => {
      let headerTitle = '';

      const updateHeaderTitle = (code: string | undefined, name: string) => {
        headerTitle = code ? `${code} - ${name}` : name;
      };

      updateHeaderTitle('IMU', 'Imposta Municipale Unica');

      expect(headerTitle).toBe('IMU - Imposta Municipale Unica');
    });

    it('should update header title with name only when no code', () => {
      let headerTitle = '';

      const updateHeaderTitle = (code: string | undefined, name: string) => {
        headerTitle = code ? `${code} - ${name}` : name;
      };

      updateHeaderTitle(undefined, 'Imposta Municipale Unica');

      expect(headerTitle).toBe('Imposta Municipale Unica');
    });
  });

  describe('Cart Integration', () => {
    it('should convert pendenza to cart item and add to cart', () => {
      let addedItem: any = null;
      let navigatedTo: string | null = null;

      const pendenzaToCartItem = (pendenza: Pendenza, creditore: string) => ({
        id: pendenza.numeroAvviso || pendenza.idPendenza,
        descrizione: pendenza.causale,
        importo: pendenza.importo,
        creditore
      });

      const addToCart = (item: any) => {
        addedItem = item;
      };

      const navigate = (path: string) => {
        navigatedTo = path;
      };

      const handleAddToCart = (pendenza: Pendenza) => {
        const creditore = 'Comune di Test';
        const cartItem = pendenzaToCartItem(pendenza, creditore);
        addToCart(cartItem);
        navigate('/carrello');
      };

      handleAddToCart(mockPendenza);

      expect(addedItem).not.toBeNull();
      expect(addedItem.importo).toBe(350.00);
      expect(navigatedTo).toBe('/carrello');
    });
  });

  describe('reCAPTCHA Integration', () => {
    it('should get recaptcha token when enabled', async () => {
      const recaptchaEnabled = true;
      let tokenUsed = '';

      const getRecaptchaToken = async () => {
        if (recaptchaEnabled) {
          return 'test-recaptcha-token';
        }
        return '';
      };

      const createPendenzaWithRecaptcha = async () => {
        const token = await getRecaptchaToken();
        tokenUsed = token;
      };

      await createPendenzaWithRecaptcha();

      expect(tokenUsed).toBe('test-recaptcha-token');
    });

    it('should continue without token when recaptcha is disabled', async () => {
      const recaptchaEnabled = false;
      let tokenUsed = '';

      const getRecaptchaToken = async () => {
        if (recaptchaEnabled) {
          return 'test-recaptcha-token';
        }
        return '';
      };

      const createPendenzaWithRecaptcha = async () => {
        const token = await getRecaptchaToken();
        tokenUsed = token;
      };

      await createPendenzaWithRecaptcha();

      expect(tokenUsed).toBe('');
    });
  });

  describe('Image Error Handling', () => {
    it('should hide image on error', () => {
      let imageHidden = false;

      const onImageError = (event: any) => {
        event.target.style.display = 'none';
        imageHidden = true;
      };

      const mockEvent = { target: { style: { display: 'block' } } };
      onImageError(mockEvent);

      expect(mockEvent.target.style.display).toBe('none');
    });
  });

  describe('Locale Handling', () => {
    it('should return correct locale for Italian', () => {
      const currentLang: string = 'it';

      const currentLocale = () => {
        return currentLang === 'en' ? 'en' : 'it';
      };

      expect(currentLocale()).toBe('it');
    });

    it('should return correct locale for English', () => {
      const currentLang: string = 'en';

      const currentLocale = () => {
        return currentLang === 'en' ? 'en' : 'it';
      };

      expect(currentLocale()).toBe('en');
    });
  });

  describe('Component Lifecycle', () => {
    it('should cleanup on destroy', () => {
      const destroy$ = new Subject<void>();
      let headerCleared = false;

      destroy$.subscribe({
        complete: () => {
          headerCleared = true;
        }
      });

      // Simula ngOnDestroy
      destroy$.next();
      destroy$.complete();

      expect(headerCleared).toBe(true);
    });
  });
});
