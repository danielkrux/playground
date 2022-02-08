import { assign, createMachine } from 'xstate';

export type Context = {
  value: string;
  draft: string;
};

export type Events = { type: 'KEYDOWN'; value: string };

export const typeAheadMachine = createMachine(
  {
    tsTypes: {} as import('./machine.typegen').Typegen0,
    id: 'type-ahead',
    initial: 'idle',
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: {
      value: '',
      draft: '',
    },
    states: {
      idle: {
        on: {
          KEYDOWN: {
            target: 'debouncing',
            actions: ['clearValue', 'saveQuery'],
          },
        },
      },
      debouncing: {
        on: {
          KEYDOWN: {
            actions: 'saveQuery',
            target: 'debouncing',
          },
        },
        after: {
          300: {
            target: 'idle',
            actions: 'setFinalValue',
          },
        },
      },
    },
  },
  {
    actions: {
      saveQuery: assign({
        draft: (ctx, event) => ctx.draft + event.value,
      }),
      clearValue: assign({
        value: '',
      }),
      setFinalValue: assign({
        value: (ctx) => ctx.draft,
        draft: '',
      }),
    },
  }
);
