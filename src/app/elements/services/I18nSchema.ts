export class I18n {
  jsonSchema = {
    Posizione: {
      Debiti: {
        TitoloSchema: {}
      }
    },
    Archivio: {
      Pagamenti: {
        TitoloSchema: {}
      }
    },
    Assessorato: {
      TitoloSchema: {}
    }
  };

  json = {
    Gestore: {
      Ragione: '',
      Sede: ''
    },
    Header: {
      Titolo: '',
      LanguageBar: {
        Titolo: ''
      },
      Erogatore: {
        Titolo: '',
        Creditore: ''
      }
    },
    SideNav: {
      Titolo: '',
      MenuItems: [
        { Label: '', Link: '' },
      ],
      Logout: ''
    },
    Account: 'Guest',
    Spid: {
      Label: '',
      Info: '',
      Ask: '',
      Help: ''
    },
    Iam: {
      Label: ''
    },
    Pagamenti: {
      Titolo: '',
      Bollettino: {
        Titolo: '',
        Note: '',
        Submit: '',
        Dialog: {
          Close: '',
        },
        Form: {
          Avviso: '',
          Fotocamera: '',
          Errors: {
            Required: ''
          }
        }
      },
      Servizi: {
        Titolo: ''
      }
    },
    Cart: {
      // Badge: '',
      Titolo: '',
      Pagamenti: {
        Titolo: '',
        Paga: '',
        Indietro: '',
        Stampa: '',
        Totale: '',
        Inserimento: '',
        Rimozione: '',
        PagaDiNuovo: '',
        CarrelloVuoto: ''
      }
    },
    DettaglioServizio: {
      Titolo: '',
      Form: {
        Titolo: '',
        Salva: '',
        Verifica: ''
      },
      Dialog: {
        Avviso: '',
        Causale: '',
        ImportoPendenza: '',
        Submit: '',
        Close: ''
      }
    },
    Ricevuta: {
      Titolo: '',
      Form: {
        Titolo: '',
        Note: '',
        Email: '',
        ConfermaEmail: '',
        Submit: '',
        Error: ''
      }
    },
    Posizione: {
      Titolo: '',
      Debiti: {
        Titolo: ''
      }
    },
    DettaglioPosizione: {
      Titolo: '',
      Dialog: {
        Riepilogo: '',
        DatiAllegati: '',
        Aggiungi: '',
        Rimuovi: '',
        Scarica: '',
        ImportoPendenza: '',
        Submit: '',
        Close: ''
      }
    },
    Archivio: {
      Titolo: '',
      Pagamenti: {
        Titolo: ''
      }
    },
    Esito: {
      Titolo: '',
      Pagamenti: {
        Titolo: '',
        Dettaglio: {
          Eseguito: '',
          Fallito: '',
          Errore: '',
          InCorso: {
            Titolo: '',
            Ok: '',
            Errore: '',
            Timeout: {
              Ok: '',
              Errore: '',
              Overflow: {
                Ok: '',
                Errore: ''
              }
            }
          }
        }
      }
    },
    JsonForm: {
      Required: '',
      MinLength: '',
      MaxLength: '',
      Pattern: '',
      Format: {
        Date: '',
        Time: '',
        DateTime: '',
        Email: '',
        Hostname: '',
        Ipv4: '',
        Ipv6: '',
        Url: '',
        UUID: '',
        Color: '',
        JsonPointer: '',
        RelativeJsonPointer: '',
        Regex: '',
        Generic: ''
      },
      Minimum: '',
      ExclusiveMinimum: '',
      Maximum: '',
      ExclusiveMaximum: '',
      MultipleOf: '',
      Decimals: '',
      MinProperties: '',
      MaxProperties: '',
      MinItems: '',
      MaxItems: '',
      UniqueItems: ''
    },
    Http: {
      ErrorMap: [{
          Match: '',
          Message: ''
        }
      ],
      Status400: '',
      Status401: '',
      Status403: '',
      Status404: '',
      Status422: '',
      Status500: '',
      Status504: '',
      Default: ''
    },
    Common: {
      AlertAction: '',
      NumeroAvviso: '',
      IUV: '',
      Beneficiario: '',
      Pagamento: '',
      Importo: '',
      Scadenza: '',
      SenzaScadenza: '',
      Data: '',
      NotAvailable: '',
      Modifica: '',
      Elimina: '',
      CodeException: '',
      DocumentoPdf: '',
      ArchivioPdf: '',
      WarningRicevuta: '',
      PendenzaInserita: '',
      PendenzaEseguita: '',
      PendenzaAnnullata: '',
      PendenzaSconosciuta: '',
      PendenzaScaduta: '',
      ServizioValidazioneNonDisponibile: '',
      CodiciEsito: {
        InCorso: '',
        Annullato: '',
        Fallito: '',
        Eseguito: '',
        NonEseguito: '',
        EseguitoParziale: ''
      },
      Filtro: {
        NessunaCorrispondenza: '',
        Risultati: {
          SS: '',
          SP: '',
          PS: '',
          PP: '',
          Filtro: '',
          ServiziAssessorato: '',
          Flat: ''
        },
        NessunRisultato: '',
        Placeholder: ''
      }
    },
    StatiPendeza: {
      ESEGUITA: '',
      DUPLICATA: '',
      NON_ESEGUITA: '',
      ESEGUITA_PARZIALE: '',
      ANNULLATA: '',
      SCADUTA: '',
      IN_RITARDO: ''
    }
  };

  constructor() {}

}
