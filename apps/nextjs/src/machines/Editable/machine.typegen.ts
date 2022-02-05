// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    commit: "COMMIT";
    handleValueChange: "COMMIT";
  };
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    checkValue: "COMMIT";
  };
  eventsCausingDelays: {};
  matchesStates: "reading" | "editing";
  tags: never;
}
