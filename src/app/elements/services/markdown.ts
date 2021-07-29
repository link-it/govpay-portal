import { Directive, ElementRef, Input, OnInit, Renderer2, SecurityContext } from '@angular/core';
import * as marked from 'marked';
import { SanitizeHTMLPipe } from './service-filters';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[payMarked]'
})
export class MarkedDirective implements OnInit {

  @Input() payMarked: any = '';
  sanitizePipe: SanitizeHTMLPipe;

  constructor(private elementRef: ElementRef, private renderer: Renderer2,
              private sanitizer: DomSanitizer) {
    this.sanitizePipe = new SanitizeHTMLPipe(sanitizer);
  }

  ngOnInit() {
    const markText = this.payMarked;
    if (markText && markText.length > 0) {
      const markdownHtml = this.sanitizePipe.transform(marked(markText));
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', markdownHtml);
    }
  }
}
