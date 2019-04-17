import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITodoHttp } from '../models/todo-http.interface';
import { INewTodo } from '../models/new-todo.interface';
import { ISingleTodoHttp } from '../models/single-todo-http.interface';
import { BackendService } from './backend.service';

@Injectable()
export class TodoService {
  todosUrl = '/api/todos';

  constructor(private _backendService: BackendService) {}

  getTodos(): Observable<HttpResponse<ITodoHttp>> {
    const req = new HttpRequest<ITodoHttp>('GET', this.todosUrl);
    return this._backendService.handle(req);
  }

  toggleTodoState(id: number): Observable<HttpResponse<ISingleTodoHttp>> {
    const req = new HttpRequest('PATCH', `${this.todosUrl}/toggle-state`, { id });
    return this._backendService.handle(req);
  }

  getSingleTodo(id: number): Observable<HttpResponse<ISingleTodoHttp>> {
    const req = new HttpRequest<ITodoHttp>('GET', `${this.todosUrl}/${id}`);
    return this._backendService.handle(req);
  }

  createTodo(todo: INewTodo): Observable<HttpResponse<ISingleTodoHttp>> {
    const req = new HttpRequest('POST', this.todosUrl, todo);
    return this._backendService.handle(req);
  }
}
