import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pay-quadro-servizio',
  templateUrl: './quadro-servizio.component.html',
  styleUrls: ['./quadro-servizio.component.scss']
})
export class QuadroServizioComponent implements OnInit {

  @Input('quadro-class') _quadroClass: string = '';

  @Input('gruppo') _gruppo: string = '';
  @Input('titolo') _titolo: string = '';
  @Input('meta') _meta: string = '';

  constructor() { }

  ngOnInit() {
  }

}
