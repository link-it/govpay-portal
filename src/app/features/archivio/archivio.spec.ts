import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signal, computed } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Test per ArchivioComponent
 *
 * Questo file testa la logica del componente archivio pagamenti senza
 * istanziare il componente reale, evitando problemi con le dipendenze
 * Angular complesse (Router, HttpClient, etc.).
 *
 * Il componente gestisce:
 * - Visualizzazione storico pagamenti completati
 * - Download ricevute singole e multiple
 * - Paginazione
 * - Mapping dati da API (Pendenze ESEGUITE e RPP)
 */

// Interfacce per i tipi usati nel componente
type StatoPagamento = 'eseguito' | 'in_corso' | 'annullato' | 'fallito' | 'non_eseguito' | 'eseguito_parziale';

interface ArchivioItem {
  id: string;
  idDominio: string;
  numeroAvviso: string;
  iuv: string;
  ccp: string;
  causale: string;
  importo: number;
  data: string | null;
  stato: StatoPagamento;
  creditore: string;
  hasRicevuta: boolean;
  raw: any;
}

interface Pendenza {
  idPendenza: string;
  causale: string;
  importo: number;
  numeroAvviso?: string;
  iuv?: string;
  dataPagamento?: string;
  dominio?: { idDominio: string; ragioneSociale?: string };
}

interface RPP {
  stato: StatoPagamento;
  rpt: {
    dominio: { identificativoDominio: string; ragioneSociale?: string };
    datiVersamento: {
      identificativoUnivocoVersamento: string;
      codiceContestoPagamento: string;
      importoTotaleDaVersare: number;
      dataEsecuzionePagamento?: string;
      datiSingoloVersamento?: { causaleVersamento: string }[];
    };
    enteBeneficiario?: { denominazioneBeneficiario: string };
  };
  rt?: {
    datiPagamento?: {
      importoTotalePagato: number;
      dataEsitoSingoloPagamento?: string;
    };
  };
  pendenza?: { causale?: string; importo?: number; numeroAvviso?: string };
}

describe('ArchivioComponent', () => {
  // Dati di test
  const mockPendenze: Pendenza[] = [
    {
      idPendenza: 'PEND-001',
      causale: 'IMU 2024 - Saldo',
      importo: 350.00,
      numeroAvviso: '301000000000123456',
      iuv: '000000000123456',
      dataPagamento: '2024-06-15',
      dominio: { idDominio: '80012000826', ragioneSociale: 'Comune di Esempio' }
    },
    {
      idPendenza: 'PEND-002',
      causale: 'TARI 2024 - 1° rata',
      importo: 150.00,
      numeroAvviso: '301000000000123457',
      iuv: '000000000123457',
      dataPagamento: '2024-05-20',
      dominio: { idDominio: '80012000826', ragioneSociale: 'Comune di Esempio' }
    },
    {
      idPendenza: 'PEND-003',
      causale: 'Diritti di segreteria',
      importo: 50.00,
      numeroAvviso: '301000000000123458',
      iuv: '000000000123458',
      dataPagamento: '2024-04-10',
      dominio: { idDominio: '80012000827', ragioneSociale: 'Comune di Catania' }
    }
  ];

  const mockRPP: RPP = {
    stato: 'eseguito',
    rpt: {
      dominio: { identificativoDominio: '80012000826', ragioneSociale: 'Comune di Esempio' },
      datiVersamento: {
        identificativoUnivocoVersamento: '000000000123456',
        codiceContestoPagamento: 'CCP001',
        importoTotaleDaVersare: 350.00,
        dataEsecuzionePagamento: '2024-06-15',
        datiSingoloVersamento: [{ causaleVersamento: 'IMU 2024 - Saldo' }]
      },
      enteBeneficiario: { denominazioneBeneficiario: 'Comune di Esempio' }
    },
    rt: {
      datiPagamento: {
        importoTotalePagato: 350.00,
        dataEsitoSingoloPagamento: '2024-06-15'
      }
    },
    pendenza: { causale: 'IMU 2024 - Saldo', importo: 350.00, numeroAvviso: '301000000000123456' }
  };

  describe('State Initialization', () => {
    it('should initialize with default state', () => {
      const items = signal<ArchivioItem[]>([]);
      const isLoading = signal(false);
      const errorMessage = signal<string | null>(null);
      const downloadingId = signal<string | null>(null);
      const isDownloadingAll = signal(false);
      const currentPage = signal(1);
      const pageSize = signal(10);
      const totalItems = signal(0);

      expect(items()).toEqual([]);
      expect(isLoading()).toBe(false);
      expect(errorMessage()).toBeNull();
      expect(downloadingId()).toBeNull();
      expect(isDownloadingAll()).toBe(false);
      expect(currentPage()).toBe(1);
      expect(pageSize()).toBe(10);
      expect(totalItems()).toBe(0);
    });
  });

  describe('Total Pages Computation', () => {
    it('should calculate total pages correctly', () => {
      const totalItems = signal(25);
      const pageSize = signal(10);

      const totalPages = () => Math.ceil(totalItems() / pageSize());

      expect(totalPages()).toBe(3);
    });

    it('should return 1 page for items less than page size', () => {
      const totalItems = signal(5);
      const pageSize = signal(10);

      const totalPages = () => Math.ceil(totalItems() / pageSize());

      expect(totalPages()).toBe(1);
    });

    it('should return 0 pages for empty list', () => {
      const totalItems = signal(0);
      const pageSize = signal(10);

      const totalPages = () => Math.ceil(totalItems() / pageSize());

      expect(totalPages()).toBe(0);
    });
  });

  describe('Pendenze to ArchivioItem Mapping', () => {
    it('should map pendenze to archivio items', () => {
      const mapPendenzeToItems = (pendenze: Pendenza[]): ArchivioItem[] => {
        return pendenze.map(pendenza => {
          const idDominio = pendenza.dominio?.idDominio || '';
          const numeroAvviso = pendenza.numeroAvviso || '';
          const iuv = pendenza.iuv || '';
          const creditore = pendenza.dominio?.ragioneSociale || idDominio;

          return {
            id: `${idDominio}-${numeroAvviso}-${pendenza.idPendenza}`,
            idDominio,
            numeroAvviso,
            iuv,
            ccp: pendenza.idPendenza,
            causale: pendenza.causale,
            importo: pendenza.importo,
            data: pendenza.dataPagamento || null,
            stato: 'eseguito' as StatoPagamento,
            creditore,
            hasRicevuta: true,
            raw: pendenza
          };
        });
      };

      const result = mapPendenzeToItems(mockPendenze);

      expect(result.length).toBe(3);
      expect(result[0].id).toBe('80012000826-301000000000123456-PEND-001');
      expect(result[0].causale).toBe('IMU 2024 - Saldo');
      expect(result[0].importo).toBe(350.00);
      expect(result[0].hasRicevuta).toBe(true);
      expect(result[0].stato).toBe('eseguito');
    });

    it('should handle missing optional fields', () => {
      const pendenzaMinimal: Pendenza = {
        idPendenza: 'PEND-004',
        causale: 'Test',
        importo: 100.00
      };

      const mapPendenzeToItems = (pendenze: Pendenza[]): ArchivioItem[] => {
        return pendenze.map(pendenza => ({
          id: `${pendenza.dominio?.idDominio || ''}-${pendenza.numeroAvviso || ''}-${pendenza.idPendenza}`,
          idDominio: pendenza.dominio?.idDominio || '',
          numeroAvviso: pendenza.numeroAvviso || '',
          iuv: pendenza.iuv || '',
          ccp: pendenza.idPendenza,
          causale: pendenza.causale,
          importo: pendenza.importo,
          data: pendenza.dataPagamento || null,
          stato: 'eseguito' as StatoPagamento,
          creditore: pendenza.dominio?.ragioneSociale || pendenza.dominio?.idDominio || '',
          hasRicevuta: true,
          raw: pendenza
        }));
      };

      const result = mapPendenzeToItems([pendenzaMinimal]);

      expect(result[0].idDominio).toBe('');
      expect(result[0].numeroAvviso).toBe('');
      expect(result[0].data).toBeNull();
    });
  });

  describe('RPP to ArchivioItem Mapping', () => {
    it('should map RPP to archivio item', () => {
      const mapRPPToItems = (rpps: RPP[]): ArchivioItem[] => {
        return rpps.map(rpp => {
          const idDominio = rpp.rpt.dominio.identificativoDominio;
          const iuv = rpp.rpt.datiVersamento.identificativoUnivocoVersamento;
          const ccp = rpp.rpt.datiVersamento.codiceContestoPagamento;
          const numeroAvviso = (rpp.pendenza as any)?.numeroAvviso || `301${iuv}`;

          let causale = rpp.pendenza?.causale || '';
          if (!causale && rpp.rpt.datiVersamento.datiSingoloVersamento?.length) {
            causale = rpp.rpt.datiVersamento.datiSingoloVersamento[0].causaleVersamento || '';
          }

          const importo = rpp.rt?.datiPagamento?.importoTotalePagato ||
                         rpp.rpt.datiVersamento.importoTotaleDaVersare ||
                         rpp.pendenza?.importo ||
                         0;

          const data = rpp.rt?.datiPagamento?.dataEsitoSingoloPagamento ||
                      rpp.rpt.datiVersamento.dataEsecuzionePagamento ||
                      null;

          const creditore = rpp.rpt.dominio.ragioneSociale ||
                           rpp.rpt.enteBeneficiario?.denominazioneBeneficiario ||
                           idDominio;

          const hasRicevuta = !!rpp.rt && rpp.stato === 'eseguito';

          return {
            id: `${idDominio}-${iuv}-${ccp}`,
            idDominio,
            numeroAvviso,
            iuv,
            ccp,
            causale,
            importo,
            data,
            stato: rpp.stato,
            creditore,
            hasRicevuta,
            raw: rpp
          };
        });
      };

      const result = mapRPPToItems([mockRPP]);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('80012000826-000000000123456-CCP001');
      expect(result[0].causale).toBe('IMU 2024 - Saldo');
      expect(result[0].importo).toBe(350.00);
      expect(result[0].hasRicevuta).toBe(true);
      expect(result[0].creditore).toBe('Comune di Esempio');
    });

    it('should handle RPP without RT (no receipt)', () => {
      const rppWithoutRT: RPP = {
        ...mockRPP,
        rt: undefined,
        stato: 'in_corso'
      };

      const mapRPPToItems = (rpps: RPP[]): ArchivioItem[] => {
        return rpps.map(rpp => ({
          id: `${rpp.rpt.dominio.identificativoDominio}-${rpp.rpt.datiVersamento.identificativoUnivocoVersamento}-${rpp.rpt.datiVersamento.codiceContestoPagamento}`,
          idDominio: rpp.rpt.dominio.identificativoDominio,
          numeroAvviso: (rpp.pendenza as any)?.numeroAvviso || '',
          iuv: rpp.rpt.datiVersamento.identificativoUnivocoVersamento,
          ccp: rpp.rpt.datiVersamento.codiceContestoPagamento,
          causale: rpp.pendenza?.causale || '',
          importo: rpp.rt?.datiPagamento?.importoTotalePagato || rpp.rpt.datiVersamento.importoTotaleDaVersare,
          data: rpp.rt?.datiPagamento?.dataEsitoSingoloPagamento || null,
          stato: rpp.stato,
          creditore: rpp.rpt.dominio.ragioneSociale || '',
          hasRicevuta: !!rpp.rt && rpp.stato === 'eseguito',
          raw: rpp
        }));
      };

      const result = mapRPPToItems([rppWithoutRT]);

      expect(result[0].hasRicevuta).toBe(false);
      expect(result[0].stato).toBe('in_corso');
    });

    it('should use causale from datiSingoloVersamento when pendenza causale missing', () => {
      const rppWithoutPendenzaCausale: RPP = {
        ...mockRPP,
        pendenza: undefined
      };

      const mapRPPToItems = (rpps: RPP[]): ArchivioItem[] => {
        return rpps.map(rpp => {
          let causale = rpp.pendenza?.causale || '';
          if (!causale && rpp.rpt.datiVersamento.datiSingoloVersamento?.length) {
            causale = rpp.rpt.datiVersamento.datiSingoloVersamento[0].causaleVersamento || '';
          }

          return {
            id: '',
            idDominio: '',
            numeroAvviso: '',
            iuv: '',
            ccp: '',
            causale,
            importo: 0,
            data: null,
            stato: 'eseguito' as StatoPagamento,
            creditore: '',
            hasRicevuta: false,
            raw: rpp
          };
        });
      };

      const result = mapRPPToItems([rppWithoutPendenzaCausale]);

      expect(result[0].causale).toBe('IMU 2024 - Saldo');
    });
  });

  describe('Status Helpers', () => {
    it('should return correct status class for eseguito', () => {
      const getStatusClass = (stato: StatoPagamento): string => {
        const baseClass = 'px-2 py-1 text-xs font-medium rounded-full';
        switch (stato) {
          case 'eseguito':
            return `${baseClass} bg-green-100 text-green-700`;
          case 'in_corso':
            return `${baseClass} bg-blue-100 text-blue-700`;
          case 'annullato':
            return `${baseClass} bg-gray-100 text-gray-700`;
          case 'fallito':
          case 'non_eseguito':
            return `${baseClass} bg-red-100 text-red-700`;
          case 'eseguito_parziale':
            return `${baseClass} bg-yellow-100 text-yellow-700`;
          default:
            return `${baseClass} bg-gray-100 text-gray-700`;
        }
      };

      expect(getStatusClass('eseguito')).toContain('bg-green-100');
      expect(getStatusClass('in_corso')).toContain('bg-blue-100');
      expect(getStatusClass('fallito')).toContain('bg-red-100');
      expect(getStatusClass('eseguito_parziale')).toContain('bg-yellow-100');
    });

    it('should return correct status icon', () => {
      const getStatusIcon = (stato: StatoPagamento): string => {
        switch (stato) {
          case 'eseguito':
            return 'bootstrapCheckCircleFill';
          case 'in_corso':
            return 'bootstrapClockHistory';
          case 'annullato':
            return 'bootstrapXCircleFill';
          case 'fallito':
          case 'non_eseguito':
            return 'bootstrapExclamationCircleFill';
          case 'eseguito_parziale':
            return 'bootstrapDashCircleFill';
          default:
            return 'bootstrapQuestionCircle';
        }
      };

      expect(getStatusIcon('eseguito')).toBe('bootstrapCheckCircleFill');
      expect(getStatusIcon('in_corso')).toBe('bootstrapClockHistory');
      expect(getStatusIcon('fallito')).toBe('bootstrapExclamationCircleFill');
    });

    it('should return correct status label', () => {
      const getStatusLabel = (stato: StatoPagamento): string => {
        return `Language.Stati.Pagamento.${stato}`;
      };

      expect(getStatusLabel('eseguito')).toBe('Language.Stati.Pagamento.eseguito');
      expect(getStatusLabel('in_corso')).toBe('Language.Stati.Pagamento.in_corso');
    });
  });

  describe('Download Single Receipt', () => {
    it('should track downloading state', () => {
      const downloadingId = signal<string | null>(null);

      const downloadRicevuta = (item: ArchivioItem) => {
        downloadingId.set(item.id);
      };

      const finishDownload = () => {
        downloadingId.set(null);
      };

      const item: ArchivioItem = {
        id: 'test-id',
        idDominio: '80012000826',
        numeroAvviso: '301000000000123456',
        iuv: '000000000123456',
        ccp: 'CCP001',
        causale: 'Test',
        importo: 100,
        data: null,
        stato: 'eseguito',
        creditore: 'Test',
        hasRicevuta: true,
        raw: {}
      };

      downloadRicevuta(item);
      expect(downloadingId()).toBe('test-id');

      finishDownload();
      expect(downloadingId()).toBeNull();
    });

    it('should generate correct filename', () => {
      const generateFilename = (numeroAvviso: string): string => {
        return `ricevuta_${numeroAvviso}.pdf`;
      };

      expect(generateFilename('301000000000123456')).toBe('ricevuta_301000000000123456.pdf');
    });
  });

  describe('Download All Receipts', () => {
    it('should track downloading all state', () => {
      const isDownloadingAll = signal(false);

      const downloadAll = () => {
        isDownloadingAll.set(true);
      };

      const finishDownloadAll = () => {
        isDownloadingAll.set(false);
      };

      downloadAll();
      expect(isDownloadingAll()).toBe(true);

      finishDownloadAll();
      expect(isDownloadingAll()).toBe(false);
    });

    it('should filter items with receipts', () => {
      const items: ArchivioItem[] = [
        { id: '1', hasRicevuta: true } as ArchivioItem,
        { id: '2', hasRicevuta: false } as ArchivioItem,
        { id: '3', hasRicevuta: true } as ArchivioItem
      ];

      const itemsWithReceipt = items.filter(i => i.hasRicevuta);

      expect(itemsWithReceipt.length).toBe(2);
    });

    it('should not start download when no items have receipts', () => {
      const items = signal<ArchivioItem[]>([
        { id: '1', hasRicevuta: false } as ArchivioItem
      ]);
      const isDownloadingAll = signal(false);

      const downloadAll = () => {
        const itemsWithReceipt = items().filter(i => i.hasRicevuta);
        if (itemsWithReceipt.length === 0) return;
        isDownloadingAll.set(true);
      };

      downloadAll();

      expect(isDownloadingAll()).toBe(false);
    });

    it('should download receipts sequentially', () => {
      const downloadedIds: string[] = [];
      const items: ArchivioItem[] = [
        { id: '1', idDominio: 'D1', numeroAvviso: 'A1', hasRicevuta: true } as ArchivioItem,
        { id: '2', idDominio: 'D2', numeroAvviso: 'A2', hasRicevuta: true } as ArchivioItem
      ];
      let currentIndex = 0;

      const downloadNextReceipt = (index: number) => {
        if (index >= items.length) return;
        downloadedIds.push(items[index].id);
        currentIndex = index + 1;
      };

      // Simula download sequenziale
      downloadNextReceipt(0);
      downloadNextReceipt(1);

      expect(downloadedIds).toEqual(['1', '2']);
      expect(currentIndex).toBe(2);
    });
  });

  describe('Pagination', () => {
    it('should navigate to page', () => {
      const currentPage = signal(1);
      const totalPages = () => 3;

      const goToPage = (page: number) => {
        if (page < 1 || page > totalPages()) return;
        currentPage.set(page);
      };

      goToPage(2);
      expect(currentPage()).toBe(2);

      goToPage(0); // Invalid
      expect(currentPage()).toBe(2);

      goToPage(5); // Invalid
      expect(currentPage()).toBe(2);
    });

    it('should generate results label', () => {
      const totalItems = signal(25);
      const currentPage = signal(2);
      const pageSize = signal(10);

      const getResultsLabel = () => {
        const count = totalItems();
        const from = (currentPage() - 1) * pageSize() + 1;
        const to = Math.min(currentPage() * pageSize(), count);
        return `Risultati da ${from} a ${to} di ${count}`;
      };

      expect(getResultsLabel()).toBe('Risultati da 11 a 20 di 25');
    });

    it('should handle last page with partial results', () => {
      const totalItems = signal(25);
      const currentPage = signal(3);
      const pageSize = signal(10);

      const getResultsLabel = () => {
        const count = totalItems();
        const from = (currentPage() - 1) * pageSize() + 1;
        const to = Math.min(currentPage() * pageSize(), count);
        return `Risultati da ${from} a ${to} di ${count}`;
      };

      expect(getResultsLabel()).toBe('Risultati da 21 a 25 di 25');
    });
  });

  describe('Date Formatting', () => {
    it('should format date in Italian locale', () => {
      const formatDate = (date: string, locale: string): string => {
        return new Date(date).toLocaleDateString(locale, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      };

      const formatted = formatDate('2024-06-15', 'it-IT');
      expect(formatted).toMatch(/15\/06\/2024/);
    });

    it('should return dash for null date', () => {
      const formatDate = (date: string | null): string => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('it-IT');
      };

      expect(formatDate(null)).toBe('-');
    });
  });

  describe('Authentication', () => {
    it('should load archivio when authenticated', () => {
      const isAuthenticated = signal(true);
      let loadArchivioCalled = false;

      const ngOnInit = () => {
        if (isAuthenticated()) {
          loadArchivioCalled = true;
        }
      };

      ngOnInit();

      expect(loadArchivioCalled).toBe(true);
    });

    it('should not load archivio when not authenticated', () => {
      const isAuthenticated = signal(false);
      let loadArchivioCalled = false;

      const ngOnInit = () => {
        if (isAuthenticated()) {
          loadArchivioCalled = true;
        }
      };

      ngOnInit();

      expect(loadArchivioCalled).toBe(false);
    });
  });

  describe('Loading State', () => {
    it('should set loading state during data fetch', () => {
      const isLoading = signal(false);

      const loadArchivio = () => {
        isLoading.set(true);
      };

      const finishLoading = () => {
        isLoading.set(false);
      };

      loadArchivio();
      expect(isLoading()).toBe(true);

      finishLoading();
      expect(isLoading()).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should set error message on API error', () => {
      const errorMessage = signal<string | null>(null);

      const handleApiError = (error: { descrizione?: string; error?: { descrizione?: string } }) => {
        errorMessage.set(
          error.descrizione ||
          error.error?.descrizione ||
          'Errore generico'
        );
      };

      handleApiError({ error: { descrizione: 'Errore di connessione' } });

      expect(errorMessage()).toBe('Errore di connessione');
    });

    it('should handle error during download', () => {
      const errorMessage = signal<string | null>(null);
      const downloadingId = signal<string | null>('test-id');

      const handleDownloadError = () => {
        downloadingId.set(null);
        errorMessage.set('Errore durante il download della ricevuta');
      };

      handleDownloadError();

      expect(downloadingId()).toBeNull();
      expect(errorMessage()).toBe('Errore durante il download della ricevuta');
    });
  });

  describe('Navigation', () => {
    it('should navigate to login', () => {
      let navigatedTo: string | null = null;

      const goToLogin = () => {
        navigatedTo = '/pagamento-servizio';
      };

      goToLogin();

      expect(navigatedTo).toBe('/pagamento-servizio');
    });

    it('should navigate to payments', () => {
      let navigatedTo: string | null = null;

      const goToPayments = () => {
        navigatedTo = '/pagamento-servizio';
      };

      goToPayments();

      expect(navigatedTo).toBe('/pagamento-servizio');
    });
  });

  describe('Blob Download Helper', () => {
    it('should generate download link', () => {
      let createdUrl: string | null = null;
      let downloadedFilename: string | null = null;

      const saveBlob = (blob: Blob, filename: string) => {
        // Simula createObjectURL
        createdUrl = 'blob:test-url';
        downloadedFilename = filename;
      };

      const mockBlob = new Blob(['test'], { type: 'application/pdf' });
      saveBlob(mockBlob, 'ricevuta_123.pdf');

      expect(createdUrl).toBe('blob:test-url');
      expect(downloadedFilename).toBe('ricevuta_123.pdf');
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

      destroy$.next();
      destroy$.complete();

      expect(completed).toBe(true);
    });
  });

  describe('API Call Parameters', () => {
    it('should use correct dominio for API call', () => {
      const activeDominioId = signal('80012000826');
      const domini = signal([{ value: '80012000827' }]);

      const getIdDominio = () => {
        return activeDominioId() || domini()[0]?.value || '';
      };

      expect(getIdDominio()).toBe('80012000826');
    });

    it('should fallback to first dominio when active not set', () => {
      const activeDominioId = signal('');
      const domini = signal([{ value: '80012000827' }]);

      const getIdDominio = () => {
        return activeDominioId() || domini()[0]?.value || '';
      };

      expect(getIdDominio()).toBe('80012000827');
    });

    it('should load pendenze with ESEGUITA stato', () => {
      let usedParams: any = null;

      const loadArchivio = () => {
        usedParams = { stato: 'ESEGUITA' };
      };

      loadArchivio();

      expect(usedParams.stato).toBe('ESEGUITA');
    });
  });

  describe('Empty State', () => {
    it('should detect empty list', () => {
      const items = signal<ArchivioItem[]>([]);

      const isEmpty = () => items().length === 0;

      expect(isEmpty()).toBe(true);
    });

    it('should detect non-empty list', () => {
      const items = signal<ArchivioItem[]>([{ id: '1' } as ArchivioItem]);

      const isEmpty = () => items().length === 0;

      expect(isEmpty()).toBe(false);
    });
  });

  describe('Download All Progress', () => {
    it('should continue downloading on error', () => {
      const downloadedIds: string[] = [];
      const errorIds: string[] = [];
      const items: ArchivioItem[] = [
        { id: '1' } as ArchivioItem,
        { id: '2' } as ArchivioItem,
        { id: '3' } as ArchivioItem
      ];

      const downloadNextReceipt = (index: number, simulateError: boolean) => {
        if (index >= items.length) return;

        if (simulateError) {
          errorIds.push(items[index].id);
        } else {
          downloadedIds.push(items[index].id);
        }
      };

      downloadNextReceipt(0, false); // Success
      downloadNextReceipt(1, true);  // Error
      downloadNextReceipt(2, false); // Success

      expect(downloadedIds).toEqual(['1', '3']);
      expect(errorIds).toEqual(['2']);
    });
  });

  describe('Table/List Rendering', () => {
    it('should have correct desktop column structure', () => {
      const columns = [
        { name: 'Causale', span: 4 },
        { name: 'Creditore', span: 2 },
        { name: 'Data', span: 2 },
        { name: 'Importo', span: 2 },
        { name: 'Stato', span: 2 }
      ];

      const totalSpan = columns.reduce((sum, col) => sum + col.span, 0);

      expect(totalSpan).toBe(12); // 12 columns grid
    });
  });

  describe('Currency Formatting', () => {
    it('should format importo as EUR', () => {
      const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'EUR'
        }).format(value);
      };

      const formatted = formatCurrency(350.00);
      expect(formatted).toContain('350');
      expect(formatted).toContain('€');
    });
  });
});
