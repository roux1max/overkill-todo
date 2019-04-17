import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { TodosComponent } from './todos.component';
import { TodosListComponent } from '../../components/todos-list/todos-list.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  const initialState = { todos: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent, TodosListComponent],
      providers: [provideMockStore({ initialState })],
    });
    TestBed.overrideComponent(TodosListComponent, {
      set: {
        template: `<table><tr *ngFor="let todos of todos"><td>{{ todo.title }}</td><td>{{ todo.done }}</td></tr></table>`,
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
