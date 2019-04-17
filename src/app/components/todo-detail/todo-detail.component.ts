import { Component, OnInit, Input } from '@angular/core';
import { ITodo } from '../../shared/models/todo.interface';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  @Input()
  todo: ITodo;

  constructor() {}

  ngOnInit() {}
}
