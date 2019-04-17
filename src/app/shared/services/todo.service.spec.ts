import { async, TestBed } from '@angular/core/testing';
import { XhrFactory } from '@angular/common/http';

import { TodoService } from './todo.service';
import { BackendService } from './backend.service';

describe('TodoService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TodoService, BackendService, XhrFactory],
    })
  );

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });
});

// describe('TodoService.getTodos()', () => {
//   const service: TodoService = TestBed.get(TodoService);

//   it('should return an HTTP response with a body', async(() => {
//     service.getTodos().subscribe(response => {
//       expect(response).toBeDefined();
//       expect(response.status).toBe(200);
//       expect(response.body).toBeDefined();
//       expect(response.body.todos).toBeDefined();
//       expect(Array.isArray(response.body.todos)).toBeTruthy();
//     });
//   }));
// });
