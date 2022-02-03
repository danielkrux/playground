import { createMachine, assign } from "xstate";

type Context = {
  value: string;
};

type Events =
  | { type: "EDIT" }
  | { type: "CANCEL" }
  | { type: "COMMIT"; value: string };

export const machine = createMachine(
  {
    tsTypes: {} as import("./machine.typegen").Typegen0,
    id: "editable-list-item",
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    initial: "reading",
    context: {
      value: "",
    },
    states: {
      reading: {
        on: {
          EDIT: "editing",
        },
      },
      editing: {
        on: {
          CANCEL: "reading",
          COMMIT: {
            target: "reading",
            actions: ["commit", "handleValueChange"],
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
      handleValueChange: null,
    },
  }
);
