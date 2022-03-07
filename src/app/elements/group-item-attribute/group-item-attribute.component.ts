import { Component, Input, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';

@Component({
  selector: 'pay-group-item-attribute',
  templateUrl: './group-item-attribute.component.html',
  styleUrls: ['./group-item-attribute.component.scss']
})
export class GroupItemAttributeComponent implements OnInit {

  @Input() group = null;
  @Input() data = null;
  @Input() hideEmpty = false;

  Pay = PayService;

  constructor(public pay: PayService) { }

  ngOnInit(): void {
  }
}
