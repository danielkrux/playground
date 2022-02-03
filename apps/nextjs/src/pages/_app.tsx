import { useInterpret } from "@xstate/react";
import { createContext } from "react";
import { InterpreterFrom } from "xstate";

import { todosMachine } from "../machines/todo/todosMachine";
import "../styles/globals.scss";

export const GlobalStateContext = createContext({
  todoService: {} as InterpreterFrom<typeof todosMachine>,
});

function MyApp({ Component, pageProps }) {
  const todoService = useInterpret(todosMachine, { devTools: true });

  return (
    <GlobalStateContext.Provider value={{ todoService }}>
      <Component {...pageProps} />
    </GlobalStateContext.Provider>
  );
}

export default MyApp;
