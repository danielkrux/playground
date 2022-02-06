import { StateFrom } from 'xstate';
import { todosMachine } from './todosMachine';

type State = StateFrom<typeof todosMachine>;

export const getTodos = (state: State) => state.context.todos;

export const getFilter = (state: State) => state.context.filter;

export const getCount = (state: State) => state.context.todos.length;

export const getCompletedCount = (state: State) =>
  state.context.todos.filter((t) => t.completed).length;

export const getTodo = (state: State, id: string) =>
  state.context.todos.find((t) => t.id === id);

export const getDraft = (state: State) => state.context.draft;
