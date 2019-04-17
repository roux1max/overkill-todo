import { Injectable } from '@angular/core';
import { HttpXhrBackend, XhrFactory, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { ITodo } from '../models/todo.interface';
import { ITodoHttp } from '../models/todo-http.interface';
import { ISingleTodoHttp } from '../models/single-todo-http.interface';

@Injectable()
export class BackendService extends HttpXhrBackend {
  private todos: ITodo[];
  private static storageKey: string = 'overkill-todo.todos';

  constructor(xhrFactory: XhrFactory) {
    super(xhrFactory);

    if (!localStorage.getItem(BackendService.storageKey)) {
      // We initialize default data.
      localStorage.setItem(
        BackendService.storageKey,
        JSON.stringify([
          {
            id: 1,
            title: 'My first Todo!',
            description: 'lorem ipsum dolor es...',
            createdAt: new Date('2019-16-04T10:15:00'),
            doneAt: null,
            done: false,
          },
          {
            id: 2,
            title: 'Another task I must do',
            description: 'lorem ipsum dolor es...',
            createdAt: new Date('2019-16-04T12:30:00'),
            doneAt: null,
            done: false,
          },
          {
            id: 3,
            title: 'This one I already did it!',
            description: 'lorem ipsum dolor es...',
            createdAt: new Date('2019-15-04T10:00:00'),
            doneAt: new Date('2019-17-04T09:00:00'),
            done: true,
          },
        ])
      );
    }
  }

  handle(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    let todos: ITodo[] = JSON.parse(localStorage.getItem(BackendService.storageKey)) || [];

    // Used to create a delay
    return of(null)
      .pipe(
        mergeMap(() => {
          if (request.url.endsWith('/todos') && request.method === 'GET') {
            return of(new HttpResponse<ITodoHttp>({ status: 200, body: { todos } }));
          } else if (request.url.endsWith('/todos/toggle-state') && request.method === 'PATCH') {
            const index = todos.findIndex(todo => todo.id === request.body.id);

            if (index !== -1) {
              todos[index].done = !todos[index].done;
              todos[index].doneAt = todos[index].done ? new Date() : null;
              localStorage.setItem(BackendService.storageKey, JSON.stringify(todos));

              return of(new HttpResponse<any>({ status: 200, body: { todo: todos[index] } }));
            }
          }

          return throwError({ error: { message: 'Not found' } });
        })
      )
      .pipe(materialize())
      .pipe(delay(300))
      .pipe(dematerialize());
  }
}
