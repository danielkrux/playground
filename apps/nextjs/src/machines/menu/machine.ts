import { assign, createMachine } from 'xstate';

export type Context = {
  isOpen: boolean;
  focusedIndex: number;
  typeAhead: {
    draft: string;
    value: string;
  };
};

export type Events =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'KEYDOWN'; value: string };

export const menuMachine = createMachine(
  {
    tsTypes: {} as import('./machine.typegen').Typegen0,
    id: 'type-ahead',
    initial: 'closed',
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: {
      isOpen: false,
      focusedIndex: null,
      typeAhead: {
        value: '',
        draft: '',
      },
    },
    states: {
      closed: {
        on: {
          OPEN: 'open',
        },
      },
      open: {
        on: {
          CLOSE: 'closed',
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
    },
  },
  {
    actions: {
      saveQuery: assign({
        typeAhead: (ctx, event) => ({
          ...ctx.typeAhead,
          draft: ctx.typeAhead.draft + event.value,
        }),
      }),
      clearValue: assign((ctx, event) => ({
        typeAhead: {
          ...ctx.typeAhead,
          value: '',
        },
      })),
      setFinalValue: assign((ctx, event) => ({
        typeAhead: {
          ...ctx.typeAhead,
          draft: '',
        },
      })),
    },
  }
);
