import { Component, OnInit, Input } from '@angular/core';

import { ITodo } from '../../shared/models/todo.interface';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {
  @Input()
  todos: ITodo[];

  constructor() {}

  ngOnInit() {}

  addNewTask() {}
}
