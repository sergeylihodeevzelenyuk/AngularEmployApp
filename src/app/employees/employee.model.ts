export class Employee {
  constructor(
    public name: string,
    public position: string,
    public email: string,
    public phone: number | string,
    public date?: string,
    public imgPath?: string,
    public id?: string
  ) {}
}
