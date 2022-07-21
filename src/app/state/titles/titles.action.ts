import { createAction, props } from "@ngrx/store";
import { title } from "../../models/title.model";

export const GET_TITLES_ACTION = 'Get titles';

export const getInitialTitles = createAction(GET_TITLES_ACTION, props<{titles: title[]}>());
