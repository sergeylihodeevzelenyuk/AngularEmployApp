export const environment = {
  production: false,

  PATH: {
    ROOT: "",
    HOME: "home",
    AUTH: {
      ROOT: "",
      SING_IN: "sign-in",
      SING_UP: "sign-up",
    },
    EMPLOYEES: {
      ROOT: "employees",
      EMPLOYEE: "employee",
      EMPLOYEE_FULL_PASS: "employees/employee",
      EDIT: "edit-employee",
      EDIT_FULL_PASS: "employees/edit-employee",
    },
    NOT_FOUND: "not-found",
  },

  URL: {
    EMPLOYEE: "https://employees-aa53b-default-rtdb.firebaseio.com/employees",
  },

  ERROR_MSG: {
    TITLE: "Error code: ",
    HTTP_FAIL: "Failure Response",
  },

  NOTIFICATION: {
    DELETE: "Deleeting in process...",
    FETCH: "Fetching employee data",
    ADD: "Adding new employee",
    UPDATE: "Updating employee",
  },
};
