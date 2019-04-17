import { ETodoActions, TodoActions } from '../actions/todo.action';
import { initialTodoState, ITodoState } from '../states/todo.state';

export const todoReducers = (state = initialTodoState, action: TodoActions): ITodoState => {
  switch (action.type) {
    case ETodoActions.GetTodosSuccess: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    default:
      return state;
  }
};
