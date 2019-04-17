import { ITodo } from '../../shared/models/todo.interface';

export interface ITodoState {
  todos: ITodo[];
}

export const initialTodoState: ITodoState = {
  todos: null,
};
