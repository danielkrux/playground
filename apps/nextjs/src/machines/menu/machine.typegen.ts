// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    clearValue: 'KEYDOWN';
    saveQuery: 'KEYDOWN';
    setFinalValue: 'xstate.after(300)#type-ahead.open.debouncing';
  };
  internalEvents: {
    'xstate.after(300)#type-ahead.open.debouncing': {
      type: 'xstate.after(300)#type-ahead.open.debouncing';
    };
    'xstate.init': { type: 'xstate.init' };
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
  matchesStates:
    | 'closed'
    | 'open'
    | 'open.idle'
    | 'open.debouncing'
    | { open?: 'idle' | 'debouncing' };
  tags: never;
}
