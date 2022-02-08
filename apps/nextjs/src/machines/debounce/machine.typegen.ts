// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    clearValue: 'KEYDOWN';
    saveQuery: 'KEYDOWN';
    setFinalValue: 'xstate.after(300)#type-ahead.debouncing';
  };
  internalEvents: {
    'xstate.after(300)#type-ahead.debouncing': {
      type: 'xstate.after(300)#type-ahead.debouncing';
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
  matchesStates: 'idle' | 'debouncing';
  tags: never;
}
