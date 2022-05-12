import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "stringToReadebleDate",
})
export class StringToReadebleDatePipe implements PipeTransform {
  transform(value: string): string {
    if (this.isDate(value)) {
      const date = new Date(value);

      return `${this.fullView(date.getMonth() + 1)}/${this.fullView(
        date.getDate()
      )}/${date.getFullYear()}`;
    }

    return value;
  }

  isDate(value: string): boolean {
    return !isNaN(Date.parse(value));
  }

  fullView(value: number): string {
    return String(value).length === 1 ? `0${value}` : `${value}`;
  }
}
