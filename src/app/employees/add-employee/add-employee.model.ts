export const EmployeeMainFormView = {
  name: { name: "name", validation: ["required"] },
  position: { name: "position", validation: ["required"] },
  email: { name: "email", validation: ["required", "email"] },
  phone: { name: "phone", validation: ["required"] },
  date: { name: "date", validation: ["required"] },
  imgPath: { name: "imgPath", validation: [] },
  id: { name: "id", validation: ["required"] },
  team: { name: "team", validation: ["required"] },
};

export const EmployeeAdditioanFormView = {
  birthday: { name: "birthday", validation: [] },
  family: { name: "family", validation: [] },
  hobbies: { name: "hobbies", validation: [] },
};
