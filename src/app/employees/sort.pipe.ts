import { Pipe, PipeTransform } from "@angular/core";

import { Employee } from "./employee.model";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(value: Employee[], sorted: boolean): Employee[] {
    if (sorted) {
      return value.sort((a, b) => a.name.localeCompare(b.name));
    }

    return value.sort((a, b) => -a.name.localeCompare(b.name));
  }
}
