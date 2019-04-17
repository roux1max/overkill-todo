import { createSelector } from '@ngrx/store';

import { IAppState } from '../states/app.state';
import { ITodoState } from '../states/todo.state';

const selectTodos = (state: IAppState) => state.todos;

export const selectTodosList = createSelector(
  selectTodos,
  (state: ITodoState) => state.todos
);
