import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent } from './containers/todos/todos.component';
import { SingleTodoComponent } from './containers/single-todo/single-todo.component';

const routes: Routes = [
  { path: 'tasks', component: TodosComponent },
  { path: 'tasks/:id', component: SingleTodoComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
