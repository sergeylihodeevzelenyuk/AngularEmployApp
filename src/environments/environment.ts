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

  mockedEmployeesData: {
    fetched: {
      '-N1PHU_czZyt36-w4zgP': {
        additional: {
          birthday: '2020-02-13T22:00:00.000Z',
          family: 'Serhii and Anna',
          hobbies: 'Miu-miu',
          startDate: '2020-05-15T21:00:00.000Z',
          team: 'Catsby ',
        },
        email: 'prr-prr@gmail.com',
        id: '-N1PHU_czZyt36-w4zgP',
        imgPath:
          'https://www.meme-arsenal.com/memes/ecdaf55fffca12b0feaca5b3431acdff.jpg',
        name: 'Alice',
        phone: '234234234234',
        position: 'Do all great things',
      },
      '-N1JYJ1u8581_GPr1xzu': {
        additional: {
          birthday: '1978-06-14T21:00:00.000Z',
          family: 'It use to be',
          hobbies: 'Drinking',
          startDate: '2021-02-02T22:00:00.000Z',
          team: 'Anonymous alcoholics',
        },
        email: 'chears@gmail.com',
        id: '-N1JYJ1u8581_GPr1xzu',
        imgPath:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLgDNTr54wz0U8Cur95hv83e3fDrMDdNGJVw&usqp=CAU',
        name: 'Funfuryee',
        phone: '0974567654',
        position: 'Front-end Intern',
      },

      '-N2R-UkD0dy1QA8GldXt': {
        additional: {
          birthday: '',
          family: 'ZSU',
          hobbies: 'Digging holes',
          startDate: '',
          team: 'ZSU',
        },
        email: 'Patron@gmail.com',
        id: '-N2R-UkD0dy1QA8GldXt',
        imgPath: 'https://i.ytimg.com/vi/SEa1IlVGx5E/hqdefault.jpg',
        name: 'Patron',
        phone: '0674564737',
        position: 'Searching bomb',
      },
      '-N1FGEHiZZ8REoVxGB_L': {
        additional: {
          birthday: '2022-05-04T21:00:00.000Z',
          family: 'guardians of the galaxy',
          hobbies: 'Humor ',
          startDate: '2022-05-02T21:00:00.000Z',
          team: 'guardians of the galaxy',
        },
        email: 'reactiveracoon@gmail.com',
        id: '-N1FGEHiZZ8REoVxGB_L',
        imgPath:
          'https://yt3.ggpht.com/ytc/AKedOLRP7DDLlZqwWvoO8msoVBU0Bk7Ho1X0pSPre5ia=s900-c-k-c0x00ffffff-no-rj',
        name: 'Reactive Racoon',
        phone: '+38093443761',
        position: 'Front-End',
      },
    },

    modyfied: [
      {
        additional: {
          birthday: '2020-02-13T22:00:00.000Z',
          family: 'Serhii and Anna',
          hobbies: 'Miu-miu',
          startDate: '2020-05-15T21:00:00.000Z',
          team: 'Catsby ',
        },
        email: 'prr-prr@gmail.com',
        id: '-N1PHU_czZyt36-w4zgP',
        imgPath:
          'https://www.meme-arsenal.com/memes/ecdaf55fffca12b0feaca5b3431acdff.jpg',
        name: 'Alice',
        phone: '234234234234',
        position: 'Do all great things',
      },
      {
        additional: {
          birthday: '1978-06-14T21:00:00.000Z',
          family: 'It use to be',
          hobbies: 'Drinking',
          startDate: '2021-02-02T22:00:00.000Z',
          team: 'Anonymous alcoholics',
        },
        email: 'chears@gmail.com',
        id: '-N1JYJ1u8581_GPr1xzu',
        imgPath:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLgDNTr54wz0U8Cur95hv83e3fDrMDdNGJVw&usqp=CAU',
        name: 'Funfuryee',
        phone: '0974567654',
        position: 'Front-end Intern',
      },
      {
        additional: {
          birthday: '',
          family: 'ZSU',
          hobbies: 'Digging holes',
          startDate: '',
          team: 'ZSU',
        },
        email: 'Patron@gmail.com',
        id: '-N2R-UkD0dy1QA8GldXt',
        imgPath: 'https://i.ytimg.com/vi/SEa1IlVGx5E/hqdefault.jpg',
        name: 'Patron',
        phone: '0674564737',
        position: 'Searching bomb',
      },
      {
        additional: {
          birthday: '2022-05-04T21:00:00.000Z',
          family: 'guardians of the galaxy',
          hobbies: 'Humor ',
          startDate: '2022-05-02T21:00:00.000Z',
          team: 'guardians of the galaxy',
        },
        email: 'reactiveracoon@gmail.com',
        id: '-N1FGEHiZZ8REoVxGB_L',
        imgPath:
          'https://yt3.ggpht.com/ytc/AKedOLRP7DDLlZqwWvoO8msoVBU0Bk7Ho1X0pSPre5ia=s900-c-k-c0x00ffffff-no-rj',
        name: 'Reactive Racoon',
        phone: '+38093443761',
        position: 'Front-End',
      },
    ],
  },
};
