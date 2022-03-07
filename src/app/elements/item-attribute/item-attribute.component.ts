import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';

import * as moment from 'moment';

@Component({
  selector: 'pay-item-attribute',
  templateUrl: './item-attribute.component.html',
  styleUrls: ['./item-attribute.component.scss']
})
export class ItemAttributeComponent implements OnInit, OnChanges {

  @Input() attribute = null;
  @Input() data = null;
  @Input() hideEmpty = false;

  Pay = PayService;

  constructor(public pay: PayService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (changes.attribute) {
      this.attribute = changes.attribute.currentValue;
    }
  }

  _isExcluded() {
    let isExcluded = false;
    if (this.attribute) {
      if ((this.hideEmpty && !this.data[this.attribute.name])) {
        isExcluded = (this.attribute.name === 'datiAllegati') ? false : true;
      }
    }
    return isExcluded;
  }

  __getObjectValue(obj, path) {
    if (!path) { return obj; }
    const properties = path.split('.');
    return this.__getObjectValue(obj[properties.shift()], properties.join('.'));
  }

  _formatFieldValue(attribute: any, html: boolean = true) {
    let result = '';

    const field = attribute.name || attribute;
    const type = attribute.type || 'string';
    let label = '';
    let icon = '';

    const value = this.__getObjectValue(this.data, field) || `?${field}?`;

    switch (type) {
      case 'date':
        const data = (value) ? moment(value).format(this.pay.getDateFormatByLanguage()) : PayService.I18n.json.Common.NotAvailable;
        result = `<span class="">${data}</span>`;
        break;
      case 'link':
        label = attribute.labelInner || value;
        icon = attribute.icon || '';
        result = `
          <span>
            <a class="m-0 word-break-all" href="${value}" target="_blank">${label}</a>
            <span class="material-icons ml-2 align-bottom">${icon}</span>
          </span>`;
        break;
      case 'button':
        label = attribute.labelInner || attribute.label;
        icon = attribute.icon || '';
        result = `
          <a class="select-button" href="${value}" target="_blank">
            <span class="material-icons mr-2 align-bottom">${icon}</span>
            <span>${label}</span>
          </a>`;
        break;

      default:
        result = value;
    }

    return result;
  }
}
