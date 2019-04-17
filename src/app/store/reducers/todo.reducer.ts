import { ETodoActions, TodoActions } from '../actions/todo.action';
import { initialTodoState, ITodoState } from '../states/todo.state';
import { ITodo } from '../../shared/models/todo.interface';

export const todoReducers = (state = initialTodoState, action: TodoActions): ITodoState => {
  switch (action.type) {
    case ETodoActions.GetTodosSuccess: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case ETodoActions.ToggleTodoStateSuccess: {
      return {
        ...state,
        todos: state.todos.map((item: ITodo) =>
          item.id === action.payload.id
            ? { ...item, done: action.payload.done, doneAt: action.payload.doneAt }
            : item
        ),
      };
    }
    default:
      return state;
  }
};
