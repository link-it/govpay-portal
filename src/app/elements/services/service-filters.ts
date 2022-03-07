import { Directive, ElementRef, Input, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

function searchValue(value: string, item: any, properties: any[]) {
  const _proporties = properties || [ 'searchTerms', 'title', 'subgroup', 'category' ];
  let searchString = '';
  _proporties.forEach(prop => {
    searchString += item[prop] + ' ';
  });
  return (searchString.toLowerCase().indexOf(value) !== -1);
}

@Pipe({
  name: 'serviceGroupFilter',
  pure: false
})
export class ServiceGroupFilterPipe implements PipeTransform {

  transform(items: any[], _value: string, dictionary: any, filtri: any[]): any {
    if (!items) {
      return items;
    }
    const value: string = (_value || '').toLowerCase();
    return items.filter(g => {
      g.items = dictionary[g.group].filter(se => {
        return searchValue(value, se, filtri);
      });
      return (g.group.toLowerCase().indexOf(value) !== -1 || g.items.length !== 0);
    });
  }
}

@Pipe({
  name: 'serviceFilter',
  pure: false
})
export class ServiceFilterPipe implements PipeTransform {
  transform(items: any[], _value: string, filtri: any[]): any {
    if (!items || !_value) {
      return items;
    }
    const value: string = _value.toLowerCase();
    return items.filter(se => {
      return searchValue(value, se, filtri);
    });
  }
}

@Pipe({
  name: 'sanitize'
})
export class SanitizeHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value) {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
}

@Pipe({
  name: 'rawHtml'
})
export class RawHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[injectHTML]',
})
export class InjectHTMLDirective {
  @Input() set injectHTML(content: string) {
    this.host.nativeElement.innerHTML = content;
  }

  constructor(private host: ElementRef) { }
}
