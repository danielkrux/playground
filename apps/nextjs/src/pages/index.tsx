import { useActor, useSelector } from "@xstate/react";
import React, { FormEvent, useContext, useEffect } from "react";

import { GlobalStateContext } from "./_app";
import Editable from "../components/Editable";
import { Todo } from "../machines/todo";
import { getTodosCount } from "../machines/todo/selectors";

export function useTodoState() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.todoService);
  const count = useSelector(globalServices.todoService, getTodosCount);

  const create = (e) => {
    e.preventDefault();
    send({ type: "CREATE" });
  };

  const complete = (id: string) => {
    send({ type: "COMPLETED", id });
  };

  const updateDraft = (e: FormEvent<HTMLInputElement>) => {
    send({ type: "DRAFT.CHANGE", title: e.currentTarget.value });
  };

  const updateTodo = (newTodo: Todo) => {
    send({ type: "UPDATE", todo: newTodo });
  };

  return { ...state.context, count, create, complete, updateDraft, updateTodo };
}

export default function Home() {
  const { todos, count, draft, complete, create, updateDraft, updateTodo } =
    useTodoState();

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="todos">
      <div className="todos-container">
        <p>{count} todos</p>
        <form className="todos-form" onSubmit={create}>
          <input
            className="todos-input"
            type="text"
            onChange={updateDraft}
            value={draft}
          />
          <button type="submit">Create Todo</button>
        </form>
        {todos.map((t) => {
          return (
            <div className="todo" key={t.id}>
              <span>[{t.completed ? " x" : ""} ]</span>&nbsp;
              <Editable
                onValueChange={(value) => updateTodo({ ...t, title: value })}
                label={t.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
