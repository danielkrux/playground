// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    saveQuery: "KEYDOWN";
    clearQuery: "xstate.after(300)#type-ahead.typing";
  };
  internalEvents: {
    "xstate.after(300)#type-ahead.typing": {
      type: "xstate.after(300)#type-ahead.typing";
    };
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
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "idle" | "typing";
  tags: never;
}
