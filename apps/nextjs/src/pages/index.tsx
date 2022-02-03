import { useActor } from '@xstate/react';
import React, { useContext } from 'react';
import { GlobalStateContext } from './_app';

export function useTodoState() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.todoService);

  const create = (title: string) => {
    send({ type: 'CREATE', title });
  };

  const complete = (id: string) => {
    send({ type: 'COMPLETE', id });
  };

  return { todos: state.context.todos, create, complete };
}

export default function Home() {
  const { todos, create, complete } = useTodoState();

  return (
    <div style={{ padding: '5rem' }}>
      <button onClick={() => create('New todo')}>Create Todo</button>
      {todos.map((t) => {
        return (
          <div key={t.id} onClick={() => complete(t.id)}>
            {t.title} <span>[{t.completed ? ' x' : ''} ]</span>
          </div>
        );
      })}
    </div>
  );
}
