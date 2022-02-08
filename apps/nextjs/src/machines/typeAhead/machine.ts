import { assign, createMachine } from 'xstate';

export type Context = {
  value: string;
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
    },
    states: {
      idle: {
        entry: 'clearQuery',
        on: {
          KEYDOWN: 'typing',
        },
      },
      typing: {
        entry: 'saveQuery',
        on: {
          KEYDOWN: { actions: 'saveQuery' },
        },
        after: {
          300: 'idle',
        },
      },
    },
  },
  {
    actions: {
      saveQuery: assign({
        value: (ctx, event) => ctx.value + event.value,
      }),
      clearQuery: assign({ value: '' }),
    },
  }
);
