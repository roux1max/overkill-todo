import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ITodo } from '../../shared/models/todo.interface';
import { INewTodo } from '../../shared/models/new-todo.interface';
import { AddTodoModalComponent } from '../add-todo-modal/add-todo-modal.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnChanges {
  @Input()
  todos: ITodo[];
  @Output()
  todoStateToggled: EventEmitter<number> = new EventEmitter();
  @Output()
  todoClicked: EventEmitter<number> = new EventEmitter();
  @Output()
  todoAdded: EventEmitter<INewTodo> = new EventEmitter();

  sortedTodos: ITodo[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.todos && changes.todos.currentValue) {
      this.refreshSortedTodos();
    }
  }

  onToggleTodo(todo: ITodo) {
    this.todoStateToggled.emit(todo.id);
  }

  refreshSortedTodos() {
    this.sortedTodos = [...this.todos].sort((todo1, todo2) => {
      if (todo1.done !== todo2.done) {
        return todo1.done ? 1 : -1;
      } else if (todo1.done) {
        return new Date(todo1.doneAt).getTime() - new Date(todo2.doneAt).getTime();
      } else {
        return new Date(todo2.createdAt).getTime() - new Date(todo1.createdAt).getTime();
      }
    });
  }

  openTodo(todo: ITodo) {
    this.todoClicked.emit(todo.id);
  }

  openNewTaskModal() {
    const dialogRef = this.dialog.open(AddTodoModalComponent, {
      width: '350px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.todoAdded.emit(result);
    });
  }
}
