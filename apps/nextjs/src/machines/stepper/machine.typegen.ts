// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    validate: 'VALIDATE';
  };
  internalEvents: {
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
    canGoThree: 'NEXT';
    canGoFour: 'NEXT';
  };
  eventsCausingDelays: {};
  matchesStates: 'one' | 'two' | 'three' | 'four';
  tags: never;
}
