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
  typeAhead: string;
  itemsLength: number;
  focusedIndex: number;
  focusableIndexes: number[];
};

export type Events =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'KEYDOWN'; value: string }
  | { type: 'KEYDOWN_ESCAPE'; value: string }
  | { type: 'KEYDOWN_ENTER'; value: string }
  | { type: 'KEYDOWN_ARROW'; value: string }
  | { type: 'UPDATE_CONTEXT'; value: Partial<Context> };

export const INITIAL_CONTEXT: Context = {
  focusedIndex: -1,
  focusableIndexes: [],
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
    on: {
      UPDATE_CONTEXT: {
        actions: 'updateContext',
      },
    },
  },
  {
    actions: {
      updateContext: assign((ctx, event) => ({
        ...ctx,
        ...event.value,
      })),
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
        const currentIndex = ctx.focusableIndexes.findIndex(
          (i) => i === ctx.focusedIndex
        );
        if (event.value === 'ArrowUp') {
          if (ctx.focusedIndex === 0) return;
          const newIndex = currentIndex === -1 ? 0 : currentIndex - 1;
          return {
            focusedIndex: ctx.focusableIndexes[newIndex],
          };
        }
        if (event.value === 'ArrowDown') {
          if (ctx.focusedIndex === ctx.itemsLength - 1) return;
          const newIndex = currentIndex + 1;
          return {
            focusedIndex: ctx.focusableIndexes[newIndex],
          };
        }
      }),
    },
    guards: {
      notMeta: (_, event) => !META_KEYS.includes(event.value),
    },
  }
);
