import { Injectable } from '@angular/core';
import { HttpXhrBackend, XhrFactory, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { ITodo } from '../models/todo.interface';
import { ITodoHttp } from '../models/todo-http.interface';

@Injectable()
export class BackendService extends HttpXhrBackend {
  private todos: ITodo[];

  constructor(xhrFactory: XhrFactory) {
    super(xhrFactory);

    // We initialize default data.
    localStorage.setItem(
      'overkill-todo.todos',
      JSON.stringify([
        {
          id: 1,
          title: 'My first Todo!',
          description: 'lorem ipsum dolor es...',
          createdAt: new Date(),
          doneAt: null,
          done: false,
        },
        {
          id: 2,
          title: 'This one I already did it!',
          description: 'lorem ipsum dolor es...',
          createdAt: new Date(),
          doneAt: new Date(),
          done: true,
        },
      ])
    );
  }

  handle(request: HttpRequest<ITodoHttp>): Observable<HttpResponse<ITodoHttp>> {
    let todos: ITodo[] = JSON.parse(localStorage.getItem('overkill-todo.todos')) || [];

    // Used to create a delay
    return of(null)
      .pipe(
        mergeMap(() => {
          if (request.url.endsWith('/todos') && request.method === 'GET') {
            return of(new HttpResponse<ITodoHttp>({ status: 200, body: { todos } }));
          }

          return throwError({ error: { message: 'Not found' } });
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
