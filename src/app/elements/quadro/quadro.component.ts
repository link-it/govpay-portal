import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pay-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.scss']
})
export class QuadroComponent implements OnInit {

  @Input('quadro-class') _quadroClass: string = '';
  @Input('logo-class') _logoClass: string = '';

  @Input('source') _source: any;
  @Input('titolo') _titolo: string = '';
  @Input('image-src') _src: string = '';

  constructor() { }

  ngOnInit() {
  }

}
