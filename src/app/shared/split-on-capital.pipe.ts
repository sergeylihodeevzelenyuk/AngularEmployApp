import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "splitOnCapital",
})
export class SplitOnCapitalPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(/(?=[A-Z])/).join(" ");
  }
}
