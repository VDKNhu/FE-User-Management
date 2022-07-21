import { createFeatureSelector, createSelector } from "@ngrx/store";
import { usersState } from "./users.state";

export const USERS_STATE_NAME = 'users'

const getUsersState = createFeatureSelector<usersState>(USERS_STATE_NAME);

export const getInitialUsers = createSelector(getUsersState, (state: usersState) => {
  return state.users;
})



