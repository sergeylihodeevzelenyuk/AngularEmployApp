export interface DataModifier {
  allDataModifier: (data: any) => any;
  itemDataModifier: (fetchedItem: any, id: string) => any;
}
