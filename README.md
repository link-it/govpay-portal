# GovPay - Portale di Pagamento

Il Portale di Pagamento è una applicazione web per il cittadino che realizza i pagamenti ad iniziativa Ente previsti da pagoPA.

Di seguito le funzionalità principali del portale:

* Funzioni disponibili a soggetti non autenticati:
  * Pagamento di Avvisi pagoPA ad iniziativa Ente
  * Autenticazione con SPID
* Funzioni disponibili a soggetti autenticati:
  * Consultazione della posizione debitoria
  * Pagamento di un carrello di pendenze
  * Download delle ricevute di pagamento
  * Consultazione dello storico dei pagamenti

La grafica del Portale di Pagamento è aderente alle [linee guida di AgID](https://designers.italia.it/guide/) per lo sviluppo di UI al cittadino

Il Portale di Pagamento utilizza le API REST di [GovPay](https://github.com/link-it/govpay) per l'accesso ai dati e l'interazione con pagoPA.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
