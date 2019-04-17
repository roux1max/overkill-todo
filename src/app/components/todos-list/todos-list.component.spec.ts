import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatCardModule, MatIconModule, MatCheckboxModule } from '@angular/material';

import { TodosListComponent } from './todos-list.component';

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosListComponent],
      imports: [MatListModule, MatCardModule, MatIconModule, MatCheckboxModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    component.todos = [
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
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
