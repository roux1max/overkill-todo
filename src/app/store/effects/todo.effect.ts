import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { IAppState } from '../states/app.state';
import {
  GetTodos,
  GetTodosSuccess,
  ETodoActions,
  ToggleTodoState,
  ToggleTodoStateSuccess,
  GetTodo,
  GetTodoSuccess,
} from '../actions/todo.action';
import { TodoService } from '../../shared/services/todo.service';
import { ITodoHttp } from '../../shared/models/todo-http.interface';
import { ISingleTodoHttp } from '../../shared/models/single-todo-http.interface';

@Injectable()
export class TodoEffects {
  @Effect()
  getTodos$ = this._actions$.pipe(
    ofType<GetTodos>(ETodoActions.GetTodos),
    switchMap(() => this._todoService.getTodos()),
    switchMap((response: HttpResponse<ITodoHttp>) => of(new GetTodosSuccess(response.body.todos)))
  );

  @Effect()
  toggleTodo$ = this._actions$.pipe(
    ofType<ToggleTodoState>(ETodoActions.ToggleTodoState),
    map(action => action.payload),
    switchMap(id => this._todoService.toggleTodoState(id)),
    switchMap((response: HttpResponse<ISingleTodoHttp>) =>
      of(new ToggleTodoStateSuccess(response.body.todo))
    )
  );

  @Effect()
  getTodo$ = this._actions$.pipe(
    ofType<GetTodo>(ETodoActions.GetTodo),
    map(action => action.payload),
    switchMap(id => this._todoService.getSingleTodo(id)),
    switchMap((response: HttpResponse<ISingleTodoHttp>) =>
      of(new GetTodoSuccess(response.body.todo))
    )
  );

  constructor(
    private _todoService: TodoService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
