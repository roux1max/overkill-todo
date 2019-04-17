import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { IAppState } from '../../store/states/app.state';
import { selectSelectedTodo } from '../../store/selectors/todo.selector';
import { GetTodo } from '../../store/actions/todo.action';

@Component({
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.scss'],
})
export class SingleTodoComponent implements OnInit {
  todo$ = this._store.pipe(select(selectSelectedTodo));

  constructor(private _store: Store<IAppState>, private _route: ActivatedRoute) {}

  ngOnInit() {
    this._store.dispatch(new GetTodo(this._route.snapshot.params.id));
  }
}
