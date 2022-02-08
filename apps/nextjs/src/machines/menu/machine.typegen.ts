// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    updateContext: 'UPDATE_CONTEXT';
    saveTypeAhead: 'KEYDOWN';
    setFocusedItem: 'KEYDOWN_ARROW';
    clearTypeAhead:
      | 'xstate.after(300)#menu.open.readyForKeyPress'
      | 'CLOSE'
      | 'KEYDOWN_ESCAPE'
      | 'KEYDOWN_ENTER';
    clearFocusedIndex: 'CLOSE' | 'KEYDOWN_ESCAPE' | 'KEYDOWN_ENTER';
  };
  internalEvents: {
    'xstate.after(300)#menu.open.readyForKeyPress': {
      type: 'xstate.after(300)#menu.open.readyForKeyPress';
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
  eventsCausingGuards: {
    notMeta: 'KEYDOWN';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'closed'
    | 'open'
    | 'open.readyForKeyPress'
    | { open?: 'readyForKeyPress' };
  tags: never;
}
