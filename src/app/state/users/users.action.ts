import { createAction, props } from "@ngrx/store";
import { user } from "../../models/user.model";

export const GET_USERS_ACTION = 'Get users';
export const GET_USERS_ACTION_SUCCESS = 'Get users success';
export const ADD_USER_ACTION = 'Add user';
export const ADD_USER_ACTION_SUCCESS = 'Add user success';
export const UPDATE_USER_ACTION = 'Update user';
export const UPDATE_USER_ACTION_SUCCESS = 'Update user success';
export const DELETE_USER_ACTION = 'Delete user';
export const DELETE_USER_ACTION_SUCCESS = 'Delete user success';

export const getUsers = createAction(GET_USERS_ACTION);
export const getUsersSuccess = createAction(GET_USERS_ACTION_SUCCESS, props<{users: user[]}>());
export const addUser = createAction(ADD_USER_ACTION, props<{user: any}>());
export const addUserSuccess = createAction(ADD_USER_ACTION_SUCCESS, props<{user: any}>());
export const deleteUser = createAction(DELETE_USER_ACTION, props<{id: number}>());
export const deleteUserSuccess = createAction(DELETE_USER_ACTION_SUCCESS);
export const updateUser = createAction(UPDATE_USER_ACTION, props<{user: any}>());
export const updateUserSuccess = createAction(UPDATE_USER_ACTION_SUCCESS);

