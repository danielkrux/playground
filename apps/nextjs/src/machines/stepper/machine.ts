import { createMachine } from 'xstate';

export const stepperMachine = createMachine(
  {
    id: 'stepper',
    initial: 'one',
    context: {
      validated: false,
    },
    states: {
      one: {
        on: { NEXT: { target: 'two' } },
      },
      two: {
        on: {
          NEXT: { target: 'three', cond: 'canGoThree' },
          PREV: { target: 'one' },
        },
      },
      three: {
        on: {
          NEXT: { target: 'four', cond: 'canGoFour' },
          PREV: { target: 'two' },
        },
        after: {
          3000: { target: 'two' },
        },
      },
      four: {
        type: 'final',
      },
    },
    on: {
      VALIDATE: { actions: 'validate' },
    },
  },
  {
    actions: {
      validate: (context) => {
        context.validated = true;
      },
    },
    guards: {
      canGoThree: (context) => context.validated,
      canGoFour: () => true,
    },
  }
);
