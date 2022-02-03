import { createMachine } from 'xstate';
import { assign } from '@xstate/immer';
import { nanoid } from 'nanoid';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoContext = {
  todos: Todo[];
};

type TodoEvents =
  | {
      type: 'CREATE';
      title: string;
    }
  | { type: 'COMPLETE'; id: string };

//HELPERS
const createTodo = (title: string): Todo => {
  return {
    id: nanoid(),
    title,
    completed: false,
  };
};

export const todoMachine = createMachine(
  {
    tsTypes: {} as import('./machine.typegen').Typegen0,
    id: 'todo',
    schema: {
      context: {} as TodoContext,
      events: {} as TodoEvents,
    },
    context: {
      todos: [],
    },
    initial: 'read',
    states: {
      read: {
        on: {
          CREATE: {
            target: 'creating',
            cond: 'notMax',
          },
          COMPLETE: {
            actions: 'complete',
          },
        },
      },
      creating: {
        entry: 'create',
      },
    },
  },
  {
    actions: {
      create: (context, event) => {
        const newTodo = createTodo(event.title);
        context.todos = [...context.todos, newTodo];
      },
      complete: (context, event) => {},
    },
    guards: {
      notMax: (context) => {
        return context.todos.length < 10;
      },
    },
  }
);
