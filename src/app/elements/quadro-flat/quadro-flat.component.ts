import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pay-quadro-flat',
  templateUrl: './quadro-flat.component.html',
  styleUrls: ['./quadro-flat.component.scss']
})
export class QuadroFlatComponent implements OnInit {

  @Input('gruppo') _gruppo: string = '';
  @Input('titolo') _titolo: string = '';
  @Input('meta') _meta: string = '';
  @Input('source') _source: any;

  _version = 1; // versione del servizio - impaginazione
  _detail = null;
  _srcImg = '';

  constructor() { }
  
  ngOnInit() {
    if (this._source.source && this._source.source.jsfDef) {
      const _tmpSource = this._source.source;
      this._detail = _tmpSource.detail;
      this._version = this._detail.taxonomy1 ? 2 : 1;
      this._srcImg = this._detail.thumbnail || '';
    }
  }
}
