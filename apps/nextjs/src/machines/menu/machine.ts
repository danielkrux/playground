import { assign, createMachine } from 'xstate';

const META_KEYS = [
  'Enter',
  'Escape',
  'ArrowDown',
  'ArrowUp',
  'Alt',
  'Meta',
  'Backspace',
  'Shift',
  'Control',
];

export type Context = {
  focusedIndex: number;
  typeAhead: string;
  itemsLength: number;
};

export type Events =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'KEYDOWN'; value: string }
  | { type: 'KEYDOWN_ESCAPE'; value: string }
  | { type: 'KEYDOWN_ENTER'; value: string }
  | { type: 'KEYDOWN_ARROW'; value: string };

export const INITIAL_CONTEXT = {
  focusedIndex: -1,
  typeAhead: '',
  itemsLength: 0,
};

export const menuMachine = createMachine(
  {
    tsTypes: {} as import('./machine.typegen').Typegen0,
    id: 'menu',
    initial: 'closed',
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: INITIAL_CONTEXT,
    states: {
      closed: {
        id: 'closed',
        entry: ['clearTypeAhead', 'clearFocusedIndex'],
        on: {
          OPEN: 'open',
        },
      },
      open: {
        initial: 'readyForKeyPress',
        states: {
          readyForKeyPress: {
            after: {
              300: {
                actions: 'clearTypeAhead',
              },
            },
            on: {
              KEYDOWN: {
                target: 'readyForKeyPress',
                actions: 'saveTypeAhead',
                cond: 'notMeta',
              },
              KEYDOWN_ESCAPE: {
                target: '#closed',
              },
              KEYDOWN_ENTER: {
                target: '#closed',
                cond: 'hasFocus',
              },
              KEYDOWN_ARROW: {
                target: 'readyForKeyPress',
                actions: 'setFocusedItem',
              },
            },
          },
        },
        on: {
          CLOSE: 'closed',
        },
      },
    },
  },
  {
    actions: {
      saveTypeAhead: assign((ctx, event) => ({
        typeAhead: ctx.typeAhead + event.value.toLowerCase(),
      })),
      clearTypeAhead: assign(() => ({
        typeAhead: '',
      })),
      clearFocusedIndex: assign(() => ({
        focusedIndex: -1,
      })),
      setFocusedItem: assign((ctx, event) => {
        if (event.value === 'ArrowUp') {
          if (ctx.focusedIndex === 0) return;
          return {
            focusedIndex: ctx.focusedIndex - 1,
          };
        }
        if (event.value === 'ArrowDown') {
          if (ctx.focusedIndex === ctx.itemsLength - 1) return;
          return {
            focusedIndex: ctx.focusedIndex + 1,
          };
        }
      }),
    },
    guards: {
      notMeta: (_, event) => !META_KEYS.includes(event.value),
      // IS_META: (_, event) => META_KEYS.includes(event.value),
      hasFocus: (ctx) => ctx.focusedIndex >= 0,
    },
  }
);
