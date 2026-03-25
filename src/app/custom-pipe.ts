import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
})
export class CustomPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value ? '+233' + value : value;
  }

}
