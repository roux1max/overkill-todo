import { async, TestBed } from '@angular/core/testing';
import { XhrFactory } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { ITodoHttp } from '../models/todo-http.interface';
import { BackendService } from './backend.service';

describe('BackendService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BackendService, XhrFactory],
    })
  );

  it('should be created', () => {
    const service: BackendService = TestBed.get(BackendService);
    expect(service).toBeTruthy();
  });
});

// describe('BackendService.handle()', () => {
//   const service: BackendService = TestBed.get(BackendService);

//   it('should return an HTTP response with a body', async(() => {
//     const req = new HttpRequest<ITodoHttp>('GET', '/todos');

//     service.handle(req).subscribe(response => {
//       expect(response).toBeDefined();
//       expect(response.status).toBe(200);
//       expect(response.body).toBeDefined();
//       expect(response.body.todos).toBeDefined();
//       expect(Array.isArray(response.body.todos)).toBeTruthy();
//     });
//   }));
// });
