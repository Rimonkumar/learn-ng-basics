import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: number | string, currencySymbol = '৳'): string {
    const price = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(price)) return 'N/A';

    return `${currencySymbol}${price.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
}
