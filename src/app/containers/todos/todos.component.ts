import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../../store/states/app.state';
import { selectTodosList } from '../../store/selectors/todo.selector';
import { GetTodos } from '../../store/actions/todo.action';

@Component({
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$ = this._store.pipe(select(selectTodosList));

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this._store.dispatch(new GetTodos());
  }
}
