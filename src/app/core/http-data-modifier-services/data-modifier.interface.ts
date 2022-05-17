export interface DataModifier {
  allDataModifier: (data: any) => any;
  itemDataModifier: (data: any, id: string) => any;
}
