import { title } from '../../models/title.model';

export interface titlesState {
  titles: title[];
}

export const initialState: titlesState = {
  titles: [],
};
