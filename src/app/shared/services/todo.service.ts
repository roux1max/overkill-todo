import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITodoHttp } from '../models/todo-http.interface';
import { BackendService } from './backend.service';

@Injectable()
export class TodoService {
  todosUrl = '/api/todos';

  constructor(private _backendService: BackendService) {}

  getTodos(): Observable<HttpResponse<ITodoHttp>> {
    const req = new HttpRequest<ITodoHttp>('GET', this.todosUrl);
    return this._backendService.handle(req);
  }
}
