import { assign, createMachine } from 'xstate';
import { assign as assignImmer } from '@xstate/immer';
import { nanoid } from 'nanoid';

export type FilterShow = 'all' | 'todo' | 'completed';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodosContext = {
  draft: string;
  todos: Todo[];
  filter: FilterShow;
};

export type TodosEvents =
  | {
      type: 'CREATE';
    }
  | {
      type: 'DRAFT.CHANGE';
      title: string;
    }
  | {
      type: 'DELETE';
      id: string;
    }
  | {
      type: 'COMPLETED';
      id: string;
    }
  | {
      type: 'UPDATE';
      todo: Todo;
    }
  | { type: 'DELETE.COMPLETED' }
  | { type: 'REORDER'; todos: Todo[] }
  | { type: 'FILTER'; show: FilterShow };

//HELPERS
const createTodo = (title: string): Todo => {
  return {
    id: nanoid(),
    title,
    completed: false,
  };
};

export const todosMachine = createMachine(
  {
    tsTypes: {} as import('./todosMachine.typegen').Typegen0,
    id: 'todos',
    schema: {
      context: {} as TodosContext,
      events: {} as TodosEvents,
    },
    initial: 'loading',
    context: {
      draft: '',
      filter: 'all',
      todos: [
        {
          id: '123',
          title: 'Get groceries',
          completed: true,
        },
        {
          id: '124',
          title: 'Buy sneakers',
          completed: false,
        },
      ],
    },
    states: {
      loading: {
        always: 'ready',
      },
      ready: {},
    },
    on: {
      'DRAFT.CHANGE': {
        actions: 'draftChange',
      },
      CREATE: {
        cond: 'createGuard',
        actions: 'create',
      },
      DELETE: {
        actions: 'delete',
      },
      'DELETE.COMPLETED': {
        actions: 'deleteCompleted',
      },
      COMPLETED: {
        actions: 'toggleComplete',
      },
      UPDATE: {
        actions: 'update',
      },
      REORDER: {
        actions: 'reorder',
      },
      FILTER: {
        actions: 'filter',
      },
    },
  },
  {
    actions: {
      draftChange: assign({ draft: (_, event) => event.title }),

      create: assign((context) => {
        const newTodo = createTodo(context.draft);
        return {
          draft: '',
          todos: [...context.todos, newTodo],
        };
      }),

      delete: assign({
        todos: (context, event) =>
          context.todos.filter((t) => t.id !== event.id),
      }),

      deleteCompleted: assign({
        todos: (context) => context.todos.filter((t) => !t.completed),
      }),

      toggleComplete: assignImmer((ctx, event) => {
        const todoIndex = ctx.todos.findIndex((t) => t.id === event.id);
        ctx.todos[todoIndex].completed = !ctx.todos[todoIndex].completed;
      }),

      update: assignImmer((ctx, event) => {
        const todoIndex = ctx.todos.findIndex((t) => t.id === event.todo.id);
        ctx.todos[todoIndex] = event.todo;
      }),

      reorder: assign((_, event) => ({
        todos: event.todos,
      })),

      filter: assign((_, event) => ({
        filter: event.show,
      })),
    },

    guards: {
      createGuard: (context) =>
        context.todos.length < 10 && Boolean(context.draft.trim().length),
    },
  }
);
