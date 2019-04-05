import { Component, Input, OnInit } from '@angular/core';
import { FooterLocalization } from '../classes/localization/footer-localization';

@Component({
  selector: 'link-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input('localization-data') _fl: FooterLocalization = new FooterLocalization();

  @Input('url-titolo') _hrefFooter: string = '#';

  @Input('url-logo') _srcLogo: string;

  @Input('evaluate') _hasEvaluate: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
