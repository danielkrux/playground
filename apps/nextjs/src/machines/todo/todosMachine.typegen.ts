// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    draftChange: "DRAFT.CHANGE";
    create: "CREATE";
    delete: "DELETE";
    toggleComplete: "COMPLETED";
    update: "UPDATE";
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
    createGuard: "CREATE";
  };
  eventsCausingDelays: {};
  matchesStates: "loading" | "ready";
  tags: never;
}