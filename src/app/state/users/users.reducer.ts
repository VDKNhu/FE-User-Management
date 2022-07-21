import { title } from './../../models/title.model';
import { createReducer, on } from '@ngrx/store';
import {
  addUser,
  addUserSuccess,
  updateUser,
  updateUserSuccess,
  getUsers,
  getUsersSuccess,
  deleteUser,
  deleteUserSuccess
} from './users.action';
import { initialState } from './users.state';
import { user } from '../../models/user.model';

const _usersReducer = createReducer(
  initialState,
  on(getUsers, (state: any, action: any) => {
    return {
      ...state,
      users: action.users,
    };
  }),
  on(getUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
    };
  }),
  on(addUser, (state: any, action: any) => {
    let newUser = { ...action.user };
    return {
      ...state,
      users: [...state.users, newUser],
    };
  }),
  on(addUserSuccess, (state: any, action: any) => {
    let newUser = { ...action.user };
    return {
      ...state,
      users: [...state.users, newUser],
    };
  }),
  
  on(deleteUser, (state: any, action: any) => {
    console.log('action user or any', state, action);
    const deleted_users = state.users.filter((user: any) => {
      return user.id !== action.id;
    });

    return {
      ...state,
      users: deleted_users,
    };
  }),
  on(deleteUserSuccess, (state: any, action: any) => {
    console.log('action user or any', state, action);
    return {
      ...state,
    };
  }),

  on(updateUser, (state: any, action: any) => {
    console.log('in update reducer', state, action);
    let user: any = {
      id: action.id,
      firstName: action.firstName,
      lastName: action.lastName,
      dob: action.dateOfBirth,
      gender: action.gender,
      company: 'ROSEN',
      title: 0,
      email: action.email,
      status: 'Active'
    }
    switch (action.title) {
      case 1: {
        user.title  = "Team Lead";
        break;
      }
      case 2: {
        user.title  = "Architecture";
        break;
      }
      case 3: {
        user.title  = "Web Developer";
        break;
      }
      case 4: {
        user.title  = "Tester";
        break;
      }
      case 5: {
        user.title  = "UI/UX";
        break;
      }
      case 6: {
        user.title  = "DBA";
        break;
      }
    } 

    const updated_user = state.users.map((_user: user) => {
      return user.id === _user.id ? user : _user;
    });

    return {
      ...state,
      users: updated_user,
    };
  }),

  on(updateUserSuccess, (state: any, action: any) => {
    console.log('update success');
    return {
      ...state,
    };
  }),
);

export function usersReducer(state: any, action: any) {
  return _usersReducer(state, action);
}
