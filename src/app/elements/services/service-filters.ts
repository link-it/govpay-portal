import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'serviceGroupFilter',
  pure: false
})
export class ServiceGroupFilterPipe implements PipeTransform {

  transform(items: any[], _value: string, dictionary: any): any {
    if (!items) {
      return items;
    }
    const value: string = (_value || '').toLowerCase();
    return items.filter(g => {
      g.items = dictionary[g.group].filter(se => {
        return (se.searchTerms.toLowerCase().indexOf(value) !== -1 || se.title.toLowerCase().indexOf(value) !== -1 ||
          se.subgroup.toLowerCase().indexOf(value) !== -1 || se.category.toLowerCase().indexOf(value) !== -1);
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
  transform(items: any[], _value: string): any {
    if (!items || !_value) {
      return items;
    }
    const value: string = _value.toLowerCase();
    return items.filter(se => {
      return (se.searchTerms.toLowerCase().indexOf(value) !== -1 || se.title.toLowerCase().indexOf(value) !== -1 ||
        se.subgroup.toLowerCase().indexOf(value) !== -1 || se.category.toLowerCase().indexOf(value) !== -1);
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
