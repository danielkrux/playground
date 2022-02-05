import { createContext, useContext } from 'react';
import { useInterpret } from '@xstate/react';

import { InterpreterFrom } from 'xstate';
import { todosMachine } from '../features/todo/machine';

const GlobalStateContext = createContext({
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

export function useGlobalState() {
  const { todoService } = useContext(GlobalStateContext);
  return {
    todoService,
  };
}

export default StateProvider;
