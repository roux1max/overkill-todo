import { Action } from '@ngrx/store';

import { ITodo } from '../../shared/models/todo.interface';

export enum ETodoActions {
  GetTodos = '[Todo] Get Todos',
  GetTodosSuccess = '[Todo] Get Todos Success',
}

export class GetTodos implements Action {
  public readonly type = ETodoActions.GetTodos;
}

export class GetTodosSuccess implements Action {
  public readonly type = ETodoActions.GetTodosSuccess;

  constructor(public payload: ITodo[]) {}
}

export type TodoActions = GetTodos | GetTodosSuccess;
