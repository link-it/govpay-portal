import { OnInit } from '@angular/core';
import { FooterLocalization } from '../classes/localization/footer-localization';
export declare class FooterComponent implements OnInit {
    _fl: FooterLocalization;
    _hrefFooter: string;
    _srcLogo: string;
    _hasEvaluate: boolean;
    constructor();
    ngOnInit(): void;
}
