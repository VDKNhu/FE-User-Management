import { createFeatureSelector, createSelector } from "@ngrx/store";
import { titlesState } from "./titles.state";

export const TITLE_STATE_NAME = 'titles'

const getTitlesState = createFeatureSelector<titlesState>(TITLE_STATE_NAME);

export const getInitialTitles = createSelector(getTitlesState, (state: any) => {
  return state.titles;
})



