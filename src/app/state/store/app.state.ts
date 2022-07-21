import { titlesReducer } from '../titles/titles.reducer';
import { titlesState } from '../titles/titles.state';
import { usersReducer } from '../users/users.reducer';
import { usersState } from '../users/users.state';

export interface appState {
  titles: titlesState;
  users: usersState;
}

export const appReducer = {
  titles: titlesReducer,
  users: usersReducer,
};
