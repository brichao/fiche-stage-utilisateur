import { orderBy } from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(value: any, cle: string, sensContraire: boolean): any {
    const sortOrder: string = sensContraire? 'desc' : 'asc';

    return orderBy(value, [cle], [sortOrder]);

    /*if(!Array.isArray(value)){
      return ;
    }
    if(!cle || cle === ''){
      cle = 'dateDeCreation';
    }

    value.sort((a: any, b: any) => {
      if(sensContraire === false){
        if(a[cle] > b[cle]){
          return 1;
        } else if(a[cle] < b[cle]){
          return -1;
        } else {
          return 0;
        }
      } else {
        if(a[cle] < b[cle]){
          return 1;
        } else if(a[cle] > b[cle]){
          return -1;
        } else {
          return 0;
        }
      }
    });
    return value;*/
  }

}
