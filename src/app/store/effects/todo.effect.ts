import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { IAppState } from '../states/app.state';
import { GetTodos, GetTodosSuccess, ETodoActions } from '../actions/todo.action';
import { TodoService } from '../../shared/services/todo.service';
import { ITodoHttp } from '../../shared/models/todo-http.interface';

@Injectable()
export class TodoEffects {
  @Effect()
  getTodos$ = this._actions$.pipe(
    ofType<GetTodos>(ETodoActions.GetTodos),
    switchMap(() => this._todoService.getTodos()),
    switchMap((response: HttpResponse<ITodoHttp>) => of(new GetTodosSuccess(response.body.todos)))
  );

  constructor(
    private _todoService: TodoService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
