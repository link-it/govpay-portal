import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'pay-yesno-dialog',
  templateUrl: './yesno-dialog.component.html',
  styleUrls: ['./yesno-dialog.component.scss']
})
export class YesnoDialogComponent implements OnInit {

  _hasReport: boolean = false;
  _dialogData: any = { YESLabel: '', NOLabel: '', icon: '', message: [], report: [] };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialogRef<YesnoDialogComponent>) {
    this._dialogData = data;
  }

  ngOnInit() {
    this._hasReport = (this._dialogData.report.length !== 0);
  }

  _closeDialog(cancel: boolean = false) {
    this.dialog.close({ cancel: cancel });
  }

}
