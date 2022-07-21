import { user } from '../../models/user.model';

export interface usersState {
  users: user[];
}

export const initialState: usersState = {
  users: [
    // {
    //   id: 1,
    //   firstName: 'string1',
    //   lastName: 'string',
    //   dob: '12/02/2001',
    //   gender: '2',
    //   company: 'string',
    //   title: 'UI/UX',
    //   email: 'string',
    //   status: 'string',
    // },
    // {
    //   id: 2,
    //   firstName: 'string2',
    //   lastName: 'string',
    //   dob: '01/05/2000',
    //   gender: '1',
    //   company: 'string',
    //   title: 'UI/UX',
    //   email: 'string',
    //   status: 'string',
    // },
    // {
    //   id: 3,
    //   firstName: 'strinG3',
    //   lastName: 'string',
    //   dob: '02/02/2001',
    //   gender: '2',
    //   company: 'string',
    //   title: 'Team Lead',
    //   email: 'string',
    //   status: 'string',
    // },

  ],
};
