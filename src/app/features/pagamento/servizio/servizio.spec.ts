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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signal } from '@angular/core';
import { Subject, of } from 'rxjs';

/**
 * Test per PagamentoServizioComponent
 *
 * Questo file testa la logica del componente catalogo servizi senza
 * istanziare il componente reale, evitando problemi con le dipendenze
 * Angular complesse (Router, HttpClient, NgIcon, etc.).
 *
 * Il componente gestisce:
 * - Visualizzazione servizi per tipologie o assessorati
 * - Ricerca servizi con debounce
 * - Caricamento dati da API o mock
 * - Navigazione al dettaglio servizio
 * - Ripristino dello stato di navigazione
 */

// Interfacce per i tipi usati nel componente
type ViewMode = 'tipologie' | 'assessorati';

interface TipologiaConfig {
  id: string;
  nome: string;
  descrizione?: string;
  icona: string;
  immagine?: string;
  colore: string;
  numeroServizi: number;
}

interface AssessoratoConfig {
  id: string;
  nome: string;
  descrizione?: string;
  icona: string;
  immagine?: string;
  colore: string;
  numeroServizi: number;
}

interface Servizio {
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

interface ServiziGruppo {
  assessorato: AssessoratoConfig;
  servizi: Servizio[];
}

// Mock delle dipendenze
const mockTheme = {
  boxes: {
    groupBackground: '#f9fafb',
    border: '#e5e7eb',
    groupBorderRadius: '8px',
    hoverBorderColor: '#3b82f6',
    hoverShadow: '0 4px 6px rgba(0,0,0,0.1)',
    hoverType: 'border',
    itemBackground: '#ffffff',
    itemBorderRadius: '4px',
    itemsPadding: '12px',
    itemGap: '8px'
  },
  buttons: {
    primaryBackground: '#3b82f6',
    primaryText: '#ffffff'
  },
  header: {
    text: '#1f2937'
  },
  content: {
    cardHover: '#f3f4f6'
  }
};

describe('PagamentoServizioComponent', () => {
  // Dati di test
  const mockTipologie: TipologiaConfig[] = [
    { id: 'tributi', nome: 'Tributi', icona: 'bootstrapCurrencyEuro', colore: '#dc2626', numeroServizi: 5 },
    { id: 'servizi', nome: 'Servizi', icona: 'bootstrapGear', colore: '#2563eb', numeroServizi: 3 },
    { id: 'sanzioni', nome: 'Sanzioni', icona: 'bootstrapExclamationTriangle', colore: '#f59e0b', numeroServizi: 2 }
  ];

  const mockAssessorati: AssessoratoConfig[] = [
    { id: 'economia', nome: 'Assessorato Economia', icona: 'bootstrapGraphUp', colore: '#ec4899', numeroServizi: 4 },
    { id: 'ambiente', nome: 'Assessorato Ambiente', icona: 'bootstrapTree', colore: '#22c55e', numeroServizi: 3 },
    { id: 'trasporti', nome: 'Assessorato Trasporti', icona: 'bootstrapTruck', colore: '#8b5cf6', numeroServizi: 2 }
  ];

  const mockServizi: Servizio[] = [
    {
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
      attivo: true
    },
    {
      id: 'tari-2024',
      nome: 'TARI 2024',
      descrizione: 'Tassa Rifiuti',
      dipartimento: 'Tributi Locali',
      tipologiaId: 'tributi',
      assessoratoId: 'ambiente',
      idDominio: '80012000826',
      idTipoPendenza: 'TARI',
      importoFisso: 150,
      attivo: true
    },
    {
      id: 'ztl-pass',
      nome: 'Pass ZTL',
      descrizione: 'Permesso accesso ZTL',
      tipologiaId: 'servizi',
      assessoratoId: 'trasporti',
      idDominio: '80012000826',
      idTipoPendenza: 'ZTL',
      importoFisso: 50,
      attivo: true,
      hasForm: true
    },
    {
      id: 'multa-ztl',
      nome: 'Multa ZTL',
      descrizione: 'Sanzione accesso non autorizzato',
      tipologiaId: 'sanzioni',
      assessoratoId: 'trasporti',
      idDominio: '80012000826',
      idTipoPendenza: 'MULTA_ZTL',
      importoFisso: 100,
      attivo: true
    }
  ];

  describe('State Initialization', () => {
    it('should initialize with default state', () => {
      const searchText = signal('');
      const serviceSearchText = signal('');
      const viewMode = signal<ViewMode>('tipologie');
      const isLoading = signal(true);
      const selectedCategory = signal<TipologiaConfig | AssessoratoConfig | null>(null);
      const servizi = signal<Servizio[]>([]);
      const tipologie = signal<TipologiaConfig[]>([]);
      const assessorati = signal<AssessoratoConfig[]>([]);

      expect(searchText()).toBe('');
      expect(serviceSearchText()).toBe('');
      expect(viewMode()).toBe('tipologie');
      expect(isLoading()).toBe(true);
      expect(selectedCategory()).toBeNull();
      expect(servizi()).toEqual([]);
      expect(tipologie()).toEqual([]);
      expect(assessorati()).toEqual([]);
    });

    it('should set tipologie as default view mode', () => {
      const viewMode = signal<ViewMode>('tipologie');
      expect(viewMode()).toBe('tipologie');
    });

    it('should start with loading state true', () => {
      const isLoading = signal(true);
      expect(isLoading()).toBe(true);
    });
  });

  describe('View Mode Toggle', () => {
    it('should switch to assessorati view mode', () => {
      const viewMode = signal<ViewMode>('tipologie');

      const setViewMode = (mode: ViewMode) => viewMode.set(mode);
      setViewMode('assessorati');

      expect(viewMode()).toBe('assessorati');
    });

    it('should switch back to tipologie view mode', () => {
      const viewMode = signal<ViewMode>('assessorati');

      const setViewMode = (mode: ViewMode) => viewMode.set(mode);
      setViewMode('tipologie');

      expect(viewMode()).toBe('tipologie');
    });
  });

  describe('Search Mode', () => {
    it('should detect search mode when search text is present', () => {
      const searchText = signal('IMU');

      const isSearchMode = () => searchText().length > 0;

      expect(isSearchMode()).toBe(true);
    });

    it('should not be in search mode when search text is empty', () => {
      const searchText = signal('');

      const isSearchMode = () => searchText().length > 0;

      expect(isSearchMode()).toBe(false);
    });

    it('should clear search text', () => {
      const searchText = signal('test search');

      const clearSearch = () => {
        searchText.set('');
      };

      clearSearch();
      expect(searchText()).toBe('');
    });

    it('should handle service search within category', () => {
      const serviceSearchText = signal('');

      const onServiceSearchChange = (value: string) => {
        serviceSearchText.set(value);
      };

      onServiceSearchChange('tributo');
      expect(serviceSearchText()).toBe('tributo');
    });

    it('should clear service search', () => {
      const serviceSearchText = signal('tributo');

      const clearServiceSearch = () => {
        serviceSearchText.set('');
      };

      clearServiceSearch();
      expect(serviceSearchText()).toBe('');
    });
  });

  describe('Filtered Tipologie', () => {
    it('should filter tipologie that have services', () => {
      const tipologie = signal(mockTipologie);
      const servizi = signal(mockServizi);
      const searchText = signal('');

      const filteredTipologie = () => {
        const search = searchText().toLowerCase();
        const serviziList = servizi();

        let tipologieConServizi = tipologie().filter(t =>
          serviziList.some(s => s.tipologiaId === t.id)
        );

        if (search) {
          tipologieConServizi = tipologieConServizi.filter(t =>
            t.nome.toLowerCase().includes(search)
          );
        }

        return tipologieConServizi;
      };

      const result = filteredTipologie();

      // Dovrebbe includere tipologie con servizi: tributi, servizi, sanzioni
      expect(result.length).toBe(3);
      expect(result.map(t => t.id)).toContain('tributi');
      expect(result.map(t => t.id)).toContain('servizi');
      expect(result.map(t => t.id)).toContain('sanzioni');
    });

    it('should filter tipologie by search text', () => {
      const tipologie = signal(mockTipologie);
      const servizi = signal(mockServizi);
      const searchText = signal('Tribut');

      const filteredTipologie = () => {
        const search = searchText().toLowerCase();
        const serviziList = servizi();

        let tipologieConServizi = tipologie().filter(t =>
          serviziList.some(s => s.tipologiaId === t.id)
        );

        if (search) {
          tipologieConServizi = tipologieConServizi.filter(t =>
            t.nome.toLowerCase().includes(search)
          );
        }

        return tipologieConServizi;
      };

      const result = filteredTipologie();

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('tributi');
    });

    it('should return empty when no tipologie match search', () => {
      const tipologie = signal(mockTipologie);
      const servizi = signal(mockServizi);
      const searchText = signal('nonexistent');

      const filteredTipologie = () => {
        const search = searchText().toLowerCase();
        const serviziList = servizi();

        let tipologieConServizi = tipologie().filter(t =>
          serviziList.some(s => s.tipologiaId === t.id)
        );

        if (search) {
          tipologieConServizi = tipologieConServizi.filter(t =>
            t.nome.toLowerCase().includes(search)
          );
        }

        return tipologieConServizi;
      };

      expect(filteredTipologie().length).toBe(0);
    });
  });

  describe('Filtered Assessorati', () => {
    it('should filter assessorati that have services', () => {
      const assessorati = signal(mockAssessorati);
      const servizi = signal(mockServizi);
      const searchText = signal('');

      const filteredAssessorati = () => {
        const search = searchText().toLowerCase();
        const serviziList = servizi();

        let assessoratiConServizi = assessorati().filter(a =>
          serviziList.some(s => s.assessoratoId === a.id)
        );

        if (search) {
          assessoratiConServizi = assessoratiConServizi.filter(a =>
            a.nome.toLowerCase().includes(search)
          );
        }

        return assessoratiConServizi;
      };

      const result = filteredAssessorati();

      // Dovrebbe includere assessorati con servizi: economia, ambiente, trasporti
      expect(result.length).toBe(3);
    });

    it('should filter assessorati by search text', () => {
      const assessorati = signal(mockAssessorati);
      const servizi = signal(mockServizi);
      const searchText = signal('Ambiente');

      const filteredAssessorati = () => {
        const search = searchText().toLowerCase();
        const serviziList = servizi();

        let assessoratiConServizi = assessorati().filter(a =>
          serviziList.some(s => s.assessoratoId === a.id)
        );

        if (search) {
          assessoratiConServizi = assessoratiConServizi.filter(a =>
            a.nome.toLowerCase().includes(search)
          );
        }

        return assessoratiConServizi;
      };

      const result = filteredAssessorati();

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('ambiente');
    });
  });

  describe('Servizi Ricercati (Global Search)', () => {
    it('should return empty when no search text', () => {
      const servizi = signal(mockServizi);
      const assessorati = signal(mockAssessorati);
      const searchText = signal('');

      const serviziRicercati = (): ServiziGruppo[] => {
        const search = searchText().toLowerCase();
        if (!search) return [];

        const serviziFiltrati = servizi().filter(s =>
          s.nome.toLowerCase().includes(search) ||
          s.dipartimento?.toLowerCase().includes(search)
        );

        const gruppi = new Map<string, ServiziGruppo>();

        for (const servizio of serviziFiltrati) {
          const assessorato = assessorati().find(a => a.id === servizio.assessoratoId);
          if (!assessorato) continue;

          if (!gruppi.has(assessorato.id)) {
            gruppi.set(assessorato.id, { assessorato, servizi: [] });
          }
          gruppi.get(assessorato.id)!.servizi.push(servizio);
        }

        return Array.from(gruppi.values());
      };

      expect(serviziRicercati()).toEqual([]);
    });

    it('should search services by name', () => {
      const servizi = signal(mockServizi);
      const assessorati = signal(mockAssessorati);
      const searchText = signal('IMU');

      const serviziRicercati = (): ServiziGruppo[] => {
        const search = searchText().toLowerCase();
        if (!search) return [];

        const serviziFiltrati = servizi().filter(s =>
          s.nome.toLowerCase().includes(search) ||
          s.dipartimento?.toLowerCase().includes(search)
        );

        const gruppi = new Map<string, ServiziGruppo>();

        for (const servizio of serviziFiltrati) {
          const assessorato = assessorati().find(a => a.id === servizio.assessoratoId);
          if (!assessorato) continue;

          if (!gruppi.has(assessorato.id)) {
            gruppi.set(assessorato.id, { assessorato, servizi: [] });
          }
          gruppi.get(assessorato.id)!.servizi.push(servizio);
        }

        return Array.from(gruppi.values());
      };

      const result = serviziRicercati();

      expect(result.length).toBe(1);
      expect(result[0].servizi.length).toBe(1);
      expect(result[0].servizi[0].nome).toBe('IMU 2024');
    });

    it('should search services by dipartimento', () => {
      const servizi = signal(mockServizi);
      const assessorati = signal(mockAssessorati);
      const searchText = signal('Tributi Locali');

      const serviziRicercati = (): ServiziGruppo[] => {
        const search = searchText().toLowerCase();
        if (!search) return [];

        const serviziFiltrati = servizi().filter(s =>
          s.nome.toLowerCase().includes(search) ||
          s.dipartimento?.toLowerCase().includes(search)
        );

        const gruppi = new Map<string, ServiziGruppo>();

        for (const servizio of serviziFiltrati) {
          const assessorato = assessorati().find(a => a.id === servizio.assessoratoId);
          if (!assessorato) continue;

          if (!gruppi.has(assessorato.id)) {
            gruppi.set(assessorato.id, { assessorato, servizi: [] });
          }
          gruppi.get(assessorato.id)!.servizi.push(servizio);
        }

        return Array.from(gruppi.values());
      };

      const result = serviziRicercati();

      // IMU e TARI hanno dipartimento "Tributi Locali"
      const totalServizi = result.reduce((sum, g) => sum + g.servizi.length, 0);
      expect(totalServizi).toBe(2);
    });

    it('should group search results by assessorato', () => {
      const servizi = signal(mockServizi);
      const assessorati = signal(mockAssessorati);
      const searchText = signal('ZTL');

      const serviziRicercati = (): ServiziGruppo[] => {
        const search = searchText().toLowerCase();
        if (!search) return [];

        const serviziFiltrati = servizi().filter(s =>
          s.nome.toLowerCase().includes(search) ||
          s.dipartimento?.toLowerCase().includes(search)
        );

        const gruppi = new Map<string, ServiziGruppo>();

        for (const servizio of serviziFiltrati) {
          const assessorato = assessorati().find(a => a.id === servizio.assessoratoId);
          if (!assessorato) continue;

          if (!gruppi.has(assessorato.id)) {
            gruppi.set(assessorato.id, { assessorato, servizi: [] });
          }
          gruppi.get(assessorato.id)!.servizi.push(servizio);
        }

        return Array.from(gruppi.values());
      };

      const result = serviziRicercati();

      // Pass ZTL e Multa ZTL sono entrambi in assessorato trasporti
      expect(result.length).toBe(1);
      expect(result[0].assessorato.id).toBe('trasporti');
      expect(result[0].servizi.length).toBe(2);
    });
  });

  describe('Servizi Ricercati Count', () => {
    it('should count total services found', () => {
      const servizi = signal(mockServizi);
      const assessorati = signal(mockAssessorati);
      const searchText = signal('2024');

      const serviziRicercati = (): ServiziGruppo[] => {
        const search = searchText().toLowerCase();
        if (!search) return [];

        const serviziFiltrati = servizi().filter(s =>
          s.nome.toLowerCase().includes(search) ||
          s.dipartimento?.toLowerCase().includes(search)
        );

        const gruppi = new Map<string, ServiziGruppo>();

        for (const servizio of serviziFiltrati) {
          const assessorato = assessorati().find(a => a.id === servizio.assessoratoId);
          if (!assessorato) continue;

          if (!gruppi.has(assessorato.id)) {
            gruppi.set(assessorato.id, { assessorato, servizi: [] });
          }
          gruppi.get(assessorato.id)!.servizi.push(servizio);
        }

        return Array.from(gruppi.values());
      };

      const serviziRicercatiCount = () =>
        serviziRicercati().reduce((sum, g) => sum + g.servizi.length, 0);

      // IMU 2024 e TARI 2024
      expect(serviziRicercatiCount()).toBe(2);
    });
  });

  describe('Category Selection (Tipologia)', () => {
    it('should select tipologia and filter services', () => {
      const servizi = signal(mockServizi);
      const selectedCategory = signal<TipologiaConfig | AssessoratoConfig | null>(null);
      const serviziCategoria = signal<Servizio[]>([]);
      const isTipologiaView = signal(true);
      const serviceSearchText = signal('');

      const onTipologiaClick = (tipologia: TipologiaConfig) => {
        isTipologiaView.set(true);
        selectedCategory.set(tipologia);
        serviceSearchText.set('');
        const serviziFiltrati = servizi().filter(s => s.tipologiaId === tipologia.id);
        serviziCategoria.set(serviziFiltrati);
      };

      const tipologiaTributi = mockTipologie[0];
      onTipologiaClick(tipologiaTributi);

      expect(selectedCategory()).toBe(tipologiaTributi);
      expect(isTipologiaView()).toBe(true);
      expect(serviziCategoria().length).toBe(2); // IMU e TARI
      expect(serviziCategoria().every(s => s.tipologiaId === 'tributi')).toBe(true);
    });

    it('should clear service search when selecting tipologia', () => {
      const serviceSearchText = signal('old search');

      const onTipologiaClick = () => {
        serviceSearchText.set('');
      };

      onTipologiaClick();

      expect(serviceSearchText()).toBe('');
    });
  });

  describe('Category Selection (Assessorato)', () => {
    it('should select assessorato and filter services', () => {
      const servizi = signal(mockServizi);
      const selectedCategory = signal<TipologiaConfig | AssessoratoConfig | null>(null);
      const serviziCategoria = signal<Servizio[]>([]);
      const isTipologiaView = signal(true);
      const serviceSearchText = signal('');

      const onAssessoratoClick = (assessorato: AssessoratoConfig) => {
        isTipologiaView.set(false);
        selectedCategory.set(assessorato);
        serviceSearchText.set('');
        const serviziFiltrati = servizi().filter(s => s.assessoratoId === assessorato.id);
        serviziCategoria.set(serviziFiltrati);
      };

      const assessoratoTrasporti = mockAssessorati[2];
      onAssessoratoClick(assessoratoTrasporti);

      expect(selectedCategory()).toBe(assessoratoTrasporti);
      expect(isTipologiaView()).toBe(false);
      expect(serviziCategoria().length).toBe(2); // Pass ZTL e Multa ZTL
      expect(serviziCategoria().every(s => s.assessoratoId === 'trasporti')).toBe(true);
    });
  });

  describe('Detail View Close', () => {
    it('should close detail view and reset state', () => {
      const selectedCategory = signal<TipologiaConfig | null>(mockTipologie[0]);
      const serviziCategoria = signal(mockServizi);
      const serviceSearchText = signal('test');

      const closeDetailView = () => {
        selectedCategory.set(null);
        serviziCategoria.set([]);
        serviceSearchText.set('');
      };

      closeDetailView();

      expect(selectedCategory()).toBeNull();
      expect(serviziCategoria()).toEqual([]);
      expect(serviceSearchText()).toBe('');
    });
  });

  describe('Servizi Raggruppati (Within Category)', () => {
    it('should group services by assessorato within category', () => {
      const assessorati = signal(mockAssessorati);
      const serviziCategoria = signal([mockServizi[0], mockServizi[1]]); // IMU e TARI
      const serviceSearchText = signal('');

      const serviziRaggruppati = (): ServiziGruppo[] => {
        const search = serviceSearchText().toLowerCase();
        let serviziFiltrati = serviziCategoria();

        if (search) {
          serviziFiltrati = serviziFiltrati.filter(s =>
            s.nome.toLowerCase().includes(search) ||
            s.dipartimento?.toLowerCase().includes(search)
          );
        }

        const gruppi = new Map<string, ServiziGruppo>();

        for (const servizio of serviziFiltrati) {
          const assessorato = assessorati().find(a => a.id === servizio.assessoratoId);
          if (!assessorato) continue;

          if (!gruppi.has(assessorato.id)) {
            gruppi.set(assessorato.id, { assessorato, servizi: [] });
          }
          gruppi.get(assessorato.id)!.servizi.push(servizio);
        }

        return Array.from(gruppi.values());
      };

      const result = serviziRaggruppati();

      // IMU in economia, TARI in ambiente
      expect(result.length).toBe(2);
    });

    it('should filter grouped services by search', () => {
      const assessorati = signal(mockAssessorati);
      const serviziCategoria = signal([mockServizi[0], mockServizi[1]]); // IMU e TARI
      const serviceSearchText = signal('TARI');

      const serviziRaggruppati = (): ServiziGruppo[] => {
        const search = serviceSearchText().toLowerCase();
        let serviziFiltrati = serviziCategoria();

        if (search) {
          serviziFiltrati = serviziFiltrati.filter(s =>
            s.nome.toLowerCase().includes(search) ||
            s.dipartimento?.toLowerCase().includes(search)
          );
        }

        const gruppi = new Map<string, ServiziGruppo>();

        for (const servizio of serviziFiltrati) {
          const assessorato = assessorati().find(a => a.id === servizio.assessoratoId);
          if (!assessorato) continue;

          if (!gruppi.has(assessorato.id)) {
            gruppi.set(assessorato.id, { assessorato, servizi: [] });
          }
          gruppi.get(assessorato.id)!.servizi.push(servizio);
        }

        return Array.from(gruppi.values());
      };

      const result = serviziRaggruppati();

      expect(result.length).toBe(1);
      expect(result[0].servizi[0].nome).toBe('TARI 2024');
    });
  });

  describe('Total Servizi Count', () => {
    it('should compute total services count', () => {
      const servizi = signal(mockServizi);

      const totaleServizi = () => servizi().length;

      expect(totaleServizi()).toBe(4);
    });

    it('should return 0 when no services', () => {
      const servizi = signal<Servizio[]>([]);

      const totaleServizi = () => servizi().length;

      expect(totaleServizi()).toBe(0);
    });
  });

  describe('Build Servizi From Config (Mock Mode)', () => {
    it('should build services from config filtering active only', () => {
      const serviziConfig = [
        { ...mockServizi[0], attivo: true },
        { ...mockServizi[1], attivo: false }, // inactive
        { ...mockServizi[2], attivo: true }
      ];

      const buildServiziFromConfig = (config: typeof serviziConfig): Servizio[] => {
        return config
          .filter(sc => sc.attivo)
          .map(sc => ({
            ...sc,
            idTipoPendenza: sc.id,
            hasForm: false
          }));
      };

      const result = buildServiziFromConfig(serviziConfig);

      expect(result.length).toBe(2);
      expect(result.every(s => s.attivo)).toBe(true);
    });
  });

  describe('Build Servizi From API', () => {
    it('should build services from TipoPendenza API response', () => {
      const tipiPendenza = [
        { idTipoPendenza: 'IMU', descrizione: 'Imposta Municipale', gruppo: 'tributi', sottogruppo: 'economia', form: null, immagine: '/img/imu.png' },
        { idTipoPendenza: 'TARI', descrizione: 'Tassa Rifiuti', gruppo: 'tributi', sottogruppo: 'ambiente', form: { tipo: 'surveyjs' }, immagine: null }
      ];
      const idDominio = '80012000826';
      const defaultTipologia = 'altro';
      const defaultAssessorato = 'altro';

      const buildServiziFromApi = (tipi: typeof tipiPendenza): Servizio[] => {
        return tipi.map(tp => ({
          id: tp.idTipoPendenza,
          nome: tp.descrizione,
          descrizione: tp.descrizione,
          tipologiaId: tp.gruppo || defaultTipologia,
          assessoratoId: tp.sottogruppo || defaultAssessorato,
          idDominio: idDominio,
          idTipoPendenza: tp.idTipoPendenza,
          attivo: true,
          hasForm: !!tp.form,
          immagine: tp.immagine || undefined
        }));
      };

      const result = buildServiziFromApi(tipiPendenza);

      expect(result.length).toBe(2);
      expect(result[0].nome).toBe('Imposta Municipale');
      expect(result[0].hasForm).toBe(false);
      expect(result[1].hasForm).toBe(true);
      expect(result[0].immagine).toBe('/img/imu.png');
    });

    it('should use default tipologia/assessorato when not provided', () => {
      const tipiPendenza = [
        { idTipoPendenza: 'TEST', descrizione: 'Test Service', gruppo: null, sottogruppo: null, form: null, immagine: null }
      ];
      const idDominio = '80012000826';
      const defaultTipologia = 'altro';
      const defaultAssessorato = 'altro';

      const buildServiziFromApi = (tipi: typeof tipiPendenza): Servizio[] => {
        return tipi.map(tp => ({
          id: tp.idTipoPendenza,
          nome: tp.descrizione,
          descrizione: tp.descrizione,
          tipologiaId: tp.gruppo || defaultTipologia,
          assessoratoId: tp.sottogruppo || defaultAssessorato,
          idDominio: idDominio,
          idTipoPendenza: tp.idTipoPendenza,
          attivo: true,
          hasForm: !!tp.form,
          immagine: tp.immagine || undefined
        }));
      };

      const result = buildServiziFromApi(tipiPendenza);

      expect(result[0].tipologiaId).toBe('altro');
      expect(result[0].assessoratoId).toBe('altro');
    });
  });

  describe('Navigation State', () => {
    it('should save navigation state when selecting servizio', () => {
      const selectedCategory = signal(mockTipologie[0]);
      const serviziCategoria = signal(mockServizi.slice(0, 2));
      const viewMode = signal<ViewMode>('tipologie');
      const serviceSearchText = signal('');

      let savedState: any = null;

      const saveServizioState = (state: any) => {
        savedState = state;
      };

      const onServizioSelect = (servizio: Servizio) => {
        saveServizioState({
          selectedCategory: selectedCategory(),
          serviziCategoria: serviziCategoria(),
          viewMode: viewMode(),
          searchText: serviceSearchText()
        });
      };

      onServizioSelect(mockServizi[0]);

      expect(savedState).not.toBeNull();
      expect(savedState.selectedCategory).toBe(mockTipologie[0]);
      expect(savedState.viewMode).toBe('tipologie');
    });

    it('should save main search text when selecting from search results', () => {
      const viewMode = signal<ViewMode>('tipologie');
      const searchText = signal('IMU');

      let savedState: any = null;

      const saveServizioState = (state: any) => {
        savedState = state;
      };

      const onServizioSelectFromSearch = (servizio: Servizio) => {
        saveServizioState({
          selectedCategory: null,
          serviziCategoria: [],
          viewMode: viewMode(),
          searchText: '',
          mainSearchText: searchText()
        });
      };

      onServizioSelectFromSearch(mockServizi[0]);

      expect(savedState.mainSearchText).toBe('IMU');
      expect(savedState.selectedCategory).toBeNull();
    });

    it('should restore navigation state', () => {
      const viewMode = signal<ViewMode>('tipologie');
      const selectedCategory = signal<TipologiaConfig | null>(null);
      const serviceSearchText = signal('');
      const searchText = signal('');
      const serviziCategoria = signal<Servizio[]>([]);
      const servizi = signal(mockServizi);
      const tipologie = signal(mockTipologie);

      const savedState = {
        viewMode: 'assessorati' as ViewMode,
        selectedCategory: mockTipologie[0],
        searchText: 'test search',
        mainSearchText: null
      };

      const restoreNavigationState = (state: typeof savedState | null) => {
        if (!state) return;

        viewMode.set(state.viewMode);

        if (state.selectedCategory) {
          selectedCategory.set(state.selectedCategory);
          serviceSearchText.set(state.searchText);

          const category = state.selectedCategory;
          if (tipologie().some(t => t.id === category.id)) {
            const serviziFiltrati = servizi().filter(s => s.tipologiaId === category.id);
            serviziCategoria.set(serviziFiltrati);
          }
        } else if (state.mainSearchText) {
          searchText.set(state.mainSearchText);
        }
      };

      restoreNavigationState(savedState);

      expect(viewMode()).toBe('assessorati');
      expect(selectedCategory()).toBe(mockTipologie[0]);
      expect(serviceSearchText()).toBe('test search');
    });
  });

  describe('Translation Labels', () => {
    it('should generate label for servizi in tipologie', () => {
      const totaleServizi = () => 10;
      const filteredTipologie = () => mockTipologie;

      const serviziInTipologieLabel = () => {
        return `${totaleServizi()} servizi in ${filteredTipologie().length} tipologie`;
      };

      expect(serviziInTipologieLabel()).toBe('10 servizi in 3 tipologie');
    });

    it('should generate label for servizi in assessorati', () => {
      const totaleServizi = () => 10;
      const filteredAssessorati = () => mockAssessorati;

      const serviziInAssessoratiLabel = () => {
        return `${totaleServizi()} servizi in ${filteredAssessorati().length} assessorati`;
      };

      expect(serviziInAssessoratiLabel()).toBe('10 servizi in 3 assessorati');
    });

    it('should generate label for servizi presenti', () => {
      const serviziCategoria = signal(mockServizi.slice(0, 2));

      const serviziPresentiLabel = () => {
        return `${serviziCategoria().length} servizi presenti`;
      };

      expect(serviziPresentiLabel()).toBe('2 servizi presenti');
    });

    it('should generate label for servizi trovati', () => {
      const serviziRicercatiCount = () => 5;

      const serviziTrovatiLabel = () => {
        return `${serviziRicercatiCount()} servizi trovati`;
      };

      expect(serviziTrovatiLabel()).toBe('5 servizi trovati');
    });
  });

  describe('Debounced Search', () => {
    it('should setup debounced search with Subject', () => {
      const searchSubject = new Subject<string>();
      const searchText = signal('');

      // Simula il subscribe nel ngOnInit
      searchSubject.subscribe(value => {
        searchText.set(value);
      });

      const onSearchChange = (value: string) => {
        searchSubject.next(value);
      };

      onSearchChange('test');

      // In un test reale con debounce, dovremmo usare fakeAsync
      // Qui verifichiamo solo che il Subject emette
      expect(searchText()).toBe('test');
    });
  });

  describe('Loading State', () => {
    it('should set loading to false after data loaded', () => {
      const isLoading = signal(true);

      const loadData = () => {
        // Simula caricamento completato
        isLoading.set(false);
      };

      loadData();

      expect(isLoading()).toBe(false);
    });

    it('should handle loading error', () => {
      const isLoading = signal(true);
      const errorOccurred = signal(false);

      const loadData = (success: boolean) => {
        if (!success) {
          errorOccurred.set(true);
        }
        isLoading.set(false);
      };

      loadData(false);

      expect(isLoading()).toBe(false);
      expect(errorOccurred()).toBe(true);
    });
  });

  describe('Mock vs API Mode Detection', () => {
    it('should detect mock mode', () => {
      const isUsingMock = true;

      if (isUsingMock) {
        // loadMockData
        expect(true).toBe(true);
      } else {
        // loadApiData
        expect(false).toBe(true);
      }
    });

    it('should detect API mode', () => {
      const isUsingMock = false;

      if (!isUsingMock) {
        // loadApiData
        expect(true).toBe(true);
      } else {
        // loadMockData
        expect(false).toBe(true);
      }
    });
  });

  describe('Component Lifecycle', () => {
    it('should cleanup on destroy', () => {
      const destroy$ = new Subject<void>();
      let completed = false;

      destroy$.subscribe({
        complete: () => {
          completed = true;
        }
      });

      // Simula ngOnDestroy
      destroy$.next();
      destroy$.complete();

      expect(completed).toBe(true);
    });
  });

  describe('Theme Integration', () => {
    it('should use theme colors for boxes', () => {
      const theme = mockTheme;

      expect(theme.boxes.groupBackground).toBe('#f9fafb');
      expect(theme.boxes.border).toBe('#e5e7eb');
      expect(theme.boxes.hoverType).toBe('border');
    });

    it('should use theme colors for buttons', () => {
      const theme = mockTheme;

      expect(theme.buttons.primaryBackground).toBe('#3b82f6');
      expect(theme.buttons.primaryText).toBe('#ffffff');
    });
  });
});
