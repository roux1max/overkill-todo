import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '../states/app.state';
import { todoReducers } from './todo.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  todos: todoReducers,
};
