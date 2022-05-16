export abstract class HttpResponseDataModifierService<T> {
  constructor() {}

  public firebaseDataModifier(data: any): T[] {
    const modifiedItems: T[] = [];

    for (let key in data) {
      modifiedItems.push({ ...data[key], id: key });
    }

    return modifiedItems;
  }
}
