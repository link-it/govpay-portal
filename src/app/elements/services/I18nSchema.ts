export class I18n {
  jsonSchema = {
    Cart: {
      BadgeSchema: {}
    },
    Posizione: {
      Debiti: {
        TitoloSchema: {}
      }
    },
    Archivio: {
      Pagamenti: {
        TitoloSchema: {}
      }
    }
  };

  json = {
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
        Titolo: '',
        Filtro: ''
      }
    },
    Cart: {
      Badge: '',
      Titolo: '',
      Pagamenti: {
        Titolo: '',
        Paga: '',
        Stampa: '',
        Totale: '',
        Inserimento: '',
        Rimozione: ''
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
      Scadenza: '',
      SenzaScadenza: '',
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
      CodiciEsito: {
        InCorso: '',
        Annullato: '',
        Fallito: '',
        Eseguito: '',
        NonEseguito: '',
        EseguitoParziale: ''
      }
    }
  };

  constructor() {}

}
