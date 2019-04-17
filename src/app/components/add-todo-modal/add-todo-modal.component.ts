import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { INewTodo } from '../../shared/models/new-todo.interface';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss'],
})
export class AddTodoModalComponent implements OnInit {
  newTodo: INewTodo;

  constructor(public dialogRef: MatDialogRef<AddTodoModalComponent>) {}

  ngOnInit(): void {
    this.newTodo = {
      title: '',
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
