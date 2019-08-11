import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any {

    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    let a = items.filter(singleItem => {
      let targetField = function (obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
          obj = obj[path[i]];
        };
        return obj;
      };
      return targetField(singleItem, field).toLowerCase().includes(value.toLowerCase());
    });

    return a;

  }

}
