import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { IAppState } from '../../store/states/app.state';
import { selectTodosList } from '../../store/selectors/todo.selector';
import { GetTodos, ToggleTodoState } from '../../store/actions/todo.action';

@Component({
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$ = this._store.pipe(select(selectTodosList));

  constructor(private _store: Store<IAppState>, private _router: Router) {}

  ngOnInit() {
    this._store.dispatch(new GetTodos());
  }

  updateTodoState(id: number) {
    this._store.dispatch(new ToggleTodoState(id));
  }

  navigateToTodo(id: number) {
    this._router.navigate(['tasks', id]);
  }
}
