import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(public router: Router) {
    this._tabsSubscriber = PayService.TabsBehavior.subscribe(
    (value: any) => {
      if (value && value.update) {
        this._generateTabs(value);
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
        break;
      case '/bollettino':
        this._hasTab = true;
        break;
      default:
        this._hasTab = false;
    }
    this._tabs = [
      { label: PayService.I18n.json.Pagamenti.Servizi.Titolo, path: 'pagamento-servizio', url: '/pagamento-servizio' },
      { label: PayService.I18n.json.Pagamenti.Bollettino.Titolo, path: 'bollettino', url: '/bollettino' }
    ];
  }

  _onTabMenu(_path: string) {}

}
