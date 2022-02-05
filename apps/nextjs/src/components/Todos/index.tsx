import React, { useContext } from 'react';
import { useSelector } from '@xstate/react';
import classNames from 'classnames';

import { getTodos, Todo as TodoType } from '../../machines/todo';
import { GlobalStateContext } from '../../machines/Context';
import Editable from '../Editable';

const Todos = () => {
  const { todoService } = useContext(GlobalStateContext);
  const { send } = todoService;

  const todos = useSelector(todoService, getTodos);

  const complete = (id: string) => {
    send({ type: 'COMPLETED', id });
  };

  const updateTodo = (newTodo: TodoType) => {
    send({ type: 'UPDATE', todo: newTodo });
  };

  return (
    <>
      {todos.map((todo) => (
        <div className="flex gap-3 items-center py-2" key={todo.id}>
          <input
            checked={todo.completed}
            onChange={() => complete(todo.id)}
            type="checkbox"
            id="complete-todo"
            className="rounded"
          />
          <Editable
            onValueChange={(value) => updateTodo({ ...todo, title: value })}
            label={todo.title}
            labelProps={{
              className: classNames({ 'line-through	': todo.completed }),
            }}
            inputProps={{
              className: 'border-none p-0',
            }}
          />
        </div>
      ))}
    </>
  );
};

export default Todos;
