import { useContext } from 'react';
import classNames from 'classnames';
import { useDragControls, Reorder } from 'framer-motion';

import Editable from 'components/Editable';
import ReorderIcon from 'components/Icons/Reorder';
import { GlobalStateContext } from 'machines/Context';
import { Todo as TodoType } from 'features/todo/machine';

const Todo = ({ todo }) => {
  const dragControls = useDragControls();

  const { todoService } = useContext(GlobalStateContext);
  const { send } = todoService;

  const complete = (id: string) => {
    send({ type: 'COMPLETED', id });
  };

  const updateTodo = (newTodo: TodoType) => {
    send({ type: 'UPDATE', todo: newTodo });
  };

  return (
    <Reorder.Item
      id={todo.id}
      value={todo}
      dragListener={false}
      dragControls={dragControls}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex relative items-center p-2 mb-2 list-none bg-blue-50 rounded justify-between"
    >
      <div className="flex items-center gap-3">
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
            className: classNames('select-none', {
              'line-through': todo.completed,
            }),
          }}
          inputProps={{
            className: 'border-none p-0',
          }}
        />
      </div>
      <ReorderIcon dragControls={dragControls} />
    </Reorder.Item>
  );
};

export default Todo;
