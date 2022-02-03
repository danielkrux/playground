import { assign } from "@xstate/immer";
import { createMachine } from "xstate";

type StepperContext = {
  validated: boolean;
};

type StepperEvent = { type: "NEXT" } | { type: "PREV" } | { type: "VALIDATE" };

export const stepperMachine = createMachine(
  {
    id: "stepper",
    tsTypes: {} as import("./machine.typegen").Typegen0,
    schema: {
      context: {} as StepperContext,
      actions: {} as StepperEvent,
    },
    initial: "one",
    context: {
      validated: false,
    },
    states: {
      one: {
        on: { NEXT: { target: "two" } },
      },
      two: {
        on: {
          NEXT: { target: "three", cond: "canGoThree" },
          PREV: { target: "one" },
        },
      },
      three: {
        on: {
          NEXT: { target: "four", cond: "canGoFour" },
          PREV: { target: "two" },
        },
        after: {
          3000: { target: "two" },
        },
      },
      four: {
        type: "final",
      },
    },
    on: {
      VALIDATE: { actions: "validate" },
    },
  },
  {
    actions: {
      validate: assign(() => ({ validated: true })),
    },
    guards: {
      canGoThree: (ctx) => ctx.validated,
      canGoFour: () => true,
    },
  }
);
