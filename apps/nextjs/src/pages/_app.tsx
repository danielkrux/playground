import { useInterpret } from '@xstate/react';
import { createContext } from 'react';
import { InterpreterFrom } from 'xstate';

import { todoMachine } from '../machines/todo/machine';
import '../styles/globals.css';

export const GlobalStateContext = createContext({
  todoService: {} as InterpreterFrom<typeof todoMachine>,
});

function MyApp({ Component, pageProps }) {
  const todoService = useInterpret(todoMachine);

  return (
    <GlobalStateContext.Provider value={{ todoService }}>
      <Component {...pageProps} />
    </GlobalStateContext.Provider>
  );
}

export default MyApp;
