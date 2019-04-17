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
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed fringilla justo, vel blandit ipsum. Maecenas et nibh id ipsum venenatis dapibus vitae nec libero. Pellentesque fermentum vel elit eu rutrum. In ultrices tempus porttitor. Ut vestibulum, dolor sed facilisis congue, tellus eros ultrices quam, quis lobortis ligula arcu sed ante.',
            createdAt: new Date('2019-16-04T10:15:00'),
            doneAt: null,
            done: false,
          },
          {
            id: 2,
            title: 'Another task I must do',
            description:
              'Sed porta pretium pellentesque. Morbi id convallis ligula, vel cursus tortor. Maecenas odio libero, molestie ut iaculis pellentesque, lobortis nec nisl. Sed justo metus, varius eget tincidunt vel, convallis vel neque. Curabitur nec tincidunt nibh. Suspendisse feugiat est id mollis malesuada. Ut eu arcu fringilla, venenatis velit tempor, dignissim arcu. Integer vel neque bibendum, facilisis risus eu, tincidunt purus. Donec nisi mi, fermentum vitae augue et, faucibus rhoncus eros. Vestibulum hendrerit ex ac tristique aliquam.',
            createdAt: new Date('2019-16-04T12:30:00'),
            doneAt: null,
            done: false,
          },
          {
            id: 3,
            title: 'This one I already did it!',
            description:
              'Proin lacinia ultrices nisl vel ullamcorper. Cras sit amet metus urna. Morbi non elit commodo, pulvinar dui in, semper diam. Ut est turpis, scelerisque cursus felis sed, bibendum eleifend nulla. Praesent viverra aliquet ipsum, et suscipit tellus eleifend id. Vestibulum sed bibendum lectus. Donec nisl justo, commodo a convallis eget, mattis id libero.',
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
          let matches = null;
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
          } else if (
            (matches = request.url.match(/\/todos\/([0-9]{1,})$/)) &&
            request.method === 'GET'
          ) {
            const id = parseInt(matches[1]);
            const selectedTodo = todos.find(todo => todo.id === id);

            return of(new HttpResponse<any>({ status: 200, body: { todo: selectedTodo } }));
          } else if (request.url.endsWith('/todos') && request.method === 'POST') {
            const newTodo = {
              ...request.body,
              id: todos.length + 1,
              createdAt: new Date(),
              done: false,
              doneAt: null,
            };

            todos.push(newTodo);
            localStorage.setItem(BackendService.storageKey, JSON.stringify(todos));

            return of(new HttpResponse<any>({ status: 200, body: { todo: newTodo } }));
          }

          return throwError({ error: { message: 'Not found' } });
        })
      )
      .pipe(materialize())
      .pipe(delay(300))
      .pipe(dematerialize());
  }
}
