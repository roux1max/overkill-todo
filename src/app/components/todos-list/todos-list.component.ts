import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { ITodo } from '../../shared/models/todo.interface';

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

  sortedTodos: ITodo[] = [];

  constructor() {}

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
        return new Date(todo1.createdAt).getTime() - new Date(todo2.createdAt).getTime();
      }
    });
  }

  openTodo(todo: ITodo) {
    this.todoClicked.emit(todo.id);
  }

  addNewTask() {}
}
