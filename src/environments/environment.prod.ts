export const environment = {
  production: false,

  PATH: {
    ROOT: '',
    HOME: 'home',
    AUTH: {
      ROOT: '',
      SING_IN: 'sign-in',
      SING_UP: 'sign-up',
    },
    EMPLOYEES: {
      ROOT: 'employees',
      EMPLOYEE: 'employee',
      EMPLOYEE_FULL_PASS: 'employees/employee',
      REQUEST: 'edit-request',
      REQUEST_FULL_ROUTE: 'employees/employee/edit-request',
      REQUEST_STAUS: 'edit-request-status',
      REQUEST_STAUS_FULL_ROUTE: 'employees/employee/edit-request-status',
      EDIT: 'edit-employee',
      EDIT_FULL_PASS: 'employees/edit-employee',
    },
    NOT_FOUND: 'not-found',
  },

  URL: {
    EMPLOYEE: new URL(
      'https://employees-aa53b-default-rtdb.firebaseio.com/employees'
    ),
    REQUESTS: new URL(
      'https://employees-aa53b-default-rtdb.firebaseio.com/requests'
    ),
  },

  ID_PROP: 'name',

  ERROR_MSG: {
    TITLE: 'Error code: ',
    HTTP_FAIL: 'Failure Response',
  },

  NOTIFICATION: {
    DELETE: 'Deleeting in process...',
    FETCH: 'Fetching employee data',
    ADD: 'Adding new employee',
    UPDATE: 'Updating employee',
  },

  SERVERS_NAME: {
    FIREBASE: 'firebase',
  },
};
