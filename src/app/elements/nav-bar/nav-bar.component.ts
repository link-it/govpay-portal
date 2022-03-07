import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { PayService } from '../services/pay.service';

@Component({
  selector: 'pay-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  _tabs: any[] = [];
  _tabsSubscriber: Subscription;

  _hasTab: boolean = true;

  _routerTab = true;
  _currentTab = '';

  constructor(public router: Router) {
    this._tabsSubscriber = PayService.TabsBehavior.subscribe(
    (value: any) => {
      if (value) {
        if (value.update) {
          this._generateTabs(value);
        }
        if (value.currentTab) {
          this._currentTab = value.currentTab;
        }
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this._unsubscribeTab();
  }

  _unsubscribeTab() {
    if (this._tabsSubscriber) {
      this._tabsSubscriber.unsubscribe();
    }
  }

  _generateTabs(value: any) {
    const url = this.router.url;
    switch (url) {
      case '/pagamento-servizio':
        this._hasTab = !!value.tabs;
        this._routerTab = true;
        this._tabs = [
          { label: PayService.I18n.json.Pagamenti.Servizi.Titolo, path: 'pagamento-servizio', url: '/pagamento-servizio' },
          { label: PayService.I18n.json.Pagamenti.Bollettino.Titolo, path: 'bollettino', url: '/bollettino' }
        ];
        break;
      case '/bollettino':
        this._hasTab = true;
        this._routerTab = true;
        this._tabs = [
          { label: PayService.I18n.json.Pagamenti.Servizi.Titolo, path: 'pagamento-servizio', url: '/pagamento-servizio' },
          { label: PayService.I18n.json.Pagamenti.Bollettino.Titolo, path: 'bollettino', url: '/bollettino' }
        ];
        break;
      case '/riepilogo':
        this._hasTab = true;
        this._routerTab = false;
        this._tabs = [
          { label: PayService.I18n.json.StatiPendeza.NON_ESEGUITA, value: PayService.STATI_PENDENZA.NON_ESEGUITA },
          { label: PayService.I18n.json.StatiPendeza.ESEGUITA, value: PayService.STATI_PENDENZA.ESEGUITA },
          { label: PayService.I18n.json.StatiPendeza.SCADUTA, value: PayService.STATI_PENDENZA.SCADUTA },
          { label: PayService.I18n.json.StatiPendeza.ANNULLATA, value: PayService.STATI_PENDENZA.ANNULLATA }
        ];
        break;
      default:
        this._hasTab = false;
    }
  }

  _onTabMenu(value: string) {
    if (!this._routerTab) {
      this._currentTab = value;
      PayService.TabsBehavior.next({ currentTab: this._currentTab });
    }
  }

  refreshInkBar() {
    if (typeof(Event) === 'function') {
      // modern browsers
      window.dispatchEvent(new Event('resize'));
    } else {
      // for IE and other old browsers
      // causes deprecation warning on modern browsers
      const evt = window.document.createEvent('UIEvents');
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
    }
  }
}
