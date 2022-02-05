import { createContext } from 'react';
import { useInterpret } from '@xstate/react';

import { InterpreterFrom } from 'xstate';
import { todosMachine } from './todo';

export const GlobalStateContext = createContext({
  todoService: {} as InterpreterFrom<typeof todosMachine>,
});

const StateProvider = ({ children }) => {
  const todoService = useInterpret(todosMachine);
  return (
    <GlobalStateContext.Provider value={{ todoService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default StateProvider;
