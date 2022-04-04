import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { PayService } from '../services/pay.service';

import * as Survey from 'survey-angular';
import * as widgets from 'surveyjs-widgets';

import { init as initCustomWidget } from './customwidget';

declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'survey',
  template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
  </div>`,
})
export class SurveyComponent implements OnInit, OnChanges {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input() lang: string = 'it';
  @Input() json: object;
  @Input() data: any = null;
  @Input() edit: boolean = false;

  result: any;

  surveyModel;

  Pay = PayService;

  constructor() {
    $('body').bootstrapMaterialDesign();

    // widgets.icheck(Survey);
    // widgets.select2(Survey);
    // widgets.inputmask(Survey);
    // widgets.jquerybarrating(Survey);
    // widgets.jqueryuidatepicker(Survey);
    // widgets.nouislider(Survey);
    // widgets.select2tagbox(Survey);
    // // widgets.signaturepad(Survey);
    // widgets.sortablejs(Survey);
    // // widgets.ckeditor(Survey);
    // widgets.autocomplete(Survey);
    // widgets.bootstrapslider(Survey);
    // widgets.prettycheckbox(Survey);
    // // widgets.emotionsratings(Survey);
    // initCustomWidget(Survey);

    // Survey.Serializer.addProperty('questionbase', 'popupdescription:text');
    // Survey.Serializer.addProperty('page', 'popupdescription:text');

    Survey.StylesManager.applyTheme();
    Survey.defaultBootstrapCss.navigationButton = 'btn btn-primary no-border-radius';
  }

  ngOnInit() {
    this.surveyModel = new Survey.Model(this.json);

    // this.surveyModel.setDesignMode(false);
    this.surveyModel.locale = this.lang;
    // this.surveyModel.questionTitleLocation= 'hidden';
    // this.surveyModel.logoPosition = 'right';
    this.surveyModel.focusFirstQuestionAutomatic = false;
    // const compleText = this.Pay.EditMode ? this.Pay.I18n.json.DettaglioServizio.Form.Salva : this.Pay.I18n.json.DettaglioServizio.Dialog.Submit;
    this.surveyModel.completeText = this.Pay.I18n.json.DettaglioServizio.Form.Verifica;
    // this.surveyModel.previewText = this.Pay.I18n.json.DettaglioServizio.Form.previewText;
    // this.surveyModel.editText = this.Pay.I18n.json.DettaglioServizio.Form.editText;
    this.surveyModel.startSurveyText = 'Inizia';
    this.surveyModel.completedHtml = '<div class="px-5 py-5 text-center"><h5>Stiamo verificando i tuoi dati …</h5></div>';
    this.surveyModel.showCompletedPage = true;
    this.surveyModel.questionDescriptionLocation = 'underInput';
    this.surveyModel.questionErrorLocation = 'bottom';
    this.surveyModel.clearInvisibleValues = 'none';
    // this.surveyModel.showPreviewBeforeComplete = 'showAnsweredQuestions';
    this.surveyModel.checkErrorsMode = 'onValueChanging';
    this.surveyModel.textUpdateMode = 'onTyping';
    this.surveyModel.autoGrowComment = true;
    this.surveyModel.questionStartIndex = '1';
    this.surveyModel.widthMode = 'responsive';

    // this.surveyModel.onAfterRenderQuestion.add((survey, options) => {
    //   const el = options.htmlElement;
    //   const question = options.question;
    //   // if (question.getType() == 'text') {
    //     const label = document.createElement('label');
    //     label.classList.add('bmd-label-floating');
    //     label.innerHTML = question.locTitle.textOrHtml;
    //     el.parentNode.insertBefore(label, el);
    //   // }
    // });

    this.surveyModel.onComplete.add((result, options) => {
      this.submitSurvey.emit(result.data);
      this.result = result.data;
    });

    if (this.data) { this.surveyModel.data = this.data; }

    Survey.SurveyNG.render('surveyElement', { model: this.surveyModel });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lang) {
      this.lang = changes.lang.currentValue;
      console.log('lang', this.lang);
      if (this.surveyModel && this.lang) {
        this.surveyModel.locale = this.lang;
        this.surveyModel.clear(true, true);
        this.surveyModel.render();
      }
    }
    if (changes.edit) {
      this.edit = changes.edit.currentValue;
      if (this.surveyModel && this.edit) {
        this.surveyModel.clear(false, true);
      }
    }
  }
}
