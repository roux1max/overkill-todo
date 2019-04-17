import { Action } from '@ngrx/store';
import { ITodo } from '../../shared/models/todo.interface';

export enum ETodoActions {
  GetTodos = '[Todo] Get Todos',
  GetTodosSuccess = '[Todo] Get Todos Success',
  ToggleTodoState = '[Todo] Toggle Todo state',
  ToggleTodoStateSuccess = '[Todo] Toggle Todo state Success',
  GetTodo = '[Todo] Get single Todo',
  GetTodoSuccess = '[Todo] Get single Todo Success',
}

export class GetTodos implements Action {
  public readonly type = ETodoActions.GetTodos;
}

export class GetTodosSuccess implements Action {
  public readonly type = ETodoActions.GetTodosSuccess;

  constructor(public payload: ITodo[]) {}
}

export class ToggleTodoState implements Action {
  public readonly type = ETodoActions.ToggleTodoState;

  constructor(public payload: number) {}
}

export class ToggleTodoStateSuccess implements Action {
  public readonly type = ETodoActions.ToggleTodoStateSuccess;

  constructor(public payload: ITodo) {}
}

export class GetTodo implements Action {
  public readonly type = ETodoActions.GetTodo;

  constructor(public payload: number) {}
}

export class GetTodoSuccess implements Action {
  public readonly type = ETodoActions.GetTodoSuccess;

  constructor(public payload: ITodo) {}
}

export type TodoActions =
  | GetTodos
  | GetTodosSuccess
  | ToggleTodoState
  | ToggleTodoStateSuccess
  | GetTodo
  | GetTodoSuccess;
