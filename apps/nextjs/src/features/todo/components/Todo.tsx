import classNames from 'classnames';
import { useDragControls, Reorder } from 'framer-motion';

import Editable from 'components/Editable';
import ReorderIcon from 'components/Icons/Reorder';
import { Todo as TodoType } from 'features/todo/machine';
import { useGlobalState } from 'providers/StateProvider';

const Todo = ({ todo }) => {
  const dragControls = useDragControls();

  const { todoService } = useGlobalState();
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex relative items-center p-4 mb-2 list-none bg-white rounded justify-between shadow-md"
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
