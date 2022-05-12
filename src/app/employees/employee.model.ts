export class Employee {
  constructor(
    public name: string,
    public position: string,
    public email: string,
    public phone: number | string,
    public imgPath: string,
    public id: string,
    public additional: Additional
  ) {}
}

export class Additional {
  constructor(
    public team: string,
    public birthday: string,
    public startDate: string,
    public family: string,
    public hobbies: string
  ) {}
}
