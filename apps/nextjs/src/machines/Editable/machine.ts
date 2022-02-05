import { createMachine, assign } from 'xstate';

export type Context = {
  value: string;
};

export type Events =
  | { type: 'EDIT' }
  | { type: 'CANCEL' }
  | { type: 'COMMIT'; value: string };

export const editableMachine = createMachine(
  {
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: {
      value: '',
    },
    initial: 'reading',
    id: 'editable',
    states: {
      reading: {
        on: {
          EDIT: 'editing',
        },
      },
      editing: {
        on: {
          CANCEL: 'reading',
          COMMIT: {
            target: 'reading',
            cond: 'checkValue',
            actions: ['commit', 'handleValueChange'],
          },
        },
      },
    },
  },
  {
    actions: {
      commit: assign({
        value: (_, event) => event.value,
      }),
      // used to communicate a change in the context to React
      handleValueChange: null,
    },
    guards: {
      checkValue: (_, event) => Boolean(event.value.trim().length),
    },
  }
);
