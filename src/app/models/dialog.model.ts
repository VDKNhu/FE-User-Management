import { user } from './user.model';

export interface dialog {
  dialogName: string;
  user: user;
  groupsUsers: user[];
}
