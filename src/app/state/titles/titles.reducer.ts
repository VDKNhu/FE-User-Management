import { createReducer, on } from '@ngrx/store';
import { getInitialTitles } from './titles.action';
import { initialState } from './titles.state';

const _titlesReducer = createReducer(
  initialState,
  on(getInitialTitles, (state: any, action: any) => {
    let titles = action.titles;
    return {
      ...state,
      titles: titles,
    };
  })
);

export function titlesReducer(state: any, action: any) {
  return _titlesReducer(state, action);
}
